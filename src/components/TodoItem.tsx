import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactComponent as IconCross } from 'assets/images/icon-cross.svg';
import styled from 'styled-components';
import Checkbox from './Checkbox';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 24px;
  background-color: ${(props): string => props.theme.listBackground};

  & input[type='checkbox'] {
    appearance: none;
    margin: 0;
  }
`;

const Divider = styled.hr`
  border-top: 1px solid ${(props): string => props.theme.divider};

  &.disabled {
    display: none;
  }
`;

const Text = styled.p`
  flex: 1;
  color: ${(props): string => props.theme.darkText};
  padding-top: 4px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;

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
  id: string;
  onToggle?: () => void;
  onRemove?: () => void;
  completed?: boolean;
};

const TodoItem = ({ children, id, onToggle, onRemove, completed }: TodoItemProps): JSX.Element => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCheckboxChange = (): void => {
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
    <div ref={setNodeRef} style={style} {...attributes}>
      <Container>
        <Checkbox onChange={handleCheckboxChange} checked={completed} />
        <Text className={completed ? 'completed' : ''} {...listeners}>
          {children}
        </Text>
        <Button onClick={handleRemoveClick}>
          <StyledIconCross />
        </Button>
      </Container>
      <Divider className={isDragging ? 'disabled' : ''} />
    </div>
  );
};

export default TodoItem;
