"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
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
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardSquare02Icon,
  AiBrainIcon,
  TaskIcon,
  SettingsIcon,
  CreditCardIcon,
  UserGroupIcon,
  LifebuoyIcon,
  Logout04Icon,
} from "@hugeicons/core-free-icons"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardSquare02Icon },
  { label: "Agents", href: "/agents", icon: AiBrainIcon },
  { label: "Tâches", href: "/tasks", icon: TaskIcon },
]

const settingsItems = [
  { label: "Paramètres", href: "/settings", icon: SettingsIcon },
  { label: "Facturation", href: "/settings/billing", icon: CreditCardIcon },
  { label: "Membres", href: "/settings/members", icon: UserGroupIcon },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-white/[0.06]">
      <SidebarHeader>
        <Link href="/dashboard" className="self-start group-data-[collapsible=icon]:self-center">
          <span className="group-data-[collapsible=icon]:hidden flex items-center">
            <img
              src="/agilis-dark-theme-logo.png"
              alt="Agilis AI"
              className="h-7 w-auto hidden dark:block  border border-white"
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
              className="size-4 hidden dark:block"
            />
            <img
              src="/agilis-light-theme-favicon.png"
              alt="Agilis AI"
              className="size-4 dark:hidden"
            />
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
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
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <SidebarMenuItem key={item.href}>
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
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
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
