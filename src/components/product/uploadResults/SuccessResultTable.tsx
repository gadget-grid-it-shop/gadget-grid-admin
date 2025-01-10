import { DataTable } from '@/components/custom/DataTable';
import Pagination from '@/components/ui/pagination';
import { TSuccessData } from '@/interface/bulkupload.interface';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

const SuccessResultTable = ({
    successData,
    columns,
}: {
    successData: TSuccessData[];
    columns: ColumnDef<TSuccessData>[];
}) => {
    const [data, setData] = useState<TSuccessData[]>([]);
    const [currentPage] = useState(1);

    useEffect(() => {
        setData(successData.slice(0, 20));
    }, [successData]);

    const handlePageChange = (page: number, limit: number) => {
        const firstIndex = (page - 1) * limit;
        const lastIndex = firstIndex + limit;
        setData(successData.slice(firstIndex, lastIndex));
    };

    console.log(data);

    return (
        <>
            <div className='bg-white px-3 py-1'>
                <DataTable
                    tableName='update-result-table'
                    columns={columns}
                    data={data}
                />
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={20}
                    totalItems={successData.length}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
};

export default SuccessResultTable;
