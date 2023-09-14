import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

type Todo = {
  id: string;
  completed: boolean;
  text: string;
};

export type Filter = 'all' | 'active' | 'completed';

export type Theme = 'light' | 'dark';

type TodoState = {
  todoList: Todo[];
  filter: Filter;
  theme: Theme;
};

type TodoActions =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'REMOVE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'CLEAR' }
  | { type: 'SET_FILTER'; payload: Filter }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SWITCH_ITEMS'; payload: { active: string; over: string } };

const initialState: TodoState = {
  todoList: [
    {
      id: self.crypto.randomUUID(),
      completed: true,
      text: 'Complete online Java course',
    },
    {
      id: self.crypto.randomUUID(),
      completed: false,
      text: 'Jog around the park 3x',
    },
    {
      id: self.crypto.randomUUID(),
      completed: false,
      text: '10 minutes meditation',
    },
    {
      id: self.crypto.randomUUID(),
      completed: false,
      text: 'Read for 1 hour',
    },
    {
      id: self.crypto.randomUUID(),
      completed: false,
      text: 'Pick up groceries',
    },
    {
      id: self.crypto.randomUUID(),
      completed: false,
      text: 'Complete Todo App on Frontend Mentor',
    },
  ],
  filter: 'all',
  theme: 'light',
};

const useTodoSource = (): {
  todos: Todo[];
  filter: Filter;
  theme: Theme;
  leftItems: number;
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  clear: () => void;
  setFilter: (filter: Filter) => void;
  switchItems: (active: string, over: string) => void;
  setTheme: (theme: Theme) => void;
} => {
  const [{ todoList, filter, theme }, dispatch] = useReducer((state: TodoState, action: TodoActions) => {
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
      case 'CLEAR': {
        const pendingTodos = state.todoList.filter((todo) => {
          return !todo.completed;
        });

        return { ...state, todoList: pendingTodos };
      }
      case 'SET_FILTER':
        return { ...state, filter: action.payload };
      case 'SET_THEME':
        return { ...state, theme: action.payload };
      case 'SWITCH_ITEMS': {
        const activeTodoIndex = state.todoList.findIndex((todo) => {
          return todo.id === action.payload.active;
        });
        const overTodoIndex = state.todoList.findIndex((todo) => {
          return todo.id === action.payload.over;
        });

        if (activeTodoIndex !== -1 && overTodoIndex !== -1) {
          const newTodoList = [...state.todoList];
          newTodoList.splice(overTodoIndex, 0, newTodoList.splice(activeTodoIndex, 1)[0]);

          return { ...state, todoList: newTodoList };
        }

        return state;
      }
    }
  }, initialState);

  const leftItems = useMemo((): number => {
    return todoList.reduce((acc, todo) => {
      if (todo.completed) {
        return acc;
      }

      return acc + 1;
    }, 0);
  }, [todoList]);

  const addTodo = useCallback((text: string): void => {
    const todo: Todo = {
      id: self.crypto.randomUUID(),
      completed: false,
      text: text,
    };

    dispatch({ type: 'ADD_TODO', payload: todo });
  }, []);

  const removeTodo = useCallback((id: string): void => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  }, []);

  const toggleTodo = useCallback((id: string): void => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const clear = useCallback((): void => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const setFilter = useCallback((filter: Filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  }, []);

  const switchItems = useCallback((active: string, over: string) => {
    dispatch({ type: 'SWITCH_ITEMS', payload: { active: active, over: over } });
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

  return { todos, filter, theme, leftItems, addTodo, removeTodo, toggleTodo, clear, setFilter, switchItems, setTheme };
};

const TodoContext = createContext<ReturnType<typeof useTodoSource>>({} as ReturnType<typeof useTodoSource>);

export const useTodo = (): ReturnType<typeof useTodoSource> => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <TodoContext.Provider value={useTodoSource()}>{children}</TodoContext.Provider>;
};
