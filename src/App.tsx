import { useState } from "react";
import "./App.css";
import clsx from "clsx";
import { mulberry32 } from "./mulberry32";
import { Character, CHARACTERS, generateGrid } from "./grid";

type GameState = {
  currentLevel: number;
  score: number;
  time: number;
  config: LevelConfig;
};

type Level = {
  size: number;
  types: LevelTypeName[];
};

type LevelConfig = {
  target: "red" | "blue" | "green" | "yellow" | "purple";
  level: Level;
};
type LevelTypeName = keyof typeof levelTypes;

const levelTypes = {
  movement: {
    direction: "vertical",
  },
  spotlight: true,
};

type LevelTypes = typeof levelTypes;

const MAX_GRID_SIZE = 2;

const getLevelTypeByName = <T extends LevelTypeName>(
  name: T
): LevelTypes[T] => {
  return levelTypes[name];
};

const generateConfigLevel = (gameState: GameState): GameState => {
  const seed = 1234;

  return {
    currentLevel: gameState.currentLevel + 1,
    score: gameState.score,
    time: gameState.time,
    config: {
      target: getRandomTarget(),
      level: {
        size: increaseGridSize(gameState.currentLevel),
        types: [],
      },
    },
  };
};

const getRandomTarget = (): Character => {
  const keys = Object.keys(CHARACTERS);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex] as Character;
};

const increaseGridSize = (currentLevel: number) =>
  4 + Math.min(Math.floor(currentLevel / 3), MAX_GRID_SIZE);

const startNextLevel = (gameState: GameState) => {
  const newLevel = generateConfigLevel({
    ...gameState,
    config: {
      ...gameState.config,
      level: {
        ...gameState.config.level,
        size: increaseGridSize(gameState.currentLevel),
      },
    },
  });
  return newLevel;
};

function App() {
  const seed = 1234;
  const random = mulberry32(seed);
  const initialLevel = generateConfigLevel({
    currentLevel: 0,
    score: 0,
    time: 0,
    config: {
      target: getRandomTarget(),
      level: {
        size: 8,
        types: [],

        // type: getLevelTypeByName("movement"),
      },
    },
  });

  const [gameState, setGameState] = useState<GameState>(
    generateConfigLevel(initialLevel)
  );

  const grid = generateGrid(
    gameState.config.level.size,
    gameState.config.target
  );

  const selectCell = (e) => {
    const color = e.target.getAttribute("cell-color");

    if (color !== gameState.config.target) {
      console.log("wrong color");
      return;
    }

    setGameState((state) => {
      const newConfig = startNextLevel(state);

      return {
        ...state,
        ...newConfig,
      };
    });
  };

  const movementClasses = (i: number) => ({
    moveYPositive:
      gameState.config.level.types.includes("movement") && i % 2 === 0,
    moveYNegative:
      gameState.config.level.types.includes("movement") && i % 2 === 1,
  });

  return (
    <section className="h-full flex justify-center flex-col items-center">
      <div>
        Wanted:
        <div
          className={clsx("size-12", CHARACTERS[gameState.config.target])}
        />{" "}
        - level {gameState.currentLevel}
      </div>
      {/* Playable viewport */}
      <div className="flex justify-center items-center">
        <div className="flex gap-2">
          {grid.map((row, i) => (
            <div
              key={i}
              className={clsx("flex flex-col gap-2", movementClasses(i))}
            >
              {row.map((cell, j) => (
                <div
                  onClick={(e) => selectCell(e)}
                  key={j}
                  className={clsx("size-12", CHARACTERS[cell])}
                  cell-color={cell}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
