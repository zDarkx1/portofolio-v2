import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { brandMarkPaths } from "../src/lib/brand.ts";

const shapes = brandMarkPaths.map((d) => `<path d="${d}"/>`).join("");
const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="#090909"><title>Alrizky A monogram</title>${shapes}</svg>\n`;
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" rx="18" fill="#f5f2eb"/><g transform="translate(8 8)" fill="#090909">${shapes}</g></svg>\n`;
await mkdir("public/branding", { recursive: true });
await writeFile("public/branding/alrizky-mark.svg", mark);
await sharp(Buffer.from(mark)).resize(1024, 1024).png().toFile("public/branding/alrizky-mark.png");
await sharp(Buffer.from(mark)).resize(400, 400).flatten({ background: "#ffffff" }).extend({ top: 56, bottom: 56, left: 56, right: 56, background: "#ffffff" }).png().toFile("public/branding/alrizky-mark-preview.png");
await writeFile("src/app/icon.svg", icon);
await sharp(Buffer.from(icon)).resize(180, 180).png().toFile("src/app/apple-icon.png");

const sizes = [16, 32, 48, 64];
const entries = await Promise.all(sizes.map((size) => sharp(Buffer.from(icon)).resize(size, size).png().toBuffer()));
const directory = Buffer.alloc(6 + entries.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(entries.length, 4);
let offset = directory.length;
entries.forEach((buffer, index) => {
  const at = 6 + index * 16;
  directory[at] = sizes[index]; directory[at + 1] = sizes[index];
  directory.writeUInt16LE(1, at + 4); directory.writeUInt16LE(32, at + 6);
  directory.writeUInt32LE(buffer.length, at + 8); directory.writeUInt32LE(offset, at + 12);
  offset += buffer.length;
});
await writeFile("src/app/favicon.ico", Buffer.concat([directory, ...entries]));
console.log("Generated the SVG/PNG brand mark, favicon, app icon, and Apple icon.");
