"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGroup, motion } from "motion/react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardSquare02Icon,
  AiBrainIcon,
  TaskIcon,
  SettingsIcon,
  LifebuoyIcon,
  Logout04Icon,
} from "@hugeicons/core-free-icons"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardSquare02Icon },
  { label: "Agents", href: "/agents", icon: AiBrainIcon },
  { label: "Tâches", href: "/tasks", icon: TaskIcon },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-border/50">
      <SidebarHeader>
        <Link href="/dashboard" className="self-start group-data-[collapsible=icon]:self-center">
          <span className="group-data-[collapsible=icon]:hidden flex items-center">
            <img
              src="/agilis-dark-theme-logo.png"
              alt="Agilis AI"
              className="h-7 w-auto hidden dark:block"
            />
            <img
              src="/agilis-light-theme-logo.png"
              alt="Agilis AI"
              className="h-7 w-auto dark:hidden"
            />
          </span>
          <span className="hidden group-data-[collapsible=icon]:flex items-center justify-center">
            <img
              src="/agilis-dark-theme-favicon.png"
              alt="Agilis AI"
              className="h-5 w-auto hidden dark:block"
            />
            <img
              src="/agilis-light-theme-favicon.png"
              alt="Agilis AI"
              className="h-5 w-auto dark:hidden"
            />
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="relative">
              <LayoutGroup>
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <SidebarMenuItem key={item.href}>
                      <div className="relative">
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-indicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-emerald shadow-[0_0_8px_1px_oklch(0.7_0.2_160/0.4)]"
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          />
                        )}
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.label}
                        >
                          <Link href={item.href}>
                            <HugeiconsIcon icon={item.icon} size={16} />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </div>
                    </SidebarMenuItem>
                  )
                })}
              </LayoutGroup>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Paramètres">
              <Link href="/settings">
                <HugeiconsIcon icon={SettingsIcon} size={16} />
                <span>Paramètres</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Support">
              <Link href="#">
                <HugeiconsIcon icon={LifebuoyIcon} size={16} />
                <span>Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Déconnexion">
              <Link href="/signin">
                <HugeiconsIcon icon={Logout04Icon} size={16} />
                <span>Déconnexion</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
