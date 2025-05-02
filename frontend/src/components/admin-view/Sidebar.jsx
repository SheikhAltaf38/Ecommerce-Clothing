import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription
} from "@/components/ui/sheet"
const adminSidebarMenuItems =[
  {
    id:"dashboard",
    label : "Dashboard",
    path:"/admin/dashboard",
    icon:<LayoutDashboard />
  },
  {
    id:"products",
    label : "products",
    path:"/admin/products",
    icon:<ShoppingBasket />
  },
  {
    id:"orders",
    label : "orders",
    path:"/admin/orders",
    icon:<BadgeCheck />
  },
];

function MenuItems({setOpen}){
  const navigate = useNavigate();
  return (
   <nav className='flex flex-col w-full gap-2 '>
  {adminSidebarMenuItems.map((menuItem)=>(
     <div key={menuItem.id}
       onClick={()=>{
        navigate(menuItem.path)
        setOpen ? setOpen(false): null
       }}       
        className='flex items-center cursor-pointer p-2 rounded text-muted-foreground hover:text-foreground hover:bg-muted
        gap-2 hover:scale-105 transition-all duration-150 text-xl ml-1'>
        {menuItem.icon }
       <span className=''> {menuItem.label}</span> 
     </div>
  ))}
  </nav>
)
}
const AdminSidebar = ({open , setOpen}) => {
  const navigate = useNavigate()
  return (
    <div className='border-r-2 min-h-screen '>
    <Sheet open={open} onOpenChange={setOpen}>
    
      <SheetContent side="left" className="w-64 flex flex-col ">
        <SheetHeader className="border-b ">
          <SheetTitle className="flex gap-2 ">
            <ChartNoAxesCombined size={30} className=''/>
            <div className='text-2xl font-extrabold 
            hover:scale-105 transition-all duration-150 '>Admin Panel</div>
          </SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
        <MenuItems setOpen={setOpen}/>
      </SheetContent>
    </Sheet>
    <aside className='hidden w-64 lg:flex flex-col h-full bg-background '>
       <div onClick={()=>{
        navigate("/admin/dashboard")
       }} className="flex gap-2 my-5 cursor-pointer text-3xl">
         <ChartNoAxesCombined size={35}/>
         <h1 className='hover:scale-105 transition-all duration-150 
         text-2xl font-extrabold'>Admin panel</h1>
       </div>
       <MenuItems setOpen={setOpen}/>
    </aside>
    </div>
  )
}

export default AdminSidebar