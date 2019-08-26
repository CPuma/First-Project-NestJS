import { Task } from'../interfaces/task';
export interface TaskServiceInterface {
    getTask(): Task[];
    // getTask(): Task;
}