import Header from 'components/Header';
import Todo from 'components/Todo';
import { useTodo } from 'store';
import styled, { ThemeProvider } from 'styled-components';

const themeLight = {
  primary: 'hsl(220, 98%, 61%)',
  background: 'hsl(236, 33%, 92%)',
  listBackground: 'hsl(0, 0%, 98%)',
  lightText: 'hsl(233, 11%, 84%)',
  normalText: 'hsl(236, 9%, 61%)',
  darkText: 'hsl(235, 19%, 35%)',
  divider: 'hsl(233, 11%, 84%)',
  title: '#FFFFFF',
  backgroundImageURL: '/src/assets/images/bg-mobile-light.jpg',
  backgroundImageURLDesktop: '/src/assets/images/bg-desktop-light.jpg',
};

const themeDark = {
  primary: 'hsl(220, 98%, 61%)',
  background: 'hsl(235, 21%, 11%)',
  listBackground: 'hsl(235, 24%, 19%)',
  lightText: 'hsl(234, 11%, 52%)',
  normalText: 'hsl(233, 14%, 35%)',
  darkText: 'hsl(234, 39%, 85%)',
  divider: 'hsl(233, 14%, 35%)',
  title: '#FFFFFF',
  backgroundImageURL: '/src/assets/images/bg-mobile-dark.jpg',
  backgroundImageURLDesktop: '/src/assets/images/bg-desktop-dark.jpg',
};

const OuterContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;

  @media (min-width: 1400px) {
    height: 100vh;
    align-items: center;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 500px;
`;

const Background = styled.div`
  height: 100vh;
  background-image: url(${(props): string => props.theme.backgroundImageURL});
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-color: ${(props): string => props.theme.background};

  @media (min-width: 768px) {
    background-image: url(${(props): string => props.theme.backgroundImageURLDesktop});
  }
`;

const App = (): JSX.Element => {
  const { theme } = useTodo();

  return (
    <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
      <Background>
        <OuterContainer>
          <InnerContainer>
            <Header />
            <Todo />
          </InnerContainer>
        </OuterContainer>
      </Background>
    </ThemeProvider>
  );
};

export default App;
