import { Dispatch, SetStateAction } from "react";
import { CartIcon } from "../icons";
import { useQuery } from "@tanstack/react-query";
import { getCurrentCustomerCartItems } from "./actions";

interface CartButtonProps {
  setOpenCart: Dispatch<SetStateAction<boolean>>;
}

const CartButton = ({ setOpenCart }: CartButtonProps) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["customerCartItems"],
    queryFn: getCurrentCustomerCartItems,
    refetchOnWindowFocus: true,
  });

  return (
    <button
      onClick={() => {
        if (!isPending) setOpenCart(true);
      }}
      className="relative"
    >
      <span className="absolute  text-sm px-2 py-0.5 rounded-full bg-[#FBF796] inline-block -top-2 -right-2">

        {
          !isPending ? data?.length || 0 :
            <span className="animate-ping inline-flex h-1 w-1 rounded-full bg-black opacity-100"></span>
        }
      </span>
      <CartIcon />
    </button>
  );
};

export default CartButton;
