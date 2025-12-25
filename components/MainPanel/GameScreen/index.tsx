"use client";

import { useNewYearStore } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Sidebar from "../Sidebar";
import QuestionPage from "../QuestionPage";

const screens = [Screen1, Screen2];

const GameScreen = () => {
    const { step, currentQuestion } = useNewYearStore();
    const [containerWidth, setContainerWidth] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            console.log(ref.current);
            console.log(ref.current?.clientWidth);
            setContainerWidth(ref.current.clientWidth);
        }
    }, []);

    return (
        <div className="grid grid-cols-[300px_1fr] basis-[65%]">
            <Sidebar />
            <div
                ref={ref}
                className="flex min-w-0 flex-col relative items-center justify-center bg-[#0a0e30] px-[10px] mx-[20px] w-[calc(100%-40px)] mt-[80px] rounded-md [&_*]:text-white [&_*]:font-bold"
            >
                {currentQuestion ? (
                    <QuestionPage />
                ) : screens[step] ? (
                    React.createElement(screens[step], {
                        parentWidth: containerWidth,
                    })
                ) : null}
            </div>
        </div>
    );
};

export default GameScreen;
