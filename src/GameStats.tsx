import Target from "./Target";
import { useGameState } from "./useGameState";

const GameStats = () => {
	const { gameState } = useGameState();

	return (
		<>
			<Target />
			<time>{gameState.time}</time>
			<span>score: {gameState.score}</span>
		</>
	);
};

export default GameStats;
