import GameStats from "./GameStats";
import { generateConfigLevel, useGameState } from "./useGameState";
import Cell from "./Cell/Cell";
import { Fragment } from "react";
import clsx from "clsx";

export const MAX_WIDTH = 390;

const Container = () => {
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

	console.log(gameState.config);

	return (
		<section className="h-full flex justify-center flex-col items-center">
			<GameStats />
			{/* Playable viewport */}
			<div className="h-[500px] w-[100%]">
				<div
					className={clsx("container", {
						"grid-container": !gameState.config.type.mixed,
						mixed: gameState.config.type.mixed,
						move: true,
					})}
					style={{
						gridTemplateColumns: `repeat(${gameState.config.size}, 1fr)`,
					}}
				>
					{gameState.config.layout.map((row, i) => (
						<Fragment key={i}>
							{row.map((cell, j) => (
								<Cell
									key={j}
									cell={cell}
									onClick={selectCell}
								/>
							))}
						</Fragment>
					))}
				</div>
			</div>
		</section>
	);
};

export default Container;
