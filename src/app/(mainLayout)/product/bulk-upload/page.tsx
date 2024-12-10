'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import UploadSvg from '@/components/product/bulk upload/UploadSvg';
import MapFields from '@/components/product/bulk upload/MapFields';
import { useBulkUploadMutation } from '@/redux/api/productApi';

export type TMapedField = {
  key: string;
  value: string;
};

const BulkUploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [mapedFields, setMapedFields] = useState<TMapedField[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [bulkUpload] = useBulkUploadMutation();

  const handleBulkUpload = async () => {
    const formData = new FormData();
    formData.append('bulkFile', file as File);
    formData.append('mapedFields', JSON.stringify(mapedFields));

    try {
      const result = await bulkUpload(formData);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNext = () => {
    setCurrentTab((prev) => prev + 1);

    if (currentTab === 2) {
      handleBulkUpload();
    }
  };

  const handleBack = () => {
    if (currentTab === 1) {
      return;
    }
    setCurrentTab((prev) => prev - 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <h4 className="page-title">Bulk Upload</h4>
      </div>
      <div className="mx-auto mt-3 flex w-2/3 flex-col items-center gap-4 rounded-md bg-lavender-mist p-5">
        {currentTab === 1 && <UploadSvg setFile={setFile} file={file} />}
        {currentTab === 2 && (
          <MapFields
            mapedFields={mapedFields}
            setMapedFields={setMapedFields}
            file={file}
          />
        )}

        <div className="flex w-full gap-3">
          <Button
            disabled={currentTab === 1}
            className="w-full"
            variant={'secondary'}
            onClick={handleBack}
          >
            Back
          </Button>

          <Button
            onClick={handleNext}
            className="w-full"
            disabled={file === null}
          >
            {currentTab === 2 ? 'Upload' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadPage;
