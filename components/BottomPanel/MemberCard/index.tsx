import React, { FC } from "react";
import { memberCard } from "@/constants/styles";
import Image from "next/image";
import classNames from "classnames";

type Props = {
    name: string;
    avatarUrl: string;
    id: number;
    sum: number;
};

const textStyle = classNames(`text-3xl text-white text-center`, {
    ["text-[#2e68ff]"]: 2,
});

const MemberCard: FC<Props> = (props) => {
    const { name, avatarUrl, id, sum } = props;

    return (
        <div className={memberCard}>
            <Image alt={name} src={avatarUrl} height={140} />
            <span className={textStyle}></span>

            <div className="border-2 border-solid border-[#14183e] bg-[#05061f]">
                <span className={textStyle}>{sum}</span>
            </div>
        </div>
    );
};

export default MemberCard;
