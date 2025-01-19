import { TAddress, TRole, TUser, TUserName } from './auth.interface';

export type TAdminData = {
    _id: string;
    address: TAddress;
    email: string;
    name: TUserName;
    role: TRole;
    phoneNumber: string;
    user: TUser;
    profilePicture: string;
    fullName?: string;
};
