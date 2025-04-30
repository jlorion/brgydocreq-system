import CustomDialog from '@/components/custom/CustomDialog';
import { Button } from '@/components/ui/button';
import UserSettingsLayout from '@/layouts/user/UserSettingsLayout';
import { Check, Clock, FileCheck2, FileSearch, FileText, Info, MoveRight, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FetchFirstHalve, FetchSecondHalve } from '@/data/user/DocReqFields'
import CustomForm from '@/components/custom/CustomFormFields';
import { useForm, usePage } from '@inertiajs/react';
import { DocumentProcessingForm, SharedData } from '@/types';
import CustomIcon from '@/components/custom/CustomIcon';
import CustomStepper from '@/components/custom/CustomStepper';

const DocumentRequest = () => {

    const { docprocessing, doctracking} = usePage<SharedData>().props;

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



    return (
        <UserSettingsLayout title="Document Request Tracking">
            <div className="space-y-7 *:data-[slot=card]:border *:data-[slot=card]:rounded-md *:data-[slot=card]:shadow-sm *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
                {
                    docprocessing.map((doc) => (
                        <Card className="@container/card relative" key={doc.requested_document_id}>
                            <div className='bg-emerald-600 rounded-t-md h-9 absolute top-0 w-full'>
                                <span className='text-white pl-4 flex items-center h-full'>
                                    {doc.document_name}
                                </span>
                            </div>
                            <CardContent className='flex flex-col'>
                                <CustomStepper currentStatus={doc.status_id} className='py-10' />
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
                                <CardFooter className="flex justify-end">
                                    <Button variant='destructive'>Cancel</Button>
                                </CardFooter>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </UserSettingsLayout >
    );
};

export default DocumentRequest;
