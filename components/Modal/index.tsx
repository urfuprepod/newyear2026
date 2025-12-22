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
            <input className="py-[3px] px-[15px] text-xl border-3 border-solid border-[#ff7c1e]" />
        </div>
    );
};

export default Modal;
