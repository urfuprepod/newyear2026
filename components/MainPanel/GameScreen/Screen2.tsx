'use client'

import { IQuestion, useNewYearStore } from "@/store";
import React, { useState } from "react";

const chgkQuestions: IQuestion[] = [
    { title: "Вопрос 1", text: "Бла бла бла бла бла бла бла бла", price: 300 },
];

const Screen2 = () => {
    
    const {currentQuestion, createTeam, makeQuestionRead} = useNewYearStore();

    const [questionsAnswered, setQuestionAnswered] = useState<number>(0);
    
    return <div></div>;
};

export default Screen2;
