import clsx from "clsx";
import Cell from "../Cell/Cell";
import { generateConfigLevel, LevelType, useGameState } from "../useGameState";
import { Character } from "../constants";

type LevelProps = {
	type: LevelType;
	layout: Character[][];
};

const Level = ({ type, layout }: LevelProps) => {
	const { gameState, setGameState } = useGameState();

	const selectCell = (e: React.MouseEvent<HTMLElement>) => {
		if (
			e.currentTarget.getAttribute("data-cell-color") !==
			gameState.config.target
		) {
			return setGameState({
				score: gameState.score - 1,
				time: gameState.time - 10,
			});
		}

		setGameState({
			currentLevel: gameState.currentLevel + 1,
			score: gameState.score + 1,
			config: generateConfigLevel(gameState.currentLevel + 1),
		});
	};

	const moveLookup = new Map(type.move?.map((move) => [move.index, move]));

	console.log("layout", layout);

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
