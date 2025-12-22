import Image from "next/image";
import React from "react";

const Sidebar = () => {
    return (
        <div className="flex-[0_0_370px] flex flex-col gap-[10px] mx-[5px] justify-end">
            <div className="text-white bg-[#1634cf] p-[7px] rounded-3xl justify-center items-center">
                <span className="text-3xl">Труфаций</span>
            </div>

            <div className="flex flex-col rounded-lg bg-[#76788b] border border-solid border-[#222084]">
                <div className="px-[45px]">
                    <Image
                        width={250}
                        height={160}
                        alt="avatar"
                        src="/avatar.jpg"
                    />
                </div>

                <span className="truncate pt-[5px] text-xl text-white">
                    Ведущий
                </span>
            </div>
        </div>
    );
};

export default Sidebar;
