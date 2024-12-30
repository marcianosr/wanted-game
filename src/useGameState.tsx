import { createContext, useContext, useState, ReactNode } from "react";
import { getRandomTarget } from "./getRandomTarget";
import { Character, generateGrid } from "./grid";

interface GameStateContextProps {
	gameState: GameState;
	setGameState: (newState: Partial<GameState>) => void;
}

export type GameState = {
	currentLevel: number;
	score: number;
	time: number;
	config: LevelConfig;
};

type Direction = "up" | "down" | "left" | "right";
type Speed = "slow" | "medium" | "fast";

export type TargetType = "red" | "blue" | "green" | "yellow" | "purple";

export type LevelConfig = {
	target: TargetType;
	size: number;
	layout: Character[][];
	type: {
		move: {
			direction: Direction | null;
			speed: Speed | null;
		};
		mixed: boolean;
	};
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
export const generateConfigLevel = (currentLevel: number): LevelConfig => {
	const target = getRandomTarget();
	const size = increaseCharactersInField(currentLevel);
	const charactersInField = size * size;

	return {
		target,
		size,
		layout: generateGrid(size, target),
		type: {
			move: {
				direction: null,
				speed: null,
			},
			mixed: handleMaxCharactersInField(size),
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
				move: {
					direction: null,
					speed: null,
				},
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

	return (
		<GameStateContext.Provider
			value={{ gameState, setGameState: updateGameState }}
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
