import fs from "fs";
import path from "path";

const dataPath = "lib/data.ts";

// Read the data file
let content = fs.readFileSync(dataPath, "utf-8");

// Find all price values and add 12€ to them
// Pattern: price: number (with various spacing)
const updatedContent = content.replace(/price:\s*(\d+)/g, (match, price) => {
  const newPrice = parseInt(price) + 12;
  return `price: ${newPrice}`;
});

// Write back to file
fs.writeFileSync(dataPath, updatedContent, "utf-8");

console.log("[v0] Successfully updated all product prices (+12€)");
