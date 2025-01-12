import { useGameState } from "../useGameState";

const GameOver = () => {
	const { gameState, restartGame } = useGameState();
	return (
		<div>
			<h1>Game Over</h1>
			<p>Your score: {gameState.score}</p>
			<p>Total level: {gameState.currentLevel} </p>
			<p>Try again?</p>
			<button onClick={restartGame}>Restart</button>
		</div>
	);
};

export default GameOver;
