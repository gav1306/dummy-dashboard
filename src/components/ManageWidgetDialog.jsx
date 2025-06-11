import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { CategoryWidgetContext } from "../provider/categoryWidget";
import { ExclamationTriangleIcon, TrashIcon } from "@radix-ui/react-icons";
import RemoveDialog from "./dialog/Remove";

const ManageWidgetDialog = ({
  children,
  categoryName,
  categoryId,
  widgets,
}) => {
  const { updateWidgets } = useContext(CategoryWidgetContext);
  const [widgetList, setWidgetList] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const updateWidgetVisibilityHandler = (widgetId) => {
    const updatedWidgets = [...widgetList];
    const selectedWidget = updatedWidgets.find((widget) => {
      return widget.id === widgetId;
    });
    selectedWidget.isVisible = !selectedWidget.isVisible;

    setWidgetList(updatedWidgets);
  };

  const removeWidgetHandler = (widgetId) => {
    const updatedWidgets = [...widgetList];

    const widgetUpdatedList = updatedWidgets.map((widget) =>
      widget.id === widgetId ? { ...widget, delete: true } : widget
    );
    setWidgetList(widgetUpdatedList);
  };

  const saveHandler = () => {
    const newWidgetList = widgetList.filter((widget) => !widget.delete);
    updateWidgets(newWidgetList, categoryId);
    setOpen(false);
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (open) {
      setSearch("");
      setWidgetList(structuredClone(widgets));
    }
  }, [open, widgets]);

  const filteredWidgets = widgetList.filter((widget) => {
    return widget.name.toLowerCase().startsWith(search.toLowerCase());
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-[400px] h-full flex flex-col">
        <SheetHeader className="">
          <SheetTitle className="capitalize">{categoryName}</SheetTitle>
          <Input placeholder="search your widgets" onChange={searchHandler} />
        </SheetHeader>
        <div className="flex-1">
          <div className="grid gap-2 py-4">
            <SheetDescription>Your widgets:</SheetDescription>
            {filteredWidgets.length ? (
              filteredWidgets.map((widget) => {
                return (
                  <div
                    className="flex items-center justify-between"
                    key={widget.id}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={widget.id}
                        onCheckedChange={updateWidgetVisibilityHandler.bind(
                          null,
                          widget.id
                        )}
                        checked={widget.isVisible}
                        disabled={widget.delete}
                      />
                      <label
                        htmlFor={widget.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                      >
                        {widget.name}
                      </label>
                    </div>

                    {!widget.delete && (
                      <RemoveDialog
                        item={widget.name}
                        onConfirm={() => removeWidgetHandler(widget.id)}
                      >
                        <Button
                          className="h-7 w-7"
                          size="icon"
                          variant="outline"
                        >
                          <TrashIcon />
                        </Button>
                      </RemoveDialog>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col justify-center items-center">
                <ExclamationTriangleIcon className="h-5 w-5" />
                <span>no widgets found</span>
              </div>
            )}
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="destructive">Cancel</Button>
          </SheetClose>
          <Button onClick={saveHandler}>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ManageWidgetDialog;
