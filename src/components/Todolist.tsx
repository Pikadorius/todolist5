import React, {memo, useCallback} from 'react';
import {changeTodoTitle, TodolistType} from '../reducers/todolistsReducer';
import EditableSpan from './EditableSpan';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../redux/store';
import {addTask, TaskForTodoType} from '../reducers/tasksReducer';
import AddItemForm from './AddItemForm';

type TodolistUIType = {
    todolist: TodolistType
}

const Todolist = memo(({todolist}: TodolistUIType) => {
    console.log('Todolist rendering')
    const dispatch = useDispatch()
    const tasks = useSelector<RootStateType, TaskForTodoType>(state => state.tasks[todolist.todoId])

    const changeTodoTitleHandler = useCallback((newTitle: string) => dispatch(changeTodoTitle(todolist.todoId, newTitle)), [todolist.todoId])

    const addTaskHandler = useCallback((newTaskTitle: string) => {
        dispatch(addTask(todolist.todoId, newTaskTitle))
    },[todolist.todoId])


    return (
        <div>
            <EditableSpan title={todolist.title} onChange={changeTodoTitleHandler}/>
            <AddItemForm addItem={addTaskHandler}/>
            {tasks.todoTasks.map(t=><div key={t.taskId}>{t.title}</div>)}
        </div>
    );
})

export default Todolist;