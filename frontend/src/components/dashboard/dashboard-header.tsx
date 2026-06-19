"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HugeiconsIcon } from "@hugeicons/react"
import { Notification02Icon, Search01Icon } from "@hugeicons/core-free-icons"

export function DashboardHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/[0.06] bg-background/60 backdrop-blur-xl px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-white/60 hover:text-white" />
      </div>

      <div className="relative ml-2 flex-1 max-w-sm">
        <HugeiconsIcon
          icon={Search01Icon}
          size={14}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
        />
        <input
          type="text"
          placeholder="Rechercher..."
          className="h-9 w-full rounded-xl border border-white/[0.06] bg-white/[0.04] pl-9 pr-3 text-sm text-white/80 placeholder:text-white/25 outline-hidden transition-colors focus:border-white/[0.12] focus:bg-white/[0.06]"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button className="relative flex size-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-white/50 transition-colors hover:border-white/[0.12] hover:text-white/80">
          <HugeiconsIcon icon={Notification02Icon} size={16} />
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-white/20 text-[9px] font-bold text-white">
            3
          </span>
        </button>

        <Avatar className="size-9 rounded-xl border  bg-white/[0.04]  border-white/[0.06]">
          <AvatarFallback className="rounded-xltext-xs font-semibold text-white/70">
            SM
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
