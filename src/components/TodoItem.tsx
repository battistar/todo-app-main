import { ReactComponent as IconCross } from 'assets/images/icon-cross.svg';
import './TodoItem.css';

type TodoItemProps = {
  children: string;
  onToggle?: () => void;
  onRemove?: () => void;
  completed?: boolean;
};

const TodoItem = ({ children, onToggle, onRemove, completed }: TodoItemProps): JSX.Element => {
  const handleCheckboxClick = (): void => {
    if (onToggle) {
      onToggle();
    }
  };

  const handleRemoveClick = (): void => {
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className="todo-item">
      <input type="checkbox" className="todo-item__checkbox" onClick={handleCheckboxClick} defaultChecked={completed} />
      <p className={`todo-item__text ${completed && 'completed'}`}>{children}</p>
      <button className="todo-item__remove-button" onClick={handleRemoveClick}>
        <IconCross className="todo-item__remove-button__icon" />
      </button>
    </div>
  );
};

export default TodoItem;
