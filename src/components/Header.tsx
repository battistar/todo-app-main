import styled from 'styled-components';
import { ReactComponent as MoonIcon } from 'assets/images/icon-moon.svg';
import { ReactComponent as SunIcon } from 'assets/images/icon-sun.svg';
import { useTodo } from 'store';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 32px 0px;
  margin: 0px 20px;
`;

const Title = styled.h1`
  text-transform: uppercase;
  letter-spacing: 12px;
  color: ${(props): string => props.theme.title};
`;

const StyledMoonIcon = styled(MoonIcon)`
  transform: scale(0.8);
`;

const StyledSunIcon = styled(SunIcon)`
  transform: scale(0.8);
`;

const Header = (): JSX.Element => {
  const { setTheme, theme } = useTodo();

  const handleThemeClick = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <StyledHeader>
      <Title>TODO</Title>
      <button onClick={handleThemeClick}>{theme === 'light' ? <StyledMoonIcon /> : <StyledSunIcon />}</button>
    </StyledHeader>
  );
};

export default Header;
