import { CustomDisplayCard } from '@/components/custom/CustomCard';
import { CustomDataTable } from '@/components/custom/CustomDataTable';
import CustomForm from '@/components/custom/CustomFormFields';
import CustomIcon from '@/components/custom/CustomIcon';
import CustomSheet from '@/components/custom/CustomSheet';
import { Button } from '@/components/ui/button';
import { DocumentRequestFields, PurposeofRequestField, ViewAttachment } from '@/data/admin/FetchUpdateDocReqFields';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { ColumnDef } from '@tanstack/react-table';
import { Archive, ArrowUpDown, ChartSpline, FileText, Users } from 'lucide-react';

export default function Dashboard() {
    type Payment = {
        id: string;
        metric: string;
        count: string;
        last_updated: string;
        updated_by: string;
        change: string;
    };

    const data: Payment[] = [
        {
            id: '8',
            metric: 'Registered Residents',
            count: '11, 564',
            last_updated: 'Apr 12, 2023 @ 12:00 PM',
            updated_by: 'System',
            change: '+20',
        },
        {
            id: '8',
            metric: 'Active Administrators',
            count: '5',
            last_updated: 'Nov 12, 2023 @ 12:00 PM',
            updated_by: 'Super Admin',
            change: '+1',
        },
        {
            id: '10',
            metric: 'Barangay Officers',
            count: '15',
            last_updated: 'Dec 12, 2023 @ 12:00 PM',
            updated_by: 'Admin',
            change: '0',
        },
        {
            id: '10',
            metric: 'Avaible Documents',
            count: '11',
            last_updated: 'Dec 12, 2023 @ 12:00 PM',
            updated_by: 'Admin',
            change: '0',
        },
        {
            id: '10',
            metric: 'Claimed Documents',
            count: '500',
            last_updated: 'Aug 12, 2023 @ 12:00 PM',
            updated_by: 'System',
            change: '9',
        },
        {
            id: '11',
            metric: 'Rejected Documents',
            count: '300',
            last_updated: 'Aug 12, 2023 @ 12:00 PM',
            updated_by: 'System',
            change: '+3',
        },
    ];

    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: 'metric',
            header: () => <div className="text-center">Metric</div>,
            cell: ({ row }) => <div className="text-center capitalize">{row.getValue('metric')}</div>,
        },
        {
            accessorKey: 'count',
            header: ({ column }) => {
                return (
                    <div className="text-center">
                        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Count
                            <ArrowUpDown />
                        </Button>
                    </div>
                );
            },
            cell: ({ row }) => <div className="text-center capitalize">{row.getValue('count')}</div>,
        },
        {
            accessorKey: 'last_updated',
            header: () => <div className="text-center">Last Updated</div>,
            cell: ({ row }) => <div className="text-center capitalize">{row.getValue('last_updated')}</div>,
        },
        {
            accessorKey: 'change',
            header: () => <div className="text-center">Change</div>,
            cell: ({ row }) => <div className="text-center capitalize">{row.getValue('change')}</div>,
        },
        {
            accessorKey: 'updated_by',
            header: () => <div className="text-center">Updated By</div>,
            cell: ({ row }) => <div className="text-center capitalize">{row.getValue('updated_by')}</div>,
        },
    ];
    return (
        <AdminLayout className="" title="Dashboard">
            <div className="grid grid-cols-1 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 @5xl/main:gap-5">
                <CustomDisplayCard
                    title="8,689"
                    description="Total Users"
                    increasePercentage="83%"
                    statistics="of total resident population"
                    icon={
                        <div className="rounded-2xl bg-violet-200 p-4">
                            <CustomIcon icon={Users} className="text-violet-700" />
                        </div>
                    }
                />

                <CustomDisplayCard
                    title="10,293"
                    description="Total Request"
                    increasePercentage="1.3%"
                    statistics="Up from past week"
                    icon={
                        <div className="rounded-2xl bg-amber-100 p-4">
                            <CustomIcon icon={FileText} className="text-amber-500" />
                        </div>
                    }
                />

                <CustomDisplayCard
                    title="₱ 5,989"
                    description="Total Revenue"
                    decreasePercentage="4.3%"
                    statistics="Down from yesterday"
                    icon={
                        <div className="rounded-2xl bg-green-200 p-4">
                            <CustomIcon icon={ChartSpline} className="text-green-600" />
                        </div>
                    }
                />

                <CustomDisplayCard
                    title="9,542"
                    description="Total Archives"
                    increasePercentage="1.8%"
                    statistics="Up from yesterday"
                    icon={
                        <div className="rounded-2xl bg-orange-200 p-4">
                            <CustomIcon icon={Archive} className="text-orange-500" />
                        </div>
                    }
                />
            </div>

            <CustomDataTable
                columns={columns}
                data={data}
                filterColumn="metric"
                searchPlaceHolder="Search metric"
                renderSheet={(trigger, row) => (
                    <CustomSheet
                        trigger={trigger}
                        firstButton="Approve"
                        firstButtonVariant="approve"
                        secondButton="Reject"
                        secondButtonVariant="reject"
                        statusTitle="Under Review"
                        form={
                            <>
                                <CustomForm fields={DocumentRequestFields} className="grid grid-cols-2 gap-2" />
                                <CustomForm fields={PurposeofRequestField} className="grid grid-cols-1 pt-2" />
                                <CustomForm fields={ViewAttachment} className="flex justify-center pt-2" />
                            </>
                        }
                    />
                )}
            />
        </AdminLayout>
    );
}
