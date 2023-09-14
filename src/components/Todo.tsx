import Filters from './Filters';
import Help from './Help';
import TodoItem from './TodoItem';
import TodoList from './TodoList';
import TodoWriter from './TodoWriter';
import { Filter, useTodo } from 'store';
import { useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0px 20px;
`;

const MobileFilters = styled.div`
  @media (min-width: 992px) {
    display: none;
  }
`;

const DesktopFilters = styled.div`
  display: none;

  @media (min-width: 992px) {
    display: block;

    & div {
      padding: 0px;
      background-color: transparent;
      border-radius: 0px;
      font-size: 0.8rem;
    }
  }
`;

const Todo = (): JSX.Element => {
  const { todos, filter, leftItems, toggleTodo, removeTodo, addTodo, clear, switchItems, setFilter } = useTodo();

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

  const handleClear = useCallback(() => {
    clear();
  }, [clear]);

  const handleFilterChange = useCallback(
    (filter: Filter) => {
      setFilter(filter);
    },
    [setFilter],
  );

  const handleDragEnd = useCallback(
    (active: string, over: string) => {
      switchItems(active, over);
    },
    [switchItems],
  );

  return (
    <Container>
      <TodoWriter onTodoSet={handleAddTodo} />
      <TodoList
        leftItems={leftItems}
        items={todos.map((item) => {
          return item.id;
        })}
        filters={
          <DesktopFilters>
            <Filters currentFilter={filter} onFilterChange={handleFilterChange} />
          </DesktopFilters>
        }
        onClear={handleClear}
        onDragEnd={handleDragEnd}
      >
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              id={todo.id}
              completed={todo.completed}
              onToggle={handleTodoToggle(todo.id)}
              onRemove={handleTodoRemove(todo.id)}
            >
              {todo.text}
            </TodoItem>
          );
        })}
      </TodoList>
      <MobileFilters>
        <Filters currentFilter={filter} onFilterChange={handleFilterChange} />
      </MobileFilters>
      <Help />
    </Container>
  );
};

export default Todo;
