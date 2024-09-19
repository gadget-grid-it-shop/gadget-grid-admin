"use client";
import CreateNewDetailsCategory from "@/components/details-category/CreateNewDetailsCategory";
import DetailsCategoryInfo from "@/components/details-category/DetailsCategoryInfo";
import DetailsCategorySkeleton from "@/components/details-category/DetailsCategorySkeleton";
import { useGetDetailsCategoriesQuery } from "@/redux/api/detailsCategory";

const DetailsCategory = () => {
  // const [data, setData] = useState<TProductCategory[] | undefined>(undefined);

  const { data, error, isLoading } = useGetDetailsCategoriesQuery(undefined)



  return (
    <>
      <div>
        <div className="flex justify-between items-center pb-4">
          <h4 className="page-title">Product Details Category </h4>
          <CreateNewDetailsCategory />
        </div>

        {!isLoading ?
          <DetailsCategoryInfo data={data.data} />
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
