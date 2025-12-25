"use client";

import { IQuestion, useNewYearStore } from "@/store";
import classNames from "classnames";
import React, { FC, useMemo } from "react";

type Props = {
    themeTitle: string;
    question: IQuestion;
};

const SvoyakCell: FC<Props> = (props) => {
    const { themeTitle, question } = props;

    const { readedQuestions, makeQuestionRead } = useNewYearStore();

    const isDisabled = useMemo(() => {
        return readedQuestions.includes(`${question.title + themeTitle}`);
    }, [readedQuestions, question, themeTitle]);

    return (
        <div
            onClick={() => {
                !isDisabled && makeQuestionRead({...question, title: `${question.title+themeTitle}`});
            }}
            className={classNames(
                "border border-gray-500 flex items-center justify-center transition-all duration-300 ease-in-out opacity-100 hover:opacity-70",
                { "cursor-pointer": !isDisabled, 'hover:bg-gray-200': !isDisabled }
            )}
        >
            {!isDisabled && question.title}
        </div>
    );
};

export default SvoyakCell;
