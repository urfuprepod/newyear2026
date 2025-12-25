"use client";

import { useNewYearStore } from "@/store";
import MemberCard from "../MemberCard";

export const members = [{}];

const BottomPanel = () => {
    const { teams } = useNewYearStore();

    return (
        <ul className="flex basis-[35%] p-0 m-0 list-none items-end pb-8 justify-center gap-20">
            {teams.map((el, index) => (
                <MemberCard
                    name={el.name}
                    key={index}
                    id={index}
                    sum={el.points}
                    avatarUrl="/avatar.jpg"
                />
            ))}
        </ul>
    );
};

export default BottomPanel;
