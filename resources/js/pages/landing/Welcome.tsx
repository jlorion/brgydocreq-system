
import CustomActive from '@/components/custom/CustomActive';
import { DocumentCustomCard } from '@/components/custom/CustomCard';
import CustomDialog from '@/components/custom/CustomDialog';
import CustomForm from '@/components/custom/CustomFormFields';
import CustomIcon from '@/components/custom/CustomIcon';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/shared/MainLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import BarangayLogo from '../../../assets/barangay-logo.png';
import DocumentArchive from '../../../assets/document-archive.svg';
import DocumentRequest from '../../../assets/document-request.svg';
import Document from '../../../assets/documents.png';
import Population from '../../../assets/population.svg';
import Puroks from '../../../assets/puroks.svg';
import { DocumentReqForm, SharedData } from '@/types';
import DefaultDocPic from '../../../assets/default_documentpic.svg'
import { DocumentRequestFields } from '@/data/user/DocumentRequestFields';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const Welcome = () => {

    const { documents, auth } = usePage<SharedData>().props;

    const { data, setData, post, processing, errors, reset } = useForm<Required<DocumentReqForm>>({
        user_id: auth.user.user_id,
        document_id: 0,
        attachment_path: null,
        requested_purpose: '',
    })

    const submitDocument: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('user.document.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Succesfully submitted');
                reset()
            },
            onError: (errors) => {
                console.error('Form submission failed. Validation errors:');
                Object.entries(errors).forEach(([field, message]) => {
                    console.error(`Field: ${field}, Error: ${message}`);
                });
            },
        })
    }

    return (

        <>
            <Head title="Balagunan" />
            <MainLayout>
                <section className="flex items-center justify-center lg:justify-between bg-silver  h-screen pb-20">
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
                                <Button variant="primary" className="w-36" >
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
                        <p className="py- font-medium text-black">Request. Track. Receive. All in one place!</p>
                    </div>

                    <div className="grid justify-center gap-y-8 pt-5 lg:grid-cols-3 lg:gap-x-26 lg:gap-y-18">

                        {auth.user ? (documents.map((document) => (
                            <CustomDialog
                                key={document.document_id}
                                title={document.document_name}
                                onSubmit={submitDocument}
                                trigger={
                                    <DocumentCustomCard
                                        image={document.document_photopath ? `/storage/${document.document_photopath}` : DefaultDocPic}
                                        alt={document.document_name}
                                        title={document.document_name}
                                        onClick={() => setData('document_id', document.document_id)}
                                        content={document.description} />
                                }
                                button={<Button disabled={processing} variant="primary">Submit</Button>}
                                children={
                                    <>
                                        <input type='text' hidden defaultValue={data.document_id} />
                                        <input type='text' hidden defaultValue={data.user_id} />
                                        <CustomForm fields={DocumentRequestFields(data, setData, errors)} />
                                    </>
                                }
                            />

                        ))) : (
                            (documents.map((document, index) => (
                                <Link href={route('user.login')}>
                                    <DocumentCustomCard
                                        key={index}
                                        image={document.document_photopath ? `/storage/${document.document_photopath}` : DefaultDocPic}
                                        alt={document.document_name}
                                        title={document.document_name}
                                        content={document.description} />
                                </Link>
                            )))
                        )
                        }
                    </div>
                </section>

                <section id="about" className="flex h-screen flex-col items-center gap-y-10 pt-10">
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
