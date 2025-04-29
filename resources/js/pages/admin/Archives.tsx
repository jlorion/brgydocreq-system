import { CustomDataTable } from '@/components/custom/CustomDataTable'
import CustomDialog from '@/components/custom/CustomDialog'
import CustomForm from '@/components/custom/CustomFormFields'
import CustomIcon from '@/components/custom/CustomIcon'
import CustomSheet from '@/components/custom/CustomSheet'
import { Button } from '@/components/ui/button'
import { FetchFirstHalve, FetchSecondHalve, ViewFields } from '@/data/admin/DocReqFields'
import AdminLayout from '@/layouts/admin/AdminLayout'
import { getStatusColors } from '@/lib/utils'
import { DocumentProcessingForm, SharedData } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUpDown } from 'lucide-react'
import { FormEventHandler } from 'react'
import { toast } from 'sonner'

const Archives = () => {
  const { docprocessing, auth } = usePage<SharedData>().props;

  const { data, setData, post, processing, errors, reset } = useForm<Required<DocumentProcessingForm>>({
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
        reset()
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
      accessorKey: "applicant_name",
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
      accessorKey: "archived_by",
      header: () => <div className='text-center'>Archived By</div>,
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
      accessorKey: "updated_at",
      header: () => <div className='text-center'>Date Archived</div>,
      cell: ({ row }) => {
        const date = row.getValue('updated_at') as string;
        const formatDate = date ? format(new Date(date), "MMM. dd, yyyy '@' hh:mmaaa") : '';

        return <div className="capitalize text-center">{formatDate}</div>
      },
    },
    {
      accessorKey: "status_name",
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
    <AdminLayout className='p-5' title='Archives'>
      <CustomDataTable columns={columns}
        data={onProcessData}
        filterColumn='document_name'
        onRowClick={(row: DocumentProcessingForm) => (populateSheet(row))}
        searchPlaceHolder="Search administrator's name"
        renderSheet={(trigger, row) => (
          <CustomSheet
            key={row}
            firstButton={
              <CustomDialog
                title='View'
                width="w-150"
                trigger={
                  <Button className='w-full' variant='view'>View</Button>
                }
                children={
                  <CustomForm
                    fields={ViewFields(data, setData, errors)}
                  />
                }
              />
            }
            trigger={trigger}
            statusTitle={data.status_name}
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
            } />
        )} />
    </AdminLayout>
  )
}

export default Archives