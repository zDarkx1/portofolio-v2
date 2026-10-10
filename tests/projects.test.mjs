import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { projects } from "../src/lib/data.ts";

test("Pactra has a real screenshot, project details, and destination links", () => {
  const project = projects.find(({ slug }) => slug === "pactra");
  assert.ok(project, "Pactra must be listed in the portfolio");
  assert.equal(project.title, "Pactra");
  assert.equal(project.repositoryUrl, "https://github.com/zDarkx1/Pactra");
  assert.equal(project.liveUrl, "https://pactra.my.id");
  assert.equal(project.cover, "/projects/pactra.jpg");
  assert.ok(existsSync(fileURLToPath(new URL(`../public${project.cover}`, import.meta.url))));
  assert.ok(project.coverAlt.length > 0);
  assert.ok(project.overview.length > 0);
  assert.ok(project.highlights.length > 0);
  assert.ok(project.technologies.includes("Go"));
});

test("EventTwin has a real screenshot, project details, and destination links", () => {
  const project = projects.find(({ slug }) => slug === "event-twin");
  assert.ok(project, "EventTwin must be listed in the portfolio");
  assert.equal(project.title, "EventTwin");
  assert.equal(project.repositoryUrl, "https://github.com/zDarkx1/event-twin");
  assert.equal(project.liveUrl, "https://event-twin.vercel.app");
  assert.equal(project.cover, "/projects/event-twin.jpg");
  assert.ok(existsSync(fileURLToPath(new URL(`../public${project.cover}`, import.meta.url))));
  assert.ok(project.coverAlt.length > 0);
  assert.ok(project.overview.length > 0);
  assert.ok(project.highlights.length > 0);
  assert.ok(project.technologies.includes("TypeScript"));
});
