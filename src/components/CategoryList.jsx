import { useContext } from "react";
import { CategoryWidgetContext } from "../provider/categoryWidget";
import Category from "./Category";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const CategoryList = () => {
  const { categories } = useContext(CategoryWidgetContext);
  if (!categories?.length) {
    return (
      <div className="flex flex-col justify-center items-center">
        <ExclamationTriangleIcon className="w-10 h-10" />
        <h3 className="text-xl">No Categories Found</h3>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {categories.map((category) => {
        return <Category key={category.id} {...category} />;
      })}
    </div>
  );
};

export default CategoryList;
