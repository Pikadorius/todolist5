import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {todolistsReducer} from '../reducers/todolistsReducer';
import {tasksReducer} from '../reducers/tasksReducer';


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
   reducer: rootReducer
})

// @ts-ignore
window.store=store;