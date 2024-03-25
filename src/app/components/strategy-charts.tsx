import React from "react";
import { mulish } from "../fonts";

interface StrategyChartsProps {
  smallImagePath: string,
  largeImagePath: string,
  title: string;
  canva: "primary" | "secondary" | "dark";
}

const StrategyCharts: React.FC<StrategyChartsProps> = ({
  smallImagePath,
  largeImagePath,
  title,
  canva,
}) => {
  const gradientBackgroundColor =
    canva === "primary"
      ? "bg-gradient-to-b from-yellow-400 to-yellow-300"
      : (canva === "dark" ? "bg-gradient-to-b from-gray-900 to-gray-700" : "bg-gradient-to-b from-yellow-100 to-yellow-50");

  return (
    <section
      className={`p-16 sm:p-24 min-h-[600px] ${gradientBackgroundColor}`}
    >
      <h1
        className={`${mulish.className} text-2xl sm:text-4xl text-center flex justify-center pb-12 lg:pb-24 text-white`}
      >
        {title}
      </h1>


      <div className='w-full flex justify-center'>
        <picture className='max-w-[1000px]'>
          <source media="(min-width: 640px)" srcSet={largeImagePath} />
          <img src={smallImagePath} alt="My Image" />
        </picture>
      </div>

    </section>
  );
};

export default StrategyCharts;
