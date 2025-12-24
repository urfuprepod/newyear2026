import { create } from "zustand";
import useGameStore from "./teams";

export interface ITeam {
    name: string;
    points: number;
}

export interface IQuestion {
    text: string;
    title: string;
    price: number;
}

export type GameStore = {
    currentTeam: number | null;
    teams: ITeam[];
    currentQuestion: null | IQuestion;
    createTeam: (name: string) => void;
    makeQuestionRead: (question?: IQuestion) => void;
    variant: "start" | "end";
    step: number;
    setStep: () => void;
};

// export type StepStore = {
//     step: number;
//     setStep: () => void;
// };

export const useNewYearStore = create<GameStore>((...a) => ({
    ...useGameStore(...a),
    // ...useStepStore(...a),
}));
