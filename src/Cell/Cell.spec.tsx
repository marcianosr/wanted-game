import { describe, expect, it } from "vitest";
import Cell from "./Cell";
import { render, screen } from "@testing-library/react";

describe.todo(Cell, () => {
	it("renders a cell", () => {
		render(<Cell cell="red" onClick={() => {}} />);

		expect(screen.getByAltText("red")).toBeInTheDocument();

		screen.debug();
	});

	it("renders all cells opacity 0 when transitioning", () => {});

	it("renders target cell opacity 1 when transitioning", () => {});
});
