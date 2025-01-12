import { describe, expect, it, vi } from "vitest";
import { generateConfigLevel } from "./useGameState";

vi.mock("./getRandomTarget", () => ({
	getRandomTarget: vi.fn(() => "yellow"),
}));

vi.mock("./grid", () => ({
	generateGrid: vi.fn(() => [
		["red", "yellow"],
		["yellow", "blue"],
	]),
}));

describe("levelConfig", () => {
	it("returns a level config", () => {
		const config = generateConfigLevel(1);

		expect(config).toEqual({
			target: "yellow",
			size: 2,
			layout: [
				["red", "yellow"],
				["yellow", "blue"],
			],
			type: {
				direction: null,
				move: null,
				speed: null,
				mixed: false,
			},
		});
	});

	it("increases the number of characters (rows) in the field when leveling", () => {
		const config = generateConfigLevel(5);

		expect(config.size).toBe(10);
	});

	it("doesn't increase the amount of rows after a given level", () => {
		const config = generateConfigLevel(20);

		const config2 = generateConfigLevel(80);

		expect(config.size).toBe(14);

		expect(config2.size).toBe(14);
	});

	it("handles the characters in a mixed version after a certain level", () => {
		const config = generateConfigLevel(2);

		expect(config.type.mixed).toBe(false);

		const config2 = generateConfigLevel(15);

		expect(config2.type.mixed).toBe(true);
	});
});
