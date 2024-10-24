import { useEffect, useRef, useState } from 'react';
import { TSelectOptions } from '../categories/interface';
import { FaXmark } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { FaAngleDown } from 'react-icons/fa';

interface CustomSelectProps {
  data: TSelectOptions[];
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | boolean | null) => void;
  placeholder?: string;
  value?: string;
  allowDeselect?: boolean;
  className?: string;
  dropdownClassName?: string;
}

const Select: React.FC<CustomSelectProps> = ({
  data = [],
  onChange,
  placeholder,
  value,
  allowDeselect = true,
  className,
  dropdownClassName,
}) => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: TSelectOptions) => {
    setSelectedLabel(option.label);
    onChange(option.value);
    setIsOpen(false);
  };

  const handleDeselect = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setSelectedLabel(null);
    onChange('');
  };

  useEffect(() => {
    // Find the label for the default value and set it as the initial selected label
    if (value) {
      const defaultOption = data?.find((option) => option?.value === value);
      if (defaultOption) {
        setSelectedLabel(defaultOption.label);
      }
    }
  }, [value, data]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={cn(
          'flex h-10 cursor-pointer items-center rounded-md bg-background-foreground px-3 text-sm text-gray',
          className,
        )}
        onClick={(e) => {
          setIsOpen(!isOpen);
          e.stopPropagation();
        }}
      >
        {selectedLabel
          ? selectedLabel
          : placeholder
            ? placeholder
            : 'Please select a value'}
        {allowDeselect && selectedLabel ? (
          <span onClick={handleDeselect} className="ms-auto text-gray">
            <FaXmark />
          </span>
        ) : (
          <FaAngleDown className="ms-auto text-base text-gray" />
        )}
      </div>

      {isOpen && data.length !== 0 && (
        <ul
          style={{ userSelect: 'none' }}
          className={cn(
            'max-h-60 border border-border-color bg-background p-2',
            dropdownClassName,
            'absolute z-10 mt-1 w-full overflow-auto rounded-md shadow-md',
          )}
        >
          {data?.map((option) => (
            <li
              key={option?.label}
              onClick={() => handleSelect(option)}
              className={`hover:bg-gray-100 cursor-pointer list-none rounded-md p-2 text-gray ${option?.label === selectedLabel ? 'bg-lavender-mist' : ''}`}
            >
              {option?.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
