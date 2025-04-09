/* eslint-disable @typescript-eslint/no-unused-vars */
import CustomDialog from '@/components/custom/CustomDialog';
import { Button } from '@/components/ui/button';
import CustomAdminTable from '@/components/custom/CustomAdminTable';
import CustomSheet from '@/components/custom/CustomSheet';
import AdminLayout from '@/layouts/admin/AdminLayout';
import Gester from '../../../assets/gester.png';
import Mark from '../../../assets/mark.png';
import Reignear from '../../../assets/reignear.png';
import CustomForm from '@/components/custom/CustomForm';
import { AdminFormFields } from '@/data/AdminFormFields';
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


const Admins = () => {
    return (
        <AdminLayout>
            <div className="flex w-full flex-col gap-4 p-2">
                <div className="flex w-full justify-end pr-4">
                    <CustomDialog
                        title="Request for Admin"
                        trigger={
                            <Button variant="primary" className="w-56 rounded-sm">
                                View Request
                            </Button>
                        }
                        contentClassName="mt-5 h-96 w-full"
                        children={
                            <CustomAdminTable
                                tableCellData={adminRequestData}
                                onApprove={(referenceID) => console.log('Approved:', referenceID)}
                                onReject={(referenceID) => console.log('Rejected:', referenceID)}
                            />
                        }
                    />
                </div>
                <div className="grid gap-5 pr-5 pl-5 lg:grid-cols-3">
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
                                            variant="empty"
                                            onClick={() => admin.id}
                                        >
                                            View
                                        </Button>
                                    }
                                    image={admin.image}
                                    formFields={AdminFormFields}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Admins;
