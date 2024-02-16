'use client'

type Props = {
    name: string,
}

const getInitials = (name: string) => {
    const firstInitial = name.split(' ')[0][0].toLocaleUpperCase();
    const secondInitial = name.split(' ')[1][0].toLocaleUpperCase();
    const fullInitial = firstInitial + secondInitial;

    return fullInitial;
}

export default function Avatar(props: Props) {
    const { name } = props;
    const initials = getInitials(name);

    return(
        <div className='w-12 h-12'>
            <div className='bg-gray-400 dark:bg-gray-600 w-full h-full flex justify-center items-center rounded-full'>
                <span>{initials}</span>
            </div>
        </div>
    );
}
