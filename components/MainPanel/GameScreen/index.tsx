"use client";

import { useNewYearStore } from "@/store";
import React from "react";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";

const screens = [Screen1, Screen2];

const GameScreen = () => {
    const { step } = useNewYearStore();

    return (
        <div className="flex flex-col flex-1 ">
            <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0e30] mx-[20px] w-[calc(100%-40px)] mt-[80px] rounded-md [&_*]:text-white [&_*]:font-medium">
                {screens[step] ? React.createElement(screens[step]) : null}
            </div>
        </div>
    );
};

export default GameScreen;
