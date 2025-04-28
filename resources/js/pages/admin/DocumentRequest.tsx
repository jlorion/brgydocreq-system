import { CustomDataTable } from '@/components/custom/CustomDataTable'
import CustomSheet from '@/components/custom/CustomSheet'
import { Button } from '@/components/ui/button'
import AdminLayout from '@/layouts/admin/AdminLayout'
import { getStatusColors } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import CustomForm from '@/components/custom/CustomFormFields'
import { SharedData, SubmittedDocumentForm } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import { format } from 'date-fns'
import CustomDialog from '@/components/custom/CustomDialog'
import CustomIcon from '@/components/custom/CustomIcon'
import { RejectFields, ApproveFields, FetchFirstHalve, FetchSecondHalve } from '@/data/admin/DocReqFields'
import { FormEventHandler } from 'react'
import { toast } from 'sonner'


const DocumentRequeset = () => {

  const { docrequests, auth } = usePage<SharedData>().props;

  //update status if rejected and store notifications and if approved update the status to approve
  const { data, setData, post, processing, errors, reset } = useForm<Required<SubmittedDocumentForm>>({
    requested_document_id: 0,
    admin_id: auth.admin.admin_id,
    additional_message: '',
    notification: '',
    status_id: 0,
    user_id: 0,
    resident_firstname: '',
    resident_middlename: '',
    resident_lastname: '',
    resident_suffix: '',
    document_id: 0,
    requested_purpose: '',
    document_name: '',
    attachment_path: null,
    amount: 0,
    date_requested: new Date(),
    docreq_status: '',
  })

  const rejectSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('admin.documentreq.reject'), {
      onSuccess: () => {
        toast.success('Updated to rejected')
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

  const approveSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('admin.documentreq.approve'), {
      onSuccess: () => {
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
  const dataDocReq: SubmittedDocumentForm[] = docrequests.map((docrequest) => ({
    requested_document_id: docrequest.requested_document_id,
    user_id: docrequest.user_id,
    admin_id: auth.admin.admin_id,
    status_id: docrequest.status_id,
    additional_message: docrequest.additional_message,
    notification: docrequest.notification,
    resident_firstname: docrequest.resident_firstname,
    resident_middlename: docrequest.resident_middlename,
    resident_lastname: docrequest.resident_lastname,
    resident_suffix: docrequest.resident_suffix,
    document_id: docrequest.document_id,
    requested_purpose: docrequest.requested_purpose,
    document_name: docrequest.document_name,
    attachment_path: docrequest.attachment_path,
    amount: docrequest.amount,
    date_requested: docrequest.date_requested,
    docreq_status: docrequest.docreq_status,
  }))

  // populate the sheet
  const populateSheet = (docrequest: SubmittedDocumentForm) => {
    setData({
      requested_document_id: docrequest.requested_document_id,
      user_id: docrequest.user_id,
      admin_id: auth.admin.admin_id,
      status_id: docrequest.status_id,
      additional_message: docrequest.additional_message,
      notification: docrequest.notification,
      resident_firstname: docrequest.resident_firstname,
      resident_middlename: docrequest.resident_middlename,
      resident_lastname: docrequest.resident_lastname,
      resident_suffix: docrequest.resident_suffix,
      document_id: docrequest.document_id,
      requested_purpose: docrequest.requested_purpose,
      document_name: docrequest.document_name,
      attachment_path: docrequest.attachment_path,
      amount: docrequest.amount,
      date_requested: docrequest.date_requested,
      docreq_status: docrequest.docreq_status,
    })
  }

  const columns: ColumnDef<SubmittedDocumentForm>[] = [
    {
      accessorKey: "applicant_name",
      header: () => <div className='text-center'>Applicant's Name</div>,
      cell: ({ row }) => {
        const { resident_firstname, resident_middlename, resident_lastname, resident_suffix } = row.original
        const middleInitial = resident_middlename ? `${resident_middlename.charAt(0).toUpperCase()}.` : '';
        const fullName = [
          resident_firstname,
          middleInitial,
          resident_suffix ? `${resident_lastname},` : resident_lastname,
          resident_suffix
        ].filter(Boolean).join(' ').trim()

        return <div className="capitalize text-center">{fullName}</div>
      },
    },
    {
      accessorKey: "document_name",
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
      accessorKey: "date_requested",
      header: () => <div className='text-center'>Date Requested</div>,
      cell: ({ row }) => {
        const date = row.getValue('date_requested') as string;
        const formatDate = date ? format(new Date(date), "MMM. dd, yyyy '@' hh:mmaaa") : '';

        return <div className="capitalize text-center">{formatDate}</div>
      },
    },
    {
      accessorKey: "docreq_status",
      header: () => <div className='text-center'>Status</div>,
      cell: ({ row }) => {
        const status = row.getValue("docreq_status") as string;

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
      <CustomDataTable
        columns={columns}
        data={dataDocReq}
        onRowClick={(row: SubmittedDocumentForm) => populateSheet(row)}
        filterColumn='applicant_name'
        searchPlaceHolder="Search applicant's name"
        renderSheet={(trigger, row) => (
          <CustomSheet
            key={row}
            trigger={trigger}
            firstButton={
              data.docreq_status === 'Under Review' ? (
                <CustomDialog
                  title="Approving Document Request"
                  button={<Button disabled={processing}>Submit</Button>}
                  onSubmit={approveSubmit}
                  width="w-150"
                  trigger={
                    <Button
                      onClick={() => {
                        setData('status_id', 11);
                        setData('notification', 'Your request has been successfully approved.');
                      }}
                      className="w-full"
                      variant="approve">
                      Approve
                    </Button>
                  }
                  children={
                    <>
                      <input type="text" hidden defaultValue={data.admin_id} />
                      <input type="text" hidden defaultValue={data.requested_document_id} />
                      <input type="text" hidden defaultValue={data.status_id} />
                      <CustomForm fields={ApproveFields(data, setData, errors)} />
                    </>
                  } />

              ) : (
                <Button
                  className={`w-full ${data.docreq_status === 'Approved' ? 'bg-blue-500' : data.docreq_status === 'Rejected' ? 'bg-red-500' : 'bg-gray-500'}`}
                  disabled
                >
                  {data.docreq_status}
                </Button>

              )
            }
            secondButton={
              data.docreq_status === 'Under Review' ? (
                <CustomDialog
                  title="Reason of Rejection"
                  onSubmit={rejectSubmit}
                  width="w-150"
                  trigger={
                    <Button
                      className="w-full"
                      onClick={() => {
                        setData('status_id', 1);
                        setData('notification', 'Your request has been rejected.');
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
            statusTitle={data.docreq_status}
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