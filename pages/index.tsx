import {useEffect, useState} from "react";
import Head from 'next/head'

import Navbar from "../components/navbar/navbar";

import {IconButton} from "@material-ui/core";
import { db }  from '../firebase/firebase.utils';

import Add from "@material-ui/icons/Add";
import styles from '../styles/home.module.scss';

import TodoItem from "../components/todo-item/todo-item";

const getData = async () => {
  const todosCollection = await db.collection('todos').get()
  return todosCollection.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })
}

const saveData = async () => {
  db.collection('todos')
};

export default function Home() {
  const [toggleAddTodo, setToggleAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState({ label: 'ok', done: false});
  const [todos, setTodos] = useState([])
  const ha = 1;

  useEffect(() => {
    getData().then(items => {
      setTodos([...items])
    })
  }, [newTodo])

  const handleToggleAddTodo = () => {
    setToggleAddTodo(() => !toggleAddTodo);
  }

  const handleNewTodo = () => {
    // setNewTodo()

  }

  return (
    <div>
      <Head>
        <title>My TO DO list</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Navbar/>
      <main className='container'>
        <div className={styles.todoHeader}>
          <h2>Add Todo</h2>
          <IconButton aria-label="add" onClick={handleToggleAddTodo}>
            <Add />
          </IconButton>
          {
            toggleAddTodo ?
            <form>
              <input type="text" onChange={e => console.log(e.target.value)} />
              <IconButton aria-label="add" onClick={handleNewTodo}>
                <Add />
              </IconButton>
            </form>
            :
            null
          }
        </div>

        <div className="todoList">
          {
            todos.map(item => <TodoItem key={item.id} label={item.label} /> )
          } {console.log(todos)}
        </div>
      </main>
    </div>
  );
}
