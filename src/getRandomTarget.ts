import { Character, CHARACTERS } from "./constants";

export const getRandomTarget = (): Character => {
	const keys = Object.keys(CHARACTERS);
	const randomIndex = Math.floor(Math.random() * keys.length);
	return keys[randomIndex] as Character;
};
