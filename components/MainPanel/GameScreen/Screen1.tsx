"use client";

import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useNewYearStore } from "@/store";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const screens = [
    <h1 className="text-5xl text-center">Приветствуем на зимней серии игр Исторического факультета УрФУ</h1>,
    <h1 className="text-5xl text-center">Игра представлена кафедрой новой и ебейшей истории</h1>,
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
    const { stop } = useAudioPlayer("/opening.mp3");

    useEffect(() => {
        if (currentStep === screens.length) {
            timer.current && clearTimeout(timer.current);
            stop();
            setStep();
        }
    }, [currentStep]);

    useEffect(() => {
        timer.current = setInterval(() => {
            setCurrentStep((prev) => {
                return prev + 1;
            });
        }, 1000);

        return () => {
            timer.current && clearTimeout(timer.current);
        };
    }, []);

    return <>{screens?.[currentStep] ?? null}</>;
};

export default Screen1;
