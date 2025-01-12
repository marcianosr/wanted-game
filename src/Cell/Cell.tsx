import clsx from "clsx";
import { MAX_WIDTH } from "../Container";
import { useGameState } from "../useGameState";
import { useMemo } from "react";
import { Character, CHARACTERS, FACE_SIZE } from "../constants";

type CellProps = {
	cell: Character;
	onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const Cell = ({ cell, onClick }: CellProps) => {
	const { gameState } = useGameState();

	const randomPosition = useMemo(
		() => ({
			top: `${Math.floor(Math.random() * (MAX_WIDTH - FACE_SIZE))}px`,
			left: `${Math.floor(Math.random() * (MAX_WIDTH - FACE_SIZE))}px`,
		}),
		[]
	);

	const isTarget = cell === gameState.config.target;

	const cellClasses = clsx("cell", "cursor-pointer", "size-12", {
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
