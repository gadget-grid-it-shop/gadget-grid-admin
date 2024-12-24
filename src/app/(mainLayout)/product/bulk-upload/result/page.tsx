'use client';
import SuccessResultTable from '@/components/product/uploadResults/SuccessResultTable';
import TableSkeleton from '@/components/shared/TableSkeleton';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TBulkUploadHistory } from '@/interface/bulkupload.interface';
import { globalError } from '@/lib/utils';
import { useGetAllUploadHistoryQuery } from '@/redux/api/bulkUploadApi';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';

const BulkUploadResultPage = () => {
  const { data, error, isLoading } = useGetAllUploadHistoryQuery(undefined);
  const [activeHistory, setActiveHistory] = useState<TBulkUploadHistory | null>(
    null,
  );
  const router = useRouter();

  if (error) {
    globalError(error);
  }

  const handleHistoryOpen = (history: TBulkUploadHistory) => {
    if (activeHistory && activeHistory._id === history._id) {
      setActiveHistory(null);
    } else {
      setActiveHistory(history);
    }
  };

  return (
    <div>
      <Tabs defaultValue="upload-history" className="mb-4 w-[400px]">
        <TabsList>
          <TabsTrigger
            onClick={() => router.push('/product/bulk-upload')}
            value="bulk-upload"
          >
            Bulk upload
          </TabsTrigger>
          <TabsTrigger
            onClick={() => router.push('/product/bulk-upload/result')}
            value="upload-history"
          >
            Upload History
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Serial</TableHead>
              <TableHead>Total Data</TableHead>
              <TableHead>Successfull</TableHead>
              <TableHead>Fails</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((history: TBulkUploadHistory, i: number) => (
              <>
                <TableRow key={history?._id}>
                  <TableCell>
                    <p className="max-w-20">{i + 1}</p>
                  </TableCell>
                  <TableCell>{`${history.totalUploads}`}</TableCell>
                  <TableCell className="flex items-center gap-3">
                    {history.successData?.length}
                  </TableCell>

                  <TableCell className="font-semibold">
                    {history.withError?.length}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span>
                        {dayjs(history.createdAt).format('DD MMM, YYYY')}
                      </span>
                      <span className="text-xs">
                        {dayjs(history.createdAt).format('hh:mm A')}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>
                      <Avatar />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="icon"
                        size={'sm'}
                        onClick={() => handleHistoryOpen(history)}
                      >
                        <FaAngleDown
                          className={`${history._id === activeHistory?._id ? 'rotate-180 text-bright-cyan' : ''} transition-all`}
                          size={18}
                        />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {activeHistory?._id === history._id && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="rounded-sm">
                        <h3 className="text-lg font-semibold">
                          Successfull Uploads
                        </h3>
                        <SuccessResultTable
                          successData={activeHistory?.successData || []}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BulkUploadResultPage;
