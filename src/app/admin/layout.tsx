"use client"

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { currentUser, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!currentUser || currentUser.role !== "admin") {
    router.push("/login")
    return null
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/admin'}>
                <Link href="/admin">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/products')}>
                <Link href="/admin/products">
                  <Package />
                  Products
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
