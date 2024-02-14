import { MouseEventHandler } from "react";

type Props = {
    type?: "submit" | "button",
    text?: string,
    onClick?: MouseEventHandler,
    className?: string,
}

const layoutStyle = 'w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center';
const lightStyle = 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300';
const darkStyle = 'dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

export default function Button(props: Props) {
    const { text, onClick, className } = props;
    const styles = layoutStyle + ' ' + lightStyle + ' ' + darkStyle + ' ' + className;

    let { type } = props;
    if(!type) {
        type = 'button';
    }

    return (
        <button className={styles} type={type} onClick={onClick}>
            {text}
        </button>
    );
}