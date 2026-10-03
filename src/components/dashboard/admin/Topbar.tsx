"use client";

import CommonText from "@/components/typo/CommonText";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/Dropdown";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useDashboard } from "@/context/DashboardContext";
import { usePathname } from "next/navigation";
import React from "react";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import {
  IoNotificationsOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { LuPanelRightClose } from "react-icons/lu";

export default function Topbar() {
  const pathname = usePathname();
  const { toggleSidebar } = useDashboard();

  const routeLabels: Record<string, string> = {
    "/admin/dashboard": "Dashboard",
    "/admin/users": "All Users",
    "/admin/users/create": "Add User",
  };

  const title = routeLabels[pathname] ?? "Dashboard";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between bg-background-secondary px-4">
      {/* Left */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          className="px-2 py-1 text-2xl"
          onClick={toggleSidebar}
        >
          <LuPanelRightClose />
        </Button>

        <CommonText>{title}</CommonText>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* theme toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Dropdown>
          <DropdownTrigger>
            <div className="relative">
              <IoNotificationsOutline className="text-xl" />

              <span className="absolute -right-0 -top-0 h-2 w-2 rounded-full bg-red-500" />
            </div>
          </DropdownTrigger>

          <DropdownContent className="w-64 p-0">
            <CommonText className="mt-2 p-3 text-base font-medium">
              All Notifications
            </CommonText>

            <Divider />

            {/* <ul className="my-4 text-sm px-2">
              <li className="p-2 flex  gap-2 hover:bg-background-custom rounded-md cursor-pointer">
                <div>
                  <IoNotificationsOutline className="text-primary" size={18} />
                </div>
                <div>
                  <CommonText className="font-medium">
                    New Message
                  </CommonText>
                  <CommonText className="text-xs line-clamp-2 text-foreground-secondary">
                    You have a new message from John Doe.
                  </CommonText>
                </div>
              </li>
              
            </ul> */}


            <div className="flex h-44 flex-col items-center justify-center gap-2 p-4">
              <IoNotificationsOutline
                className="text-primary"
                size={30}
              />

              <CommonText className="text-xs text-foreground-secondary">
                No notifications to show yet
              </CommonText>
            </div>
          </DropdownContent>
        </Dropdown>

        {/* Profile */}
        <Dropdown>
          <DropdownTrigger>
            <div className="rounded-full border border-primary p-1 text-2xl">
              <CiUser />
            </div>
          </DropdownTrigger>

          <DropdownContent className="w-64">
            <div className="flex flex-col items-center rounded-md bg-background-custom p-4">
              <div className="rounded-full border border-primary p-1 text-2xl">
                <CiUser />
              </div>

              <CommonText className="mt-2">
                Admin
              </CommonText>

              <CommonText className="text-xs text-foreground-secondary">
                admin@gmail.com
              </CommonText>
            </div>

            <ul className="mt-4 text-sm">
              <li className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-background-custom">
                <CiUser size={18} />
                Profile
              </li>

              <li className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-background-custom">
                <IoSettingsOutline size={18} />
                Settings
              </li>

              <li className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-background-custom">
                <IoIosLogOut size={18} />
                Logout
              </li>
            </ul>
          </DropdownContent>
        </Dropdown>
      </div>
    </header>
  );
}