import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { FiPlus } from 'react-icons/fi';

type TProps = React.ComponentPropsWithRef<typeof Dialog> & {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  triggerText?: string | ReactNode;
  title?: string;
  withTrigger?: boolean;
  className?: string;
};

const Modal = React.forwardRef<HTMLDivElement, TProps>(
  (
    {
      open,
      setOpen,
      children,
      triggerText = 'Open',
      title = 'New Modal',
      withTrigger = false,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <Dialog ref={ref} modal open={open} onOpenChange={setOpen} {...rest}>
        {withTrigger && (
          <DialogTrigger
            className={`${
              typeof triggerText === 'string' ? 'primary-btn' : ''
            }`}
          >
            {typeof triggerText === 'string' ? (
              <>
                <FiPlus size={18} />
                {triggerText}
              </>
            ) : (
              triggerText
            )}
          </DialogTrigger>
        )}
        <DialogContent className={className}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
          {children}
        </DialogContent>
      </Dialog>
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;
