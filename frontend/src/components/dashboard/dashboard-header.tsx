"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HugeiconsIcon } from "@hugeicons/react"
import { Notification02Icon, Search01Icon } from "@hugeicons/core-free-icons"

export function DashboardHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 bg-background/60 backdrop-blur-xl px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button className="relative flex size-9 items-center justify-center rounded-xl border border-border/50 bg-foreground/[0.03] text-muted-foreground transition-colors hover:border-border hover:text-foreground">
          <HugeiconsIcon icon={Notification02Icon} size={16} />
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-emerald text-[9px] font-bold text-black">
            3
          </span>
        </button>

        <Avatar className="size-9 rounded-xl border border-border/50 bg-foreground/[0.03]">
          <AvatarFallback className="rounded-xl text-xs font-semibold text-muted-foreground">
            SM
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
