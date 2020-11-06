import {useState, FC, useEffect} from "react";
import Checkbox from "@material-ui/core/Checkbox";

import { IconButton } from "@material-ui/core";

import DeleteIcon from '@material-ui/icons/Delete';
import styles from './todo-item.module.scss';
import { updateCheckboxDocument } from "../../services/todo";

export interface TodoItemType {
  label: string,
  done?: boolean,
  id?: string
}

const TodoItem: FC<TodoItemType> = ({ label, children, done, id }) => {

  const [checked, setChecked] = useState(done);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    updateCheckboxDocument(id, e.target.checked)
    .then(() => {
      console.log('success');
    }).catch(err => console.log(err));
    
  };

  return (
    <div className="item">
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <label className={checked ? styles.todoDone : null}>{label}</label>
      {children}
    </div>
  );
}

export default TodoItem;
