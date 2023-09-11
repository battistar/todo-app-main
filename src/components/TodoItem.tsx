import { ReactComponent as IconCross } from 'assets/images/icon-cross.svg';
import './TodoItem.css';

type TodoItemProps = {
  toggle?: () => void;
  remove?: () => void;
  checked?: boolean;
};

const TodoItem = ({ toggle, remove, checked }: TodoItemProps): JSX.Element => {
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
      <input type="checkbox" className="todo-item__checkbox" onClick={handleCheckboxClick} />
      <p className={`todo-item__text ${checked && 'checked'}`}>Some text</p>
      <button className="todo-item__remove-button" onClick={handleRemoveClick}>
        <IconCross />
      </button>
    </div>
  );
};

export default TodoItem;
