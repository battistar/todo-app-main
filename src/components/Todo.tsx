import './Todo.css';
import Filters from './Filters';
import Help from './Help';
import TodoItem from './TodoItem';
import TodoList from './TodoList';
import TodoWriter from './TodoWriter';
import { Filter, useTodo } from 'store';
import { useCallback } from 'react';

const Todo = (): JSX.Element => {
  const { todos, filter, leftItems, toggleTodo, removeTodo, addTodo, removeCompleted, setFilter } = useTodo();

  const handleTodoToggle = useCallback(
    (id: string) => () => {
      toggleTodo(id);
    },
    [toggleTodo],
  );

  const handleTodoRemove = useCallback(
    (id: string) => () => {
      removeTodo(id);
    },
    [removeTodo],
  );

  const handleAddTodo = useCallback(
    (text: string) => {
      addTodo(text);
    },
    [addTodo],
  );

  const handleRemoveCompleted = useCallback(() => {
    removeCompleted();
  }, [removeCompleted]);

  const handleFilterChange = useCallback(
    (filter: Filter) => {
      setFilter(filter);
    },
    [setFilter],
  );

  return (
    <main className="todo">
      <TodoWriter onTodoSet={handleAddTodo} />
      <TodoList leftItems={leftItems} removeCompleted={handleRemoveCompleted}>
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              completed={todo.completed}
              onToggle={handleTodoToggle(todo.id)}
              onRemove={handleTodoRemove(todo.id)}
            >
              {todo.text}
            </TodoItem>
          );
        })}
      </TodoList>
      <Filters currentFilter={filter} onFilterChange={handleFilterChange} />
      <Help />
    </main>
  );
};

export default Todo;
