import React, {ChangeEvent, memo} from 'react';
import {changeTaskStatus, changeTaskTitle, deleteTask, TaskType} from '../reducers/tasksReducer';
import {useDispatch} from 'react-redux';
import EditableSpan from './EditableSpan';

type TaskUIType = {
    task: TaskType
    todoId: string
}

const Task = memo(({task, todoId}: TaskUIType) => {
    console.log('Task rendering')
    const dispatch = useDispatch()
    const changeTaskTitleHandler = (newTitle: string) => {
        dispatch(changeTaskTitle(todoId, task.taskId, newTitle))
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatus(todoId, task.taskId, e.currentTarget.checked))
    }
    const deleteTaskHandler = () => {
        dispatch(deleteTask(todoId, task.taskId))
    }

    return (
        <div>
            <input type={'checkbox'} checked={task.isDone} onChange={changeTaskStatusHandler}/>
            <EditableSpan title={task.title} onChange={changeTaskTitleHandler}/>
            <button onClick={deleteTaskHandler}>x</button>
        </div>
    );
})

export default Task;