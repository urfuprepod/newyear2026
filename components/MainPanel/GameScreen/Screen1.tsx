"use client";

import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useNewYearStore } from "@/store";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const screens = [
    <h1>Приветствуем на зимней серии игр Исторического факультета УрФУ</h1>,
    <h1>Игра представлена кафедрой новой и ебейшей истории</h1>,
    <Image
        src={"/kafedra.png"}
        alt="Описание"
        fill
        sizes="100%"
        className="object-contain"
    />,
];

const Screen1 = () => {
    const { setStep } = useNewYearStore();
    const [currentStep, setCurrentStep] = useState<number>(0);
    const timer = useRef<NodeJS.Timeout | null>(null);
    const { togglePlay, stop } = useAudioPlayer("/opening.mp3");

    useEffect(() => {
        timer.current = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev === screens.length - 1) {
                    setStep();
                    return prev;
                }
                return prev + 1;
            });
        }, 10000);

        return () => {
            timer.current && clearTimeout(timer.current);
            stop();
        };
    }, []);

    return (
        <div className="flex-1 relative w-full">
            {screens[currentStep]}
        </div>
    );
};

export default Screen1;
