import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { X } from 'lucide-react';
import { useEffect, useCallback, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Command, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import useDebounce from '@/hooks/useDebounce';

export interface Option {
  value: string;
  label: string;
  disable?: boolean;
}

interface SingleSelectorProps {
  value?: Option;
  defaultOptions?: Option[];
  options?: Option[];
  placeholder?: string;
  loadingIndicator?: React.ReactNode;
  emptyIndicator?: React.ReactNode;
  delay?: number;
  onSearch?: (_value: string) => Promise<Option[]>;
  onChange?: (_option: Option | null) => void;
  disabled?: boolean;
  className?: string;
  badgeClassName?: string;
  creatable?: boolean;
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    'value' | 'placeholder' | 'disabled'
  >;
}

const SingleSelector = React.forwardRef<HTMLDivElement, SingleSelectorProps>(
  function ({
    value,
    onChange,
    placeholder,
    defaultOptions: arrayDefaultOptions = [],
    options: arrayOptions,
    delay,
    onSearch,
    loadingIndicator,
    emptyIndicator,
    disabled,
    className,
    badgeClassName,
    // creatable = false,
    commandProps,
    inputProps,
  }: SingleSelectorProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [selected, setSelected] = useState<Option | null>(value || null);
    const [options, setOptions] = useState<Option[]>(arrayDefaultOptions);
    const [inputValue, setInputValue] = useState('');
    const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => setOpen(false), 150); // Delay closing
      }
    };

    const handleUnselect = useCallback(() => {
      setSelected(null);
      onChange?.(null);
    }, [onChange]);

    useEffect(() => {
      if (open) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchend', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchend', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchend', handleClickOutside);
      };
    }, [open]);

    useEffect(() => {
      if (value) {
        setSelected(value);
      }
    }, [value]);

    useEffect(() => {
      if (!arrayOptions || onSearch) {
        return;
      }
      setOptions(arrayOptions || []);
    }, [arrayOptions, onSearch]);

    useEffect(() => {
      if (!onSearch || !open) return;

      const doSearch = async () => {
        setIsLoading(true);
        const res = await onSearch?.(debouncedSearchTerm);
        setOptions(res || []);
        setIsLoading(false);
      };

      if (debouncedSearchTerm) {
        void doSearch();
      }
    }, [debouncedSearchTerm, onSearch, open]);

    const handleSelect = useCallback(
      (option: Option) => {
        setSelected(option);
        setInputValue('');
        onChange?.(option);
      },
      [onChange],
    );

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      setTimeout(() => {
        if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }, 150); // Delay to allow selection
    };

    return (
      <Command
        ref={dropdownRef}
        {...commandProps}
        className={cn(
          'h-auto overflow-visible bg-transparent',
          commandProps?.className,
        )}
      >
        <div
          className={cn(
            'min-h-10 rounded-md bg-background px-3 py-2 text-sm ring-offset-background',
            {
              'px-3 py-2': selected !== null,
              'cursor-text': !disabled && selected !== null,
            },
            className,
          )}
          onClick={() => {
            if (disabled) return;
            inputRef?.current?.focus();
          }}
        >
          <div className="relative flex flex-wrap gap-1">
            {selected && (
              <Badge
                key={selected.value}
                className={cn('text-pure-white', badgeClassName)}
                data-disabled={disabled || undefined}
              >
                {selected.label}
                <button className="ml-1" onClick={handleUnselect}>
                  <X className="hover:text-foreground h-3 w-3 text-pure-white" />
                </button>
              </Badge>
            )}
            <CommandPrimitive.Input
              {...inputProps}
              ref={inputRef}
              value={inputValue}
              disabled={disabled}
              onValueChange={(value) => {
                setInputValue(value);
              }}
              onBlur={handleBlur}
              onFocus={() => setOpen(true)}
              placeholder={selected ? '' : placeholder}
              className={cn(
                'placeholder:text-muted-foreground flex-1 bg-transparent outline-none',
                { 'w-full': selected === null },
              )}
            />
          </div>
        </div>
        <div className="relative">
          {open && (
            <CommandList className="absolute top-1 z-[9999] w-full rounded-md bg-background text-black shadow-md outline-none">
              {isLoading ? (
                <>{loadingIndicator}</>
              ) : (
                <>
                  {emptyIndicator && options.length === 0 && (
                    <CommandItem value="-" disabled>
                      {emptyIndicator}
                    </CommandItem>
                  )}
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disable}
                      onSelect={() => handleSelect(option)}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </>
              )}
            </CommandList>
          )}
        </div>
      </Command>
    );
  },
);

SingleSelector.displayName = 'SingleSelector';
export default SingleSelector;
