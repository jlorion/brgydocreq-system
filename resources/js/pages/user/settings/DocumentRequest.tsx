import CustomDialog from '@/components/custom/CustomDialog';
import { Button } from '@/components/ui/button';
import UserSettingsLayout from '@/layouts/user/UserSettingsLayout';
import { Card, CardContent, CardFooter, } from '@/components/ui/card';
import { FetchFirstHalve, FetchSecondHalve, Resubmit } from '@/data/user/DocumentRequestFields'
import CustomForm from '@/components/custom/CustomFormFields';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { DocumentProcessingForm, SharedData } from '@/types';
import CustomIcon from '@/components/custom/CustomIcon';
import CustomStepper from '@/components/custom/CustomStepper';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

const DocumentRequest = () => {

    const { docprocessing, auth } = usePage<SharedData>().props;
    const currentUserId = auth.user.user_id;

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['docprocessing'] });
        }, 1000);

        return () => clearInterval(interval);
    })

    const { data, setData, post, processing, errors, reset } = useForm<Required<DocumentProcessingForm>>({
        requested_document_id: 0,
        onprocess_id: 0,
        user_id: 0,
        admin_id: 0,
        status_id: 0,
        document_id: 0,
        amount: 0,
        additional_message: '',
        notification: '',
        officer_firstname: '',
        officer_lastname: '',
        resident_firstname: '',
        resident_lastname: '',
        requested_purpose: '',
        document_name: '',
        status_name: '',
        attachment_path: null,
        created_at: new Date(),
        updated_at: new Date(),
    })

    const cancelRequest: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('user.settings.delete.document-request'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Request deleted successfully');
            },
            onError: (errors) => {
                toast.error('Request deletion failed');
                Object.entries(errors).forEach(([field, message]) => {
                    console.error(`Field: ${field}, Error: ${message}`);
                });

            }
        })
    }

    const resubmitRequest: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('user.settings.resubmit.document-request'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Request successfully resubmitted');
                reset()
                setEditMode(null);
            },
            onError: (errors) => {
                Object.entries(errors).forEach(([field, message]) => {
                    console.error(`Field: ${field}, Error: ${message}`);
                });

            }
        })
    }

    const [editMode, setEditMode] = useState<number | null>(null)


    return (
        <>
            <Head title="Document Request" />
            <Toaster richColors position='top-right' />
            <UserSettingsLayout title="Document Request Tracking">
                <div className="space-y-7 *:data-[slot=card]:border *:data-[slot=card]:rounded-md *:data-[slot=card]:shadow-sm *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
                    {
                        !docprocessing.length ? (
                            <div className="text-center text-muted-foreground">
                                You have no document requests yet.
                            </div>
                        ) : (
                            docprocessing
                                .filter((doc) => doc.user_id === currentUserId)
                                .map((doc) => (
                                    doc.status_id === 1 ? (
                                        <Card className="@container/card relative" key={doc.requested_document_id}>
                                            <div className='bg-emerald-600 rounded-t-md h-9 absolute top-0 w-full'>
                                                <span className='text-white pl-4 flex items-center h-full'>
                                                    {doc.document_name}
                                                </span>
                                            </div>
                                            <CardContent className={`flex flex-col ${editMode === doc.requested_document_id ? null : 'opacity-50'}`}>
                                                <CustomStepper key={doc.requested_document_id} currentStatus={doc.status_id} className='py-10' />
                                                <CustomForm className='grid grid-cols-4 gap-x-5' fields={FetchFirstHalve(doc, setData, errors)} />

                                                {editMode === doc.requested_document_id ? (
                                                    <form onSubmit={resubmitRequest}>
                                                        <CustomForm fields={Resubmit(data, setData, errors)} />
                                                        <input type="hidden" value={data.user_id} />
                                                        <input type="hidden" value={data.document_id} />
                                                        <input type="hidden" value={data.status_id} />
                                                        <input type='hidden' defaultValue={data.document_name} />
                                                        <input type='hidden' defaultValue={data.requested_document_id} />
                                                    </form>
                                                ) : (
                                                    <>
                                                        <CustomForm fields={FetchSecondHalve(doc, setData, errors)} />
                                                        <CustomDialog
                                                            width="w-150"
                                                            trigger={
                                                                <Button variant="link" className="text-sm -mx-4">
                                                                    View Attachment
                                                                </Button>
                                                            }
                                                            title="Attachment"
                                                            children={
                                                                <div className="flex justify-center items-center object-cover mt-2">
                                                                    <CustomIcon imgSrc={`/storage/${doc.attachment_path}`} />
                                                                </div>

                                                            }
                                                        />
                                                    </>
                                                )}
                                            </CardContent>
                                            <CardFooter className="flex justify-between items-center">
                                                <p className='text-sm bg-red-50 p-2 rounded-md text-red-600 border-1 border-red-300'>
                                                    {doc.status_name}: {doc.additional_message}
                                                </p>
                                                <div className='flex gap-x-5'>
                                                    <Button onClick={() => {
                                                        setData('user_id', doc.user_id);
                                                        setData('document_id', doc.document_id);
                                                        setData('status_id', 5);
                                                        setData('requested_document_id', doc.requested_document_id);
                                                        setData('document_name', doc.document_name);
                                                        setEditMode(prev => (prev === doc.requested_document_id ? null : doc.requested_document_id));
                                                    }}>
                                                        {editMode === doc.requested_document_id ? 'Cancel Edit' : 'Edit Request'}
                                                    </Button>

                                                    {editMode === doc.requested_document_id ? (
                                                        <Button
                                                            disabled={processing}
                                                            className={editMode === doc.requested_document_id ? 'bg-blue-700 hover:bg-blue-600' : ''}
                                                            onClick={(e) => {
                                                                resubmitRequest(e);
                                                            }}>
                                                            Resubmit Request
                                                        </Button>
                                                    ) : (
                                                        null
                                                    )
                                                    }

                                                </div>
                                            </CardFooter>
                                        </Card>
                                    ) : (
                                        <Card className="@container/card relative" key={doc.requested_document_id}>
                                            <div className='bg-emerald-600 rounded-t-md h-9 absolute top-0 w-full'>
                                                <span className='text-white pl-4 flex items-center h-full'>
                                                    {doc.document_name}
                                                </span>
                                            </div>
                                            <CardContent className='flex flex-col'>
                                                <CustomStepper key={doc.requested_document_id} currentStatus={doc.status_id} className='py-10' />
                                                <CustomForm className='grid grid-cols-4 gap-x-5' fields={FetchFirstHalve(doc, setData, errors)} />
                                                <CustomForm fields={FetchSecondHalve(doc, setData, errors)} />
                                                <CustomDialog
                                                    width="w-150"
                                                    trigger={
                                                        <Button variant="link" className="text-sm -mx-4">
                                                            View Attachment
                                                        </Button>
                                                    }
                                                    title="Attachment"
                                                    children={
                                                        <div className="flex justify-center items-center object-cover mt-2">
                                                            <CustomIcon imgSrc={`/storage/${doc.attachment_path}`} />
                                                        </div>

                                                    }
                                                />
                                            </CardContent>
                                            <CardFooter className="flex justify-between items-center">
                                                <p className='text-sm bg-yellow-50 p-2 rounded-md text-amber-500 border-1 border-amber-300'>
                                                    Note: You cannot delete the request once the document is approved.
                                                </p>
                                                <form onSubmit={cancelRequest}>
                                                    <input type="hidden" value={data.user_id} />
                                                    <input type="hidden" value={data.requested_document_id} />
                                                    <input type="hidden" value={data.document_id} />
                                                    <input type="hidden" value={data.status_id} />
                                                    <Button
                                                        variant='destructive'
                                                        disabled={processing}
                                                        onClick={() => {
                                                            setData('user_id', doc.user_id);
                                                            setData('requested_document_id', doc.requested_document_id);
                                                            setData('document_id', doc.document_id);
                                                            setData('status_id', doc.status_id);
                                                        }}>
                                                        Delete Request
                                                    </Button>
                                                </form>
                                            </CardFooter>
                                        </Card>
                                    )
                                ))
                        )
                    }
                </div>
            </UserSettingsLayout >
        </>
    );
};

export default DocumentRequest;
