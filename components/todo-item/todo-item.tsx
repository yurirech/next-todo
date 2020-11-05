import {useState, FC} from "react";
import Checkbox from "@material-ui/core/Checkbox";

import { TodoItemType } from "../../lib/items-list";

import { IconButton } from "@material-ui/core";

import DeleteIcon from '@material-ui/icons/Delete';
import styles from './todo-item.module.scss';


const TodoItem: FC<TodoItemType> = ({ label }) => {

  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="item">
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <label className={checked ? styles.todoDone : null}>{label}</label>
      <IconButton aria-label="delete">
        <DeleteIcon style={{color: 'blue'}} />
      </IconButton>
    </div>
  );
}

export default TodoItem;
