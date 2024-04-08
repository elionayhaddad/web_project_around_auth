import headerLogo from "../images/header.svg";
import headerLine from "../images/Line.svg";

function Header() {
  return (
    <>
      <header className="header">
        <img
          id="header"
          className="header__logo"
          src={headerLogo}
          alt="logo do site"
        />
        <img
          id="line"
          className="header__line"
          src={headerLine}
          alt="linha cinza marcando o fim do cabeçalho"
        />
      </header>
    </>
  );
}

export default Header;
