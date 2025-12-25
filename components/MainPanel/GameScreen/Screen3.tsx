import { IQuestion } from "@/store";
import React from "react";

const questionsConfig: { questions: IQuestion[]; header: string }[] = [
    {
        questions: [
            { title: "100", text: "Это то, о чем я думаю?", price: 100 },
        ],
        header: "Вопросы by Papich",
    },
    {
        questions: [
            { title: "100", text: "Сколько ты зарабатываешь", price: 100 },
        ],
        header: "Африка и Азия",
    },
    {
        questions: [
            { title: "100", text: "Сколько ты зарабатываешь", price: 100 },
        ],
        header: "Европа",
    },
    {
        questions: [
            { title: "100", text: "Сколько ты зарабатываешь", price: 100 },
        ],
        header: "Средневековье",
    },
    {
        questions: [
            { title: "100", text: "Сколько ты зарабатываешь", price: 100 },
        ],
        header: "Америка",
    },
];

const Screen3 = () => {
    return (
        <div
            className={`size-full grid grid-cols-1 grid-rows-${questionsConfig.length}`}
        >
            {questionsConfig.map((row, index) => (
                <div
                    style={{
                        gridTemplateColumns: `2fr repeat(${row.questions.length}, 1fr)`,
                    }}
                    className="grid"
                    key={index}
                >
                    <div className="border border border-gray-500 flex items-center justify-center">{row.header}</div>
                    {row.questions.map((el) => (
                        <div key={el.title}>{el.title}</div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Screen3;
