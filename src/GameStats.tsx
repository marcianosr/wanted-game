import Target from "./Target";
import Timer from "./Timer/Timer";
import { useGameState } from "./useGameState";

const GameStats = () => {
	const { gameState } = useGameState();

	return (
		<>
			<Target />
			<Timer />
			<span>score: {gameState.score}</span>
		</>
	);
};

export default GameStats;
