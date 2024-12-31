import GameStats from "./GameStats";
import { useGameState } from "./useGameState";
import Level from "./Level/Level";

export const MAX_WIDTH = 390;

const Container = () => {
	const { gameState } = useGameState();

	return (
		<section className="h-full flex justify-center flex-col items-center">
			<GameStats />
			{/* Playable viewport */}
			<div className="h-[500px] w-[100%]">
				<Level
					type={gameState.config.type}
					layout={gameState.config.layout}
				/>
			</div>
		</section>
	);
};

export default Container;
