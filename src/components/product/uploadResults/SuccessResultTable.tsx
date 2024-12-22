import { DataTable } from '@/components/custom/DataTable';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import { TSuccessData } from '@/interface/bulkupload.interface';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

const SuccessResultTable = ({
  successData,
}: {
  successData: TSuccessData[];
}) => {
  const [data, setData] = useState<TSuccessData[]>([]);

  useEffect(() => {
    setData(successData.slice(0, 20));
  }, [successData]);

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
    {
      accessorKey: '',
      header: 'Actions',
      cell: ({ row }) => {
        const id = row.getValue('_id');
        console.log(id);
        return (
          <div className="flex gap-2">
            <Button variant={'view_button'} size={'base'} />
            <Button variant={'edit_button'} size={'base'} />
          </div>
        );
      },
    },
  ];

  const handlePageChange = (page: number, limit: number) => {
    const firstIndex = (page - 1) * limit;
    const lastIndex = firstIndex + limit;
    setData(successData.slice(firstIndex, lastIndex));
  };

  return (
    <>
      <div className="bg-white px-3 py-1">
        <DataTable columns={columns} data={data} />
        <Pagination
          itemsPerPage={20}
          totalItems={successData.length}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default SuccessResultTable;
