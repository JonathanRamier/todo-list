import { Task } from 'app/models/task';

export interface TaskState {
    tasks: Task[];
    task: Task;
}

export const initialTaskState: TaskState = {
    tasks: null,
    task: null,
};
