import PropTypes, { InferProps } from "prop-types";
import AboutIconLink from "./AboutIconLink";

function Header({
  text,
  bgColor,
  textColor,
}: InferProps<typeof Header.propTypes>) {
  const headerStyles = {
    backgroundColor: bgColor!,
    color: textColor!,
  };

  return (
    <header className='header' style={headerStyles}>
      <div>
        <h2>{text}</h2>
      </div>
      <AboutIconLink />
    </header>
  );
}

Header.defaultProps = {
  text: "Feedback UI",
  bgColor: "#202142",
  textColor: "#ff6a95",
};

Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Header;
