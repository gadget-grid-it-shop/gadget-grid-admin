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
      <AvatarImage src={src} />
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
            height={50}
            width={50}
            alt="brand image"
          />
        )}
      </AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
