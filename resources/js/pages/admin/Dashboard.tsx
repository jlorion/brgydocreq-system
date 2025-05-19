import { CustomDisplayCard } from '@/components/custom/CustomCard';
import { CustomDataTable } from '@/components/custom/CustomDataTable';
import CustomForm from '@/components/custom/CustomFormFields';
import CustomIcon from '@/components/custom/CustomIcon';
import CustomSheet from '@/components/custom/CustomSheet';
import { Button } from '@/components/ui/button';
import { FetchDashboard } from '@/data/admin/DashboardFields';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { DashboardColumn } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Archive, ArrowUpDown, ChartSpline, FileText, Users } from 'lucide-react';

interface Monthly {
    month: string;
    total: number;
    total_revenue?: number;
    last_updated?: string;
    claimed?: number;
    rejected?: number;
    available?: number;
    active?: number;

}

interface DashboardProps {
    totalRevenue: string;
    totalRequest: string;
    residentStats: Monthly;
    adminStats: Monthly;
    officerStats: Monthly;
    archiveStats: Monthly;
    documentStats: Monthly;
    totalResidents: string;
    totalUsers: string;
    totalArchives: string;
    totalBarangayOfficers: string;
    monthlyArchives: Monthly[];
    monthlyRequestAndRevenue: Monthly[];

}
export default function Dashboard(props: DashboardProps) {


    const { data, setData, errors } = useForm<Required<DashboardColumn>>({
        id: 0,
        metric: '',
        count: 0,
        last_updated: '',
        change: '',
    })

    // populate sheet
    const populateSheet = (col: DashboardColumn) => {
        setData({
            id: col.id,
            metric: col.metric,
            count: col.count,
            last_updated: col.last_updated,
            change: col.change,
        })
    }

    const columnData: DashboardColumn[] = [
        {
            id: 1,
            metric: 'Registered Residents',
            count: props.residentStats.total,
            last_updated: props.residentStats.last_updated
                ? format(new Date(props.residentStats.last_updated), "MMM dd, yyyy hh:mm aa")
                : format(new Date(), "MMM dd, yyyy hh:mm aa"),
            change: `+${props.residentStats.total}`,
        },
        {
            id: 2,
            metric: 'Active Administrators',
            count: props.adminStats.active ?? 0,
            last_updated: props.adminStats.last_updated
                ? format(new Date(props.adminStats.last_updated), "MMM dd, yyyy hh:mm aa")
                : format(new Date(), "MMM dd, yyyy hh:mm aa"),
            change: `+${props.adminStats.active}`,
        },
        {
            id: 3,
            metric: 'Barangay Officer',
            count: props.officerStats.total,
            last_updated: props.officerStats.last_updated
                ? format(new Date(props.officerStats.last_updated), "MMM dd, yyyy hh:mm aa")
                : format(new Date(), "MMM dd, yyyy hh:mm aa"),
            change: `+${props.officerStats.total}`,
        },
        {
            id: 4,
            metric: 'Available Documents',
            count: props.documentStats.available ?? 0,
            last_updated: props.documentStats.last_updated
                ? format(new Date(props.documentStats.last_updated), "MMM dd, yyyy hh:mm aa")
                : format(new Date(), "MMM dd, yyyy hh:mm aa"),
            change: `+${props.documentStats.available}`,
        },
        {
            id: 5,
            metric: 'Claimed Documents',
            count: props.archiveStats.claimed ?? 0,
            last_updated: props.archiveStats.last_updated
                ? format(new Date(props.archiveStats.last_updated), "MMM dd, yyyy hh:mm aa")
                : format(new Date(), "MMM dd, yyyy hh:mm aa"),
            change: `+${props.archiveStats.claimed}`,
        },
        {
            id: 6,
            metric: 'Barangay Officer',
            count: props.archiveStats.rejected ?? 0,
            last_updated: props.archiveStats.last_updated
                ? format(new Date(props.archiveStats.last_updated), "MMM dd, yyyy hh:mm aa")
                : format(new Date(), "MMM dd, yyyy hh:mm aa"),
            change: `+${props.archiveStats.rejected}`,
        },
    ];

    const columns: ColumnDef<DashboardColumn>[] = [
        {
            accessorKey: 'metric',
            header: ({ column }) => {
                return (
                    <div className="text-center">
                        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            Metric
                            <ArrowUpDown />
                        </Button>
                    </div>
                );
            },
            cell: ({ row }) => <div className="text-center capitalize">{row.getValue('metric')}</div>,
        },
        {
            accessorKey: 'count',
            header: () => <div className="text-center">Total Count</div>,
            cell: ({ row }) => <div className="text-center capitalize">{row.getValue('count')}</div>,
        },
        {
            accessorKey: 'last_updated',
            header: () => <div className="text-center">Last Updated</div>,
            cell: ({ row }) => <div className="text-center capitalize">{row.getValue('last_updated')}</div>,
        },
        {

            accessorKey: 'change',
            header: () => <div className="text-center">This {format(new Date(), 'MMM YYY')}</div>,
            cell: ({ row }) => <div className="text-center capitalize">{row.getValue('change')}</div>,
        },
    ];
    return (
        <AdminLayout className="s" title="Dashboard">
            <Head title="Dashboard" />
            <div className="grid grid-cols-1 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 @5xl/main:gap-5">
                <CustomDisplayCard
                    title={props.totalUsers}
                    description="Total Users"
                    statistics={
                        <>
                            Out of a total of <strong className='text-violet-600'>{props.totalResidents}</strong> residents
                        </>
                    }
                    icon={
                        <div className="rounded-2xl bg-violet-200 p-4">
                            <CustomIcon icon={Users} className="text-violet-700" />
                        </div>
                    }
                />

                <CustomDisplayCard
                    title={props.totalRequest}
                    description="Total Request"
                    statistics={
                        <>
                            {
                                props.monthlyRequestAndRevenue.map((requestAndREv, index) => (
                                    <div key={index}>
                                        <strong className='text-amber-400'>{requestAndREv.total}</strong> requests this <strong className='text-amber-400'>{requestAndREv.month}</strong>
                                    </div>
                                ))
                            }
                        </>
                    }
                    icon={
                        <div className="rounded-2xl bg-amber-100 p-4">
                            <CustomIcon icon={FileText} className="text-amber-500" />
                        </div>
                    }
                />

                <CustomDisplayCard
                    title={`₱ ${props.totalRevenue}`}
                    description="Total Revenue"
                    statistics={
                        <>
                            {
                                props.monthlyRequestAndRevenue.map((requestAndREv, index) => (
                                    <div key={index}>
                                        <strong className='text-green-400'>{`₱ ${props.totalRevenue}`}</strong> revenue this <strong className='text-green-400'>{requestAndREv.month}</strong>
                                    </div>
                                ))
                            }
                        </>
                    }
                    icon={
                        <div className="rounded-2xl bg-green-200 p-4">
                            <CustomIcon icon={ChartSpline} className="text-green-600" />
                        </div>
                    }
                />

                <CustomDisplayCard
                    title={props.totalArchives}
                    description="Total Archives"
                    statistics={
                        <>
                            {
                                props.monthlyArchives.map((monthlyArchive, index) => (
                                    <div key={index}>
                                        <strong className='text-orange-400'>{monthlyArchive.total}</strong> archives this  <strong className='text-orange-400'>{monthlyArchive.month}</strong>
                                    </div>
                                ))
                            }
                        </>
                    }
                    icon={
                        <div className="rounded-2xl bg-orange-200 p-4">
                            <CustomIcon icon={Archive} className="text-orange-500" />
                        </div>
                    }
                />
            </div>

            <CustomDataTable
                onRowClick={(row: DashboardColumn) => (populateSheet(row))}
                columns={columns}
                data={columnData}
                searchPlaceHolder="Search"
                renderSheet={(trigger, row) => (
                    <CustomSheet
                        statusTitle='Details'
                        trigger={trigger}
                        form={
                            <div className='mt-20'>
                                <CustomForm fields={FetchDashboard(data, setData, errors)} />
                            </div>
                        }
                    />
                )}
            />
        </AdminLayout>
    );
}
