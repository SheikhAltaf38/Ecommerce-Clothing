import { shoppingViewHeaderMenuItems } from "@/config";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  HousePlug,
  LogOut,
  Menu,
  MessageSquare,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { logoutUser } from "@/store/authSlice";
import { toast } from "@/hooks/use-toast";
import CartWrapper from "./CartWrapper";

const MenuItems = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState();
  function handleNavigate(getCurrentMenuItem) {
    console.log(getCurrentMenuItem);
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }
  return (
    <div
      className="flex flex-col  lg:flex-row lg:justify-center lg:items-center lg:gap-8
    my-2 ml-1 gap-2 "
    >
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          key={menuItem.id}
          onClick={() => handleNavigate(menuItem)}
          className="text-md text-gray-100 font-semibold drop-shadow-md cursor-pointer
            hover:text-white hover:shadow-lg transition-all duration-300 hover:shadow-black-500/50
            hover:scale-110  "
        >
          {menuItem.label}
        </Label>
      ))}
    </div>
  );
};
const HeaderRightContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  //  console.log(user);
  // console.log(cartItems);

  function handleLogout() {
    dispatch(logoutUser()).then((data) => {
      if (data?.payload?.success) {
        navigate("/auth/login");
        toast({
          variant: "outline",
          title: data.payload.message,
        });
      }
    });
  }
  return (
    <>
      <div className="flex justify-end items-center gap-4 ">
        <Sheet
          open={openCartSheet}
          onOpenChange={(open) => setOpenCartSheet(open)}
        >
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              // onClick={() => setOpenCartSheet(true)}
              className="relative hover:scale-105 transition-all duration-150"
            >
              <ShoppingCart className="" />
              <span
                className="absolute -top-1 -right-1 font-bold text-xs text-white bg-red-500 rounded-full
              h-5 w-5 flex justify-center items-center "
              >
                3
              </span>
            </Button>
          </SheetTrigger>
          <CartWrapper
            cartItems={cartItems}
            setOpenCartSheet={setOpenCartSheet}
          />
        </Sheet>
        <DropdownMenu className="">
          <DropdownMenuTrigger asChild>
            <Avatar className=" text-white hover:scale-105 transition-all duration-150">
              <AvatarFallback className="bg-black font-extrabold hover:text-scale-110">
                {user.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="flex items-center gap-2 ">
              <span className="text-lg font-bold ">Login in as username</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigate("/shop/account");
              }}
              className="flex items-center gap-2 text-md font-semibold"
            >
              <UserCog className="mr-2 w-4 h-4" /> <span> Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 text-md font-semibold"
            >
              <LogOut className="mr-2 w-4 h-4" /> <span> Logout</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

const Header = () => {
  return (
    <header className="sticky top-0 w-full bg-background overflow-hidden z-50">
      <nav
        className="md:bg-gradient-to-tr md:from-green-500 md:to-emerald-600 drop-shadow-md 
    md:hover:shadow-green-500/50 hover:shadow-lg hover:shadow-orange-500/70 transition-all duration-300 
     ce-y-2 bg-gradient-to-r from-orange-400 to-pink-500 
     lg:bg-gradient-to-r lg:from-cyan-400 lg:to-blue-500 lg:hover:shadow-cyan-500/50 
     flex items-center justify-between p-1
     z-50 sticky top-0 "
      >
        <div className="flex justify-between items-center w-full">
          <Link
            to="/shop/home"
            className="flex items-center gap-2 cursor-pointer"
          >
            <HousePlug className="h-8 w-8 rounded-full text-white " />
            <span className="font-bold text-2xl bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Ecommerce
            </span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu />
                <VisuallyHidden>
                  <DialogTitle>Toggle header menu</DialogTitle>
                </VisuallyHidden>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right "
              className="flex bg-gradient-to-tr from-pink-400 to-orange-600 md:from-green-400 md:to-emerald-600 
          rounded-lg z-50  fixed right-0 top-11 "
            >
              <div className="">
                <MenuItems />
              </div>
              <div className="mt-4">
                {" "}
                <HeaderRightContent />
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden lg:block">
            <MenuItems />
          </div>
          <div className="hidden lg:block">
            <HeaderRightContent />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
