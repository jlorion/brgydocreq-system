import CustomCard from '@/components/custom/CustomCard';
import CustomFooter from '@/components/custom/CustomFooter';
import { Icon } from '@/components/custom/CustomIcon';
import CustomLogo from '@/components/custom/CustomLogo';
import { Button } from '@/components/ui/button';
import AppHeaderLayout from '@/layouts/shared/AppHeaderLayout';
import { type NavItem } from '@/types';
import BarangayClearance from '../../../assets/barangay-clearance.png';
import BarangayLogo from '../../../assets/barangay-logo.png';
import DocumentRequest from '../../../assets/document-request.svg';
import Document from '../../../assets/documents.png';

const Welcome = () => {
    const landingMainNavItems: NavItem[] = [
        { title: 'Home', href: '/', icon: undefined },
        { title: 'Services', href: '/services', icon: undefined },
        { title: 'About', href: '/about', icon: undefined },
        { title: 'Contact', href: '/contact', icon: undefined },
    ];

    const landingRightNavItems: NavItem[] = [
        { title: 'Login', href: '/login', icon: undefined },
        { title: 'Register', href: '/register', icon: undefined },
    ];

    return (
        <>
            <AppHeaderLayout mainNavItems={landingMainNavItems} rightNavItems={landingRightNavItems} />
            <section>
                <div className="flex h-screen justify-between">
                    {/* Left Div  Text*/}
                    <div className="mb-40 flex w-1/2 flex-col items-center justify-center">
                        <div className="flex flex-col gap-y-3">
                            <div className="flex flex-row">
                                <h1 className="text-5xl font-semibold text-black">
                                    Barangay <span className="text-s3">Document</span>
                                </h1>
                            </div>
                            <h1 className="text-5xl font-semibold tracking-wide text-black">Requesting System</h1>
                            <p className="text-black">Make your document request simple and hassle-free. </p>
                            <Button variant="customizedWithBG" className="w-36">
                                Request
                            </Button>
                        </div>
                    </div>

                    {/* Right div or Logo */}
                    <div className="mb-40 flex w-1/2 items-center justify-center">
                        <img className="h-4/5" src={Document} alt="Document" />
                    </div>
                </div>
            </section>

            <section>
                <div className="flex h-screen flex-col items-center">
                    <div className="flex flex-col items-center">
                        <h1 className="text-s3 text-3xl font-bold">Services</h1>
                        <div className="pt-2">
                            <ul className="m-0 flex list-none p-0">
                                <a href="" className="inline-block h-1 w-10 rounded-l-lg bg-green-400/40"></a>
                                <a href="" className="inline-block h-1 w-10 border-green-600 bg-green-700"></a>
                                <a href="" className="inline-block h-1 w-10 rounded-r-lg bg-green-400/40"></a>
                            </ul>
                        </div>
                        <p className="py-2 font-medium text-black">Request. Track. Receive. All in one place!</p>
                    </div>

                    {/* Card here */}
                    <div className="grid grid-cols-3 gap-x-28 gap-y-22 pt-4">
                        <CustomCard
                            image={BarangayClearance}
                            alt="Barangay Clearance"
                            title="Barangay Clearance"
                            content="Issued by the barangay confirming a residents good standing and residency and is typically used for employment or legal purposes"
                        />
                        <CustomCard
                            image={BarangayClearance}
                            alt="Barangay Clearance"
                            title="Barangay Clearance"
                            content="Issued by the barangay confirming a residents good standing and residency and is typically used for employment or legal purposes"
                        />
                        <CustomCard
                            image={BarangayClearance}
                            alt="Barangay Clearance"
                            title="Barangay Clearance"
                            content="Issued by the barangay confirming a residents good standing and residency and is typically used for employment or legal purposes"
                        />
                        <CustomCard
                            image={BarangayClearance}
                            alt="Barangay Clearance"
                            title="Barangay Clearance"
                            content="Issued by the barangay confirming a residents good standing and residency and is typically used for employment or legal purposes"
                        />
                        <CustomCard
                            image={BarangayClearance}
                            alt="Barangay Clearance"
                            title="Barangay Clearance"
                            content="Issued by the barangay confirming a residents good standing and residency and is typically used for employment or legal purposes"
                        />
                        <CustomCard
                            image={BarangayClearance}
                            alt="Barangay Clearance"
                            title="Barangay Clearance"
                            content="Issued by the barangay confirming a residents good standing and residency and is typically used for employment or legal purposes"
                        />
                    </div>
                </div>
            </section>

            <section>
                <div className="flex h-screen flex-col items-center">
                    <h1 className="text-s3 mb-6 text-3xl font-bold">About Us</h1>

                    <div className="flex w-full flex-row items-center p-4">
                        <div className="flex w-2/5 items-center justify-center">
                            <CustomLogo logo={BarangayLogo} alt="Barangay Logo" className="h-60" />
                        </div>
                        <div className="ml-10 flex w-3/5 flex-col gap-4">
                            <h1 className="text-4xl font-semibold">Barangay History</h1>
                            <p className="text-justify text-black">
                                The Barangay Balagunan was once a forested area inhabited by primitive ethnic groups of Mandaya and Aeta. The place
                                was named “Balagunan” after a particular plant called “Balagun” also popularly known as rattan, which was very
                                abundant on the place during that time which used to be a source of income for some natives.The Barangay was one of
                                the original barangay when the Municipality of Sto. Tomas was created out of its mother Municipality of Kapalong by
                                virtue of Executive Order No. 352 signed by the late President Carlos P. Garcia on August 14, 1959. The first
                                appointed barrio captain was Mr. Roberto de Rotas but was not able to function well because when logging concessions
                                had stopped and withdrawn from the area, he also moved out to the place.
                            </p>
                            <Button variant="customizedWithBG" className="w-36">
                                Learn More
                            </Button>
                        </div>
                    </div>

                    <div className="bg-silver flex h-screen w-full items-center justify-between px-20">
                        <div className="flex flex-grow flex-col items-start text-start">
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
                            <Icon imgSrc={DocumentRequest} title="100" content="Document Request" className="h-14 w-14" />
                            <Icon imgSrc={DocumentRequest} title="100" content="Document Request" className="h-14 w-14" />
                            <Icon imgSrc={DocumentRequest} title="100" content="Document Request" className="h-14 w-14" />
                            <Icon imgSrc={DocumentRequest} title="100" content="Document Request" className="h-14 w-14" />
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <CustomFooter />
            </footer>
        </>
    );
};

export default Welcome;
