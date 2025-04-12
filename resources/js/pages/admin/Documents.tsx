import CustomDialog from '@/components/custom/CustomDialog';
import CustomForm from '@/components/custom/CustomForm';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import {
    documentDescription,
    documentDetails,
    documentImage,
    editDocumentDescription,
    editDocumentDetails,
    editDocumentImage,
} from '@/data/FormFields';
import AdminLayout from '@/layouts/admin/AdminLayout';
import AddIcon from '../../../assets/add-icon.png';
import BarangayCert from '../../../assets/barangay-certificate.png';
import BarangayClearance from '../../../assets/barangay-clearance.png';
import Cedula from '../../../assets/cedula.png';
import CertOfIncome from '../../../assets/income.png';
import CertOfIndigency from '../../../assets/indigency.png';
import CertOfLowIncome from '../../../assets/low-income.png';
const documents = [
    {
        id: 1,
        title: 'Barangay Clearance',
        description:
            "  Issued by the barangay confirming a resident's good standing and residency and is typically used for employement or legal purposes",
        image: BarangayClearance,
    },
    {
        id: 2,
        title: 'Certificate of Low Income',
        description:
            " Verifies a resicent's income level falls within the low-income bracket, typically used for scholarships, subsidies or social benefits",
        image: CertOfLowIncome,
    },
    {
        id: 3,
        title: 'Certificate of income',
        description: 'A formal declaration of a resident’s income, requested for employment, loan applications, or other financial requirements.',
        image: CertOfIncome,
    },
    {
        id: 4,
        title: 'Certificate of Indigency',
        description:
            "Vertifies a resident's financial status as being below the poverty line, often required for availing financial assistance or government programs.",
        image: CertOfIndigency,
    },
    {
        id: 5,
        title: 'Barangay Certificate',
        description: 'Confirms the residency of an individual within the barangay and may not necessarily state their legal standing.',
        image: BarangayCert,
    },
    {
        id: 6,
        title: 'Cedula',
        description: 'Also known as a Community Tax Certificate and one of the basic requirements for most government transactions.',
        image: Cedula,
    },
];

const renderDocumentForm = () => {
    return (
        <>
            <div className="mt-5">
                <CustomForm fields={documentDetails} title="Complete the details" className="font-base grid grid-cols-3 gap-x-4 pt-5" />
            </div>
            <div className="mt-5">
                <CustomForm fields={documentImage} className="grid grid-cols-3" />
            </div>
            <div className="mt-5">
                <CustomForm fields={documentDescription} className="grid grid-cols-1 gap-x-4" />
            </div>
        </>
    );
};

const renderEditDocumentForm = () => {
    return (
        <>
            <div className="mt-5">
                <CustomForm fields={editDocumentDetails} title="Complete the details" className="font-base grid grid-cols-3 gap-x-4 pt-5" />
            </div>
            <div className="mt-5">
                <CustomForm fields={editDocumentImage} className="grid grid-cols-3" />
            </div>
            <div className="mt-5">
                <CustomForm fields={editDocumentDescription} className="grid grid-cols-1 gap-x-4" />
            </div>
        </>
    );
};

export default function Documents() {
    return (
        <AdminLayout>
            <div className="m-2 h-full w-full rounded-md pt-2 pr-5 pb-5 pl-5">
                <div className="flex items-center justify-end">
                    <CustomDialog
                        title="Add new document"
                        trigger={
                            <Button variant="primary" className="w-[200px]">
                                <img src={AddIcon} alt="" className="h-5 w-5" />
                                Add Document
                            </Button>
                        }
                        contentClassName="mt-5"
                        button={
                            <>
                                <div className="flex w-full justify-center">
                                    <Button variant="primary" className="w-2xs rounded-sm">
                                        Add
                                    </Button>
                                </div>
                            </>
                        }
                        children={renderDocumentForm()}
                    />
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
                    {documents.map((doc) => (
                        <div
                            className="flex h-60 min-w-96 flex-col items-center justify-center rounded-lg border-2 pt-5 pr-5 pl-5"
                            style={{
                                backgroundImage: `url(${doc.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-white p-2">
                                <h1 className="text-s3 text-lg font-semibold">{doc.title}</h1>
                                <p className="text-center text-base">{doc.description}</p>
                            </div>
                            <div className="flex w-full justify-end p-2">
                                <CustomDialog
                                    title="Edit Document"
                                    trigger={
                                        <Button variant="primary" className="mt-2 w-[120px] rounded-sm" key={doc.id}>
                                            Edit
                                        </Button>
                                    }
                                    contentClassName="mt-5"
                                    button={
                                        <>
                                            <div className="flex w-full justify-center">
                                                <Button variant="primary" className="w-2xs">
                                                    Edit
                                                </Button>
                                            </div>
                                        </>
                                    }
                                    children={renderEditDocumentForm()}
                                />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </AdminLayout>
    );
}
