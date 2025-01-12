import { CHARACTERS } from "./constants";
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
			Level {gameState.currentLevel}
		</div>
	);
};

export default Target;
