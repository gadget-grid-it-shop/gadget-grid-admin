"use client";
import CreateNewDetailsCategory from "@/components/details-category/CreateNewDetailsCategory";
import DetailsCategoryInfo from "@/components/details-category/DetailsCategoryInfo";
import DetailsCategorySkeleton from "@/components/details-category/DetailsCategorySkeleton";
import { globalError } from "@/lib/utils";
import { useGetDetailsCategoriesQuery } from "@/redux/api/detailsCategory";

const DetailsCategory = () => {

  const { data, error, isLoading } = useGetDetailsCategoriesQuery(undefined)


  if (!isLoading && error) {
    globalError(error)
    return <h3>error</h3>
  }

  console.log(error)

  return (
    <>
      <div>
        <div className="flex justify-between items-center pb-4 lg:flex-row max-[640px]:flex-col max-[640px]:items-start gap-2">
          <h4 className="page-title">Product Details Category </h4>
          <CreateNewDetailsCategory />
        </div>

        {!isLoading ?
          <DetailsCategoryInfo data={data?.data} />
          :
          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
            {
              Array.from({ length: 8 }, (_, i) => {
                return <DetailsCategorySkeleton key={i} />
              })
            }
          </div>
        }


        {!isLoading && data?.data?.length === 0 && <div className="h-48 flex justify-center items-center text-gray">No product details categories available</div>}

      </div>
    </>
  );
};

export default DetailsCategory;
