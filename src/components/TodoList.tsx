import { ReactNode } from 'react';
import './TodoList.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: hsl(0, 0%, 98%);
  border-radius: 8px;
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  color: hsl(236, 9%, 61%);
  padding: 20px 24px;
  font-size: 0.8rem;
`;

const Button = styled.button`
  &:hover,
  &:active {
    color: hsl(235, 19%, 35%);
  }
`;

type TodoListProps = {
  children: ReactNode;
  leftItems: number;
  removeCompleted?: () => void;
};

const TodoList = ({ children, leftItems, removeCompleted }: TodoListProps): JSX.Element => {
  const handleRemoveCompleted = (): void => {
    if (removeCompleted) {
      removeCompleted();
    }
  };

  return (
    <Container>
      {Array.isArray(children) &&
        children.map((child, index) => {
          return (
            <div key={index}>
              {child}
              <hr />
            </div>
          );
        })}
      <Footer>
        <div>{leftItems} items left</div>
        <Button onClick={handleRemoveCompleted}>Clear Completed</Button>
      </Footer>
    </Container>
  );
};

export default TodoList;
