import { DataTable } from '@/components/custom/DataTable';
import { TSuccessData } from '@/interface/bulkupload.interface';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

const SuccessResultTable = ({
  successData,
}: {
  successData: TSuccessData[];
}) => {
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(successData.length / limit),
  );
  const [data, setData] = useState<TSuccessData[]>([]);

  console.log(setPage, setLimit);

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

  return (
    <>
      <div className="bg-lavender-mist">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default SuccessResultTable;
