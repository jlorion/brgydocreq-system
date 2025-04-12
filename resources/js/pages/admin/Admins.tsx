/* eslint-disable @typescript-eslint/no-unused-vars */
import CustomAdminTable from '@/components/custom/CustomAdminTable';
import CustomDialog from '@/components/custom/CustomDialog';
import CustomForm from '@/components/custom/CustomForm';
import CustomSheet from '@/components/custom/CustomSheet';
import { Button } from '@/components/ui/button';
import { adminDemographicData, adminElectedData, adminPersonalData } from '@/data/ViewAdminData';
import AdminLayout from '@/layouts/admin/AdminLayout';
import Gester from '../../../assets/gester.png';
import Mark from '../../../assets/mark.png';
import Reignear from '../../../assets/reignear.png';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import CustomSelect from '@/components/custom/CustomSelect';
import { Dialog } from '@/components/ui/dialog';

const adminData = [
    {
        id: 1,
        name: 'Reignear Berador Magallanes',
        position: 'Barangay Captain',
        role: 'Superior Admin',
        image: Reignear,
    },
    {
        id: 2,
        name: 'Mark Jefforson Saldana',
        position: 'Barangay Councilor',
        role: 'Admin',
        image: Mark,
    },
    {
        id: 3,
        name: 'Gester Rat Lorica',
        position: 'Barangay Treasurer',
        role: 'Admin',
        image: Gester,
    },
    {
        id: 4,
        name: 'Gester Rat Lorica',
        position: 'Barangay Treasurer',
        role: 'Admin',
        image: Gester,
    },
    {
        id: 5,
        name: 'Gester Rat Lorica',
        position: 'Barangay Treasurer',
        role: 'Admin',
        image: Gester,
    },
    {
        id: 6,
        name: 'Gester Rat Lorica',
        position: 'Barangay Treasurer',
        role: 'Admin',
        image: Gester,
    },
];

const adminRequestData = [
    {
        referenceID: 'P001',
        requesterName: 'John Doe',
        barangayPosition: 'Male',
        requestedRole: 'Mamayotay',
    },
    {
        referenceID: 'P002',
        requesterName: 'John Doe',
        barangayPosition: 'Male',
        requestedRole: 'Mamayotay',
    },
    {
        referenceID: 'P003',
        requesterName: 'John Doe',
        barangayPosition: 'Male',
        requestedRole: 'Mamayotay',
    },
    {
        referenceID: 'P004',
        requesterName: 'John Doe',
        barangayPosition: 'Male',
        requestedRole: 'Mamayotay',
    },
];
// const renderSheetFields = () => {
//     return (
//         <>
//             <CustomForm fields={AdminFormFields} />
//         </>
//     );
// }

const items = [
    {
        value: 'Admin', label: 'Admin'
    },
    {
        value: 'Fucker', label: 'Fucker'
    }
]

const Admins = () => {
    return (
        <AdminLayout title='Administrator'>
            <div className='flex flex-row justify-end'>
                <CustomDialog trigger={
                    <Button className='w-1/7'>Invite</Button>
                } children={
                    <>
                        <div className='flex gap-x-4'>
                            <Input placeholder='Email'></Input>
                            <div className='w-1/2'>
                                <CustomSelect items={items} placeholder='Role' />
                            </div>
                        </div>
                    </>
                } button={
                    <Button>Send</Button>
                } title='Invite Administrator' width='w-130' />
            </div>


            <div className="grid gap-5 lg:grid-cols-3">
                {adminData.map((admin) => (
                    <div className="flex h-96 max-w-96 min-w-72 flex-col items-center justify-between rounded-xl border-2">
                        <div
                            className="h-full w-full rounded-t-lg"
                            style={{
                                backgroundImage: `url(${admin.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        ></div>
                        <div className="flex w-full flex-col items-center gap-2 bg-white p-2">
                            <h1 className="font-semibold">{admin.name}</h1>
                            <h3 className="text-sm font-semibold">{admin.position}</h3>
                            <p className="text-sm">{admin.role}</p>

                            <CustomSheet
                                trigger={
                                    <Button
                                        className="w-20 rounded-sm border-1 border-blue-400 text-blue-400"
                                        variant="plain"
                                        onClick={() => admin.id}
                                    >
                                        View
                                    </Button>
                                }
                                firstButton="Remove admin"
                                firstButtonVariant="reject"
                                plainTitle="Admin Details"
                                form={
                                    <>
                                        <CustomForm fields={adminPersonalData} className="grid grid-cols-2 gap-x-4" />
                                        <CustomForm fields={adminDemographicData} className="grid grid-cols-2 gap-x-4" />
                                        <CustomForm fields={adminElectedData} className="grid grid-cols-2 gap-x-4" />
                                    </>
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default Admins;
