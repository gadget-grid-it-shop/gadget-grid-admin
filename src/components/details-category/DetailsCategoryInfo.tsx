"use client";
import {TProductCategory} from "@/interface/category";
import {Button} from "../ui/button";
import {BiSolidEditAlt} from "react-icons/bi";
import {PiTrashSimpleFill} from "react-icons/pi";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "../ui/dialog";
import {useState} from "react";
import axios from "axios";

type TProps = {
  data: TProductCategory[];
  fetchProductCategories: () => void;
};

const DetailsCategoryInfo = ({data, fetchProductCategories}: TProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (id: string) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_URL}/product-details-category/delete/${id}`)
      .then((res) => {
        console.log(res);
        setIsOpen(false);
        fetchProductCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
      {data.length !== 0 &&
        data?.map((cat: TProductCategory) => (
          <div className="bg-light-gray p-4 rounded-md flex flex-col h-full" key={cat._id}>
            <h3 className="text-black text-lg font-semibold">{cat.name}</h3>
            <div className="flex flex-col gap-2 pt-3 flex-grow">
              {cat.fields?.map((field) => (
                <div className="text-gray bg-white px-3 py-[6px] rounded-[5px]" key={field}>
                  {field}
                </div>
              ))}
            </div>
            <div className="flex gap-3 w-full mt-3">
              <Button variant={"edit"}>
                <BiSolidEditAlt /> Edit
              </Button>
              <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
                <DialogTrigger>
                  <Button variant={"delete"}>
                    <PiTrashSimpleFill /> Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>
                    <h1 className="text-red">Detete Category</h1>
                  </DialogTitle>
                  <h3>Name: {cat.name}</h3>
                  <h2>Do you really want to delete this details category?</h2>

                  <div className="flex w-full gap-3">
                    <Button className="w-full">Cancel</Button>
                    <Button onClick={() => handleDelete(cat._id)} className="w-full" variant={"delete_solid"}>
                      Yes, delete it
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DetailsCategoryInfo;
