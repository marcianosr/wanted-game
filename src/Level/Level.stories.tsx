import type { Meta, StoryObj } from "@storybook/react";

import LevelComponent from "./Level";

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
					type: "boolean", // Toggle control for true/false
				},
				description: "Enable or disable mixed mode.",
			},
		},
	},
	args: {
		type: {
			move: {
				direction: null, // Default direction is null
			},
			mixed: false, // Default value for mixed
		},
		size: 2,
		layout: [
			["red", "yellow"],
			["yellow", "blue"],
		],
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
} satisfies Meta<typeof LevelComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LevelGrid: Story = {
	args: {
		type: {
			move: {
				direction: null, // Example direction
			},
			mixed: false, // Example with mixed mode enabled
		},
		layout: [
			["blue", "red", "yellow"],
			["yellow", "blue", "green"],
			["red", "green", "blue"],
			["red", "green", "blue"],
			["red", "green", "blue"],
		],
	},
};

export const LevelMovingLeft: Story = {
	args: {
		type: {
			move: {
				direction: "left", // Example direction
			},
			mixed: false, // Example with mixed mode enabled
		},
		layout: [
			["blue", "red", "yellow"],
			["yellow", "blue", "green"],
			["red", "green", "blue"],
		],
	},
};

export const LevelMovingRight: Story = {
	args: {
		type: {
			move: {
				direction: "right", // Example direction
			},
			mixed: false, // Example with mixed mode enabled
		},
		size: 3,
		layout: [
			["blue", "red", "yellow"],
			["yellow", "blue", "green"],
			["red", "green", "blue"],
		],
	},
};

export const LevelMixed: Story = {
	args: {
		type: {
			move: {
				direction: null, // Example direction
			},
			mixed: true, // Example with mixed mode enabled
		},
		size: 3,
		layout: [
			["blue", "red", "yellow"],
			["yellow", "blue", "green"],
			["red", "green", "blue"],
		],
	},
};
