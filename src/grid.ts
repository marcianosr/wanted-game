export const CHARACTERS = {
  red: "bg-red-400",
  blue: "bg-blue-400",
  green: "bg-green-400",
  yellow: "bg-yellow-400",
  purple: "bg-purple-400",
} as const;

export type Character = keyof typeof CHARACTERS;

export const generateGrid = (size: number, target: Character) => {
  const keys = Object.keys(CHARACTERS).filter((key) => key !== target);
  const grid: Character[][] = [];

  for (let i = 0; i < size; i++) {
    grid.push([]);
    for (let j = 0; j < size; j++) {
      const randomIndex = Math.floor(Math.random() * keys.length);
      grid[i].push(keys[randomIndex] as Character);
    }
  }

  insertTarget(grid, target);

  return grid;
};

const insertTarget = (grid: Character[][], target: Character) => {
  const randomRow = Math.floor(Math.random() * grid.length);
  const randomCol = Math.floor(Math.random() * grid.length);
  grid[randomRow][randomCol] = target;

  return grid;
};
