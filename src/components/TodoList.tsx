import { ReactNode } from 'react';
import './TodoList.css';

type TodoListProps = {
  children: ReactNode;
  leftItems: number;
  removeCompleted?: () => void;
};

const TodoList = ({ children, leftItems, removeCompleted }: TodoListProps): JSX.Element => {
  const handleRemoveCompleted = (): void => {
    if (removeCompleted) {
      removeCompleted();
    }
  };

  return (
    <div className="todo-list">
      {Array.isArray(children) &&
        children.map((child, index) => {
          return (
            <div key={index}>
              {child}
              <div className="todo-list__divider"></div>
            </div>
          );
        })}
      <div className="todo-list__footer">
        <div>{leftItems} items left</div>
        <button className="todo-list__footer__clear-button" onClick={handleRemoveCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
