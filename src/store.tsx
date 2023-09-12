import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

type Todo = {
  id: string;
  position: number;
  completed: boolean;
  text: string;
};

export type Filter = 'all' | 'active' | 'completed';

type TodoState = {
  todoList: Todo[];
  filter: Filter;
};

type TodoActions =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'REMOVE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'REMOVE_COMPLETED' }
  | { type: 'SET_FILTER'; payload: Filter };

const initialState: TodoState = {
  todoList: [
    {
      id: self.crypto.randomUUID(),
      position: 0,
      completed: true,
      text: 'Complete online Java course',
    },
    {
      id: self.crypto.randomUUID(),
      position: 1,
      completed: false,
      text: 'Jog around the park 3x',
    },
    {
      id: self.crypto.randomUUID(),
      position: 2,
      completed: false,
      text: '10 minutes meditation',
    },
    {
      id: self.crypto.randomUUID(),
      position: 3,
      completed: false,
      text: 'Read for 1 hour',
    },
    {
      id: self.crypto.randomUUID(),
      position: 4,
      completed: false,
      text: 'Pick up groceries',
    },
    {
      id: self.crypto.randomUUID(),
      position: 5,
      completed: false,
      text: 'Complete Todo App on Frontend Mentor',
    },
  ],
  filter: 'all',
};

const useTodoSource = (): {
  todos: Todo[];
  filter: Filter;
  leftItems: number;
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  removeCompleted: () => void;
  setFilter: (filter: Filter) => void;
} => {
  const [{ todoList, filter }, dispatch] = useReducer((state: TodoState, action: TodoActions) => {
    switch (action.type) {
      case 'ADD_TODO':
        return { ...state, todoList: [...state.todoList, action.payload] };
      case 'REMOVE_TODO':
        return {
          ...state,
          todoList: state.todoList.filter((todo) => {
            return todo.id !== action.payload;
          }),
        };
      case 'TOGGLE_TODO': {
        const todoIndex = state.todoList.findIndex((todo) => {
          return todo.id === action.payload;
        });

        const todoList = [...state.todoList];
        todoList[todoIndex] = { ...todoList[todoIndex], completed: !todoList[todoIndex].completed };

        return { ...state, todoList: todoList };
      }
      case 'REMOVE_COMPLETED': {
        const pendingTodos = state.todoList.filter((todo) => {
          return !todo.completed;
        });

        return { ...state, todoList: pendingTodos };
      }
      case 'SET_FILTER': {
        return { ...state, filter: action.payload };
      }
    }
  }, initialState);

  const lastPosition = useMemo((): number => {
    return todoList.reduce((acc, todo) => {
      if (todo.position > acc) {
        return todo.position;
      }

      return acc;
    }, 0);
  }, [todoList]);

  const leftItems = useMemo((): number => {
    return todoList.reduce((acc, todo) => {
      if (todo.completed) {
        return acc;
      }

      return acc + 1;
    }, 0);
  }, [todoList]);

  const addTodo = useCallback(
    (text: string): void => {
      const todo: Todo = {
        id: self.crypto.randomUUID(),
        position: lastPosition + 1,
        completed: false,
        text: text,
      };

      dispatch({ type: 'ADD_TODO', payload: todo });
    },
    [lastPosition],
  );

  const removeTodo = useCallback((id: string): void => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  }, []);

  const toggleTodo = useCallback((id: string): void => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const removeCompleted = useCallback((): void => {
    dispatch({ type: 'REMOVE_COMPLETED' });
  }, []);

  const setFilter = useCallback((filter: Filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const todos = useMemo(() => {
    switch (filter) {
      case 'all':
        return todoList;
      case 'active':
        return todoList.filter((todo) => {
          return !todo.completed;
        });
      case 'completed': {
        return todoList.filter((todo) => {
          return todo.completed;
        });
      }
    }
  }, [todoList, filter]);

  return { todos, filter, leftItems, addTodo, removeTodo, toggleTodo, removeCompleted, setFilter };
};

const TodoContext = createContext<ReturnType<typeof useTodoSource>>({} as ReturnType<typeof useTodoSource>);

export const useTodo = (): ReturnType<typeof useTodoSource> => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <TodoContext.Provider value={useTodoSource()}>{children}</TodoContext.Provider>;
};
