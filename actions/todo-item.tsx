import { IS_CHECKED } from '../constants/todo-item';

export const isChecked = (done: boolean) => ({
  type: IS_CHECKED,
  payload: done
});