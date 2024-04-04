import { useState } from "react";

export default function UpdateModal({
    visible,
    setVisibility,
    updateAction,
    defaultActivity,
}: {
    visible: boolean;
    setVisibility: () => void;
    updateAction: (text: string, setModalVisibility: () => void) => () => void;
    defaultActivity: string;
}) {
    const [input, setInput] = useState(defaultActivity);

    return (
        <>
            <div
                className={`fixed z-[99] inset-0 opacity-50 bg-gray-800 ${
                    !visible && "hidden"
                }`}
            ></div>
            <div
                className={`absolute z-[99] flex justify-center items-center border border-slate-800 shadow-md flex-col bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 rounded pt-2 pb-4 md:w-3/4 lg:w-1/2 ${
                    !visible && "hidden"
                }`}
            >
                <span className="mr-auto font-bold text-xl ml-2 md:text-3xl md:mr-auto md:ml-5 md:mt-5 lg:text-2xl ">
                    Update Tugas Kamu
                </span>
                <hr className="border-black border-t-2 w-full my-3 md:my-6" />
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-11/12 outline-none border border-slate-900 rounded-sm my-2 py-1 px-2 md:px-4 md:py-2 focus-within:border-2 md:text-xl lg:px-2 lg:py-1 lg:text-lg"
                />
                <div className="space-x-4 mt-2">
                    <button
                        onClick={updateAction(input, setVisibility)}
                        className="px-2 py-0.5 md:px-4 md:py-2 md:text-xl lg:px-2 lg:py-1 lg:text-lg bg-green-500 font-semibold rounded"
                    >
                        Ubah
                    </button>
                    <button
                        onClick={() => {
                            setVisibility();
                            setInput(defaultActivity);
                        }}
                        className="px-2 py-0.5 md:px-4 md:py-2 md:text-xl lg:px-2 lg:py-1 lg:text-lg bg-red-500 font-semibold rounded"
                    >
                        Batal
                    </button>
                </div>
            </div>
        </>
    );
}
