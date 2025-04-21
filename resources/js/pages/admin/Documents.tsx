import CustomDialog from '@/components/custom/CustomDialog';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin/AdminLayout';
import AddIcon from '../../../assets/add-icon.png';
import BarangayCert from '../../../assets/barangay-certificate.png';
import BarangayClearance from '../../../assets/barangay-clearance.png';
import Cedula from '../../../assets/cedula.png';
import CertOfIncome from '../../../assets/income.png';
import CertOfIndigency from '../../../assets/indigency.png';
import CertOfLowIncome from '../../../assets/low-income.png';
import { DocumentCustomCard } from '@/components/custom/CustomCard';

export default function Documents() {
    return (
        <AdminLayout>
            <div className="m-2 h-full w-full rounded-md pt-2 pr-5 pb-5 pl-5">
                <CustomDialog
                    title="Barangay Clearance"
                    button={<Button variant="primary">Submit</Button>}
                    trigger={
                        <DocumentCustomCard
                            image={BarangayClearance}
                            alt="Barangay Clearance"
                            title="Barangay Clearance"
                            content="Issued by the barangay confirming the residents good standing and residency and is typically used for employment or legal purposes"
                        />
                    }
                    children={
                        <div>Nigga</div>
                    }
                />

            </div>
        </AdminLayout>
    );
}
