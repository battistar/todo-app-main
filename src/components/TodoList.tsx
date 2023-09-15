import {
  useSensors,
  useSensor,
  DndContext,
  closestCenter,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ReactNode, useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props): string => props.theme.listBackground};
  border-radius: 8px;
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props): string => props.theme.normalText};
  padding: 20px 24px;
  font-size: 0.8rem;
`;

const Button = styled.button`
  &:hover,
  &:active {
    color: ${(props): string => props.theme.darkText};
  }
`;

type TodoListProps = {
  children: ReactNode;
  items: string[];
  leftItems: number;
  filters: ReactNode;
  onClear?: () => void;
  onDragEnd?: (active: string, over: string) => void;
};

const TodoList = ({ children, items, filters, leftItems, onClear, onDragEnd }: TodoListProps): JSX.Element => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleClearClick = (): void => {
    if (onClear) {
      onClear();
    }
  };

  const handleDragEnd = useCallback(
    (event: DragEndEvent): void => {
      const { active, over } = event;

      if (onDragEnd && over && active.id !== over.id) {
        onDragEnd(active.id as string, over.id as string);
      }
    },
    [onDragEnd],
  );

  return (
    <Container>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {children}
        </SortableContext>
      </DndContext>
      <Footer>
        <div>{leftItems} items left</div>
        {filters}
        <Button onClick={handleClearClick}>Clear Completed</Button>
      </Footer>
    </Container>
  );
};

export default TodoList;
