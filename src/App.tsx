import Header from 'components/Header';
import Todo from 'components/Todo';
import { TodoProvider } from 'store';

const App = (): JSX.Element => {
  return (
    <TodoProvider>
      <Header />
      <Todo />
    </TodoProvider>
  );
};

export default App;
