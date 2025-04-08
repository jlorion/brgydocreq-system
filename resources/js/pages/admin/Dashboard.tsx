import AdminLayout from '@/layouts/admin/AdminLayout';
import { CustomDataTable } from '@/components/custom/CustomDataTable';
import { CustomChart } from '@/components/custom/CustomChart';
import { CustomDataCard } from '@/components/custom/CustomDataCard';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

export default function Dashboard() {

    type Payment = {
        id: string
        amount: number
        status: "pending" | "processing" | "success" | "failed"
        email: string
    }

    const data: Payment[] = [
        {
            id: "8",
            amount: 316,
            status: "success",
            email: "ken99@example.com",
        },
        {
            id: "9",
            amount: 242,
            status: "success",
            email: "Abe45@example.com",
        },
        {
            id: "10",
            amount: 837,
            status: "processing",
            email: "Monserrat44@example.com",
        },
        {
            id: "11",
            amount: 874,
            status: "success",
            email: "Silas22@example.com",
        },
        {
            id: "1",
            amount: 721,
            status: "failed",
            email: "carmella@example.com",
        },
        {
            id: "2",
            amount: 721,
            status: "failed",
            email: "carmella@example.com",
        },
        {
            id: "3",
            amount: 721,
            status: "failed",
            email: "carmella@example.com",
        },
        {
            id: "4",
            amount: 721,
            status: "failed",
            email: "carmella@example.com",
        },
        {
            id: "5",
            amount: 721,
            status: "failed",
            email: "carmella@example.com",
        },
        {
            id: "6",
            amount: 721,
            status: "failed",
            email: "carmella@example.com",
        },
        {
            id: "7",
            amount: 721,
            status: "failed",
            email: "carmella@example.com",
        },
    ]


    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("status")}</div>
            ),
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
            filterFn: "includesString",
        },
        {
            accessorKey: "amount",
            header: () => <div className="text-right">Amount</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("amount"))
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount)
                return <div className="text-right font-medium">{formatted}</div>
            },
        },

    ]
    return (
        <AdminLayout className='p-5' title='Dashboard'>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <CustomDataCard />
                        <div className="px-4 lg:px-6">
                            <CustomChart />

                        </div>
                        <CustomDataTable columns={columns} data={data} filterColumn='status' />

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
