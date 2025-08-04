
"use client"

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
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
      <Sidebar className="pt-16">
        <SidebarHeader className="flex items-center justify-center p-2">
           <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/admin'} tooltip="Dashboard">
                <Link href="/admin">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/orders')} tooltip="Orders">
                    <Link href="/admin/orders">
                        <ShoppingCart />
                        <span>Orders</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/products')} tooltip="Products">
                <Link href="/admin/products">
                  <Package />
                  <span>Products</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <SidebarInset className="pt-20">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
