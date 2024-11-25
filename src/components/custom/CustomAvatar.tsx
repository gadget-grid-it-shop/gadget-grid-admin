import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Image from 'next/image';

const CustomAvatar = ({
  src,
  fallback,
}: {
  src: string;
  fallback?: string;
}) => {
  return (
    <Avatar>
      <AvatarImage height={30} width={30} src={src} />
      <AvatarFallback>
        {fallback ? (
          fallback
        ) : (
          <Image
            src="/brand-fallback.png"
            onError={(e) =>
              ((e.currentTarget as HTMLImageElement).src =
                '/brand-fallback.png')
            }
            className="object-contain"
            height={35}
            width={35}
            alt="brand image"
          />
        )}
      </AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
