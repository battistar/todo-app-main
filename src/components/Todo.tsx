import './Todo.css';
import Filters from './Filters';
import Help from './Help';
import TodoItem from './TodoItem';
import TodoList from './TodoList';
import TodoWriter from './TodoWriter';

const Todo = (): JSX.Element => {
  return (
    <main className="todo">
      <TodoWriter />
      <TodoList>
        <TodoItem completed>Complete online Java course</TodoItem>
        <TodoItem>Jog around the park 3x</TodoItem>
        <TodoItem>10 minutes meditation</TodoItem>
        <TodoItem>Read for 1 hour</TodoItem>
        <TodoItem>Pick up groceries</TodoItem>
        <TodoItem>Complete Todo App on Frontend Mentor</TodoItem>
      </TodoList>
      <Filters />
      <Help />
    </main>
  );
};

export default Todo;
