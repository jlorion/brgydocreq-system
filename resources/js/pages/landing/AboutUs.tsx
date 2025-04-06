import CustomIcon from '@/components/custom/CustomIcon';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { BarangayOfficials } from '@/data/BarangayOfficials';
import LoadFBSdk from '@/hooks/LoadFBSdk';
import MainLayout from '@/layouts/shared/MainLayout';
import { Head } from '@inertiajs/react';
import BarangayLogo from '../../../assets/barangay-logo.png';
import Mission from '../../../assets/mission.svg';
import Road from '../../../assets/road.png';
import Vision from '../../../assets/vision.svg';

const AboutUs = () => {
    LoadFBSdk();

    return (
        <>
            <Head title="About us" />
            <MainLayout className="px-10 py-10 md:px-25">
                <header>
                    <h1 className="text-s3 pb-20 text-center text-3xl font-semibold">About Barangay</h1>
                </header>

                <div className="flex flex-col gap-y-20 text-black">
                    <section className="flex h-auto items-center">
                        <CustomIcon imgSrc={Road} alt="Road" className="hidden max-h-[500px] min-h-[100px] object-cover lg:block" />
                        <div className="flex flex-col text-start lg:pl-25">
                            <h1 className="pb-4 text-center text-2xl font-semibold md:text-start">Barangay History</h1>
                            <article className="text-justify">
                                Once a forested area inhabited by the Mandaya and Aeta tribes, Balagunan derived its name from the “Balagun” plant, or
                                rattan, which was abundant in the area. Officially part of the Municipality of Sto. Tomas since 1959, Balagunan has
                                grown through visionary leadership and resilient communities.
                                <br />
                                <br />
                                Key milestones include the construction of primary schools, logging road improvements, and resettlement efforts that
                                welcomed migrants across Luzon, Visayas, and Mindanao. Over the decades, committed leaders like Pedro Rosal, Eusebio
                                Cabiling, and Crisostomo Magallanes brought education, electrification, health centers, and economic projects.
                                Notably, the barangay thrived with foreign-assisted programs, including World Bank and J ICA-funded infrastructure
                                like roads, bridges, and irrigation systems.
                                <br />
                                <br />
                                Today, Balagunan stands as a progressive and vibrant barangay, known for its agricultural contributions, particularly
                                its banana plantations, which support local livelihoods and global trade. With a focus on development and community
                                welfare, the barangay continues to grow toward a brighter future.
                            </article>
                        </div>
                    </section>

                    <section className="relative flex h-auto items-center justify-between text-black">
                        <div className="bg-light-yellow -mx-25">
                            <div className="flex h-auto flex-col gap-y-10 px-25">
                                <div className="flex flex-col gap-5 pt-10">
                                    <div className="flex items-center justify-center md:justify-start">
                                        <CustomIcon imgSrc={Mission} alt="mission" className="h-12" />
                                    </div>
                                    <h1 className="text-center text-2xl font-semibold md:text-start">Our Mission</h1>
                                    <article className="text-justify">
                                        Enact ordinance on agriculture programs and services geared towards the improvement of the quality of life of
                                        the people; Support Cooperatives to foster unity, promote sustainable livelihood programs and to achieve total
                                        development; Provide Infrastructure Facilities for basic services delivery; Strictly implement the provisions
                                        of RA 9003 for a clean environment, as well as provision of medical services for a healthy populace; Enact
                                        ordinances to maintain the peace and order situation of the community; Protect the rights of the youth;
                                        Pagmugna ug malinawon, han-ay nga komunidad; pag palambo sa maayong hiyas ug espirituhanong pag-kinabuhi sa
                                        mga lumulupyo;
                                    </article>
                                </div>
                                <div className="w-full flex-col gap-5 pb-10">
                                    <div className="flex justify-center md:justify-start">
                                        <CustomIcon imgSrc={Vision} alt="vision" className="h-12" />
                                    </div>
                                    <h1 className="pb-3 text-center text-2xl font-semibold md:text-start">Our Vision</h1>
                                    <article className="text-justify font-normal">
                                        With empowered, sincere, and dedicated barangay officials and citizenry, we envision Barangay Balagunan as a
                                        Progressive and Peaceful Community achieving sustainable development.
                                        <br />
                                        <br />
                                        Barangay Balagunan Strives to become: <br />
                                        Usa ka malamboon nga Barangay sa Munisipalidad sa Santo Tomas, tinubdan sa daghang responsable, makugihon,
                                        maki-angayun ug mga relihiyosong mga lumulopyo. Inubanan usab sa pagdaghan sa mga kasagingan, balay patigayun,
                                        hayahay nga pagpanarbaho, modernong insprastraktura, hapsay nga panggobyerno, kalinaw sa pagpuyo, maayong
                                        kapaninguhaan sa panginabuhi, ug kalimpyo sa Barangay ug kina-iyahan.
                                    </article>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col pb-10 lg:flex-row">
                        {/* Left side */}
                        <div className="mx-auto flex flex-col gap-y-7">
                            <div className="box-border flex w-full items-center justify-center rounded-sm border border-gray-300 p-4">
                                <div
                                    className="fb-page"
                                    data-href="https://www.facebook.com/profile.php?id=61556343104505"
                                    data-tabs="timeline"
                                    data-width="420"
                                    data-height="500"
                                    data-small-header="false"
                                    data-adapt-container-width="true"
                                    data-hide-cover="false"
                                    data-show-facepile="true"
                                >
                                    <blockquote cite="https://www.facebook.com/profile.php?id=61556343104505" className="fb-xfbml-parse-ignore">
                                        <a href="https://www.facebook.com/profile.php?id=61556343104505">Santo Tomas Information Office</a>
                                    </blockquote>
                                </div>
                            </div>

                            <div className="box-border flex w-full items-center justify-center rounded-sm border border-gray-300 p-4">
                                <div
                                    className="fb-page"
                                    data-href="https://www.facebook.com/SBOStoTomas"
                                    data-tabs="timeline"
                                    data-width="420"
                                    data-height="500"
                                    data-small-header="false"
                                    data-adapt-container-width="true"
                                    data-hide-cover="false"
                                    data-show-facepile="true"
                                >
                                    <blockquote cite="https://www.facebook.com/SBOStoTomas" className="fb-xfbml-parse-ignore">
                                        <a href="https://www.facebook.com/SBOStoTomas">Sangguniang Bayan of Santo Tomas, Davao del Norte</a>
                                    </blockquote>
                                </div>
                            </div>

                            <div className="box-border flex w-full items-center justify-center rounded-sm border border-gray-300 p-4">
                                <div
                                    className="fb-page"
                                    data-href="https://www.facebook.com/mpdosantotomas"
                                    data-tabs="timeline"
                                    data-width="420"
                                    data-height="500"
                                    data-small-header="false"
                                    data-adapt-container-width="true"
                                    data-hide-cover="false"
                                    data-show-facepile="true"
                                >
                                    <blockquote cite="https://www.facebook.com/mpdosantotomas" className="fb-xfbml-parse-ignore">
                                        <a href="https://www.facebook.com/mpdosantotomas">
                                            Municipal Planning and Development Coordinator&#039;s Office Santo Tomas
                                        </a>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                        {/* Right side */}
                        <div className="flex flex-1 flex-col items-center gap-5 p-2 text-center lg:pl-20">
                            {/* Text here regarding Santo Tomas */}
                            <CustomIcon imgSrc={BarangayLogo} alt="Barangay Logo" />
                            <h1 className="text-3xl font-semibold">Barangay Officials 2023 - 2025</h1>
                            <Table>
                                <TableBody>
                                    {BarangayOfficials.map((official, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="border-2 text-start text-[11px] md:max-w-60 md:text-base">
                                                {official.position}
                                            </TableCell>
                                            <TableCell className="border-2 text-start text-[11px] md:max-w-60 md:text-base">
                                                {official.name}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="w-full">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.851350407047!2d125.58890147456896!3d7.481661692530346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f94b8ee00d5e2b%3A0xf6c14f94852ddf1!2sBalagunan%20Barangay%20Hall!5e0!3m2!1sen!2sph!4v1739366648931!5m2!1sen!2sph"
                                    width="100%"
                                    height="450"
                                    style={{ border: '0' }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </section>
                </div>
            </MainLayout>
        </>
    );
};

export default AboutUs;
