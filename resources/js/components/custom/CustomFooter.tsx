import { Button } from '@/components/ui/button';
import Email from '../../../assets/email.svg';
import Facebook from '../../../assets/facebook.svg';
import Location from '../../../assets/location.svg';
import Phone from '../../../assets/phone.svg';
import Send from '../../../assets/send.svg';
import WebLogo from '../../../assets/web-logo-light.svg';
import Website from '../../../assets/website.svg';
import CustomIcon from './CustomIcon';
import { Link } from '@inertiajs/react';

const CustomFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className="bg-s5 grid w-full grid-cols-4 gap-10 p-10 px-20 text-white">
                {/* First col */}
                <section>
                    <div className="space-y-10">
                        <CustomIcon imgSrc={WebLogo} className="h-14" alt="Webpage logo" />
                        <div className="text-sm">
                            <p>
                                Copyright © {currentYear} Barangay Balagunan <br />
                                All rights reserved
                            </p>
                        </div>
                        <div>
                            <Link href={route('landing.contact-us')} prefetch>
                                <Button className="bg-s2 hover:bg-s3" variant="primary">
                                    Tell us about our project
                                    <CustomIcon className="pl-2" imgSrc={Send} alt="Send Icon" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
                {/* Second col */}
                <section>
                    <div className="space-y-10">
                        <div>
                            <h1 className="text-2xl font-bold">Quick Links</h1>
                        </div>
                        <div>
                            <ul className="space-y-5 text-sm">
                                <li>
                                    <a href="#">About us</a>
                                </li>
                                <li>
                                    <a href="#">Contact us</a>
                                </li>
                                <li>
                                    <a href="#">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#">Terms of service</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Third col */}
                <section>
                    <div className="space-y-10">
                        <div>
                            <h1 className="text-2xl font-bold">Visit Us</h1>
                        </div>
                        <div className="space-y-5 text-sm">
                            <div className="flex items-center gap-x-4">
                                <CustomIcon imgSrc={Location} alt="location icon" className="h-7" />
                                <p className="flex-wrap">Purok 1, Balagunan, Santo Tomas, Davao del Norte</p>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <CustomIcon imgSrc={Website} alt="website icon" className="h-7" />
                                <p>santotomasdavnor.gov.ph</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fourth Col */}
                <div className="space-y-10">
                    <div>
                        <h1 className="text-2xl font-bold">Contact</h1>
                    </div>
                    <div className="space-y-6 text-sm">
                        <div className="flex items-center gap-x-4">
                            <CustomIcon imgSrc={Phone} alt="phone icon" className="h-7" />
                            <p>+63 9211 522 4632</p>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <CustomIcon imgSrc={Email} alt="email icon" className="h-9" />
                            <p>balagunan@gmail.com</p>
                        </div>
                    </div>
                    <div className="space-y-8 text-sm">
                        <h1 className="text-2xl font-bold">Social Media</h1>
                        <div className="flex items-center gap-x-4">
                            <CustomIcon imgSrc={Facebook} alt="facebook icon" className="h-7" />
                            <p>Barangay Balagunan</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomFooter;
