'use client';

import { Tooltip } from '@nextui-org/react';
import CopyIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';

type Props = {
    login: string,
}

export default function CopyUser(props: Props) {
  const { login } = props;

  const copyUserHref = () => {
    const userHref = `${window.location.origin}/list/${login}`;
    navigator.clipboard.writeText(userHref);
  };

  return (
    <Tooltip content={`Copy link to ${login}'s wishes to clipboard`}>
      <CopyIcon
        height={18}
        className="hover:cursor-pointer hover:text-primary-200"
        onClick={copyUserHref}
      />
    </Tooltip>
  );
}
