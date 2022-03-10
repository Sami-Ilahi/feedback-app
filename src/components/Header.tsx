import PropTypes, { InferProps } from "prop-types";

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
    <header style={headerStyles}>
      <div className='container'>
        <h2>{text}</h2>
      </div>
    </header>
  );
}

Header.defaultProps = {
  text: "Feedback UI",
  bgColor: "rgba(0,0,0,0.4)",
  textColor: "#ff6a95",
};

Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Header;
