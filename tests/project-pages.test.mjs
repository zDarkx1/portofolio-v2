import assert from "node:assert/strict";
import test from "node:test";
import { projects } from "../src/lib/data.ts";

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";

test("Projects page links to both projects and displays their screenshots", async () => {
  const response = await fetch(`${baseUrl}/projects`);
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const project of projects) {
    assert.ok(html.includes(`href="/projects/${project.slug}"`), `${project.title} card must link to its detail page`);
    assert.ok(html.includes(encodeURIComponent(project.cover)), `${project.title} screenshot must be rendered`);
  }
  assert.ok(!html.includes("No projects yet"));
});

test("Project detail pages display real content, screenshots, and safe external links", async () => {
  for (const project of projects) {
    const response = await fetch(`${baseUrl}/projects/${project.slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.ok(html.includes(project.overview));
    assert.ok(html.includes(encodeURIComponent(project.cover)));
    for (const url of [project.repositoryUrl, project.liveUrl]) {
      assert.ok(html.includes(`href="${url}" target="_blank" rel="noopener noreferrer"`));
    }
    assert.ok(!html.includes("placeholder case study"));
  }
});

test("Unknown project slugs return a 404", async () => {
  const response = await fetch(`${baseUrl}/projects/not-a-real-project`);
  assert.equal(response.status, 404);
});
