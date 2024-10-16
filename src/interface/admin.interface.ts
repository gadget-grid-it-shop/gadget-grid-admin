import { TAddress, TUser, TUserName } from "./auth.interface"

export type TAdminData = {
    _id: string,
    address: TAddress,
    email: string,
    name: TUserName,
    role: {
        role: string,
        isDeleted: boolean
    },
    phoneNumber: string,
    user: TUser,
    profilePicture: string
}