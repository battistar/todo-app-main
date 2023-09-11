import { ChangeEvent, KeyboardEvent, useState } from 'react';
import './TodoWriter.css';

type TodoWriterProps = {
  onTodoSet?: (todo: string) => void;
};

const TodoWriter = ({ onTodoSet }: TodoWriterProps): JSX.Element => {
  const [todo, setTodo] = useState('');

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTodo(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' && onTodoSet) {
      onTodoSet(todo);
      setTodo('');
    }
  };

  return (
    <div className="todo-writer">
      <input type="checkbox" className="todo-writer__checkbox" disabled />
      <input
        type="text"
        className="todo-writer__input"
        placeholder="Create new todo"
        onKeyDown={handleKeyDown}
        onChange={handleTextChange}
        value={todo}
      />
    </div>
  );
};

export default TodoWriter;
