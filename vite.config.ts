import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		postcss: {
			plugins: [tailwindcss],
		},
	},
	base: "/wanted-game",
	test: {
		setupFiles: ["./test/setup.ts"],
		environment: "jsdom",
		include: ["./src/**/*.spec.tsx", "./src/**/*.spec.ts"],
		globals: true,
	},
});
