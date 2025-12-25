"use client";

import { useNewYearStore } from "@/store";
import React from "react";

const QuestionPage = () => {
    const { currentQuestion, changeTeamOrCloseQuestion, addPointsToTeam } =
        useNewYearStore();

    if (!currentQuestion) return null;
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-5xl text-center">{currentQuestion.text}</h2>
            <div className="flex gap-3 [&_*]:flex-1 items-center">
                <button onClick={addPointsToTeam} className="bg-green">
                    Да
                </button>
                <button onClick={changeTeamOrCloseQuestion} className="bg-red">
                    Нет
                </button>
            </div>
        </div>
    );
};

export default QuestionPage;
