"use client";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {globalError} from "@/lib/utils";
import {TPermission, TRole} from "@/interface/auth.interface";
import {useGetRolesQuery} from "@/redux/api/rolesApi";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import TableSkeleton from "@/components/shared/TableSkeleton";
import ViewRoleModal from "@/components/roles/ViewRoleModal";
import {useAppSelector} from "@/redux/hooks";
import EditRoleModal from "@/components/roles/EditRoleModal";
import CreateRoleModal from "@/components/roles/CreateRoleModal";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

const Roles = () => {
  const {data: rolesData, isLoading, error} = useGetRolesQuery(undefined);
  const [veiwData, setViewData] = useState<TRole | null>(null);
  const [editData, setEditData] = useState<TRole | null>(null);
  const {permissions, user} = useAppSelector((s) => s.auth);
  const [createOpen, setCreateOpen] = useState(false);

  const rolePermission: TPermission | undefined = permissions.find((p) => p.feature === "role");

  if (!isLoading && error) {
    globalError(error);
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center pb-4">
        <h4 className="page-title">User Roles</h4>
        <CreateRoleModal open={createOpen} setOpen={setCreateOpen} />
      </div>

      {!isLoading && error !== undefined && <div className="h-48 flex justify-center items-center text-gray">Could not get roles</div>}

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Serial</TableHead>
              <TableHead>Role Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rolesData?.data?.map((role: TRole, i: number) => (
              <TableRow key={role._id}>
                <TableCell className="font-medium w-48">{i + 1}</TableCell>
                <TableCell className="text-primary font-semibold capitalize w-80">{role.role}</TableCell>
                <TableCell>
                  <p className="line-clamp-2 overflow-hidden text-ellipsis whitespace-normal max-w-[400px]">{role.description}</p>
                </TableCell>
                <TableCell className="flex gap-3">
                  <Button onClick={() => setViewData(role)} variant={"view_button"} size={"base"}></Button>
                  {rolePermission?.access.update && user?.role._id !== role._id && (
                    <Button onClick={() => setEditData(role)} variant={"edit_button"} size={"base"}></Button>
                  )}
                  {rolePermission?.access.delete && user?.role._id !== role._id && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={"delete_button"} size={"base"}></Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Delete this role?</DialogTitle>
                        <h2 className="text-red-orange pb-4">Warning: You are about to the role ({role.role}).</h2>
                        <h3 className="text-sm pb-2">
                          #Deleting a role will permanently remove its associated permissions and may impact all users currently assigned to this
                          role. Please ensure the following:
                        </h3>
                        <ul className="list-decimal ps-5 text-gray text-sm">
                          <li>Review which users are assigned to this role, as they will lose access associated with this role.</li>
                          <li>Consider whether there is a suitable replacement role to assign these users to</li>
                          <li>This action is irreversible and could disrupt workflows and access for affected users.</li>
                        </ul>

                        <div className="flex w-full gap-3 pt-4">
                          <Button className="w-full" variant={"delete_solid"}>
                            Cancel
                          </Button>
                          <Button className="w-full">Delete</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ViewRoleModal viewData={veiwData} setOpen={setViewData} />
      <EditRoleModal editData={editData} setOpen={setEditData} />
    </div>
  );
};

export default Roles;
