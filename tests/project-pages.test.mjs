import assert from "node:assert/strict";
import test from "node:test";
import { projects } from "../src/lib/data.ts";
import { fieldNotes } from "../src/lib/field-notes.ts";
import { experience } from "../src/lib/resume.ts";

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

test("Home keeps resume sections and decorative ASCII while omitting the lab", async () => {
  const response = await fetch(baseUrl);
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const id of ["about", "experience", "education", "work", "skills", "contact"]) assert.ok(html.includes(`id="${id}"`), `Missing ${id} section`);
  assert.ok(html.includes('href="/#education"'));
  assert.ok(html.includes('href="/#experience"'));
  assert.ok(html.includes("SAMPLE DATA"), "Dummy education entries must stay labeled");
  for (const filler of ['id="process"', 'id="notes"', 'class="manifesto"', "Education, employment, and milestones will live here"]) assert.ok(!html.includes(filler));
  assert.ok(!html.includes('id="playground"'));
  assert.ok(!html.includes('id="render-mode"'));
  assert.ok(!html.includes("ASCII lab."));
  assert.ok(html.includes("Animated ASCII fern"), "Keep the original hero art");
  assert.ok(html.includes("Baca dalam Bahasa Indonesia"));
  assert.ok(!html.includes("Cactus Plant"));
  assert.ok(!html.includes("Contribution Graph"));
  const about = await (await fetch(`${baseUrl}/about`)).text();
  for (const id of ["experience", "education"]) assert.ok(about.includes(`id="${id}"`), `About must include ${id}`);
});

test("Home and About show the owner's six real competition and community entries", async () => {
  for (const path of ["/", "/about"]) {
    const html = await (await fetch(`${baseUrl}${path}`)).text();
    const section = html.match(/<section[^>]*id="experience"[\s\S]*?<\/section>/)?.[0];
    assert.ok(section, `Missing experience on ${path}`);
    for (const entry of experience.entries) assert.ok(section.includes(entry.title), `${path}: missing ${entry.title}`);
    assert.ok(!section.includes("SAMPLE DATA"), "Real experience must not be marked sample");
    assert.ok(!section.includes("Frontend Developer Intern"));
    assert.ok(!section.includes("Company name"));
  }
});

test("Field notes have readable bodies, unique titles, and valid routes", async () => {
  const index = await (await fetch(`${baseUrl}/articles`)).text();
  for (const note of fieldNotes) {
    assert.ok(index.includes(`/articles/${note.slug}`));
    const response = await fetch(`${baseUrl}/articles/${note.slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.ok(html.includes(note.sections[0].heading.en));
    assert.ok(!html.includes("placeholder article body"));
  }
  assert.equal((await fetch(`${baseUrl}/articles/not-a-real-note`)).status, 404);
});

test("Crawl endpoints include the project and note routes", async () => {
  const sitemap = await fetch(`${baseUrl}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  for (const project of projects) assert.ok(xml.includes(`/projects/${project.slug}`));
  for (const note of fieldNotes) assert.ok(xml.includes(`/articles/${note.slug}`));
  const robots = await fetch(`${baseUrl}/robots.txt`);
  assert.equal(robots.status, 200);
  assert.ok((await robots.text()).includes("sitemap.xml"));
});
