import type { Meta, StoryObj } from "@storybook/react";

import LevelComponent from "./Level";
import { generateGrid } from "../grid";

const meta = {
	title: "Level",
	component: LevelComponent,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			mixed: {
				control: {
					type: "boolean",
				},
				description: "Enable or disable mixed mode.",
			},
		},
	},
	args: {
		type: {
			mixed: false,
		},
		layout: generateGrid(4, "red"),
	},
	decorators: [
		(Story) => (
			<div>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof LevelComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LevelGrid: Story = {
	args: {
		type: {
			mixed: false,
		},
		layout: generateGrid(2, "red"),
	},
};

export const LargeLevelGrid: Story = {
	args: {
		type: {
			mixed: false,
		},
		layout: generateGrid(10, "red"),
	},
};

export const ExtraLargeLevelGrid: Story = {
	args: {
		type: {
			mixed: false,
		},
		layout: generateGrid(12, "red"),
	},
};

export const LevelMoveRowVertical: Story = {
	args: {
		type: {
			move: [
				{
					index: 0,
					direction: "up",
				},
				{
					index: 1,
					direction: "down",
				},
				{
					index: 2,
					direction: "up",
				},
				{
					index: 3,
					direction: "up",
				},
			],
			mixed: false,
		},
		layout: generateGrid(4, "red"),
	},
};

export const LevelMoveRowHorizontal: Story = {
	args: {
		type: {
			move: [
				{
					index: 0,
					direction: "right",
				},
				{
					index: 1,
					direction: "left",
				},
				{
					index: 2,
					direction: "left",
				},
				{
					index: 3,
					direction: "left",
				},
			],
			mixed: false,
		},
		layout: generateGrid(4, "red"),
	},
};

export const LevelMixed: Story = {
	args: {
		type: {
			mixed: true,
		},
		layout: generateGrid(20, "red"),
	},
};
