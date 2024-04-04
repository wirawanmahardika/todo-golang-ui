export type arrayOfTodo = Array<todo>;

export type actionType = {
    type: "add" | "delete" | "update" | "setFinish";
    payload?: todo;
};

export function todoReducer(
    state: arrayOfTodo,
    action: actionType
): arrayOfTodo {
    switch (action.type) {
        case "setFinish":
            if (!action.payload) return state;
            const targetTodo = state.findIndex(
                (t) => t.id === action.payload?.id
            );
            state[targetTodo].finished = action.payload.finished;
            return state;

        case "add":
            if (action.payload) return [...state, action.payload];
            return state;

        case "delete":
            if (action.payload) {
                return state.filter((t) => t.id !== action.payload?.id);
            }
            return state;

        case "update":
            if (action.payload) {
                const targetIndex = state.findIndex(
                    (t) => t.id === action.payload?.id
                );
                state[targetIndex].activity = action.payload.activity;
                return state;
            }
            return state;
        default:
            return state;
    }
}
