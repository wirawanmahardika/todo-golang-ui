import { useState } from "react";
import { actionType } from "../reducer/todo-reducer";

export default function Task({
    taskId,
    content,
    position,
    finished,
    dispatch,
}: {
    taskId: number;
    content: string;
    position: "last" | "mid" | "first";
    finished: boolean;
    dispatch?: React.Dispatch<actionType>;
}) {
    const [checked, setChecked] = useState(finished);
    const additionalClass =
        position === "first"
            ? "border-y-2 rounded-t"
            : position === "last"
            ? "border-b-2 rounded-b"
            : "border-b-2";

    return (
        <>
            <div
                className={
                    "border-black p-2 flex gap-x-3 items-center md:p-4 border-x-2 " +
                    additionalClass
                }
            >
                <input
                    type="checkbox"
                    className="size-5"
                    checked={checked}
                    onChange={() => {
                        if (dispatch) {
                            setChecked(!checked);
                            dispatch({
                                type: "setFinish",
                                payload: {
                                    todo: {
                                        id: taskId,
                                        activity: "",
                                        id_user: 0,
                                        finished: !checked,
                                    },
                                },
                            });
                        }
                    }}
                />
                <span className={`md:text-xl ${checked && "line-through"}`}>
                    {content}
                </span>
                <TrashSvg />
                <UpdateSvg />
            </div>
        </>
    );
}

function TrashSvg() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 md:size-7 ml-auto hover:fill-red-500"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
        </svg>
    );
}

function UpdateSvg() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 md:size-7 hover:fill-green-500"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
        </svg>
    );
}
