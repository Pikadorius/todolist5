import React, {useCallback} from 'react';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './redux/store';
import {addTodolist, TodolistType} from './reducers/todolistsReducer';
import AddItemForm from './components/AddItemForm';
import Todolist from './components/Todolist/Todolist';

function App() {
  console.log('App rendering')

  const todolists=useSelector<RootStateType, TodolistType[]>(state=>state.todolists)
  const dispatch = useDispatch()

  const addTodo = useCallback((newTodoTitle: string) => {
    dispatch(addTodolist(newTodoTitle))
  },[])

  return (
    <div className="App">
      <AddItemForm addItem={addTodo}/>
      {
        todolists.map(t=> {
          return <Todolist key={t.todoId} todolist={t}/>
        })
      }
    </div>
  );
}

export default App;
