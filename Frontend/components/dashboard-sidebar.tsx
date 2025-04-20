"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code, FileText, Home, LogOut, Settings, TestTube, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Boilerplate Generator",
      icon: Code,
      href: "/dashboard?tab=boilerplate",
    },
    {
      title: "Test Case Generator",
      icon: TestTube,
      href: "/dashboard?tab=tests",
    },
    {
      title: "Documentation & PR",
      icon: FileText,
      href: "/dashboard?tab=docs",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex flex-col gap-2 px-4 py-2">
            <div className="flex items-center gap-2 py-2">
              <Code className="h-6 w-6" />
              <span className="text-xl font-bold">NerdAI</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.href.includes("?") ? pathname + window.location.search === item.href : pathname === item.href
                    }
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.name || "User"}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                    {user?.email || "user@example.com"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
          <div className="flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </Button>
            </div>
          </div>
          <div className="container py-6">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  )
}
