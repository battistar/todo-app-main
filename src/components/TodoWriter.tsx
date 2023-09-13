import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 24px;
  background-color: ${(props): string => props.theme.listBackground};
  border-radius: 8px;

  & input[type='checkbox'] {
    appearance: none;
    margin: 0;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid hsl(233, 11%, 84%);
`;

const InputText = styled.input.attrs({ type: 'text' })`
  flex: 1;
  border: none;
  background: transparent;
  padding-top: 4px;
  color: ${(props): string => props.theme.darkText};

  &::placeholder {
    color: ${(props): string => props.theme.lightText};
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;

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
    <Container>
      <Checkbox disabled />
      <InputText
        type="text"
        placeholder="Create new todo..."
        onKeyDown={handleKeyDown}
        onChange={handleTextChange}
        value={todo}
      />
    </Container>
  );
};

export default TodoWriter;
