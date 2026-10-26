import assert from "node:assert/strict";
import test from "node:test";
import { adjustedColor, inkGarden, luminance, sampleCells, tone } from "../src/lib/ascii-engine.ts";

test("cell sampling averages every source pixel, including partial edge cells", () => {
  const data = new Uint8ClampedArray([
    255,0,0,255, 0,255,0,255, 0,0,255,255,
    255,255,255,255, 0,0,0,255, 0,0,255,255,
  ]);
  const cells = sampleCells({ width: 3, height: 2, data }, 2);
  assert.equal(cells.length, 2);
  assert.deepEqual([cells[0].r, cells[0].g, cells[0].b], [127.5, 127.5, 63.75]);
  assert.deepEqual([cells[1].r, cells[1].g, cells[1].b], [0, 0, 255]);
  assert.ok(cells.every(({ edge }) => Number.isFinite(edge)));
});
test("luminance preserves black, white, and perceptual channel weighting", () => {
  assert.equal(luminance(0, 0, 0), 0);
  assert.ok(Math.abs(luminance(255, 255, 255) - 1) < 1e-12);
  assert.ok(luminance(0, 255, 0) > luminance(255, 0, 0));
});
test("color adjustments keep channel values bounded and support full grayscale", () => {
  const settings = { ...inkGarden, brightness: 0, contrast: 100, grayscale: 100 };
  assert.deepEqual(adjustedColor(255, 0, 0, settings), [54, 54, 54]);
  assert.deepEqual(adjustedColor(0, 0, 0, { ...settings, brightness: 100 }), [255, 255, 255]);
  assert.ok(adjustedColor(90, 220, 140, { ...settings, contrast: 254, saturation: 250 }).every((v) => v >= 0 && v <= 255));
});
test("tone curves interpolate control points and clamp out-of-range values", () => {
  assert.equal(tone(.5, [{ x: 0, y: 0 }, { x: 1, y: .5 }]), .25);
  assert.equal(tone(-1, inkGarden.toneCurve), 0);
  assert.equal(tone(2, inkGarden.toneCurve), 1);
});
