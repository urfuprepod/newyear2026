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
            className={classNames("fixed z-100 inset-0 bg-white", {
                flex: teams.length < MAX_TEAMS,
                hidden: teams.length === MAX_TEAMS,
            })}
        >
            <div className="items-center flex w-full h-full bg-blue-950 justify-center">
                <div className="flex gap-10 w-[50%] items-center flex-col">
                    <h2 className="text-center text-3xl text-white font-bold">
                        Команда {teams.length + 1}, введите название
                    </h2>

                    <input
                        onChange={(e) => setValue(e.target.value)}
                        className="py-[10px] px-[15px] w-full text-xl border-3 text-white bg-[#05061f] rounded-sm border-solid border-[#ff7c1e]"
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
        </div>
    );
};

export default Modal;
