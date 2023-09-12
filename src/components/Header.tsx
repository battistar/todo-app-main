import styled from 'styled-components';
import { ReactComponent as MoonIcon } from 'assets/images/icon-moon.svg';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 32px 0px;
  margin: 0px 20px;
`;

const Title = styled.h1`
  text-transform: uppercase;
  letter-spacing: 12px;
  color: #ffffff;
`;

const StyledMoonIcon = styled(MoonIcon)`
  transform: scale(0.8);
`;

const Header = (): JSX.Element => {
  return (
    <StyledHeader>
      <Title>TODO</Title>
      <button>
        <StyledMoonIcon />
      </button>
    </StyledHeader>
  );
};

export default Header;
