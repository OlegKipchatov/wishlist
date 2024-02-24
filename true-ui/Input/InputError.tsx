export type ErrorProps = {
    message?: string;
}

const DEFAULT_MESSAGE = 'Invalid value';

const InputError = (props: ErrorProps) => {
    const { message } = props;

    return (
        <span className="text-red-300">{message ?? DEFAULT_MESSAGE}</span>
    );
}

export default InputError;
