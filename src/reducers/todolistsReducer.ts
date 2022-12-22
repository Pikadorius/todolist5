import {retry} from '@reduxjs/toolkit/query';
import {v1} from 'uuid';
import {configureStore} from '@reduxjs/toolkit';

export type TodolistType = {
    title: string
    todoId: string
}
type ActionType =
    AddTodolistACType |
    DeleteTodolistACType |
    ChangeTodoTitleACType

export type InitialStateType = TodolistType[]
const initialState: InitialStateType = []

export const todolistsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'ADD_TODOLIST': {
            return [{todoId: action.payload.id, title: action.payload.newTitle}, ...state]
        }
        case 'DELETE_TODOLIST': {
            return state.filter(t => t.todoId !== action.payload.todoId)
        }
        case 'CHANGE_TODO_TITLE':
            return state.map(t=>t.todoId===action.payload.todoId? {...t, title:action.payload.newTitle}:t)
        default:
            return state;
    }
}

export type AddTodolistACType = ReturnType<typeof addTodolist>
export const addTodolist = (newTitle: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            newTitle,
            id: v1()
        }
    } as const
}

export type DeleteTodolistACType = ReturnType<typeof deleteTodolist>
export const deleteTodolist = (todoId: string) => {
    return {
        type: 'DELETE_TODOLIST',
        payload: {
            todoId
        }
    } as const
}

type ChangeTodoTitleACType = ReturnType<typeof changeTodoTitle>
export const changeTodoTitle = (todoId: string, newTitle: string) => {
    return {
        type: 'CHANGE_TODO_TITLE',
        payload: {
            todoId,
            newTitle
        }
    } as const
}
