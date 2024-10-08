"use client";

import CategorySkeleton from "@/components/categories/CategorySkeleton";
import CreateCategory from "@/components/categories/CreateCategory";
import EditCategory from "@/components/categories/EditCategory";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TCategory } from "@/interface/category";
import { globalError } from "@/components/utilities/utils";
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "@/redux/api/categories";
import React, { useState } from "react";
import { FaAngleDown, FaTrash } from "react-icons/fa6";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { LuLocate } from "react-icons/lu";
import { toast } from "sonner";

export interface TParentCat {
  name: string,
  id: string
}

interface TDeleteOpen {
  open: boolean,
  id: string,
  name?: string
}

const Category = () => {
  const [openCategoryIds, setOpenCategoryIds] = useState<string[] | []>([]);
  const [open, setOpen] = useState(false);
  const { data: categoryData, error, isLoading } = useGetAllCategoriesQuery(true);
  const [editOpen, setEditOpen] = useState(false)
  const [deleteCategory] = useDeleteCategoryMutation()
  const [editCategory, setEditCategory] = useState<TCategory | null>(null)
  const [deleteOpen, setDeleteOpen] = useState<TDeleteOpen>({
    open: false,
    id: ''
  })

  if (!isLoading && error) {
    globalError(error)
  }

  const [parent, setParent] = useState<TParentCat>({
    name: '',
    id: ''
  })

  const categories = categoryData?.data || [];

  const handleArrowClick = (e: React.MouseEvent, id: string, hasChildern: boolean) => {
    e.stopPropagation();

    if (!hasChildern) {
      return;
    }

    const open = openCategoryIds.find((openId) => openId === id);

    if (open) {
      setOpenCategoryIds((prev) => prev.filter((openId) => openId !== id));
    } else {
      setOpenCategoryIds((prev) => {
        return [...prev, id];
      });
    }
  };


  const handleAddClick = (parent_id: string, name: string) => {
    setParent({
      name: name,
      id: parent_id
    })
    setOpen(true)
  }

  const handleDeleteClick = async (id: string, name: string, hasChild: boolean) => {
    if (hasChild) {
      toast.warning('This category has sub-categories. You have to delete the sub-categories first')
      return
    }

    setDeleteOpen({
      open: true,
      id: id,
      name
    })
  }

  const handleDelete = async () => {
    try {
      const result = await deleteCategory(deleteOpen.id).unwrap()

      if (result.success) {
        toast.success(result.message)
        setDeleteOpen({
          open: false,
          id: ""
        })
      }
    }
    catch (err) {
      console.log(err)
    }
  }



  const renderCategory = (categories: TCategory[], level: number) => {
    return (
      <div className="">
        {categories?.map((category) => {
          const isSubCatOpen = openCategoryIds.find((id) => id === category._id);
          const { subCategories } = category;

          return (
            <div key={category._id} className={`rounded-md py-3 px-3 my-2 ${level === 0 ? "px-3" : "pt-2"} ${level === 1 ? 'bg-background mx-3 p-3' : 'bg-background-foreground'}`}>
              {level === 1 && <h2 className="pb-3 ps-6 text-center text-base">Subcategories</h2>}
              {level === 2 && <h2 className="pb-3 ps-12 text-center text-base">Brands</h2>}
              <div className="grid grid-cols-2">
                <button
                  onClick={(e) => handleArrowClick(e, category._id, subCategories.length > 0)}
                  style={{ paddingLeft: `${level * 20}px` }}
                  className={`font-semibold text-black flex items-center gap-3`}
                >
                  <div
                    className={`size-7 flex justify-center items-center rounded-full bg-background text-sm ${isSubCatOpen && "text-primary bg-lavender-mist"
                      }`}
                  >
                    {subCategories.length > 0 ? <FaAngleDown className={`${isSubCatOpen && "rotate-180 transition-all"}`} /> : <LuLocate />}
                  </div>
                  {category.name}
                </button>
                <div className="flex justify-between">
                  <h2>10</h2>
                  <div className="flex gap-2">
                    {
                      level <= 1 && <Button onClick={() => handleAddClick(category._id, category.name)} variant={"default"} size={"sm"}>
                        <FiPlus size={14} />
                      </Button>
                    }

                    {/* edit category */}
                    <Button onClick={() => {
                      setEditCategory(category)
                      setEditOpen(true)
                    }} variant={"edit"} size={"sm"}>
                      <FiEdit3 />
                    </Button>


                    {category.subCategories && category.subCategories.length === 0 && (
                      <Button onClick={() => handleDeleteClick(category._id, category.name, category.subCategories.length !== 0)} variant={"delete_solid"} size={"sm"}>
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
        <CreateCategory open={open} setOpen={setOpen} parent={parent} setParent={setParent} />
      </div>

      <div className="grid grid-cols-2 bg-lavender-mist font-semibold text-md rounded-md p-4">
        <h2>Name</h2>
        <div className="flex justify-between">
          <h2>Products</h2>
          <h2>Actions</h2>
        </div>
      </div>

      {isLoading && <CategorySkeleton />}

      <div className="mt-3 rounded-md">{!isLoading && categories.length > 0 && renderCategory(categories, 0)}</div>
      {!isLoading && !error && <div className="h-48 flex justify-center items-center text-gray">No categories available</div>}




      {/*====================== edit category modal===================== */}

      <Dialog open={editOpen} onOpenChange={() => setEditOpen(!editOpen)}>
        <DialogTrigger asChild>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit Category</DialogTitle>
          <EditCategory category={editCategory} editOpen={editOpen} setEditOpen={setEditOpen} />
        </DialogContent>
      </Dialog>



      {/*====================== delete category modal===================== */}

      <Dialog open={deleteOpen.open} onOpenChange={() => setDeleteOpen({ open: false, id: '' })}>

        <DialogContent>
          <DialogTitle className="text-red">
            Delete Category
          </DialogTitle>

          <div>
            <h3 className="text-gray pb-3">Name: {deleteOpen.name}</h3>
            <DialogDescription className="text-gray">Do you really want to delete this category?</DialogDescription>

            <div className="flex w-full gap-3 pt-4">
              <Button className="w-full" onClick={() => setDeleteOpen({ open: false, id: "" })}>
                Cancel
              </Button>
              <Button onClick={handleDelete} className="w-full" variant={"delete_solid"}>
                Yes, delete it
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Category;
