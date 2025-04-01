import CustomActive from '@/components/custom/CustomActive';
import CustomCard from '@/components/custom/CustomCard';
import CustomIcon from '@/components/custom/CustomIcon';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/shared/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { useRef } from 'react';
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
    const servicesSection = useRef<HTMLDivElement>(null); 

    return (
        <>
            <Head title="Balagunan" />
            <MainLayout>
                <section className="flex justify-between py-12">
                    {/* Left Div  Text*/}
                    <div className="flex items-center justify-center pl-25">
                        <div className="flex flex-col gap-y-3">
                            <div className="flex flex-row">
                                <h1 className="text-5xl font-semibold text-black">
                                    Barangay <span className="text-s3">Document</span>
                                </h1>
                            </div>
                            <h1 className="text-5xl font-semibold tracking-wide text-black">Requesting System</h1>
                            <p className="my-3 text-black">Make your document request simple and hassle-free. </p>
                            <Button variant="primary" className="w-36">
                                Request
                            </Button>
                        </div>
                    </div>

                    {/* Right div or Logo */}
                    <CustomIcon className="h-2/3" imgSrc={Document} alt="Document" />
                </section>

                <section className="flex flex-col items-center justify-center px-25 py-35">
                    <div className="flex flex-col items-center">
                        <h1 id="services" className="text-s3 text-3xl font-bold">
                            Services
                        </h1>
                        <CustomActive />
                        <p className="py-2 font-medium text-black">Request. Track. Receive. All in one place!</p>
                    </div>

                    <div className="grid grid-cols-3 gap-x-34 gap-y-8 pt-4">
                        <CustomCard
                            image={BarangayClearance}
                            alt="Barangay Clearance"
                            title="Barangay Clearance"
                            content="Issued by the barangay confirming the residents good standing and residency and is typically used for employment or legal purposes"
                        />
                        <CustomCard
                            image={CertOfLowIncome}
                            alt="Certificate of Low Income"
                            title="Certificate of Low Income"
                            content="Verifies a resident's income level falls within the low-income bracket, typically used for scholarships, subsidies, or social benefits"
                        />
                        <CustomCard
                            image={CertOfIncome}
                            alt="Certificate of Income"
                            title="Certificate of Income"
                            content="A formal declaration of a resident’s income, requested for employment, loan applications, or other financial requirements."
                        />
                        <CustomCard
                            image={CertOfIndigency}
                            alt="Certificate of Indigency"
                            title="Certificate of Indigency"
                            content="A document certifying that a resident falls below the poverty line, typically required for financial aid, government programs, or social services."
                        />
                        <CustomCard
                            image={BarangayCert}
                            alt="Barangay Certificate"
                            title="Barangay Certificate"
                            content="Confirms the residency of an individual within the barangay and may not necessarily state their legal standing."
                        />
                        <CustomCard
                            image={Cedula}
                            alt="Cedula"
                            title="Cedula"
                            content="Also known as a Community Tax Certificate and one of the basic requirements for most government transactions"
                        />
                    </div>
                </section>

                <section id="about" className="flex h-screen flex-col items-center gap-y-10">
                    <div>
                        <h1 className="text-s3 text-3xl font-bold">About Us</h1>
                        <CustomActive />
                    </div>

                    <div className="flex w-full items-center px-25">
                        <div>
                            <CustomIcon imgSrc={BarangayLogo} className="h-60 pr-20 pl-14" alt="Barangay Logo" />
                        </div>
                        <div className="flex w-3/5 flex-1 flex-col gap-4">
                            <h1 className="text-4xl font-semibold">Barangay History</h1>
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

                    <div className="bg-silver flex h-screen w-full items-center justify-between px-25 pb-14">
                        <div className="flex flex-col items-start">
                            <div className="flex">
                                <h1 className="text-3xl font-bold">Current</h1>
                                <h1 className="text-s3 pl-2 text-3xl font-bold">Status</h1>
                            </div>

                            <p className="pt-5 text-black">
                                Embracing development and modernization, the barangay <br />
                                offered quality services in the community.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-50 gap-y-10">
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
