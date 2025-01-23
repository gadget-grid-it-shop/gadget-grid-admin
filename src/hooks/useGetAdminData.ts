import { TAdminData } from '@/interface/admin.interface';
import { useGetAllAdminsQuery } from '@/redux/api/usersApi';
import { useCallback } from 'react';

const useGetAdminData = () => {
    const { data, isFetching, isLoading } = useGetAllAdminsQuery(undefined);

    const findAdmin = useCallback(
        (id: string) => {
            const adminData = data?.data || ([] as TAdminData[]);
            const admin = adminData.find(
                (a: TAdminData) => a.user?._id === id || a._id === id,
            );
            return admin;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data?.data, isLoading, isFetching],
    );

    return { findAdmin };
};
export default useGetAdminData;
