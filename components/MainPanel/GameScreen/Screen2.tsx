"use client";

import { IQuestion, useNewYearStore } from "@/store";
import { useEffect, useMemo, useRef, useState } from "react";

const questions: IQuestion[] = [
    { text: "Бла бла бла бла бла", title: "Вопрос 1", price: 10000 },
    { text: "Бла бла бла бла бла", title: "Вопрос 2", price: 10000 },
];

const Screen2 = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [spinning, setSpinning] = useState(false);

    const { makeQuestionRead, readedQuestions } = useNewYearStore();
    const freeQuestions = useMemo(() => {
        return questions.filter(
            ({ title }) => !readedQuestions.includes(title)
        );
    }, [readedQuestions]);

    // делаем длинную ленту
    const extendedItems: IQuestion[] = Array(30).fill(freeQuestions).flat();

    const spin = () => {
        if (!trackRef.current || spinning) return;

        setSpinning(true);

        // 🎯 логический победитель
        const winIndex = Math.floor(Math.random() * freeQuestions.length);

        // сколько элементов пролетим ДО выигрыша
        const baseScroll = 10 + Math.floor(Math.random() * 6); // 10–15

        const totalScrollItems = baseScroll + winIndex;
        const distance = totalScrollItems * 128;

        const track = trackRef.current;

        track.style.transition =
            "transform 5s cubic-bezier(0.15, 0.85, 0.35, 1)";
        track.style.transform = `translateX(-${distance}px)`;

        setTimeout(() => {
            // фиксируем победителя
            makeQuestionRead(questions[winIndex]);
            console.log(questions[winIndex])
            setSpinning(false);
        }, 5000);
    };

    useEffect(() => {
        // if (freeQuestions.length > 1) {
        //     spin();
        // } else {
        //     setTimeout(() => {
        //         makeQuestionRead(freeQuestions[0]);
        //     }, 1000);
        // }
    }, [freeQuestions]);

    return (
        <div className="w-full">
            {/* контейнер */}
            <div
                ref={containerRef}
                style={{
                    overflow: "hidden",
                    border: "2px solid #333",
                    position: "relative",
                    height: 100,
                }}
            >
                {/* маркер */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: "50%",
                        width: 2,
                        background: "red",
                        zIndex: 2,
                    }}
                />

                {/* лента */}
                <div
                    ref={trackRef}
                    style={{
                        display: "flex",
                        height: "100%",
                        alignItems: "center",
                        willChange: "transform",
                    }}
                >
                    {extendedItems.map((item, i) => (
                        <div
                            key={i}
                            style={{
                                minWidth: 120,
                                height: 80,
                                margin: "0 4px",
                                background: "#222",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                borderRadius: 6,
                            }}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Screen2;
