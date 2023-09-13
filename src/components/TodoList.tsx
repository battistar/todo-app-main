import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props): string => props.theme.listBackground};
  border-radius: 8px;
  overflow: hidden;
`;

const Divider = styled.hr`
  border-top: 1px solid ${(props): string => props.theme.divider};
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
  leftItems: number;
  filters: ReactNode;
  removeCompleted?: () => void;
};

const TodoList = ({ children, filters, leftItems, removeCompleted }: TodoListProps): JSX.Element => {
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
              <Divider />
            </div>
          );
        })}
      <Footer>
        <div>{leftItems} items left</div>
        {filters}
        <Button onClick={handleRemoveCompleted}>Clear Completed</Button>
      </Footer>
    </Container>
  );
};

export default TodoList;
