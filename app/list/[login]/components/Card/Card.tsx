import {
  Button, Card, CardBody, CardFooter, Divider,
} from '@nextui-org/react';

import { ICard } from '@/supabase/types';

import CardSettings from '../CardSettings';

import WishItem from './WishItem';

interface Props {
    card: ICard,
    currentUserId: string,
    isCurrentUser: boolean,
    isAuthenticated: boolean,
}

export default function CardWish(props: Props) {
  const {
    card, currentUserId, isCurrentUser, isAuthenticated,
  } = props;

  return (
    <Card className="w-full max-w-96 sm:max-w-full">
      <CardBody>
        <WishItem
          isShowLink
          card={card}
          userId={currentUserId}
        />
      </CardBody>
      <CardFooter className="flex flex-col gap-2">
        { (isAuthenticated && !isCurrentUser) && (
          <>
            <Divider />
            <Button
              color="primary"
              variant="shadow"
            >
              Book
            </Button>
          </>
        ) }
        { isCurrentUser && (
          <>
            <Divider />
            <CardSettings
              card={card}
              userId={currentUserId}
            />
          </>
        ) }
      </CardFooter>
    </Card>
  );
}
