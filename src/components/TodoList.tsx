import { ReactNode } from 'react';
import './TodoList.css';

type TodoListProps = {
  children: ReactNode;
};

const TodoList = ({ children }: TodoListProps): JSX.Element => {
  return (
    <div className="todo-list">
      {Array.isArray(children) &&
        children.map((child) => {
          return (
            <>
              {child}
              <div className="todo-list__divider"></div>
            </>
          );
        })}
      <div className="todo-list__footer">
        <div>5 items left</div>
        <button className="todo-list__footer__clear-button">Clear Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
