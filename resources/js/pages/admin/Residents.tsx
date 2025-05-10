import { CustomDataTable } from '@/components/custom/CustomDataTable';
import CustomForm from '@/components/custom/CustomFormFields';
import CustomSheet from '@/components/custom/CustomSheet';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { ResidentForm, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, LoaderCircle, PlusCircle } from 'lucide-react';
import { getStatusColors } from '@/lib/utils';
import { FetchUpdateResidentsFields, AddResidentsFields, } from '@/data/admin/ResidentsFields';
import { FormEventHandler } from 'react';
import CustomDialog from '@/components/custom/CustomDialog';
import { toast } from 'sonner';


const Residents = () => {

    const { residents } = usePage<SharedData>().props

    const dataResident: ResidentForm[] = residents.map((resident) => ({
        resident_id: resident.resident_id,
        resident_firstname: resident.resident_firstname,
        resident_middlename: resident.resident_middlename,
        resident_purokid: resident.resident_purokid,
        resident_statusid: resident.resident_statusid,
        resident_lastname: resident.resident_lastname,
        resident_suffix: resident.resident_suffix,
        resident_gender: resident.resident_gender,
        resident_householdnum: resident.resident_householdnum,
        resident_precinct: resident.resident_precinct,
        resident_purok: resident.resident_purok,
        resident_status: resident.resident_status,
        resident_birthdate: resident.resident_birthdate
    }));

    const { data, setData, patch, post, processing, errors, reset } = useForm<Required<ResidentForm>>({
        resident_id: 0,
        resident_purokid: null,
        resident_statusid: null,
        resident_firstname: '',
        resident_middlename: '',
        resident_lastname: '',
        resident_suffix: '',
        resident_birthdate: '',
        resident_gender: '',
        resident_precinct: '',
        resident_householdnum: '',
        resident_status: '',
        resident_purok: '',
    });


    const updateSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('admin.residents.update', data.resident_id), {
            onSuccess: () => {
                toast.success("Resident's information updated successfully");
            },
            onError: (errors) => {
                console.error('Form submission failed. Validation errors:');
                Object.entries(errors).forEach(([field, message]) => {
                    console.error(`Field: ${field}, Error: ${message}`);
                });
            },
        })
    }

    const addSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.residents.store'), {
            onSuccess: () => {
                toast.success('Resident successfully added')
                reset()
            },
            onError: (errors) => {
                console.error('Form submission failed. Validation errors:');
                Object.entries(errors).forEach(([field, message]) => {
                    console.error(`Field: ${field}, Error: ${message}`);
                });
            },
        })
    }

    const populateSheet = (resident: ResidentForm) => {
        setData({
            resident_id: resident.resident_id,
            resident_purokid: resident.resident_purokid,
            resident_statusid: resident.resident_statusid,
            resident_firstname: resident.resident_firstname,
            resident_middlename: resident.resident_middlename,
            resident_lastname: resident.resident_lastname,
            resident_suffix: resident.resident_suffix,
            resident_birthdate: resident.resident_birthdate,
            resident_gender: resident.resident_gender,
            resident_precinct: resident.resident_precinct,
            resident_householdnum: resident.resident_householdnum,
            resident_status: resident.resident_status,
            resident_purok: resident.resident_purok,
        });
    }


    const columns: ColumnDef<ResidentForm>[] = [
        {
            accessorKey: 'resident_fullname',
            header: () => <div className='text-center'>Resident's Name</div>,
            cell: ({ row }) => {
                const { resident_firstname, resident_middlename, resident_lastname, resident_suffix } = row.original;
                const middleInitial = resident_middlename ? `${resident_middlename.charAt(0).toUpperCase()}.` : '';
                const fullName = [
                    resident_firstname,
                    middleInitial,
                    resident_suffix ? `${resident_lastname},` : resident_lastname,
                    resident_suffix
                ].filter(Boolean).join(' ').trim();

                return <div className="capitalize text-center">{fullName}</div>
            },
        },

        {
            accessorKey: "resident_birthdate",
            header: () => <div className='text-center'>Birthdate</div>,
            cell: ({ row }) => (
                <div className="capitalize text-center">{row.getValue("resident_birthdate")}</div>
            ),
        },
        {
            accessorKey: "resident_householdnum",
            header: ({ column }) => {
                return (
                    <div className='text-center'>
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Bldg Serial No.
                            <ArrowUpDown />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize text-center">{row.getValue("resident_householdnum")}</div>
            ),
        },
        {
            accessorKey: "resident_precinct",
            header: () => <div className='text-center'>Precinct</div>,
            cell: ({ row }) => (
                <div className="capitalize text-center">{row.getValue("resident_precinct")}</div>
            ),
        },
        {
            accessorKey: "resident_gender",
            header: () => <div className='text-center'>Gender</div>,
            cell: ({ row }) => (
                <div className="capitalize text-center">{row.getValue("resident_gender")}</div>
            ),
        },
        {
            accessorKey: "resident_purok",
            header: () => <div className='text-center'>Purok</div>,
            cell: ({ row }) => (
                <div className="capitalize text-center">{row.getValue("resident_purok")}</div>
            ),
        },
        {
            accessorKey: "resident_status",
            header: () => <div className='text-center'>Status</div>,
            cell: ({ row }) => {
                const status = row.getValue("resident_status") as string;
                return (
                    <div className='flex justify-center items-center'>
                        <div className={`rounded w-28 py-1 capitalize text-center ${getStatusColors(status)}`}>
                            {status}
                        </div>
                    </div>
                );
            },
        },

    ]
    return (
        <AdminLayout title='Residents'>
            <Head title="Residents" />
            <div className="h-full w-full p-2 pt-5">
                <div className="flex flex-col items-center justify-between pr-2">
                    <CustomDataTable
                        onRowClick={(row: ResidentForm) => populateSheet(row)}
                        columns={columns}
                        data={dataResident}
                        additionalComponent={
                            <CustomDialog
                                title='Add Resident'
                                onSubmit={addSubmit}
                                button={
                                    <Button disabled={processing}>
                                        Submit
                                    </Button>}
                                children={
                                    <CustomForm fields={AddResidentsFields(data, setData, errors)} className='grid grid-cols-3 gap-x-5' />
                                }
                                trigger={
                                    <Button>
                                        <PlusCircle />
                                        Add Resident
                                    </Button>
                                } />
                        }
                        filterColumn="resident_householdnum"
                        searchPlaceHolder="Search bldg serial number"
                        renderSheet={(trigger, row) => (
                            <CustomSheet
                                onSubmit={updateSubmit}
                                key={row}
                                trigger={trigger}
                                firstButton={
                                    <Button disabled={processing} className='text-center w-full'>
                                        Save
                                    </Button>}
                                statusTitle={data.resident_status}
                                form={
                                    <>
                                        <input type="text" hidden defaultValue={data.resident_id} />
                                        <CustomForm fields={FetchUpdateResidentsFields(data, setData, errors)} className="grid grid-cols-2 gap-2" />
                                    </>
                                } />
                        )}
                    />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Residents;
