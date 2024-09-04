import type { Config } from "tailwindcss";

const config: Config = {
    theme: {
      extend: {
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-7px)' },
          },
          float2: {
            '0%, 100%': { transform: 'translateY(+2px)' },
            '50%': { transform: 'translateY(-5px)' },
          },
          shine: {
            '0%, 100%': { opacity: '1', transform: 'scale(1)' },
            '50%': { opacity: '0.5', transform: 'scale(1.01)' },
          },
        },
        animation: {
          float: 'float 4s ease-in-out infinite',
          float2: 'float2 3s ease-in-out infinite',
          floatarrow: 'float2 1.5s ease-in-out infinite',
          shine: 'shine 1.5s ease-in-out infinite',
        },
        colors: {
          blue: {
            500: '#0A9DFF',
            200: '#C2E7FF',
            50: '#F3F6FC', 
          },
          yellow: {
            500: '#FFD814',
            200: '#FEF08A',
            50: '#FEFCE8'
          },
          black: '',
          slate: {
            500: '#64748B',
            200:'#E2E8F0',
            50: '#F8FAFC'
          }
        },
      },
  },
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
  ],
};
export default config;
