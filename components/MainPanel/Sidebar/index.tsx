"use client";

import { useNewYearStore } from "@/store";
import Image from "next/image";
import { useMemo } from "react";

const Sidebar = () => {
    const { currentTeam, teams } = useNewYearStore();

    const message = useMemo(() => {
        if (currentTeam === null) return "";
        const actualTeamName = teams[currentTeam]?.name;
        if (!actualTeamName) return "";
        return `${actualTeamName}, ваш ответ...`;
    }, [currentTeam, teams]);

    return (
        <div className="flex flex-col gap-[10px] mx-[5px] justify-end">
            {message && (
                <div className="text-white bg-[#1634cf] p-[7px] rounded-3xl justify-center items-center">
                    <span className="text-3xl text-center">{message}</span>
                </div>
            )}

            <div className="flex flex-col rounded-lg bg-[rgba(22,26,57,0.3)] border border-solid border-[#222084]">
                <div className="px-[45px] pt-[15px]">
                    <Image
                        width={250}
                        height={160}
                        alt="avatar"
                        src="/lorem.png"
                    />
                </div>

                <span className="truncate pt-[5px] text-2xl font-bold text-center text-white">
                    Ведущий
                </span>
            </div>
        </div>
    );
};

export default Sidebar;
