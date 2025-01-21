import { TAdminData } from '@/interface/admin.interface';
import { useGetAllAdminsQuery } from '@/redux/api/usersApi';
import { useMemo } from 'react';

const useGetAdminData = () => {
    const { data } = useGetAllAdminsQuery(undefined);

    const adminData = data?.data || ([] as TAdminData[]);

    const findAdmin = (id: string) => {
        const admin = adminData.find(
            (a: TAdminData) => a.user?._id === id || a._id === id,
        );
        return admin;
    };

    return useMemo(() => findAdmin, []);
};

export default useGetAdminData;
