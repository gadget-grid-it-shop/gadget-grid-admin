import {TPermission, TRole} from "@/interface/auth.interface";
import React from "react";
import {Dialog, DialogContent, DialogDescription, DialogTitle} from "../ui/dialog";
import {Switch} from "../ui/switch";

type TProps = {
  viewData: TRole | null;
  setOpen: React.Dispatch<React.SetStateAction<null | TRole>>;
};

const ViewRoleModal = ({viewData, setOpen}: TProps) => {
  return (
    <div>
      <Dialog open={viewData !== null} onOpenChange={() => setOpen(null)}>
        <DialogContent className="2xl:max-w-[50vw] xl:max-w-[60vw] md:max-w-[70vw] sm:max-w-[80vw] w-[90vw]">
          <DialogTitle>Role Details</DialogTitle>
          <DialogDescription className="capitalize font-semibold text-base">
            <h3>
              Role: <span className="text-primary">{viewData?.role}</span>
            </h3>
          </DialogDescription>

          <div>
            <h3 className="text-black font-semibold text-base">Description:</h3>
            <p className="border border-border-color bg-background p-4 rounded-md mt-3 text-gray whitespace-pre-wrap">{viewData?.description}</p>
          </div>

          <div>
            <h3 className="text-black font-semibold text-base">Permissions:</h3>
            <div className="pt-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
              {viewData?.permissions.map((permission: TPermission) => (
                <div className="p-3 rounded-md bg-background" key={permission.feature}>
                  <h4 className="capitalize border-b border-border-color pb-2 mb-3 font-semibold">{permission.feature}</h4>
                  <div>
                    {Object.entries(permission.access).map((acc: [string, boolean]) => {
                      console.log(acc);
                      return (
                        <div key={acc[0]} className="flex items-center justify-between">
                          <span className="text-gray">{acc[0]}</span> : <Switch checked={acc[1] === true} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewRoleModal;
