'use client'

import Avatar from 'react-avatar';

type Props = {
    name: string,
}

export default function CardAvatar(props: Props) {
    const { name } = props;

    return(
        <Avatar name={name} color='black' className='rounded-full' size='3rem' />
    );
}