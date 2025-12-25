"use client";

import { IQuestion, useNewYearStore } from "@/store";
import { FC, useEffect, useMemo, useRef, useState } from "react";

const questions: IQuestion[] = [
    { text: "Бла бла бла бла бла", title: "Вопрос 1", price: 10000 },
    { text: "Что-то смешное", title: "Вопрос 2", price: 10000 },
    { text: "Критика", title: "Вопрос 3", price: 10000 },
];
type Props = {
    parentWidth: number;
};

const Screen2: FC<Props> = ({ parentWidth }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [spinning, setSpinning] = useState(false);

    const parentWidthWithoutPadding = parentWidth - 15;

    const { makeQuestionRead, readedQuestions } = useNewYearStore();
    const freeQuestions = useMemo(() => {
        return questions.filter(
            ({ title }) => !readedQuestions.includes(title)
        );
    }, [readedQuestions]);
    const [isPlaying, setIsPlaying] = useState<boolean>(
        !!readedQuestions.length
    );

    // делаем длинную ленту
    const extendedItems: IQuestion[] = Array(30).fill(freeQuestions).flat();

    const spin = () => {
        if (!trackRef.current || spinning) return;

        setSpinning(true);

        // сколько элементов пролетим ДО выигрыша
        const baseScroll = 10 + Math.floor(Math.random() * 6); // 10–15

        const winner = 4 + baseScroll;

        const track = trackRef.current;

        track.style.transition =
            "transform 5s cubic-bezier(0.15, 0.85, 0.35, 1)";
        track.style.transform = `translateX(-${
            (parentWidthWithoutPadding / 10) * (baseScroll - 0.5)
        }px)`;

        setTimeout(() => {
            // фиксируем победителя
            makeQuestionRead(questions[winner % questions.length]);
            console.log(questions[winner % questions.length]);
            setSpinning(false);
        }, 5000);
    };

    useEffect(() => {
        if (!isPlaying) return;
        if (freeQuestions.length > 1) {
            spin();
        } else {
            setTimeout(() => {
                makeQuestionRead(freeQuestions[0]);
            }, 1000);
        }
    }, [parentWidth, isPlaying]);

    if (parentWidth === 0) return null;
    return (
        <div className="w-full">
            {!isPlaying ? (
                <h2
                    onClick={() => setIsPlaying(true)}
                    className="text-3xl cursor-pointer text-center"
                >
                    Раунд 1 <br /> ЧТО? ГДЕ? КОГДА?
                </h2>
            ) : (
                <>
                    <div
                        ref={containerRef}
                        style={{
                            overflow: "hidden",
                            border: "2px solid #333",
                            position: "relative",
                        }}
                    >
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
                                gap: 8,
                            }}
                        >
                            {extendedItems.map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        flex: `0 0 ${
                                            (parentWidth - 15) / 10 - 8
                                        }px`,
                                        aspectRatio: "3 / 2",
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
                </>
            )}
        </div>
    );
};

export default Screen2;
