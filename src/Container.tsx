import GameStats from "./GameStats";
import { useGameState } from "./useGameState";
import Level from "./Level/Level";
import GameOver from "./GameOver/GameOver";

export const MAX_WIDTH = 900;

const Container = () => {
	const { gameState } = useGameState();

	return (
		<section className="">
			{gameState.gameover ? (
				<GameOver />
			) : (
				<>
					<GameStats />
					{/* Playable viewport */}
					<div className="viewport">
						<Level
							type={gameState.config.type}
							layout={gameState.config.layout}
						/>
					</div>
				</>
			)}
		</section>
	);
};

export default Container;
