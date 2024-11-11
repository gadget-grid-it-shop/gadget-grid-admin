import { TCategory } from '@/interface/category';
import React, { useState } from 'react';
import { Input } from '../ui/input';

type TProps = {
  categories: TCategory[];
};

const TreeDropdown = ({ categories }: TProps) => {
  const [selectedCat, setSelectedCat] = useState<TCategory | null>(null);
  const [open, setOpen] = useState(false);

  const handleCatSelect = (cat: TCategory) => {
    setSelectedCat(cat);
    setOpen(false);
  };

  const renderCategory = (categories: TCategory[]) => {
    return (
      <div className="flex flex-col items-start gap-2">
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
      <Input
        onFocus={() => setOpen(true)}
        className="bg-background-foreground"
        defaultValue={selectedCat?.name}
      ></Input>

      {open && (
        <div className="absolute w-full rounded-md border border-border-color bg-background p-3 shadow-sm">
          {renderCategory(categories)}
        </div>
      )}
    </div>
  );
};

export default TreeDropdown;
