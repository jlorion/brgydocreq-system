
import CustomActive from '@/components/custom/CustomActive';
import { DocumentCustomCard } from '@/components/custom/CustomCard';
import CustomDialog from '@/components/custom/CustomDialog';
import CustomForm from '@/components/custom/CustomFormFields';
import CustomIcon from '@/components/custom/CustomIcon';
import { Button } from '@/components/ui/button';
import { attachments, contactDetails, personalDetails, purposeDetail } from '@/data/FormFields';
import MainLayout from '@/layouts/shared/MainLayout';
import { Head, Link } from '@inertiajs/react';
import BarangayCert from '../../../assets/barangay-certificate.png';
import BarangayClearance from '../../../assets/barangay-clearance.png';
import BarangayLogo from '../../../assets/barangay-logo.png';
import Cedula from '../../../assets/cedula.png';
import DocumentArchive from '../../../assets/document-archive.svg';
import DocumentRequest from '../../../assets/document-request.svg';
import Document from '../../../assets/documents.png';
import CertOfIncome from '../../../assets/income.png';
import CertOfIndigency from '../../../assets/indigency.png';
import CertOfLowIncome from '../../../assets/low-income.png';
import Population from '../../../assets/population.svg';
import Puroks from '../../../assets/puroks.svg';

const Welcome = () => {
    const renderFormFields = (attachmentFields: any) => {
        return (
            <>
                <div>
                    <CustomForm fields={personalDetails} title="Personal Details" className="grid grid-cols-4 gap-x-4" />
                </div>
                <div className="flex gap-x-5 pr-5">
                    <div className="w-1/2">
                        <CustomForm fields={contactDetails} title="Contact Details" className="grid grid-cols-2 gap-x-4" />
                    </div>
                    <div className="flex-grow">
                        <CustomForm fields={attachmentFields} title="Attachment" className="grid grid-cols-1 gap-x-4" />
                    </div>
                </div>
                <div className="flex-grow">
                    <CustomForm fields={purposeDetail} title="Purpose" className="grid grid-cols-1 gap-x-4" />
                </div>
            </>
        );
    };

    return (
        <>
            <Head title="Balagunan" />
            <MainLayout>
                <section className="flex items-center justify-center lg:justify-between bg-silver h-screen pb-20">
                    {/* Left Div  Text*/}
                    <div className="flex items-center justify-center pl-2 lg:pl-25">
                        <div className="flex flex-col gap-y-3">
                            <div className="flex flex-row justify-center gap-2">
                                <h1 className="text-3xl font-bold text-black md:text-5xl lg:justify-start">
                                    Barangay <span className="text-s3">Document</span>
                                </h1>
                            </div>
                            <h1 className="flex justify-center text-3xl font-bold tracking-wide text-black md:text-5xl lg:justify-start">
                                Requesting System
                            </h1>
                            <div className="flex flex-col items-center justify-center lg:items-start">
                                <p className="my-3 flex text-center text-black lg:text-justify">Make your document request simple and hassle-free.</p>
                            </div>

                            <div className="flex justify-center lg:justify-start">
                                <Button variant="primary" className="w-36">
                                    Request
                                </Button>
                            </div>
                        </div>
                    </div>
                    <CustomIcon className="hidden lg:flex" imgSrc={Document} alt="Document" />
                </section>

                <section className="flex flex-col items-center justify-center px-5 pt-15 pb-5 md:px-10 lg:px-20">
                    <div className="flex flex-col items-center justify-center">
                        <h1 id="services" className="text-s3 text-3xl font-bold">
                            Services
                        </h1>
                        <CustomActive />
                        <p className="py-2 font-medium text-black">Request. Track. Receive. All in one place!</p>
                    </div>

                    <div className="grid w-full justify-center gap-y-8 pt-4 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:grid-cols-3 lg:gap-x-12">
                        <CustomDialog
                            title="Barangay Clearance"
                            trigger={
                                <DocumentCustomCard
                                    image={BarangayClearance}
                                    alt="Barangay Clearance"
                                    title="Barangay Clearance"
                                    content="Issued by the barangay confirming the residents good standing and residency and is typically used for employment or legal purposes"
                                />
                            }
                            button={<Button variant="primary">Submit</Button>}
                            children={renderFormFields(attachments.barangayClearanceAttachment)}
                        />

                        <CustomDialog
                            title="Certificate of Low Income"
                            trigger={
                                <DocumentCustomCard
                                    image={CertOfLowIncome}
                                    alt="Certificate of Low Income"
                                    title="Certificate of Low Income"
                                    content="Verifies a resident's income level falls within the low-income bracket, typically used for scholarships, subsidies, or social benefits"
                                />
                            }
                            button={<Button variant="primary">Submit</Button>}
                            children={renderFormFields(attachments.lowIncomeAttachment)}
                        />

                        <CustomDialog
                            title="Certificate of Income"
                            trigger={
                                <DocumentCustomCard
                                    image={CertOfIncome}
                                    alt="Certificate of Income"
                                    title="Certificate of Income"
                                    content="A formal declaration of a resident’s income, requested for employment, loan applications, or other financial requirements."
                                />
                            }
                            button={<Button variant="primary">Submit</Button>}
                            children={renderFormFields(attachments.incomeAttachment)}
                        />

                        <CustomDialog
                            title="Certificate of Indigency"
                            trigger={
                                <DocumentCustomCard
                                    image={CertOfIndigency}
                                    alt="Certificate of Indigency"
                                    title="Certificate of Indigency"
                                    content="A document certifying that a resident falls below the poverty line, typically required for financial aid, government programs, or social services."
                                />
                            }
                            button={<Button variant="primary">Submit</Button>}
                            children={renderFormFields(attachments.indigencyAttachment)}
                        />

                        <CustomDialog
                            title="Barangay Certificate"
                            trigger={
                                <DocumentCustomCard
                                    image={BarangayCert}
                                    alt="Barangay Certificate"
                                    title="Barangay Certificate"
                                    content="Confirms the residency of an individual within the barangay and may not necessarily state their legal standing."
                                />
                            }
                            button={<Button variant="primary">Submit</Button>}
                            children={renderFormFields(attachments.barangayCertificateAttachment)}
                        />
                        <CustomDialog
                            title="Cedula"
                            trigger={
                                <DocumentCustomCard
                                    image={Cedula}
                                    alt="Cedula"
                                    title="Cedula"
                                    content="Also known as a Community Tax Certificate and one of the basic requirements for most government transactions"
                                />
                            }
                            button={<Button variant="primary">Submit</Button>}
                            children={renderFormFields(attachments.cedulaAttachment)}
                        />
                    </div>
                </section>

                <section id="about" className="flex h-screen flex-col items-center gap-y-10 pt-5">
                    <div>
                        <h1 className="text-s3 text-3xl font-bold">About Us</h1>
                        <CustomActive />
                    </div>

                    <div className="flex w-full flex-col items-center lg:flex-row lg:px-25">
                        <div className="flex justify-center">
                            <CustomIcon imgSrc={BarangayLogo} className="h-60 pr-20 pl-14" alt="Barangay Logo" />
                        </div>
                        <div className="flex w-3/5 flex-1 flex-col gap-4">
                            <h1 className="text-center text-4xl font-semibold lg:text-start">Barangay History</h1>
                            <article className="text-justify text-black">
                                The Barangay Balagunan was once a forested area inhabited by primitive ethnic groups of Mandaya and Aeta. The place
                                was named “Balagunan” after a particular plant called “Balagun” also popularly known as rattan, which was very
                                abundant on the place during that time which used to be a source of income for some natives.The Barangay was one of
                                the original barangay when the Municipality of Sto. Tomas was created out of its mother Municipality of Kapalong by
                                virtue of Executive Order No. 352 signed by the late President Carlos P. Garcia on August 14, 1959. The first
                                appointed barrio captain was Mr. Roberto de Rotas but was not able to function well because when logging concessions
                                had stopped and withdrawn from the area, he also moved out to the place.
                            </article>
                            <Link href={route('landing.about-us')}>
                                <Button variant="primary" className="w-36">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-silver mt-5 flex h-screen w-full flex-col items-center px-5 lg:flex-row lg:justify-between lg:px-25">
                        <div className="flex flex-col items-center justify-center text-center lg:items-start lg:justify-start lg:text-left">
                            <div className="flex flex-row items-center justify-center gap-2">
                                <h1 className="text-3xl font-bold">Current</h1>
                                <h1 className="text-s3 text-3xl font-bold">Status</h1>
                            </div>

                            <p className="pt-5 text-black">
                                Embracing development and modernization, the barangay <br />
                                offered quality services in the community.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-20 gap-y-10 md:gap-x-35 lg:gap-x-50">
                            <CustomIcon imgSrc={DocumentRequest} title="100" content="Document Request" className="h-14 w-14" />
                            <CustomIcon imgSrc={DocumentArchive} title="1,000" content="Document Archive" className="h-14 w-14" />
                            <CustomIcon imgSrc={Puroks} title="12" content="Purok" className="h-14 w-14" />
                            <CustomIcon imgSrc={Population} title="10,000" content="Population" className="h-14 w-14" />
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>
    );
};

export default Welcome;
