import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const RemoveDialog = ({ children, item, onConfirm, action = "delete" }) => {
  const [open, setOpen] = useState(false);

  const closeDialogHandler = () => {
    if (onConfirm) onConfirm();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">Confirm {action}</DialogTitle>
          <DialogDescription>
            <span className="font-medium">
              This will {action} the {item} and its content.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={closeDialogHandler}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveDialog;
