import { CustomDataTable } from '@/components/custom/CustomDataTable'
import CustomSheet from '@/components/custom/CustomSheet'
import { Button } from '@/components/ui/button'
import AdminLayout from '@/layouts/admin/AdminLayout'
import { getStatusColors } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import CustomForm from '@/components/custom/CustomFormFields'
import { SharedData, DocumentProcessingForm } from '@/types'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { format } from 'date-fns'
import CustomDialog from '@/components/custom/CustomDialog'
import CustomIcon from '@/components/custom/CustomIcon'
import { RejectFields, ApproveFields, FetchFirstHalve, FetchSecondHalve } from '@/data/admin/DocReqFields'
import { FormEventHandler, useEffect } from 'react'
import { toast } from 'sonner'


const DocumentRequeset = () => {

  const { docprocessing, auth } = usePage<SharedData>().props;


  //update status if rejected and store notifications and if approved update the status to approve
  const { data, setData, post, processing, errors } = useForm<Required<DocumentProcessingForm>>({
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

  // to reload the page every second
  useEffect(() => {
    const interval = setInterval(() => {
      router.reload({ only: ['docprocessing'] });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const rejectSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('admin.documentreq.reject'), {
      onSuccess: () => {
        toast.success('Updated to rejected')
        setData('status_name', 'Rejected');
      },
      onError: (errors) => {
        console.error('Form submission failed. Validation errors:');
        Object.entries(errors).forEach(([field, message]) => {
          console.error(`Field: ${field}, Error: ${message}`);
        });
      },

    })
  }

  const approveSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('admin.documentreq.approve'), {
      onSuccess: () => {
        setData('status_name', 'Approved');
        toast.success('Updated to approved')
      },
      onError: (errors) => {
        console.error('Form submission failed. Validation errors:');
        Object.entries(errors).forEach(([field, message]) => {
          console.error(`Field: ${field}, Error: ${message}`);
        });
      },
    })
  }

  // data for every cell
  const onProcessData: DocumentProcessingForm[] = docprocessing.map((docprocessing) => ({
    requested_document_id: docprocessing.requested_document_id,
    onprocess_id: docprocessing.onprocess_id,
    user_id: docprocessing.user_id,
    admin_id: docprocessing.admin_id,
    status_id: docprocessing.status_id,
    document_id: docprocessing.document_id,
    amount: docprocessing.amount,
    additional_message: docprocessing.additional_message,
    notification: docprocessing.notification,
    officer_firstname: docprocessing.officer_firstname,
    officer_lastname: docprocessing.officer_lastname,
    resident_firstname: docprocessing.resident_firstname,
    resident_lastname: docprocessing.resident_lastname,
    requested_purpose: docprocessing.requested_purpose,
    document_name: docprocessing.document_name,
    status_name: docprocessing.status_name,
    attachment_path: docprocessing.attachment_path,
    created_at: docprocessing.created_at,
    updated_at: docprocessing.updated_at,
  }));

  // populate the sheet
  const populateSheet = (docprocessing: DocumentProcessingForm) => {
    setData({
      requested_document_id: docprocessing.requested_document_id,
      onprocess_id: docprocessing.onprocess_id,
      user_id: docprocessing.user_id,
      admin_id: docprocessing.admin_id,
      status_id: docprocessing.status_id,
      document_id: docprocessing.document_id,
      amount: docprocessing.amount,
      additional_message: docprocessing.additional_message,
      notification: docprocessing.notification,
      officer_firstname: docprocessing.officer_firstname,
      officer_lastname: docprocessing.officer_lastname,
      resident_firstname: docprocessing.resident_firstname,
      resident_lastname: docprocessing.resident_lastname,
      requested_purpose: docprocessing.requested_purpose,
      document_name: docprocessing.document_name,
      status_name: docprocessing.status_name,
      attachment_path: docprocessing.attachment_path,
      created_at: docprocessing.created_at,
      updated_at: docprocessing.updated_at,
    })
  }

  const columns: ColumnDef<DocumentProcessingForm>[] = [
    {
      accessorFn: row => `${row.resident_lastname}, ${row.resident_firstname}`.trim(),
      id: "applicant_name",
      header: () => <div className='text-center'>Applicant's Name</div>,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const { resident_firstname, resident_lastname } = row.original
        const name = [
          `${resident_lastname},`,
          resident_firstname,
        ].filter(Boolean).join(' ').trim()

        return <div className="capitalize text-center">{name}</div>
      },
    },
    {
      accessorKey: "document_name",
      enableGlobalFilter: true,
      header: ({ column }) => {
        return (
          <div className='text-center'>
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Type of Document
              <ArrowUpDown />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue("document_name")}</div>
      ),
    },
    {
      accessorFn: row => row.created_at ? format(new Date(row.created_at), "MMM dd, yyyy hh:mm aa") : '',
      id: "created_at",
      enableGlobalFilter: true,
      header: () => <div className='text-center'>Date Requested</div>,
      cell: ({ row }) => {
        const date = row.getValue('created_at') as string;
        return <div className="capitalize text-center">{date}</div>;
      },
    },

    {
      accessorFn: row => row.updated_at ? format(new Date(row.updated_at), "MMM dd, yyyy hh:mm aa") : '',
      id: "updated_at",
      enableGlobalFilter: true,
      header: () => <div className='text-center'>Date A/R/Resubmitted</div>,
      cell: ({ row }) => {
        const date = row.getValue('updated_at') as string;
        return <div className="capitalize text-center">{date}</div>;
      },
    },
    {
      accessorKey: "status_name",
      enableGlobalFilter: true,
      header: () => <div className='text-center'>Status</div>,
      cell: ({ row }) => {
        const status = row.getValue("status_name") as string;
        return (
          <div className='flex justify-center items-center'>
            <div className={`rounded w-28 py-1 capitalize text-center ${getStatusColors(status)}`}>
              {status}
            </div>
          </div>
        );
      },
    },

  ]

  return (
    <AdminLayout className='p-5 ' title='Document Request'>
      <Head title="Document Request" />
      <CustomDataTable
        columns={columns}
        data={onProcessData}
        onRowClick={(row: DocumentProcessingForm) => populateSheet(row)}
        searchPlaceHolder="Search"
        renderSheet={(trigger, row) => (
          <CustomSheet
            key={row}
            statusTitle={data.status_name}
            trigger={trigger}
            firstButton={
              data.status_name === 'Under Review' ? (
                <CustomDialog
                  title="Approving Document Request"
                  button={<Button disabled={processing}>Submit</Button>}
                  onSubmit={approveSubmit}
                  width="w-150"
                  trigger={
                    <Button
                      onClick={() => {
                        setData('status_id', 11);
                        setData('admin_id', auth.admin.admin_id);
                        setData('notification', `Your ${data.document_name} has been successfully approved.`);
                      }}
                      className="w-full"
                      variant="approve">
                      Approve
                    </Button>
                  }
                  children={
                    <>
                      <input type="hidden" defaultValue={data.admin_id} />
                      <input type="hidden" defaultValue={data.requested_document_id} />
                      <input type="hidden" defaultValue={data.status_id} />
                      <CustomForm fields={ApproveFields(data, setData, errors)} />
                    </>
                  } />

              ) : (
                <Button
                  className={`w-full ${data.status_name === 'Approved' ? 'bg-blue-500' : data.status_name === 'Rejected' ? 'bg-red-500' : 'bg-gray-500'}`}
                  disabled
                >
                  {data.status_name}
                </Button>

              )
            }
            secondButton={
              data.status_name === 'Under Review' ? (
                <CustomDialog
                  title="Reason of Rejection"
                  onSubmit={rejectSubmit}
                  width="w-150"
                  trigger={
                    <Button
                      className="w-full"
                      onClick={() => {
                        setData('status_id', 1);
                        setData('admin_id', auth.admin.admin_id);
                        setData('notification', `Your ${data.document_name} has been rejected.`);
                      }}
                      variant="reject"
                    >
                      Reject
                    </Button>
                  }
                  button={<Button disabled={processing}>Submit</Button>}
                  children={
                    <>
                      <input type="hidden" defaultValue={data.admin_id} />
                      <input type="hidden" defaultValue={data.requested_document_id} />
                      <input type="hidden" defaultValue={data.status_id} />
                      <CustomForm fields={RejectFields(data, setData, errors)} />
                    </>
                  }
                />
              ) : null
            }
            form={
              <>
                <CustomForm fields={FetchFirstHalve(data, setData, errors)} className="grid grid-cols-2 gap-2" />
                <CustomForm fields={FetchSecondHalve(data, setData, errors)} className="grid grid-cols-1 pt-2" />
                <CustomDialog
                  width="w-150"
                  trigger={
                    <Button variant="link" className="text-sm">
                      View Attachment
                    </Button>
                  }
                  title="Attachment"
                  children={
                    <div className="flex justify-center items-center object-cover mt-2">
                      <CustomIcon imgSrc={`/storage/${data.attachment_path}`} />
                    </div>
                  }
                />
              </>
            }
          />
        )} />
    </AdminLayout>
  )
}

export default DocumentRequeset