import React, {memo, useCallback, useMemo} from 'react';
import s from './Todolist.module.css'
import {changeTodoTitle, deleteTodolist, TodolistType} from '../../reducers/todolistsReducer';
import EditableSpan from '../EditableSpan';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {addTask, changeTasksFilter, FilterType, TaskForTodoType} from '../../reducers/tasksReducer';
import AddItemForm from '../AddItemForm';
import Task from '../Task';

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
    }, [todolist.todoId])

    const deleteTodolistHandler = () => {
        dispatch(deleteTodolist(todolist.todoId))
    }

    const changeFilterHandler = (filter: FilterType) => () => dispatch(changeTasksFilter(todolist.todoId, filter))

    const filteredTasks = useMemo(() => {
        if (tasks.todoFilter === 'active') {
            return tasks.todoTasks.filter(t => !t.isDone)
        } else if (tasks.todoFilter === 'completed') {
            return tasks.todoTasks.filter(t => t.isDone)
        } else return tasks.todoTasks;
    }, [tasks])

    return (
        <div className={s.wrapper}>
            <EditableSpan title={todolist.title} onChange={changeTodoTitleHandler}/>
            <button onClick={deleteTodolistHandler}>Delete todolist</button>
            <AddItemForm addItem={addTaskHandler}/>
            {
                filteredTasks.map(t => {
                    return <Task key={t.taskId} task={t} todoId={todolist.todoId}/>
                })
            }
            <div>
                <button onClick={changeFilterHandler('all')}>All</button>
                <button onClick={changeFilterHandler('active')}>Active</button>
                <button onClick={changeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    );
})

export default Todolist;