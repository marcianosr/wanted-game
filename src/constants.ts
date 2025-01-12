import mario from "./assets/mario.png";
import luigi from "./assets/luigi.png";
import wario from "./assets/wario.png";
import yoshi from "./assets/yoshi.png";
import waluigi from "./assets/waluigi.png";

export const CHARACTERS = {
	red: mario,
	blue: luigi,
	yellow: wario,
	green: yoshi,
	purple: waluigi,
} as const;

export type Character = keyof typeof CHARACTERS;
export const FACE_SIZE = 60;
