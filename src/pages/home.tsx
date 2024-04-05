import { useLoaderData, useNavigate } from "react-router-dom";
import Task from "../components/Task";
import { useEffect, useReducer } from "react";
import { arrayOfTodo, todoReducer } from "../reducer/todo-reducer";
import { myAxios } from "../helper/axiosInstance";
import Navbar from "../components/Navbar";

export default function Home() {
    const navigate = useNavigate();
    const loadedTodos = useLoaderData() as arrayOfTodo;
    const [todos, dispatch] = useReducer(todoReducer, loadedTodos);

    useEffect(() => {
        myAxios.get("/api/v1/user/info").catch(() => {
            navigate("/login");
        });
    }, []);

    const addTodo = async (e: any) => {
        e.preventDefault();
        const res = await myAxios.post("/api/v1/todo", {
            activity: e.target.activity.value,
        });

        if (res.status < 300) {
            dispatch({ type: "add", payload: res.data.data });
            alert(res.data.message);
            e.target.activity.value = "";
        }
    };

    const displayTodos = todos.map((t: todo, i: number) => {
        return (
            <Task
                key={t.id}
                taskId={t.id}
                content={t.activity}
                finished={t.finished}
                dispatch={dispatch}
                position={
                    i === 0 ? "first" : i === todos.length - 1 ? "last" : "mid"
                }
            />
        );
    });

    return (
        <>
            <div className="w-full justify-center items-center flex flex-col gap-y-3 bg-blue-500 p-5 text-white">
                <h1 className="font-bold text-2xl ">Todolist APP with BUN</h1>
                <Navbar />
            </div>
            <form onSubmit={addTodo} className="mt-5 lg:w-4/5 mx-auto">
                <input
                    type="text"
                    placeholder="Tulis tugas anda disini..."
                    name="activity"
                    className="w-full p-2 md:p-4 outline-none border-2 border-blue-400 md:text-xl"
                />
            </form>

            <div className="flex flex-col mt-5  lg:w-4/5 mx-auto">
                <h2 className="font-bold text-xl text-center mb-3 md:text-3xl">
                    Tugas-Tugas Anda
                </h2>

                {displayTodos}
            </div>
        </>
    );
}

export const homeLoader = async () => {
    try {
        const res = await myAxios.get("/api/v1/todo");
        return res.data;
    } catch (error) {
        return [];
    }
};
