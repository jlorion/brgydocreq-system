import { CustomDataTable } from '@/components/custom/CustomDataTable';
import CustomDialog from '@/components/custom/CustomDialog';
import CustomForm from '@/components/custom/CustomFormFields';
import CustomSheet from '@/components/custom/CustomSheet';
import { Button } from '@/components/ui/button';
import { addResidentDemographic, addResidentName, residentAddress } from '@/data/FormFields';
import { AddressData, DemographicData, PersonalData } from '@/data/ResidentData';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { formatText } from '@/lib/utils';
import { Resident } from '@/types';
import { ColumnDef } from '@tanstack/react-table';


const ResidentsData: Resident[] = [

];

const columns: ColumnDef<Resident>[] = [
    {
        accessorKey: 'precinctId',
        header: () => <div className="text-center">Precint ID</div>,
        cell: ({ row }) => <div className="text-center capitalize">{row.getValue('precinctId')}</div>,
    },
    {
        accessorKey: 'residentName',
        header: () => <div className="text-center">Resident Name</div>,
        cell: ({ row }) => <div className="text-center capitalize">{row.getValue('residentName')}</div>,
    },
    {
        accessorKey: 'residentGender',
        header: () => <div className="text-center">Gender</div>,
        cell: ({ row }) => <div className="text-center capitalize">{row.getValue('residentGender')}</div>,
    },
    {
        accessorKey: 'residentBirthday',
        header: () => <div className="text-center">Birthday</div>,
        cell: ({ row }) => <div className="text-center capitalFize">{row.getValue('residentBirthday')}</div>,
    },
    {
        accessorKey: 'residentStatus',
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => {
            const status = row.getValue('residentStatus') as string;
            const statusColors: Record<string, string> = {
                active: 'bg-blue-200 text-blue-700',
                inactive: 'bg-red-200 text-red-700',
            };
            const statusCode = statusColors[status] || 'bg-gray-400 text-gray-600';
            return (
                <div className="flex items-center justify-center">
                    <div className={`w-3/5 rounded py-1 text-center capitalize ${statusCode}`}>{formatText(status)}</div>
                </div>
            );
        },
    },
];

const Residents = () => {
    return (
        <AdminLayout>
            <div className="h-full w-full p-2 pt-5">
                <div className="flex flex-col items-center justify-between pr-2">
                    <CustomDataTable
                        columns={columns}
                        data={ResidentsData}
                        filterColumn="residentName"
                        searchPlaceHolder="Search resident's name"
                        renderSheet={(trigger, row) => {
                            const status = row.getValue('residentStatus') as string;
                            const statusColors: Record<string, string> = {
                                active: 'bg-blue-200 text-blue-700',
                                inactive: 'bg-red-200 text-red-700',
                            };
                            const statusCode = statusColors[status] || 'bg-gray-400 text-gray-600';
                            const statusTitle = <div className={`rounded px-2 py-1 text-center capitalize ${statusCode}`}>{formatText(status)}</div>;
                            return (
                                <CustomSheet
                                    trigger={trigger}
                                    firstButton="Set Inactive"
                                    firstButtonVariant="reject"
                                    secondButton="Ambot say ibutang ari"
                                    statusTitle={statusTitle}
                                    form={
                                        <>
                                            <CustomForm fields={PersonalData} className="grid grid-cols-2 gap-x-4" />
                                            <CustomForm fields={DemographicData} className="grid grid-cols-2 gap-x-4" />
                                            <CustomForm fields={AddressData} className="grid grid-cols-2 gap-x-4" />
                                        </>
                                    }
                                />
                            );
                        }}
                        renderButton={
                            <CustomDialog
                                title="Add resident"
                                trigger={
                                    <Button className="ml-2 w-32 rounded-2xl p-5" variant="primary">
                                        Add Resident
                                    </Button>
                                }
                                contentClassName="mt-5"
                                button={
                                    <>
                                        <Button variant="primary" className="w-56">
                                            Add
                                        </Button>
                                    </>
                                }
                                children={
                                    <>
                                        <div className="mt-5">
                                            <CustomForm fields={addResidentName} className="grid grid-cols-4 gap-x-4" />
                                        </div>
                                        <div className="mt-5">
                                            <CustomForm fields={addResidentDemographic} className="grid grid-cols-4 gap-x-4" />
                                        </div>
                                        <div className="mt-5">
                                            <CustomForm fields={residentAddress} className="grid grid-cols-4 gap-x-4" />
                                        </div>
                                    </>
                                }
                            />
                        }
                    />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Residents;
