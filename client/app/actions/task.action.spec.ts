import * as Actions from './task.actions';
import { Task } from '../models/task';

describe('Task Actions', () => {
    
    it('should get Task List Action', () => {
        const action = new Actions.TaskListAction();
        expect(action.type).toBe('GET TASKS LIST');
    });
    
    it('should close all Task Action', () => {
        const action = new Actions.DoneAllTasks();
        expect(action.type).toContain('ALL TASKS DONE');
    });
    
    
    it('should clear all Tasks Action', () => {
        const action = new Actions.ClearAllTasks();
        expect(action.type).toContain('CLEAR ALL TASKS');
    });
    
    
    it('should add a Task Action', () => {
        const task = new Task();
        task.name = 'hello';
        task.status = false;
        const action = new Actions.AddTaskAction(task);
        expect(action.type).toBe('ADD TASK');
        expect(action.payload).toBe(task);
    });
    
    
    it('should remove a Task Action', () => {
        const task = new Task();
        task.name = 'hello';
        task.status = false;
        const action = new Actions.RemoveTaskAction(task);
        expect(action.type).toBe('REMOVE TASK');
        expect(action.payload).toBe(task);
    });
});
