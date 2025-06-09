import Image from 'next/image';
import Link from 'next/link';

import { Text } from '@/components/atoms/text';

export default function NotFound() {
  return (
    <div className="grid h-dvh place-items-center space-y-2 px-2 text-center">
      <div className="space-y-2">
        <div>
          <Image
            src="/not-found.webp"
            alt="Not Found"
            width={250}
            height={250}
            className="mx-auto"
          />
        </div>
        <div className="space-y-1 [&_p]:whitespace-normal">
          <Text>
            <strong>Rick:</strong> "Morty, this page doesn't exist. It's a 404,
            Morty!"
          </Text>
          <Text>
            <strong>Morty:</strong> "Aww jeez, not again!"
          </Text>
        </div>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back home
        </Link>
      </div>
    </div>
  );
}
