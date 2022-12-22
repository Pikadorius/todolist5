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
    AddTaskACType |
    ChangeTaskTitleACType |
    ChangeTaskStatusACType |
    DeleteTaskACType |
    ChangeTasksFilterACType

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
            const copy={...state}
            delete copy[action.payload.todoId]
            return {...copy}
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
        case 'CHANGE_TASK_TITLE': {
            return {...state, [action.payload.todoId]:{...state[action.payload.todoId], todoTasks: state[action.payload.todoId].todoTasks.map(t=>t.taskId===action.payload.taskId?{...t,title: action.payload.newTitle}:t)}}
        }
        case 'CHANGE_TASK_STATUS': {
            return {...state, [action.payload.todoId]:{...state[action.payload.todoId], todoTasks: state[action.payload.todoId].todoTasks.map(t=>t.taskId===action.payload.taskId?{...t,isDone: action.payload.isDone}:t)}}
        }
        case 'DELETE_TASK': {
            return {...state, [action.payload.todoId]:{...state[action.payload.todoId], todoTasks: state[action.payload.todoId].todoTasks.filter(t=>t.taskId!==action.payload.taskId)}}
        }
        case 'CHANGE_TASKS_FILTER': {
            return {...state, [action.payload.todoId]:{...state[action.payload.todoId], todoFilter:action.payload.filter}}
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

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitle>
export const changeTaskTitle= (todoId:string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todoId,
            taskId,
            newTitle
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatus>
export const changeTaskStatus= (todoId:string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todoId,
            taskId,
            isDone
        }
    } as const
}

type DeleteTaskACType = ReturnType<typeof deleteTask>
export const deleteTask = (todoId:string, taskId: string) => {
    return {
        type: 'DELETE_TASK',
        payload: {
            todoId,
            taskId
        }
    } as const
}


type ChangeTasksFilterACType = ReturnType<typeof changeTasksFilter>
export const changeTasksFilter= (todoId:string, filter: FilterType) => {
    return {
        type: 'CHANGE_TASKS_FILTER',
        payload: {
            todoId,
            filter
        }
    } as const
}
