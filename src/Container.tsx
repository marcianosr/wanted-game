import GameStats from "./GameStats";
import { useGameState } from "./useGameState";
import Level from "./Level/Level";

export const MAX_WIDTH = 900;

const Container = () => {
	const { gameState } = useGameState();

	return (
		<section className="h-full flex flex-col items-center">
			<GameStats />
			{/* Playable viewport */}
			<div className="viewport">
				<Level
					type={gameState.config.type}
					layout={gameState.config.layout}
				/>
			</div>
		</section>
	);
};

export default Container;
