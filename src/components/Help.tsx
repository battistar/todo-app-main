import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 32px 0px;
`;

const Text = styled.p`
  color: ${(props): string => props.theme.normalText};
`;

const Help = (): JSX.Element => {
  return (
    <Container>
      <Text>Drag and drop to reorder list</Text>
    </Container>
  );
};

export default Help;
