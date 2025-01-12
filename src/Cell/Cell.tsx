import clsx from "clsx";

import { useGameState } from "../useGameState";
import { useMemo } from "react";
import {
	Character,
	CHARACTERS,
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH,
	FACE_SIZE,
	MARGIN,
} from "../constants";

type CellProps = {
	cell: Character;
	onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const Cell = ({ cell, onClick }: CellProps) => {
	const { gameState } = useGameState();

	const randomPosition = useMemo(() => {
		const top =
			Math.floor(
				Math.random() * (CONTAINER_HEIGHT - FACE_SIZE - 2 * MARGIN)
			) + MARGIN;
		const left =
			Math.floor(
				Math.random() * (CONTAINER_WIDTH - FACE_SIZE - 2 * MARGIN)
			) + MARGIN;

		return { top: `${top}px`, left: `${left}px` };
	}, []);

	const isTarget = cell === gameState.config.target;

	const cellClasses = clsx("cell", "cursor-pointer", "size-[50px]", {
		mixed: gameState.config.type.mixed,
		"opacity-0": gameState.isTransitioning && !isTarget,
		flicker: gameState.isTransitioning && isTarget,
	});

	return (
		<div
			onClick={onClick}
			data-cell-color={cell}
			className={cellClasses}
			data-is-target={isTarget ? "target" : undefined}
			style={randomPosition}
		>
			<img src={CHARACTERS[cell]} alt={cell} className="w-full" />
		</div>
	);
};

export default Cell;
