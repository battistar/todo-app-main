import TodoList from 'components/TodoList';
import TodoItem from './components/TodoItem';
import Filters from 'components/Filters';
import Help from 'components/Help';

const App = (): JSX.Element => {
  return (
    <>
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
    </>
  );
};

export default App;
