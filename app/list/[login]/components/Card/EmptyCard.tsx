import {
  Card, CardBody, Image, Skeleton,
} from '@nextui-org/react';

export default function CardWish() {
  return (
    <Card className="w-full max-w-96 sm:max-w-full">
      <CardBody className="flex flex-col gap-4 sm:flex-row">
        <div className="flex items-center justify-center">
          <Image
            isLoading
            shadow="sm"
            height={256}
            width={256}
            className="max-h-96 sm:max-h-64"
          />
        </div>
        <div className="flex flex-col gap-4 justify-between w-full place-self-stretch p-2">
          <div className="space-y-2">
            <Skeleton
              className="w-2/3 h-8 rounded-lg"
            />
            <Skeleton
              className="w-2/5 h-4 rounded-lg"
            />
          </div>
          <div className="flex flex-col items-end gap-2">
            <Skeleton
              className="w-1/5 rounded-lg h-3"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
