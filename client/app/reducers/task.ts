import { initialTaskState, TaskState } from '../states/task';
import { Actions } from '../actions/task.actions';
import * as TASK_ACTION from '../actions/task.actions';

export const task = (state = initialTaskState, action: Actions): TaskState => {
    switch (action.type) {
        case TASK_ACTION.ADD_TASK_ACTION:
            const newAddState = state;
            newAddState.tasks.push(action.payload);
            return { ...state, ...newAddState };
        
        case TASK_ACTION.DONE_ALL_TASK_ACTION:
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    task.status = true;
                    return task;
                }),
            };
        
        case TASK_ACTION.GET_TASK_LIST_ACTION:
            return { ...state, ...{ tasks: action.payload } };
        
        case TASK_ACTION.REMOVE_TASK_ACTION:
            return {
                ...state,
                ...{ tasks: state.tasks.filter((task) => (task.id !== action.payload.id)) },
            };
        
        case TASK_ACTION.CLEAR_ALL_TASK_ACTION:
            return {
                ...state,
                tasks: [],
            };
        
        case TASK_ACTION.UPDATE_TASK_ACTION:
            const newDoneState = state;
            const task = newDoneState.tasks.find((task) => task === action.payload);
            task.status = !task.status ;
            return {
                ...state,
                ...newDoneState,
            };
        
        default:
            return state;
    }
};
