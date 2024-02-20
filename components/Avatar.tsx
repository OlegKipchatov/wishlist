type Props = {
    name: string,
    size?: 'medium' | 'large',
}

export default function Avatar(props: Props) {
    const { name, size = 'medium' } = props;
    if(!name) {
        return;
    }
    
    const initials = name.split(' ').map(word => word[0].toLocaleUpperCase()).join('');
    const style = {
        container: size === 'medium' ? 'w-12 h-12' : 'w-16 h-16',
        textSize: size === 'medium' ? '' : 'text-2xl',
    }

    return (
        <div className={style.container}>
            <div className='bg-gray-400 w-full h-full flex justify-center items-center rounded-full'>
                <span className={style.textSize}>{initials}</span>
            </div>
        </div>  
    );
}
