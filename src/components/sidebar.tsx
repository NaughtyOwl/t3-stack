import { useState } from "react";
import { BiSearchAlt2, BiHomeAlt, BiTrophy, BiMoney, BiBookmark, BiMessageRounded, BiChat, BiLogOutCircle, BiX, BiMenu, BiSpreadsheet } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl flex flex-wrap  justify-between mx-auto p-4">
   
        <div className="flex items-center md:order-2">
            <button onClick={toggleSidebar} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                <BiMenu size={24} />
            </button>
            <UserButton afterSignOutUrl="/"/>
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user"> 
        </div>

    </div>
    </nav>
    <div className={`sidebar fixed top-0 bottom-0 lg:left-0 duration-1000 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 shadow h-screen duration-200 ${isSidebarOpen ? "left-0" : "left-[-300px]"}`}>
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center rounded-md ">
          <BiHomeAlt className="px-2 py-1 bg-blue-600 rounded-md"/>
          <h1 className="text-[15px] ml-3 text-xl text-gray-200 font-bold">Dot</h1>
          <BiX className="ml-20 cursor-pointer lg:hidden" onClick={toggleSidebar}/>
        </div>
        <hr className="my-2 text-gray-600" />
        <div>
        <Link href="/" className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
              <BiHomeAlt/>
              <span className="text-[15px] ml-4 text-gray-200">Dashboard</span>
        </Link>
        <Link href="/budget" className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
          <BiMoney/>
          <span className="text-[15px] ml-4 text-gray-200">My Budgets</span>
        </Link>
        <Link href="/achievement" className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
          <BiTrophy/>
          <span className="text-[15px] ml-4 text-gray-200">Achivements</span>
        </Link>
        <Link href="/reports" className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
          <BiSpreadsheet/>
          <span className="text-[15px] ml-4 text-gray-200">Reports</span>
        </Link>
      </div>
      </div>
    </div>
    </>
  );
}
