import './Help.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 32px 0px;
`;

const Text = styled.p`
  color: hsl(236, 9%, 61%);
`;

const Help = (): JSX.Element => {
  return (
    <Container>
      <Text>Drag and drop to reorder list</Text>
    </Container>
  );
};

export default Help;
