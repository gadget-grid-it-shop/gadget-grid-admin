import { TCategory } from '@/interface/category';
import { useGetAllCategoriesQuery } from '@/redux/api/categories';
import React, { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';

export interface TProductCategory {
  main: boolean;
  id: string;
}

type TProps = {
  categories: TCategory[];
  placeholder?: string;
  onSelect: (ids: TProductCategory[] | []) => void;
  value: TProductCategory[];
};

const TreeDropdown = ({
  categories,
  placeholder = 'Select Category',
  onSelect,
  value,
}: TProps) => {
  const [selectedCat, setSelectedCat] = useState<TProductCategory[]>(value);
  const { data: categoryArray } = useGetAllCategoriesQuery(false);
  const [open, setOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<string>();

  const createCategoryArray = (
    categoryArray: TCategory[],
    selected: TCategory | undefined,
    data: TProductCategory[] = [],
  ) => {
    if (!selected) {
      return;
    }

    if (selected.parent_id) {
      data.push({
        main: data.length === 0,
        id: selected._id,
      });
      const parent = categoryArray?.find(
        (cat: TCategory) => cat._id === selected.parent_id,
      );
      createCategoryArray(categoryArray, parent, data);
    } else {
      data.push({
        main: data.length === 0,
        id: selected._id,
      });
    }

    return data;
  };

  useEffect(() => {
    const cat: TCategory = categoryArray?.data?.find(
      (c: TCategory) => c._id === selectedCat.find((s) => s.main)?.id,
    );
    if (cat) {
      setActiveCat(cat.name);
    }
  }, [selectedCat]);

  const handleCatSelect = (cat: TCategory) => {
    setOpen(false);

    const productCat = createCategoryArray(categoryArray.data, cat);

    onSelect(productCat || []);
    setSelectedCat(productCat || []);

    console.log(productCat);
  };

  useEffect(() => {
    const handleClick = () => {
      setOpen(false);
    };

    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, []);

  console.log(activeCat);

  const renderCategory = (categories: TCategory[]) => {
    return (
      <div className="flex flex-col items-start text-gray">
        {categories?.map((cat) => (
          <div key={cat._id}>
            <button
              onClick={() => handleCatSelect(cat)}
              className={`${selectedCat.find((c) => c.id === cat._id) ? 'text-primary' : 'text-gray'} flex items-center gap-2 pt-1 text-gray`}
            >
              {cat.subCategories?.length !== 0 && <FaAngleDown />}
              <span
                className={`${cat.parent_id && cat.subCategories?.length === 0 && 'ps-4'} text-inherit`}
              >
                {cat.name}
              </span>
            </button>
            {cat.subCategories?.length !== 0 && (
              <div className="ps-8">{renderCategory(cat.subCategories)}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          setOpen(!open);
          e.stopPropagation();
        }}
        className="h-10 w-full rounded-md bg-background-foreground px-3 text-start text-sm text-gray"
      >
        {activeCat || placeholder}
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
