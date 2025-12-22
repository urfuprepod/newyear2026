import classNames from "classnames";
import React, { FC } from "react";

type Props = {
    isOpen: boolean;
};

const Modal: FC<Props> = (props) => {
    const { isOpen } = props;

    return (
        <div
            className={classNames(
                "fixed z-100 inset-0 bg-black opacity-70 hidden items-center justify-center",
                { flex: isOpen }
            )}
        >
            <div className="flex gap-10 items-center">
                <input
                    className="py-[3px] px-[15px] text-xl border-3 border-solid border-[#ff7c1e]"
                    placeholder="Введите название команды"
                />
                <button className="p-6 rounded-sm bg-[linear-gradient(360deg, #b87566 0%, #ffb179 100%)] hover:bg-[linear-gradient(360deg, #b87566 0%, #ffb179 100%)]"></button>
            </div>
        </div>
    );
};

export default Modal;
