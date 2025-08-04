
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { orders as allOrders, products as allProducts, users } from "@/lib/data"
import { DollarSign, Package, Users, Activity } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import type { DateRange } from "react-day-picker"
import { subDays } from "date-fns"

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });

  const orders = React.useMemo(() => {
    if (!dateRange?.from) return allOrders;
    return allOrders.filter(order => {
        const orderDate = new Date(order.date);
        const fromDate = new Date(dateRange.from!);
        // Set to start of the day
        fromDate.setHours(0,0,0,0);
        
        if (dateRange.to) {
            const toDate = new Date(dateRange.to);
            // Set to end of the day
            toDate.setHours(23,59,59,999);
            return orderDate >= fromDate && orderDate <= toDate;
        }
        return orderDate >= fromDate;
    })
  }, [dateRange]);


  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalSales = orders.length
  const totalUsers = users.length

  // Simplified "Active Now" metric
  const activeNow = Math.floor(Math.random() * 10) + 1;

  const productSales = allProducts.map((product) => {
    const sales = orders.reduce((sum, order) => {
      const item = order.items.find((item) => item.id === product.id)
      return sum + (item ? item.quantity : 0)
    }, 0)
    return { name: product.name, sales, revenue: sales * product.price }
  }).filter(p => p.sales > 0);

  const topSellingProducts = [...productSales].sort((a, b) => b.sales - a.sales).slice(0, 5);

  const recentSales = orders.slice(0, 5);

  const salesByMonth = orders.reduce((acc, order) => {
    const month = new Date(order.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += order.total;
    return acc;
  }, {} as Record<string, number>);

  const monthlyChartData = Object.entries(salesByMonth).map(([name, revenue]) => ({ name, revenue: parseFloat(revenue.toFixed(2)) })).reverse();


  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <DateRangePicker date={dateRange} onDateChange={setDateRange} />
      </div>


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              For the selected period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalSales}</div>
             <p className="text-xs text-muted-foreground">
              Total orders in period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
             <p className="text-xs text-muted-foreground">
              Admin and customer accounts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{activeNow}</div>
             <p className="text-xs text-muted-foreground">
              Users on the site right now
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
             <CardDescription>
              A line chart showing revenue for the selected period.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              Your most recent sales for the selected period.
            </CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSales.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium">{order.customerName}</div>
                      </TableCell>
                       <TableCell>
                          <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                              {order.status}
                          </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">${order.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </CardContent>
        </Card>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>
            A bar chart showing the quantity of each product sold in the period.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topSellingProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                }}
              />
              <Legend />
              <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
