import { DataTable } from '@/components/custom/DataTable';
import { Button } from '@/components/ui/button';
import Select from '@/components/ui/select';
import { TSuccessData } from '@/interface/bulkupload.interface';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const SuccessResultTable = ({
  successData,
}: {
  successData: TSuccessData[];
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(successData.length / limit),
  );
  const [data, setData] = useState<TSuccessData[]>([]);

  useEffect(() => {
    if (page < totalPages) {
      const firstIndex = (page - 1) * limit;
      const lastIndex = firstIndex + limit;
      setData(successData.slice(firstIndex, lastIndex));
    }
  }, [page, limit, successData, totalPages]);

  useEffect(() => {
    setTotalPages(Math.ceil(successData.length / limit));
  }, [limit, successData.length]);

  const columns: ColumnDef<TSuccessData>[] = [
    {
      accessorKey: '_id',
      header: 'Serial',
      cell: ({ row }) => {
        return <p>{row.index + 1}</p>;
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        return <p>{row.getValue('name')}</p>;
      },
    },
  ];

  const handlePrev = () => {
    if (page >= 1) {
      return;
    }
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {};
  return (
    <>
      <div className="bg-lavender-mist">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-base">
          {limit * page} out of {successData.length}
        </div>
        <div className="flex">
          <Button variant={'plain'} onClick={handlePrev}>
            <FaAngleLeft /> Prev
          </Button>
          {Array.from({ length: totalPages })
            .slice(page, page + 5)
            .map((item, i: number) => {
              // if (i > page + 2 || i < page - 2) {
              //     return <Button key={i}>{i}</Button>
              // }
              return (
                <Button
                  onClick={() => setPage(i)}
                  variant={page === i ? 'default' : 'secondary'}
                  key={i}
                >
                  {i}
                </Button>
              );
            })}
          <Button variant={'plain'} onClick={handleNext}>
            {' '}
            Next <FaAngleRight />
          </Button>
        </div>

        <div>
          <Select
            data={[
              {
                label: '10 / page',
                value: 10,
              },
              {
                label: '20 / page',
                value: 20,
              },
              {
                label: '50 / page',
                value: 50,
              },
            ]}
            value={limit}
            onChange={(val) => setLimit(val as number)}
          />
        </div>
      </div>
    </>
  );
};

export default SuccessResultTable;
