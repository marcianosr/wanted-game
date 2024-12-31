import { Fragment } from "react";
import clsx from "clsx";
import Cell from "../Cell/Cell";
import { generateConfigLevel, LevelType, useGameState } from "../useGameState";
import { Character } from "../grid";

type LevelProps = {
	type: LevelType;
	layout: Character[][];
};

const Level = ({ type, layout }: LevelProps) => {
	const { gameState, setGameState } = useGameState();
	const isMovingLevel = type.move.direction !== null;

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

	return (
		<div
			className={clsx("container", {
				gridContainer: !type.mixed,
				mixedContainer: type.mixed,
				moveContainer: isMovingLevel,
			})}
			style={{
				gridTemplateColumns: `repeat(${gameState.config.size}, 1fr)`,
				"--direction": type.move.direction === "left" ? -1 : 1,
			}}
		>
			{layout.map((row, i) => (
				<Fragment key={i}>
					{row.map((cell, j) => (
						<Cell key={j} cell={cell} onClick={selectCell} />
					))}
				</Fragment>
			))}
		</div>
	);
};

export default Level;
