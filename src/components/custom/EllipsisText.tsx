import React from 'react';

type TProps = {
  text: string;
  width?: number;
};

const EllipsisText = ({ text, width = 200 }: TProps) => {
  return (
    <p
      className={`w-[${width}px] overflow-hidden text-ellipsis whitespace-nowrap`}
    >
      {text}
    </p>
  );
};

export default EllipsisText;
