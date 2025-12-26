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
            <div className="relative w-[200px] h-[155px]">
                <Image
                    src={avatarUrl}
                    fill
                    alt="Picture"
                    className="object-cover object-top"
                />
            </div>
            <span className={textStyle}>{name}</span>

            <div className="border-2 border-solid text-center border-[#14183e] bg-[#05061f]">
                <span className={textStyle}>{sum}</span>
            </div>
        </div>
    );
};

export default MemberCard;
