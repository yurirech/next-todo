import {useState, FC, useEffect} from "react";
import Checkbox from "@material-ui/core/Checkbox";

import styles from './todo-item.module.scss';
import Edit from "@material-ui/icons/Edit";

import { updateCheckboxDocument, updateTodo } from "../../services/todo";
import { IconButton, Button } from "@material-ui/core";


export interface TodoItemType {
  label: string,
  done?: boolean,
  id?: string
}

const TodoItem: FC<TodoItemType> = ({ label, children, done, id }) => {

  const [checked, setChecked] = useState(done);
  const [editTodo, setEditTodo] = useState(label);
  const [toggleEditTodo, setToggleEditTodo] = useState(false);
  const [todoLabel, setTodoLabel] = useState(label);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    updateCheckboxDocument(id, e.target.checked)
    .then(() => {
      console.log('success');
    }).catch(err => console.log(err));
    
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log( e.target.editTodo.value);
    updateTodo(id, e.target.editTodo.value)
    .then(() => {
      setTodoLabel(editTodo);
    }).catch(err => console.log(err));
  }

  return (
    <div className="item">
      <Checkbox
        checked={checked}
        onChange={handleCheckboxChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <label className={checked ? styles.todoDone : null}>{todoLabel}</label>
     { 
        !toggleEditTodo ? 
        null
        :
        <form onSubmit={handleSubmit}>
          <input type='text' 
                name='editTodo' 
                value={editTodo} 
                onChange={e => setEditTodo(e.target.value)} 
                />
                <Button type='submit' >Send</Button>
        </form>
        }
      <IconButton aria-label="delete" onClick={() => setToggleEditTodo(() => !toggleEditTodo)}>
        <Edit style={{color: 'blue'}} />
      </IconButton>
      {children}
    </div>
  );
}

export default TodoItem;
