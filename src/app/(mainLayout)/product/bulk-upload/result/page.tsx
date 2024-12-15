'use client';
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
import { useRouter } from 'next/navigation';
import React from 'react';

const BulkUploadResultPage = () => {
  const { data, error } = useGetAllUploadHistoryQuery(undefined);
  const router = useRouter();

  if (error) {
    globalError(error);
  }
  console.log(data);
  return (
    <div>
      <Tabs defaultValue="upload-history" className="w-[400px]">
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            {/* <TableHead className="">Title</TableHead> */}
            <TableHead className="text-right">Total Data</TableHead>
            <TableHead>Total Successes</TableHead>
            <TableHead>Total Fails</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((history: TBulkUploadHistory, i: number) => (
            <div key={history._id}>
              <TableRow className="w-full">
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell className="font-medium">
                  {history.totalUploads}
                </TableCell>
              </TableRow>
            </div>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BulkUploadResultPage;
