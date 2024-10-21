'use client';
import { TAdminData } from '@/interface/admin.interface';
import { globalError } from '@/lib/utils';
import { useGetSingleUserQuery } from '@/redux/api/usersApi';
import React from 'react';

const AdminDetails = ({
  params,
  // searchParams,
}: {
  params: { userId: string };
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const userId = params.userId;

  const { data, error, isLoading } = useGetSingleUserQuery({
    id: userId,
    userType: 'admin',
  });

  if (error) {
    globalError(error);
  }

  const userData: TAdminData = data?.data;

  return (
    <div>
      {!isLoading && userData && (
        <div className="flex items-center justify-between pb-4">
          <h4 className="page-title">Admin Info {`: ${userData?.fullName}`}</h4>
        </div>
      )}
    </div>
  );
};

export default AdminDetails;
