import { TCategory } from '@/interface/category';
import React, { useState } from 'react';

type TProps = {
  categories: TCategory[];
  placeholder?: string;
};

const TreeDropdown = ({
  categories,
  placeholder = 'Select Category',
}: TProps) => {
  const [selectedCat, setSelectedCat] = useState<TCategory | null>(null);
  const [open, setOpen] = useState(false);

  const handleCatSelect = (cat: TCategory) => {
    setSelectedCat(cat);
    setOpen(false);
  };

  const renderCategory = (categories: TCategory[]) => {
    return (
      <div className="flex flex-col items-start gap-2 text-gray">
        {categories?.map((cat) => (
          <button onClick={() => handleCatSelect(cat)} key={cat._id}>
            {cat.name}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-full rounded-md bg-background-foreground px-3 text-start text-sm text-gray"
      >
        {selectedCat?.name || placeholder}
      </button>

      {open && (
        <div className="absolute top-11 w-full rounded-md border border-border-color bg-background p-3 shadow-sm">
          {renderCategory(categories)}
        </div>
      )}
    </div>
  );
};

export default TreeDropdown;
