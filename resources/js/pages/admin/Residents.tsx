import CustomDialog from '@/components/custom/CustomDialog';
import CustomForm from '@/components/custom/CustomForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { addResidentDemographic, addResidentName, residentAddress } from '@/data/FormFields';
import AdminLayout from '@/layouts/admin/AdminLayout';
import Search from '../../../assets/search.png';
import SearchTableCell from '../../../assets/SearchBlue.png';
const ResidentsData = [
    {
        id: 1,
        precinctId: 'INV001',
        residentName: 'Reignear Magallanes',
        residentGender: 'Male',
        residentBirthday: '1998-01-01',
        residentStatus: 'Active',
    },
    {
        id: 2,
        precinctId: 'INV002',
        residentName: 'Gester Lorica',
        residentGender: 'Male',
        residentBirthday: '1892-01-01',
        residentStatus: 'Active',
    },
    {
        id: 3,
        precinctId: 'INV003',
        residentName: 'Mark Jefferson Saldana',
        residentGender: 'Male',
        residentBirthday: '1789-01-01',
        residentStatus: 'Active',
    },
    {
        id: 4,
        precinctId: 'INV003',
        residentName: 'Mark Jefferson Saldana',
        residentGender: 'Male',
        residentBirthday: '1789-01-01',
        residentStatus: 'Active',
    },
    {
        id: 5,
        precinctId: 'INV003',
        residentName: 'Mark Jefferson Saldana',
        residentGender: 'Male',
        residentBirthday: '1789-01-01',
        residentStatus: 'Active',
    },
    {
        id: 6,
        precinctId: 'INV003',
        residentName: 'Mark Jefferson Saldana',
        residentGender: 'Male',
        residentBirthday: '1789-01-01',
        residentStatus: 'Active',
    },
];
const renderAddResidentForm = () => {
    return (
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
    );
};

const Residents = () => {
    return (
        <AdminLayout>
            {' '}
            <div className="h-full w-full p-2 pt-5">
                <div className="flex flex-row items-center justify-between pr-2">
                    <div className="flex max-w-lg min-w-md flex-row items-center gap-2 rounded-lg border-1 pl-5">
                        <img src={Search} alt="" className="h-5 w-5" />
                        <Input placeholder="Search" className="border-none"></Input>
                    </div>
                    <div>
                        <CustomDialog
                            title="Add resident"
                            trigger={
                                <Button className="rounded-sm" variant="primary">
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
                            children={renderAddResidentForm()}
                        />
                    </div>
                </div>
                <div className="mt-2 min-h-[520px] overflow-hidden rounded-md border-1">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-36">Precinct ID</TableHead>
                                <TableHead className="w-54">Resident Name</TableHead>
                                <TableHead className="w-36">Gender</TableHead>
                                <TableHead className="w-36">Birthday</TableHead>
                                <TableHead className="w-36">Status</TableHead>
                                <TableHead className="w-36">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ResidentsData.map((resident) => (
                                <TableRow key={resident.id} className="gap-y-5">
                                    <TableCell>{resident.precinctId}</TableCell>
                                    <TableCell>{resident.residentName}</TableCell>
                                    <TableCell>{resident.residentGender}</TableCell>
                                    <TableCell>{resident.residentBirthday}</TableCell>
                                    <TableCell>{resident.residentStatus}</TableCell>
                                    <TableCell>
                                        <Button variant="search" className="rounded-sm" key={resident.id}>
                                            <>
                                                <div className="flex flex-row items-center justify-center gap-2">
                                                    <img src={SearchTableCell} alt="Search Icon" />
                                                    <p className="text-blue-500">View</p>
                                                </div>
                                            </>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Pagination className="flex justify-end pt-2">
                    <PaginationContent className="rounded-lg border-2">
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </AdminLayout>
    );
};

export default Residents;
