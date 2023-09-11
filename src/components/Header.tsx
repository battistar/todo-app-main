import './Header.css';
import { ReactComponent as MoonIcon } from 'assets/images/icon-moon.svg';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <h1 className="header__title">TODO</h1>
      <button>
        <MoonIcon className="header__theme-icon" />
      </button>
    </header>
  );
};

export default Header;
