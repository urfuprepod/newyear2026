"use client";

import classNames from "classnames";
import { FC, useState } from "react";
import { buttonStyles } from "./constants";
import { useNewYearStore } from "@/store";

const MAX_TEAMS = 2;

const Modal: FC = (props) => {
    const { teams, createTeam } = useNewYearStore();

    const [value, setValue] = useState<string>("");

    return (
        <div
            className={classNames(
                "fixed z-100 inset-0 bg-black opacity-70 items-center justify-center",
                {
                    flex: teams.length < MAX_TEAMS,
                    hidden: teams.length === MAX_TEAMS,
                }
            )}
        >
            <div className="flex gap-10 items-center">
                <input
                    onChange={(e) => setValue(e.target.value)}
                    className="py-[3px] px-[15px] text-xl border-3 border-solid border-[#ff7c1e]"
                    placeholder="Введите название команды"
                    value={value}
                />
                <button
                    disabled={!value.length}
                    onClick={() => {
                        createTeam(value);
                        setValue("");
                    }}
                    className={buttonStyles}
                >
                    Добавить команду
                </button>
            </div>
        </div>
    );
};

export default Modal;
