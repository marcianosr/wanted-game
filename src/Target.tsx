import { CHARACTERS } from "./grid";
import { useGameState } from "./useGameState";

const Target = () => {
	const { gameState } = useGameState();

	return (
		<div className="flex flex-col place-items-center">
			Wanted:
			<img
				src={CHARACTERS[gameState.config.target]}
				alt={gameState.config.target}
				className="w-40"
			/>
			- level {gameState.currentLevel}
		</div>
	);
};

export default Target;
