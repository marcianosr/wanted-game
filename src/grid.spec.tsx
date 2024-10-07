import { describe, expect, it, Mock, vitest } from "vitest";
import { generateGrid } from "./grid";

describe("generateGrid", () => {
  it("generates a grid with random cells", () => {
    const size = 4;
    const grid = generateGrid(size, "red");

    expect(grid.length).toBe(4);
    expect(grid[0].length).toBe(4);
  });

  it("given a target, the target only occurs once in the grid", () => {
    const size = 4;
    const target = "yellow";

    const grid = generateGrid(size, target);

    console.log(grid);

    const targetCount = grid.flat().filter((cell) => cell === target).length;

    expect(targetCount).toBe(1);
  });
});
