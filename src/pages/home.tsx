import { Form, useLoaderData } from "react-router-dom";
import Task from "../components/Task";
import DeleteModal from "../components/DeleteModal";
import { useReducer, useState } from "react";
import { arrayOfTodo, todoReducer } from "../reducer/todo-reducer";

export default function Home() {
    const loadedTodos = useLoaderData() as arrayOfTodo;
    const [todos, dispatch] = useReducer(todoReducer, loadedTodos);
    const [input, setInput] = useState("");

    console.log(todos);

    // const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    // };

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
            <div className="w-full justify-center items-center flex bg-blue-500 p-5 text-white">
                <h1 className="font-bold text-2xl ">Todolist APP with BUN</h1>
            </div>
            <Form className="mt-5 lg:w-4/5 mx-auto">
                <input
                    type="text"
                    placeholder="Tulis tugas anda disini..."
                    className="w-full p-2 md:p-4 outline-none border-2 border-blue-400 md:text-xl"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </Form>

            <div className="flex flex-col mt-5  lg:w-4/5 mx-auto">
                <h2 className="font-bold text-xl text-center mb-3 md:text-3xl">
                    Tugas-Tugas Anda
                </h2>

                {displayTodos}
                {/* <Task content="Makan Pisang Ijo" position="first" />
                <Task content="Makan Pisang Ijo" position="mid" />
                <Task content="Makan Pisang Ijo" position="last" /> */}
            </div>

            <DeleteModal />
        </>
    );
}

export const homeLoader = () => {
    const mockTodos = [
        { id: 1, id_user: 21, activity: "activity 1", finished: false },
        { id: 2, id_user: 31, activity: "activity 2", finished: true },
        { id: 4, id_user: 35, activity: "activity 4", finished: false },
        { id: 3, id_user: 41, activity: "activity 3", finished: true },
    ];

    return mockTodos;
};
