"use client";
import CreateNewDetailsCategory from "@/components/details-category/CreateNewDetailsCategory";
import DetailsCategoryInfo from "@/components/details-category/DetailsCategoryInfo";
import DetailsCategorySkeleton from "@/components/details-category/DetailsCategorySkeleton";
import { TProductCategory } from "@/interface/category";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DetailsCategory = () => {
  const [data, setData] = useState<TProductCategory[] | undefined>(undefined);

  const fetchProductCategories = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/product-details-category/get-all`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProductCategories();
  }, []);

  console.log(data);

  return (
    <>
      <div>
        <div className="flex justify-between items-center pb-4">
          <h4 className="page-title">Product Details Category </h4>
          <CreateNewDetailsCategory fetchProductCategories={fetchProductCategories} />
        </div>

        {data ?
          <DetailsCategoryInfo fetchProductCategories={fetchProductCategories} data={data} />
          :
          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
            {
              Array.from({ length: 8 }, (_, i) => {
                return <DetailsCategorySkeleton key={i} />
              })
            }
          </div>
        }
      </div>
    </>
  );
};

export default DetailsCategory;
