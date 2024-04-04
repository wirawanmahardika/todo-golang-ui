export type arrayOfTodo = Array<todo>;

export type actionType = {
    type: "add" | "delete" | "update" | "setFinish";
    payload?: {
        todos?: arrayOfTodo;
        todo?: todo;
    };
};

export function todoReducer(
    state: arrayOfTodo,
    action: actionType
): arrayOfTodo {
    switch (action.type) {
        case "setFinish":
            if (!action.payload?.todo) return state;
            const targetTodo = state.findIndex(
                (t) => t.id === action.payload?.todo?.id
            );
            state[targetTodo].finished = action.payload.todo.finished;
            return state;

        case "add":

        default:
            return state;
    }
}
