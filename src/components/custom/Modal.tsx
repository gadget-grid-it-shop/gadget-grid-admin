import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { FiPlus } from 'react-icons/fi';

type TProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  triggerText?: string | ReactNode;
  title?: string;
  withTrigger?: boolean;
};

const Modal = ({
  open,
  setOpen,
  children,
  triggerText = 'Open',
  title = 'New Modal',
  withTrigger = false,
}: TProps) => {
  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      {withTrigger && (
        <DialogTrigger
          className={`${typeof triggerText === 'string' ? 'primary-btn' : ''}`}
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
      <DialogContent className="">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription></DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
