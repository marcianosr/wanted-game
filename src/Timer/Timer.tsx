import { useEffect } from "react";
import { useGameState } from "../useGameState";

const Timer = () => {
	const { gameState, setGameState } = useGameState();

	useEffect(() => {
		if (gameState.time <= 0) {
			return setGameState({
				gameover: true,
			});
		}

		const timerId = setInterval(() => {
			setGameState({
				time: Math.max(gameState.time - 1, 0), // Ensure time doesn't drop below 0
			});
		}, 1000);

		return () => clearInterval(timerId); // Clean up on unmount
	}, [gameState.time, setGameState]);

	return (
		<div className="timer">
			<span>Time Left: {gameState.time}s</span>
		</div>
	);
};

export default Timer;
