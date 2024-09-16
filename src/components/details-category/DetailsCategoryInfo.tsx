"use client";
import {TProductCategory} from "@/interface/category";

type TProps = {
  data: TProductCategory[];
};

const DetailsCategoryInfo = ({data}: TProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {data.length !== 0 &&
        data?.map((cat: TProductCategory) => (
          <div className="bg-light-gray p-4 rounded-md" key={cat._id}>
            <h3 className="text-black text-lg font-semibold">{cat.name}</h3>
            <div className="flex flex-col gap-2 pt-3">
              {cat.fields?.map((field) => (
                <div className="text-gray bg-white px-3 py-[6px] rounded-[5px]" key={field}>
                  {field}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DetailsCategoryInfo;
