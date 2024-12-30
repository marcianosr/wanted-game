import "./App.css";

import { GameStateProvider } from "./useGameState";
import Container from "./Container";

function App() {
	return (
		<GameStateProvider>
			<Container />
		</GameStateProvider>
	);
}

export default App;
