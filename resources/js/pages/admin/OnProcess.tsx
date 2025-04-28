import { CustomDataTable } from '@/components/custom/CustomDataTable'
import { Button } from '@/components/ui/button'
import AdminLayout from '@/layouts/admin/AdminLayout'
import { formatText } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import CustomSheet from '@/components/custom/CustomSheet'
import CustomForm from '@/components/custom/CustomFormFields'
import { SharedData, SubmittedDocumentForm } from '@/types'
import { useForm, usePage } from '@inertiajs/react'

const { docrequests, auth } = usePage<SharedData>().props;

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

const columns: ColumnDef<SubmittedDocumentForm>[] = [
  {
    accessorKey: "applicant_name",
    header: () => <div className='text-center'>Applicant's Name</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("applicant_name")}</div>
    ),
  },
  {
    accessorKey: "type_of_document",
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
      <div className="capitalize text-center">{row.getValue("type_of_document")}</div>
    ),
  },
  {
    accessorKey: "approved_by",
    header: () => <div className='text-center'>Approve By</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("approved_by")}</div>
    ),
  },
  {
    accessorKey: "date_approved",
    header: () => <div className='text-center'>Date Approved</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("date_approved")}</div>
    ),
  },
  {
    accessorKey: "date_processed",
    header: () => <div className='text-center'>Date Processed</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("date_processed")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className='text-center'>Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const statusColors: Record<string, string> = {
        rejected: "bg-red-200 text-red-700",
        claimed: "bg-green-200 text-green-700",
        under_review: "bg-yellow-200 text-yellow-700",
        processing: "bg-blue-200 text-blue-700",
        for_pickup: "bg-violet-200 text-violet-700",
      };

      const statusCode = statusColors[status] || "bg-gray-400 text-gray-600";

      return (
        <div className='flex justify-center items-center'>
          <div className={`rounded w-3/5 py-1 capitalize text-center ${statusCode}`}>
            {formatText(status)}
          </div>
        </div>
      );
    },
  },
]

const OnProcess = () => {
  return (
    <AdminLayout className='p-5' title='On Process'>
      <CustomDataTable
        columns={columns}
        data={data}
        filterColumn='applicant_name'
        searchPlaceHolder="Search applicant's name"
        renderSheet={(trigger, row) => (
          <CustomSheet
            trigger={trigger}
            firstButton='Submit'
            statusTitle='Under Review'
            form={
              <>
                <div></div>
              </>
            } />
        )} />
    </AdminLayout>
  )
}

export default OnProcess