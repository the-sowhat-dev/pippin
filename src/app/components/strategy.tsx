import React from "react";
import Image from "next/image";
import { mulish } from "../fonts";

interface StrategyProps {
  imagePath: string;
  title: string;
  text: string;
  secondText?: string;
  canva: "primary" | "secondary" | "dark";
  brand?: boolean;
  maximize?: boolean;
}

const Strategy: React.FC<StrategyProps> = ({
  imagePath,
  title,
  text,
  secondText,
  canva,
  brand,
  maximize,
}) => {
  const gradientBackgroundColor =
    canva === "primary"
      ? "bg-gradient-to-b from-yellow-400 to-yellow-300"
      : (canva === "dark" ? "bg-gradient-to-b from-gray-900 to-gray-700" : "bg-gradient-to-b from-yellow-100 to-yellow-50");
  const imageAlignment = canva === "primary" ? "sm:order-last" : "";

  return (
    <section
      className={`p-16 sm:p-24 min-h-[600px] ${gradientBackgroundColor}`}
    >
      <h1
        className={`${mulish.className} text-2xl sm:text-4xl text-center flex justify-center pb-12`}
      >
        {title}
        {brand && <span className="text-sm">®</span>}
      </h1>

      <div
        className={`flex flex-col justify-between sm:grid sm:grid-cols-2 gap-4`}
      >
        <div
          className={`flex items-center flex-col justify-center text-xl sm:text-2xl ${imageAlignment} text-center`}
        >
          <div>{text}</div>
          {secondText && (
            <>
              <br />
              <div>{secondText}</div>
            </>
          )}
        </div>

        {!maximize ? (
          <div className="flex items-center justify-center my-11">
            <Image
              src={imagePath}
              alt="Strategy Image"
              width={280}
              height={200}
              style={{ objectFit: "contain" }}
            />
          </div>
        ) : (
          <div className="sm:px-0 my-11 max-w-[500px] w-full">
            <Image
              src={imagePath}
              alt="Strategy Image"
              width={500}
              height={0}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Strategy;
