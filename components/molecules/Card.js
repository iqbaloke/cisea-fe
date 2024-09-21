const Card = ({ children, className = "" }) => {
  return <div style={{border:"solid 1px #efefef"}} className={`card w-100 ${className}`}>{children}</div>;
};

function Header({ classname = "", children }) {
  return <div className={`card-header ${classname}`}>{children}</div>;
}

function Body(props) {
  return <div className="card-body">{props.children}</div>;
}

function Footer(props) {
  return <div className="card-footer">{props.children}</div>;
}

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
