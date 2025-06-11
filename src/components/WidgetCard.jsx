import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { CategoryWidgetContext } from "../provider/categoryWidget";
import RemoveDialog from "./dialog/Remove";

const Widget = (props) => {
  const { toggleWidget } = useContext(CategoryWidgetContext);
  const { name, description, id, categoryId } = props;
  const handleConfirmDelete = () => {
    toggleWidget({ categoryId, id });
  };
  return (
    <Card className="w-[350px] h-[200px] p-2">
      <CardHeader className="flex flex-row justify-between items-center p-2">
        <CardTitle className="font-normal text-center">{name}</CardTitle>
        <RemoveDialog item={name} action="hide" onConfirm={handleConfirmDelete}>
          <Button variant="ghost" size="icon">
            <Cross1Icon />
          </Button>
        </RemoveDialog>
      </CardHeader>
      <CardContent className="p-2">
        <p className="mt-2 text-sm leading-normal">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Widget;
