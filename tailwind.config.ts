import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sentinel: {
          green: "#00FFB2",
          red: "#FF3B5C",
          amber: "#FFB800",
          cyan: "#00D4FF",
        },
        surface: {
          void: "#0A0A0F",
          deep: "#0F1117",
          panel: "#161822",
          card: "#1C1F2E",
          elevated: "#232740",
        },
        chain: {
          ethereum: "#627EEA",
          bsc: "#F0B90B",
          polygon: "#8247E5",
          arbitrum: "#28A0F0",
          optimism: "#FF0420",
          base: "#0052FF",
        },
        text: {
          primary: "#E8EAF0",
          secondary: "#8B8FA3",
          muted: "#5A5E72",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        "glow-green": "0 0 20px rgba(0, 255, 178, 0.15)",
        "glow-red": "0 0 20px rgba(255, 59, 92, 0.15)",
        "glow-cyan": "0 0 20px rgba(0, 212, 255, 0.10)",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(0, 255, 178, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 255, 178, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
