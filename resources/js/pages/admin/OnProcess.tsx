import { CustomDataTable } from '@/components/custom/CustomDataTable'
import { Button } from '@/components/ui/button'
import AdminLayout from '@/layouts/admin/AdminLayout'
import { getStatusColors } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import CustomSheet from '@/components/custom/CustomSheet'
import CustomForm from '@/components/custom/CustomFormFields'
import { SharedData, DocumentProcessingForm } from '@/types'
import { Head, useForm, usePage } from '@inertiajs/react'
import { format } from 'date-fns'
import { FetchFirstHalve, FetchSecondHalve } from '@/data/admin/OnProcessFields';
import { FormEventHandler, useEffect } from 'react'
import CustomDialog from '@/components/custom/CustomDialog'
import { ClaimedFields, ProcessingFields, ForPickUpFields } from '@/data/admin/OnProcessFields'
import { toast } from 'sonner'

const OnProcess = () => {
  const { docprocessing, auth } = usePage<SharedData>().props;

  const { data, setData, post, processing, errors } = useForm<Required<DocumentProcessingForm>>({
    requested_document_id: 0,
    onprocess_id: 0,
    user_id: 0,
    admin_id: auth.admin.admin_id,
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

  const onProcessSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('admin.processing'), {
      onSuccess: () => {
        toast.success('Succesfully updated and send notification');
        setData('status_name', data.status_name);
      },
      onError: (errors) => {
        console.error("Form Validation error");
        Object.entries(errors).forEach(([field, message]) => {
          console.error(`Field: ${field}, Message: ${message}`);
        })
      }
    });
  }


  // populate sheet
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

  //data for every cell
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

  // columns for table
  const columns: ColumnDef<DocumentProcessingForm>[] = [
    {
      accessorFn: row => `${row.resident_lastname}, ${row.resident_firstname}`.trim(),
      id: "applicant_name",
      header: () => <div className='text-center'>Applicant's Name</div>,
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
      header: () => <div className='text-center'>Type of Document</div>,
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue("document_name")}</div>
      ),
    },
    {
      accessorFn: row => `${row.officer_lastname}, ${row.officer_firstname}`.trim(),
      id: "approved_by",
      header: () => <div className='text-center'>Approved By</div>,
      cell: ({ row }) => {
        const { officer_firstname, officer_lastname } = row.original
        const name = [
          `${officer_lastname},`,
          officer_firstname,
        ].filter(Boolean).join(' ').trim()

        return <div className="capitalize text-center">{name}</div>
      },
    },
    {
      accessorFn: row => row.created_at ? format(new Date(row.created_at), "MMM dd, yyyy hh:mm aa") : '',
      id: "created_at",
      header: () => <div className='text-center'>Date Approved</div>,
      cell: ({ row }) => {
        const date = row.getValue('created_at') as string;
        return <div className="capitalize text-center">{date}</div>;
      },
    },
    {
      accessorFn: row => row.updated_at ? format(new Date(row.updated_at), "MMM dd, yyyy hh:mm aa") : '',
      id: "updated_at",
      header: () => <div className='text-center'>Date P/FP/C</div>,
      cell: ({ row }) => {
        const date = row.getValue('updated_at') as string;
        return <div className="capitalize text-center">{date}</div>;
      },
    },
    {
      accessorKey: "status_name",
      header: ({ column }) => {
        return (
          <div className='text-center'>
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Status
              <ArrowUpDown />
            </Button>
          </div>
        )
      },
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

  const statusDialogMap = {
    6: {
      title: 'Processing',
      fields: ProcessingFields,
      notification: `Your ${data.document_name} is for processing.`
    },
    7: {
      title: 'For Pick-up',
      fields: ForPickUpFields,
      notification: `Your ${data.document_name} is ready for pick-up.`
    },
    2: {
      title: 'Claimed',
      fields: ClaimedFields,
      notification: `You claimed your ${data.document_name}`
    },


  } as const;
  // automatically set notification when status changes
  useEffect(() => {
    const currentStatus = statusDialogMap[data.status_id as keyof typeof statusDialogMap];

    if (currentStatus?.notification) {
      setData('notification', currentStatus.notification);
    } else {
      setData('notification', 'Undefined');
    }
  }, [data.status_id]);

  return (
    <AdminLayout className='p-5' title='On Process'>
      <Head title="On Process" />
      <CustomDataTable
        columns={columns}
        data={onProcessData}
        onRowClick={(row: DocumentProcessingForm) => (populateSheet(row))}
        searchPlaceHolder="Search"
        renderSheet={(trigger, row) => {

          // map the dialog based on the selected status
          const dialogProps = statusDialogMap[data.status_id as keyof typeof statusDialogMap] || {
            title: 'Unknown Status',
            fields: ProcessingFields,
          };

          return (
            <CustomSheet
              key={row}
              trigger={trigger}
              firstButton={
                <CustomDialog
                  title={dialogProps.title}
                  onSubmit={onProcessSubmit}
                  width="w-150"
                  trigger={
                    data.status_name === 'Claimed' ? (
                      <Button
                        disabled
                        className="w-full bg-green-600"
                      >
                        Claimed
                      </Button>
                    ) : data.status_id === 11 ? (
                      <Button
                        disabled
                        className="w-full opacity-70"
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                      >
                        Save
                      </Button>
                    )

                  }
                  button={<Button disabled={processing}>Submit</Button>}
                  children={
                    <>
                      <input type="hidden" defaultValue={data.admin_id} />
                      <input type="hidden" defaultValue={data.requested_document_id} />
                      <input type="hidden" defaultValue={data.status_id} />
                      <CustomForm fields={dialogProps.fields(data, setData, errors)} />
                    </>
                  }
                />
              }
              statusTitle={data.status_name}
              form={
                <>
                  <input type="hidden" defaultValue={data.onprocess_id} />
                  <CustomForm className='grid grid-cols-2 gap-x-3' fields={FetchFirstHalve(data, setData, errors)} />
                  <CustomForm className='grid grid-cols-1 gap-x-3' fields={FetchSecondHalve(data, setData, errors)} />
                </>
              } />
          )
        }} />
    </AdminLayout>
  )
}

export default OnProcess