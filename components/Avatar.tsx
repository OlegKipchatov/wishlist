type Props = {
    name: string,
    size?: 'medium' | 'large',
}

const getInitials = (name: string) => {
    const firstInitial = name.split(' ')[0][0].toLocaleUpperCase();
    const secondInitial = name.split(' ')[1][0].toLocaleUpperCase();
    const fullInitial = firstInitial + secondInitial;

    return fullInitial;
}

export default function Avatar(props: Props) {
    const { name, size = 'medium' } = props;
    const initials = getInitials(name);

    return size === 'medium' ? (
        <div className='w-12 h-12'>
            <div className='bg-gray-400 dark:bg-gray-600 w-full h-full flex justify-center items-center rounded-full'>
                <span className="text-foreground">{initials}</span>
            </div>
        </div>
    ) : (
        <div className='w-16 h-16'>
            <div className='bg-gray-400 dark:bg-gray-600 w-full h-full flex justify-center items-center rounded-full'>
                <span className="text-foregroun text-2xl">{initials}</span>
            </div>
        </div>
    );
}
