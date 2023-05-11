import logo from "../assets/logo.svg";
import "../styles/Header.scss";

const Header = () => {
  return (
    <div className="header_container">
      <img className="logo" src={logo} alt="logo" />
    </div>
  );
};

export default Header;
