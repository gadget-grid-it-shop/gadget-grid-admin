import React, {Dispatch, SetStateAction, useState} from "react";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "../ui/dialog";
import {FiPlus} from "react-icons/fi";
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
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import {TCrud, TPermission} from "@/interface/auth.interface";
import {Switch} from "../ui/switch";

type TProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const CreateRoleModal = ({open, setOpen}: TProps) => {
  const [description, setDescription] = useState<string | undefined>("");
  const [roleName, setRoleName] = useState<string | undefined>("");
  const [permissions, setPermissions] = useState<TPermission[] | []>([]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="primary-btn">
        <FiPlus size={18} /> Create Role
      </DialogTrigger>
      <DialogContent className="max-w-[50vw]">
        <DialogTitle>Create new Role</DialogTitle>

        <div className="flex flex-col gap-2">
          <label className="text-black font-semibold text-base">Role</label>
          <Input autoFocus={true} defaultValue={roleName} type="text" onChange={(e) => setRoleName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-black font-semibold text-base">Description</label>
          <Textarea className="min-h-40" value={description} onChange={(e) => setDescription(e.target.value)} />
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
          <Button className="w-full" variant={"delete_solid"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <AlertDialog>
            <AlertDialogTrigger className="w-full">
              <Button loading={isUpdating} className="w-full">
                Update
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  <h2 className="text-red-orange pb-4">Warning: You are about to update the role and permissions.</h2>
                  <h3 className="text-sm pb-2">
                    #Role updates can significantly impact user access and capabilities across the system. Please verify the following before
                    proceeding:
                  </h3>
                  <ul className="list-decimal ps-5 text-gray text-sm">
                    <li>Double-check the permissions and access levels you are assigning.</li>
                    <li>This action may restrict or expand the user`&apos;`s ability to perform critical operations.</li>
                  </ul>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                  <Button onClick={handleUpdate} loading={isUpdating}>
                    Update
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoleModal;
