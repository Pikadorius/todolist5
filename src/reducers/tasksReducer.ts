import {AddTodolistACType, DeleteTodolistACType} from './todolistsReducer';
import {v1} from 'uuid';

export type TaskType = {
    title: string
    taskId: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'

type ActionType =
    AddTodolistACType |
    DeleteTodolistACType |
    AddTaskACType

export type TaskForTodoType = {
    todoTasks: TaskType[]
    todoFilter: FilterType
}

export type InitialStateType = {
    [key: string]: TaskForTodoType
}
const initialState: InitialStateType = {}

export const tasksReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'ADD_TODOLIST': {
            return {...state, [action.payload.id]: {todoTasks: [], todoFilter: 'all'}}
        }
        case 'DELETE_TODOLIST': {
            delete state[action.payload.todoId]
            return {...state}
        }
        case 'ADD_TASK': {
            return {
                ...state,
                [action.payload.todoId]: {
                    ...state[action.payload.todoId],
                    todoTasks: [{
                        taskId: v1(),
                        title: action.payload.newTaskTitle,
                        isDone: false
                    }, ...state[action.payload.todoId].todoTasks]
                }
            }
        }
        default:
            return state;
    }
}

type AddTaskACType = ReturnType<typeof addTask>
export const addTask = (todoId: string, newTaskTitle: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todoId,
            newTaskTitle
        }
    } as const
}