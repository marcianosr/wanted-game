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
			<div>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof CellComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Cell: Story = {};
