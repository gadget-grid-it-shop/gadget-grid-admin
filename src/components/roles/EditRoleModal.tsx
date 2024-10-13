import {TCrud, TPermission, TRole} from "@/interface/auth.interface";
import React, {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTitle} from "../ui/dialog";
import {Switch} from "../ui/switch";
import {Textarea} from "../ui/textarea";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

type TProps = {
  editData: TRole | null;
  setOpen: React.Dispatch<React.SetStateAction<null | TRole>>;
};

const EditRoleModal = ({editData, setOpen}: TProps) => {
  const [description, setDescription] = useState<string | undefined>("");
  const [roleName, setRoleName] = useState<string | undefined>("");
  const [permissions, setPermissions] = useState<TPermission[] | []>([]);

  useEffect(() => {
    if (editData) {
      setPermissions(editData.permissions);
      setRoleName(editData.role);
      setDescription(editData.description);
    }
  }, [editData]);

  const handleChange = (feature: string, accessName: keyof TCrud) => {
    console.log(feature, accessName);

    if (permissions.length > 0) {
      setPermissions((prev) => {
        return prev.map((permission: TPermission) => {
          if (permission.feature === feature) {
            const updatedAccess = {
              ...permission.access,
              [accessName]: !permission.access[accessName],
            };

            return {
              ...permission,
              access: updatedAccess,
            };
          } else {
            return permission;
          }
        });
      });
    }
  };

  return (
    <div>
      <Dialog open={editData !== null} onOpenChange={() => setOpen(null)}>
        <DialogContent className="max-w-[50vw]">
          <DialogTitle>Edit Role</DialogTitle>
          <div className="flex flex-col gap-2">
            <label className="text-black font-semibold text-base">Role</label>
            <Input defaultValue={roleName} type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black font-semibold text-base">Description</label>
            <Textarea
              className="min-h-40"
              value={description}
              defaultValue={editData?.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <h3 className="text-black font-semibold text-base">Permissions:</h3>
            <div className="pt-2 grid lg:grid-cols-3 gap-2">
              {permissions?.length > 0 &&
                permissions?.map((permission: TPermission) => (
                  <div className="p-3 rounded-md bg-background" key={permission.feature}>
                    <h4 className="capitalize border-b border-border-color pb-2 mb-3 font-semibold">{permission.feature}</h4>
                    <div>
                      {Object.entries(permission.access as TCrud).map((entry) => {
                        const acc = entry as [keyof TCrud, boolean];
                        return (
                          <div key={acc[0]} className="flex items-center justify-between">
                            <span className="text-gray">{acc[0]}:</span>
                            <Switch onCheckedChange={() => handleChange(permission.feature, acc[0])} checked={acc[1] === true} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex w-full gap-3 pt-4">
            <Button className="w-full" variant={"delete_solid"} onClick={() => setOpen(null)}>
              Cancel
            </Button>
            <AlertDialog>
              <AlertDialogTrigger className="w-full">
                <Button className="w-full">Update</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Update</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditRoleModal;
