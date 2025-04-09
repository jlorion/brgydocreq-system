import { CustomDataTable } from '@/components/custom/CustomDataTable'
import { Button } from '@/components/ui/button'
import AdminLayout from '@/layouts/admin/AdminLayout'
import { formatText } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

type OnProcess = {
  id: string
  applicant_name: string
  status: "claimed" | "processing" | "rejected" | "under_review" | "for_pickup"
  date_processed: string
  type_of_document: string
  approved_by: string
}

const data: OnProcess[] = [
  {
    id: "1",
    applicant_name: "Mark John",
    status: "claimed",
    date_processed: "April 30, 2024",
    type_of_document: "Barangay Clearance",
    approved_by: "Aohn Doe",
  },
  {
    id: "2",
    applicant_name: "Mark Jefferson",
    status: "processing",
    date_processed: "April 30, 2024",
    type_of_document: "Barangay Certificate",
    approved_by: "Bohn Doe",
  },
  {
    id: "3",
    applicant_name: "Mark Luis",
    status: "rejected",
    date_processed: "April 30, 2024",
    type_of_document: "Certificate Indigency",
    approved_by: "Cohn Doe",
  },
  {
    id: "4",
    applicant_name: "Mark Doe",
    status: "for_pickup",
    date_processed: "April 30, 2024",
    type_of_document: "Purok Clearance",
    approved_by: "Dohn Doe",
  },
  {
    id: "5",
    applicant_name: "Mark Dayne",
    status: "under_review",
    date_processed: "April 30, 2024",
    type_of_document: "Income Certificate",
    approved_by: "Eohn Doe",
  },
  {
    id: "6",
    applicant_name: "Mark Don",
    status: "claimed",
    date_processed: "April 30, 2024",
    type_of_document: "Low Income Certificate",
    approved_by: "Fohn Doe",
  },
]


const columns: ColumnDef<OnProcess>[] = [
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
      <div className="capitalize text-center">{row.getValue("applicant_name")}</div>
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
  {
    accessorKey: "date_processed",
    header: () => <div className='text-center'>Date Processed</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("date_processed")}</div>
    ),
  },

]

const OnProcess = () => {
  return (
    <AdminLayout className='p-5' title='On Process'>
      <CustomDataTable columns={columns} data={data} filterColumn='applicant_name' searchPlaceHolder="Search applicant's name" />
    </AdminLayout>
  )
}

export default OnProcess