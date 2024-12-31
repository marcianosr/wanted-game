import type { Meta, StoryObj } from "@storybook/react";

import CellComponent from "./Cell";

const meta = {
	title: "Cell",
	component: CellComponent,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		cell: "red",
	},
	decorators: [
		(Story) => (
			<div
				style={{ background: "black", width: "390px", height: "500px" }}
			>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof CellComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Cell: Story = {};
