
interface IPropsButton {
    text: string;
    onClick: () => void;
}

const Button = (props: IPropsButton) => {

    return <button className="Button" onClick={props.onClick}>
        {props.text}
    </button>
}

export default Button;