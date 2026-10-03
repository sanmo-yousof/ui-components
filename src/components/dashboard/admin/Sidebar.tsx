"use client";

import Logo from "@/components/shared/Logo";
import CommonText from "@/components/typo/CommonText";
import Button from "@/components/ui/Button";
import { useDashboard } from "@/context/DashboardContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdDashboard, MdExpandMore, MdPeople } from "react-icons/md";

export default function Sidebar() {
  const pathname = usePathname();

  const { isSidebarOpen, isSidebarCollapsed, closeSidebar } = useDashboard();

  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <MdDashboard />,
    },
    {
      id: "users",
      label: "Users",
      icon: <MdPeople />,
      children: [
        {
          label: "All Users",
          href: "/admin/users",
        },
        {
          label: "Add User",
          href: "/admin/users/create",
        },
      ],
    },
  ];

  /*
   * Automatically open parent when
   * current route belongs to submenu.
   */
  useEffect(() => {
    navItems.forEach((item) => {
      const hasActiveChild = item.children?.some(
        (child) => pathname === child.href,
      );

      if (hasActiveChild) {
        setOpenMenus((prev) =>
          prev.includes(item.id) ? prev : [...prev, item.id],
        );
      }
    });
  }, [pathname]);

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  /*
   * Mobile/tablet:
   * Sidebar closed
   */
  if (!isSidebarOpen) {
    return null;
  }

  return (
    <aside
  className={`
    flex h-screen shrink-0 flex-col
    bg-background-secondary p-4
    transition-all duration-300
    ${isSidebarCollapsed ? "w-[80px]" : "w-[300px]"}
    max-lg:absolute
    max-lg:left-0
    max-lg:top-0
    max-lg:z-50
    max-lg:w-[300px]
  `}
>
       <div className="shrink-0">
    {/* Logo */}
    <div className="flex items-center mb-4 justify-between">
      <Logo size={isSidebarCollapsed ? 32 : 40} />

      <Button
        variant="ghost"
        className="text-2xl lg:hidden"
        onClick={closeSidebar}
      >
        <IoClose />
      </Button>
    </div>
  </div>

        {/* Navigation */}
        <nav className="min-h-0 flex-1 custom-scrollbar py-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;

              const hasActiveChild = item.children?.some(
                (child) => pathname === child.href,
              );

              const isDirectActive = item.href && pathname === item.href;

              /*
               * Expanded sidebar:
               * Parent active only when direct route active.
               *
               * Collapsed sidebar:
               * Parent icon active when child route active.
               */
              const isParentActive = isSidebarCollapsed
                ? Boolean(isDirectActive || hasActiveChild)
                : Boolean(isDirectActive);

              const isOpen = openMenus.includes(item.id);

              return (
                <li key={item.id}>
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleMenu(item.id)}
                        className={`
                          flex w-full items-center gap-3
                          rounded-md p-2
                          transition-colors
                          ${
                            isParentActive
                              ? "bg-primary text-white"
                              : "hover:bg-background-custom"
                          }
                          ${isSidebarCollapsed ? "justify-center" : ""}
                        `}
                      >
                        <span className="shrink-0 text-xl">{item.icon}</span>

                        {!isSidebarCollapsed && (
                          <>
                            <CommonText className="flex-1 text-left">
                              {item.label}
                            </CommonText>

                            <MdExpandMore
                              className={`
                                text-xl transition-transform
                                duration-200
                                ${isOpen ? "rotate-180" : ""}
                              `}
                            />
                          </>
                        )}
                      </button>

                      {/* Submenu */}
                      {!isSidebarCollapsed && isOpen && (
                        <ul className="ml-5 mt-1 space-y-1 border-l border-border pl-3">
                          {item.children.map((child) => {
                            const isChildActive = pathname === child.href;

                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={`
                                    block rounded-md p-2 text-sm
                                    transition-colors
                                    ${
                                      isChildActive
                                        ? "bg-primary text-white"
                                        : "hover:bg-background-custom"
                                    }
                                  `}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      className={`
                        flex items-center gap-3
                        rounded-md p-2
                        transition-colors
                        ${
                          isParentActive
                            ? "bg-primary text-white"
                            : "hover:bg-background-custom"
                        }
                        ${isSidebarCollapsed ? "justify-center" : ""}
                      `}
                    >
                      <span className="shrink-0 text-xl">{item.icon}</span>

                      {!isSidebarCollapsed && (
                        <CommonText>{item.label}</CommonText>
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

      

      {/* Bottom Profile */}
      <div
        className={`
          flex items-center mt-4 gap-4
          ${isSidebarCollapsed ? "justify-center" : ""}
        `}
      >
        <div
          className={`
            cursor-pointer rounded-md p-2
            hover:bg-background-custom
            ${isSidebarCollapsed ? "" : "flex-1"}
          `}
        >
          <div className="flex items-center gap-2">
            <div className="shrink-0 rounded-full border border-primary p-1 text-2xl">
              <CiUser />
            </div>

            {!isSidebarCollapsed && (
              <div>
                <CommonText>Admin</CommonText>

                <CommonText className="text-xs text-foreground-secondary">
                  Jhon Deo
                </CommonText>
              </div>
            )}
          </div>
        </div>

        {/* Logout hidden when collapsed */}
        {!isSidebarCollapsed && (
          <Button variant="ghost" className="text-2xl">
            <IoIosLogOut />
          </Button>
        )}
      </div>
    </aside>
  );
}
