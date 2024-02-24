export type LabelProps = {
    value?: string,
    position?: 'top' | 'left'
}

const InputLabel = (props: LabelProps) => {
    const { value } = props;

    return (<>
        { value ? <label>{value}</label> : <></> }
    </>);
};

export default InputLabel;
