import { StateCreator } from "zustand";
import { GameStore, IQuestion } from ".";

const MAX_TEAMS = 2;

const useGameStore: StateCreator<GameStore, [], [], GameStore> = (set) => ({
    teams: [],
    currentQuestion: null,
    currentTeam: null,
    variant: "start",
    createTeam: (name) => {
        set((state) => {
            return {
                step: state.teams.length >= MAX_TEAMS - 1 ? 0 : state.step,
                teams: state.teams.concat({ name, points: 0 }),
            };
        });
    },
    addPointsToTeam: (id: number, points: number) => {
        set((state) => {
            const clone = structuredClone(state.teams);
            const team = clone.find((_, index) => index === id);
            if (!team) return {};
            team.points += points;
            return { teams: clone };
        });
    },
    changeTeamOrCloseQuestion: () => {
        set((state) => {
            if (state.variant === "start") {
                if (state.currentTeam === MAX_TEAMS - 1) {
                    return {
                        variant: "end",
                        currentQuestion: null,
                        currentTeam: null,
                    };
                }
                return { currentTeam: (state.currentTeam ?? 0) + 1 };
            }
            if (state.currentTeam === 0) {
                return {
                    variant: "start",
                    currentQuestion: null,
                    currentTeam: null,
                };
            }
            return { currentTeam: (state.currentTeam ?? 0) - 1 };
        });
    },
    makeQuestionRead: (question?: IQuestion) => {
        set((state) => ({
            currentQuestion: question ?? null,
            currentTeam: state.variant === "start" ? 0 : 1,
        }));
    },
    step: -1,
    setStep: () => {
        set((state) => ({
            step: state.step + 1,
        }));
    },
});

export default useGameStore;
