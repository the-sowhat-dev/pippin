import React from "react";
import { mulish } from '../fonts';
import Example from './example';

interface StrategyWithChartProps {
  text: string;
  title: string;
}

const StrategyWithChart: React.FC<StrategyWithChartProps> = ({ text, title }) => {

  return (
    <section className={`flex flex-col p-16 sm:p-24 min-h-[600px] bg-gradient-to-b from-yellow-100 to-yellow-50`}>

      <h1 className={`flex-none ${mulish.className} text-2xl sm:text-4xl text-center flex justify-center pb-12`}>{title}</h1>

      <div className={`grow flex flex-col justify-between sm:grid sm:grid-cols-2 gap-4 bg-blue-400 place-items-center`}>
        <div className={`text-xl sm:text-2xl text-justify sm:text-center`}>{text}</div>

        <div className='grow flex flex-col text-center h-full w-full bg-red-500'>
          <div className='grow bg-pink-100'>
            <Example />
          </div>
          <p>91% des testeurs ont l'intention de l'utiliser</p>
        </div>

      </div>

    </section >
  );
}

export default StrategyWithChart;

