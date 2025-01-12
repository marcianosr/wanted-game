import clsx from "clsx";
import Cell from "../Cell/Cell";
import { generateConfigLevel, LevelType, useGameState } from "../useGameState";
import { Character } from "../constants";

type LevelProps = {
	type: LevelType;
	layout: Character[][];
};

const NEXT_LEVEL_DELAY = 3000;

const Level = ({ type, layout }: LevelProps) => {
	const { gameState, setGameState } = useGameState();

	const selectCell = (e: React.MouseEvent<HTMLElement>) => {
		const isCorrect =
			e.currentTarget.getAttribute("data-cell-color") ===
			gameState.config.target;

		if (!isCorrect) {
			return setGameState({
				score: Math.max(gameState.score - 1, 0), // Deduct 1 point but ensure score doesn't go below 0
				time: Math.max(gameState.time - 10, 0), // Deduct 10 seconds but ensure time doesn't go below 0
			});
		}

		// Correct tap: Highlight the character and delay level progression
		setGameState({
			isPaused: true, // Pause the timer
			isTransitioning: true, // Enable transition state
		});

		// Add a short delay before progressing to the next level
		setTimeout(() => {
			setGameState({
				currentLevel: gameState.currentLevel + 1,
				score: gameState.score + 1,
				config: generateConfigLevel(gameState.currentLevel + 1),
				time: gameState.time + 5,
				isTransitioning: false,
				isPaused: false,
			});
		}, NEXT_LEVEL_DELAY);
	};

	const moveLookup = new Map(type.move?.map((move) => [move.index, move]));

	return (
		<div
			className={clsx("container", {
				vertical: type.move?.some(
					(move) =>
						move.direction === "up" || move.direction === "down"
				),
			})}
		>
			{layout.map((row, i) => {
				const move = moveLookup.get(i);

				return (
					<div
						key={i}
						className={clsx({
							row: true,
							moveRowVertical:
								move?.direction === "up" ||
								move?.direction === "down",
							moveRowHorizontal:
								move?.direction === "right" ||
								move?.direction === "left",
							moveRowUp: move?.direction === "up",
							moveRowDown: move?.direction === "down",
							moveRowLeft: move?.direction === "left",
							moveRowRight: move?.direction === "right",
							mixedContainer: type.mixed,
						})}
					>
						{row.map((cell, j) => (
							<Cell key={j} cell={cell} onClick={selectCell} />
						))}
					</div>
				);
			})}
		</div>
	);
};

export default Level;
