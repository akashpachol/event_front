import React from "react";
import { cn } from "../../../../animation/cn";
import { vender } from "../../../../utils/types";
import { NavigateFunction, useNavigate } from "react-router-dom";

type BentoGridProps = {
  className?: string;
  children?: React.ReactNode;
};
export const BentoGrid: React.FC<BentoGridProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3  gap-4 w-full ",
        className
      )}
    >
      {children}
    </div>
  );
};
interface BentoGridItemProps {
  item: vender;
}
export const BentoGridItem: React.FC<BentoGridItemProps> = ({ item }) => {
  const navigate: NavigateFunction = useNavigate();

  const handleView = (id: string | undefined) => {
    navigate("/vender/viewVender", { state: id });
  };

  const handleEdit = (id: string | undefined) => {
    console.log(id);
    navigate("/vender/editVender", { state: { item } });
  };

  return (
    <div
      className={cn(
        " rounded-xl group/bento hover:shadow-2xl transition duration-600 shadow-input  p-4   bg-gray-100 border border-transparent justify-between flex flex-col space-y-4"
      )}
    >
      {item?.image && (
        <img
          src={item.image[0]}
          className="w-full transition-transform duration-700 ease-in-out transform hover:scale-105"
          alt=""
          height={400}
        />
      )}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {item.name}
        </div>
        <div className="font-sans font-semibold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {item.price}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {item.description}
        </div>

        <div className="flex mt-5">
          <button
            className="me-5 text-gray-700 hover:text-black border border-gray-700 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
            onClick={() => handleView(item._id)}
          >
            view
          </button>
          <button
            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2 "
            onClick={() => handleEdit(item._id)}
          >
            edit
          </button>
        </div>
      </div>
    </div>
  );
};
