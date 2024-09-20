"use client";

import CategorySkeleton from "@/components/categories/CategorySkeleton";
import CreateCategory from "@/components/categories/CreateCategory";
import {Button} from "@/components/ui/button";
import {TCategory} from "@/interface/category";
import {useGetAllCategoriesQuery} from "@/redux/api/categories";
import React, {useState} from "react";
import {FaAngleDown, FaTrash} from "react-icons/fa6";
import {FiEdit3, FiPlus} from "react-icons/fi";
import {LuLocate} from "react-icons/lu";

const Category = () => {
  const [openCategoryIds, setOpenCategoryIds] = useState<string[] | []>([]);
  const {data: categoryData, error, isLoading} = useGetAllCategoriesQuery(undefined);

  const categories = categoryData?.data;

  const handleArrowClick = (e: React.MouseEvent, id: string, hasChildern: boolean) => {
    e.stopPropagation();

    if (!hasChildern) {
      return;
    }

    console.log(id);
    const open = openCategoryIds.find((openId) => openId === id);

    if (open) {
      setOpenCategoryIds((prev) => prev.filter((openId) => openId !== id));
    } else {
      setOpenCategoryIds((prev) => {
        return [...prev, id];
      });
    }
  };

  const renderCategory = (categories: TCategory[], level: number) => {
    return (
      <div className="">
        {categories?.map((category) => {
          const isSubCatOpen = openCategoryIds.find((id) => id === category._id);
          const {subCategories} = category;

          return (
            <div key={category._id} className={`rounded-md my-2 bg-background-foreground ${level === 0 ? "px-3 py-3" : "pt-2"}`}>
              <div className="grid grid-cols-2">
                <button
                  onClick={(e) => handleArrowClick(e, category._id, subCategories.length > 0)}
                  style={{paddingLeft: `${level * 20}px`}}
                  className={`font-semibold text-black flex items-center gap-3`}
                >
                  <div
                    className={`size-7 flex justify-center items-center rounded-full bg-background text-sm ${
                      isSubCatOpen && "text-primary bg-lavender-mist"
                    }`}
                  >
                    {subCategories.length > 0 ? <FaAngleDown className={`${isSubCatOpen && "rotate-180 transition-all"}`} /> : <LuLocate />}
                  </div>
                  {category.name}
                </button>
                <div className="flex justify-between">
                  <h2>10</h2>
                  <div className="flex gap-2">
                    <Button variant={"default"} size={"sm"}>
                      <FiPlus size={14} />
                    </Button>
                    <Button variant={"edit"} size={"sm"}>
                      <FiEdit3 />
                    </Button>
                    {category.subCategories && category.subCategories.length === 0 && (
                      <Button variant={"delete_solid"} size={"sm"}>
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {isSubCatOpen && category.subCategories && category.subCategories?.length !== 0 && renderCategory(category.subCategories, level + 1)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="text-black">
      <div className="flex justify-between items-center pb-4">
        <h4 className="page-title">Categories</h4>
        <CreateCategory />
      </div>

      <div className="grid grid-cols-2 bg-lavender-mist font-semibold text-md rounded-md p-4">
        <h2>Name</h2>
        <div className="flex justify-between">
          <h2>Products</h2>
          <h2>Actions</h2>
        </div>
      </div>

      <div className="mt-3 rounded-md">{!isLoading && !error ? renderCategory(categories, 0) : <CategorySkeleton />}</div>
    </div>
  );
};

export default Category;
