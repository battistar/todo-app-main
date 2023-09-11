import { ReactComponent as IconCross } from 'assets/images/icon-cross.svg';
import './TodoItem.css';

type TodoItemProps = {
  children: string;
  toggle?: () => void;
  remove?: () => void;
  completed?: boolean;
};

const TodoItem = ({ children, toggle, remove, completed }: TodoItemProps): JSX.Element => {
  const handleCheckboxClick = (): void => {
    if (toggle) {
      toggle();
    }
  };

  const handleRemoveClick = (): void => {
    if (remove) {
      remove();
    }
  };

  return (
    <div className="todo-item">
      <input type="checkbox" className="todo-item__checkbox" onClick={handleCheckboxClick} checked={completed} />
      <p className={`todo-item__text ${completed && 'completed'}`}>{children}</p>
      <button className="todo-item__remove-button" onClick={handleRemoveClick}>
        <IconCross className="todo-item__remove-button__icon" />
      </button>
    </div>
  );
};

export default TodoItem;
