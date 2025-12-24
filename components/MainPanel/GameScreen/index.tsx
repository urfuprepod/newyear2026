"use client";

import { useNewYearStore } from "@/store";
import React from "react";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Sidebar from "../Sidebar";

const screens = [Screen1, Screen2];

const GameScreen = () => {
    const { step } = useNewYearStore();

    return (
        <div className="grid grid-cols-[300px_1fr] basis-[65%]">
            <Sidebar />
            <div className="flex min-w-0 flex-col relative items-center justify-center bg-[#0a0e30] px-[10px] mx-[20px] w-[calc(100%-40px)] mt-[80px] rounded-md [&_*]:text-white [&_*]:font-medium">
                {/* <h1>{JSON.stringify(step) }</h1> */}
                {screens[step] ? React.createElement(screens[step]) : null}
            </div>
        </div>
    );
};

export default GameScreen;
