import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { cn } from '@/lib/utils';

type TProps = {
  text: string;
  width?: number;
  className?: string;
};

const EllipsisText = ({ text, width = 200, className }: TProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p
            style={{ width }}
            className={cn(
              `overflow-hidden text-ellipsis whitespace-nowrap`,
              className,
            )}
          >
            {text}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p className="w-48">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EllipsisText;
