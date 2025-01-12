import { createContext, useContext, useState, ReactNode } from "react";
import { getRandomTarget } from "./getRandomTarget";
import { generateGrid } from "./grid";
import { Character } from "./constants";

interface GameStateContextProps {
	gameState: GameState;
	setGameState: (newState: Partial<GameState>) => void;
	restartGame: () => void;
}

export type GameState = {
	currentLevel: number;
	score: number;
	time: number;
	config: LevelConfig;
	gameover?: boolean;
};

export type Direction = "up" | "down" | "left" | "right";

export type TargetType = "red" | "blue" | "green" | "yellow" | "purple";

type Move = {
	direction: Direction | null;
	index: number;
};
export type LevelType = {
	move?: Move[];
	mixed: boolean;
};

export type LevelConfig = {
	target: TargetType;
	size: number;
	layout: Character[][];
	type: LevelType;
};

const MAX_ROW_SIZE = 12;

export const handleMaxCharactersInField = (rows: number) => {
	if (rows >= MAX_ROW_SIZE) {
		return true;
	}

	return false;
};
export const increaseCharactersInField = (currentLevel: number) =>
	Math.min(currentLevel * 2, MAX_ROW_SIZE);

// Math.min(
// 	Math.ceil(Math.sqrt(currentLevel * 2)), // Increase size gradually
// 	Math.floor(Math.sqrt(200)) // Cap the grid size
// );

export const generateConfigLevel = (currentLevel: number): LevelConfig => {
	const target = getRandomTarget();
	const size = increaseCharactersInField(currentLevel);

	return {
		target,
		size,
		layout: generateGrid(size, target),
		type: {
			move: [
				{
					direction: null,
					index: [],
				},
			],
			// mixed: handleMaxCharactersInField(size),
			mixed: currentLevel > 20,
		},
	};
};

const GameStateContext = createContext<GameStateContextProps>({
	gameState: {
		currentLevel: 0,
		score: 0,
		time: 0,
		config: {
			target: "red",
			size: 0,
			layout: [],
			type: {
				move: [
					{
						direction: null,
						index: [],
					},
				],
				mixed: false,
			},
		},
	},
	setGameState: () => {},
});

const GameStateProvider = ({ children }: { children: ReactNode }) => {
	const [gameState, setGameState] = useState<GameState>({
		currentLevel: 1,
		score: 0,
		time: 100,
		config: generateConfigLevel(1),
		gameover: false,
	});

	const updateGameState = (
		newState: Partial<GameState>,
		callback?: (updatedState: GameState) => void
	) => {
		setGameState((prevState: GameState) => {
			const updatedState = { ...prevState, ...newState };
			if (callback) {
				callback(updatedState);
			}
			return updatedState;
		});
	};

	const restartGame = () => {
		setGameState({
			currentLevel: 1,
			score: 0,
			time: 100,
			config: generateConfigLevel(1),
			gameover: false,
		});
	};

	return (
		<GameStateContext.Provider
			value={{ gameState, setGameState: updateGameState, restartGame }}
		>
			{children}
		</GameStateContext.Provider>
	);
};

const useGameState = () => {
	const context = useContext(GameStateContext);
	if (context === undefined) {
		throw new Error("useGameState must be used within a GameStateProvider");
	}
	return context;
};

export { GameStateProvider, useGameState };
