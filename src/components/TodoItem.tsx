import { ReactComponent as IconCross } from 'assets/images/icon-cross.svg';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 24px;

  & input[type='checkbox'] {
    appearance: none;
    margin: 0;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid ${(props): string => props.theme.lightText};

  &:hover,
  &:active {
    border-color: hsl(280, 87%, 65%);
    cursor: pointer;
  }

  &:checked {
    background: hsl(280, 87%, 65%) url('./src/assets/images/icon-check.svg') no-repeat center;
    border-color: hsl(280, 87%, 65%);
  }
`;

const Text = styled.p`
  flex: 1;
  color: ${(props): string => props.theme.darkText};
  padding-top: 4px;

  &.completed {
    text-decoration: line-through;
    color: ${(props): string => props.theme.lightText};
  }
`;

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const StyledIconCross = styled(IconCross)`
  transform: scale(0.7);
`;

type TodoItemProps = {
  children: string;
  onToggle?: () => void;
  onRemove?: () => void;
  completed?: boolean;
};

const TodoItem = ({ children, onToggle, onRemove, completed }: TodoItemProps): JSX.Element => {
  const handleCheckboxClick = (): void => {
    if (onToggle) {
      onToggle();
    }
  };

  const handleRemoveClick = (): void => {
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <Container>
      <Checkbox onClick={handleCheckboxClick} defaultChecked={completed} />
      <Text className={`${completed && 'completed'}`}>{children}</Text>
      <Button onClick={handleRemoveClick}>
        <StyledIconCross />
      </Button>
    </Container>
  );
};

export default TodoItem;
