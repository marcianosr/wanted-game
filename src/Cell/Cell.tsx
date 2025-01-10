import clsx from "clsx";
import { Character, CHARACTERS } from "../grid";
import { MAX_WIDTH } from "../Container";
import { LevelConfig, useGameState } from "../useGameState";
import { useRef } from "react";

type CellProps = {
	cell: Character;
	onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const FACE_SIZE = 60;

const Cell = ({ cell, onClick }: CellProps) => {
	const { gameState } = useGameState();

	const {
		config: { type },
	} = gameState as { config: LevelConfig };

	const randomPosition = useRef({
		top: `${Math.floor(Math.random() * (MAX_WIDTH - FACE_SIZE))}px`,
		left: `${Math.floor(Math.random() * (MAX_WIDTH - FACE_SIZE))}px`,
	});

	const isTarget = cell === gameState.config.target;

	return (
		<div
			onClick={onClick}
			data-cell-color={cell}
			className={clsx("cell", "cursor-pointer", "size-12", {
				mixed: type.mixed ? randomPosition.current : undefined,
			})}
			data-is-target={isTarget ? "target" : undefined}
			style={{
				...randomPosition.current,
			}}
		>
			<img src={CHARACTERS[cell]} alt={cell} className="w-full" />
		</div>
	);
};

export default Cell;
