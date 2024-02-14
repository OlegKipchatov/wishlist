type Props = {
    date: Date,
}

export default function CardDate(props: Props) {
    const { date } = props;

    const formatter = Intl.DateTimeFormat('en', {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return(
        <span className="inline-block align-text-bottom mb-1.5 text-sm tracking-tight text-gray-600 dark:text-gray-400">
            {formatter.format(date)}
        </span>
    );
}
