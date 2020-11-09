import {useEffect, useState} from "react";
import Head from 'next/head'

import Navbar from "../components/navbar/navbar";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import styles from '../styles/home.module.scss';
import uStyles from '../styles/utils.module.scss';
import TodoItem from "../components/todo-item/todo-item";

import {IconButton, Button} from "@material-ui/core";
import { getData, saveData, deleteTodo } from '../services/todo';

export default function Home() {
  const [toggleAddTodo, setToggleAddTodo] = useState(false);
  const [changeTodo, setChangeTodo] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    getData().then(items => {
      setTodos([...items])
    })
  }, [changeTodo])

  const handleToggleAddTodo = () => {
    setToggleAddTodo(() => !toggleAddTodo);
  }

  const handleNewTodo = (e: any) => {
    e.preventDefault();
    if (!todo) {
      setIsEmpty(true);
      return;
    }
    saveData('todos', todo, false)
    .then(() => {
      setChangeTodo(() => !changeTodo);
      setIsEmpty(false);
      setTodo('');
    }).catch(() => {
      alert('Something went wrong, please try again');
    })
  } 

  const handleDeleteTodo = (id: string) => {
    const confirmDelete = confirm('Are you sure you want delete this Todo?');
    if (confirmDelete === false) {
      return;
    }
    deleteTodo('todos', id)
    .then(() => {
      setChangeTodo(() => !changeTodo)
    }).catch(err => {
      alert('Something went wrong, please try again');
    })
  }

  return (
    <div>
      <Head>
        <title>My TO DO list</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Navbar/>
      <main className={`${uStyles.container} ${styles.container}`}>
        <div className={styles.todoHeader}>
          <h2>Add new task</h2>
          <IconButton aria-label="add" onClick={handleToggleAddTodo}>
            <Add /> 
          </IconButton>
          {
            toggleAddTodo ?
            <form onSubmit={handleNewTodo}>
              <input type="text" name='todo' value={todo} onChange={e => setTodo(e.target.value)} />
              <Button type='submit' aria-label="add">
                Add 
              </Button>
              { isEmpty ? <div style={{color: 'red'}}>Add todo</div> : null }
            </form>
            :
            null
          }
        </div>

        <div className="todoList">
          {
            todos.map(item => 
            <TodoItem 
              key={item.id} 
              id={item.id} 
              label={item.label} 
              done={item.done}
              >
              <IconButton aria-label="delete" onClick={() => handleDeleteTodo(item.id)}>
                <Delete style={{color: 'blue'}} />
              </IconButton>
            </TodoItem> 
            )}
        </div>
      </main>
    </div>
  );
}
