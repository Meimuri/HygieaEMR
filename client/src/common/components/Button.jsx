const Button = ({ text, clickEvent }) => {
    return <button onClick={clickEvent}>{text}</button>;
};

export default Button;
