import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
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
};

const Modal = ({
  open,
  setOpen,
  children,
  triggerText = 'Open',
  title = 'New Modal',
}: TProps) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
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
      <DialogContent className="">
        <DialogTitle>{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
