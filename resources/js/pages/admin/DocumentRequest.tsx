import { CustomDataTable } from '@/components/custom/CustomDataTable'
import CustomSheet from '@/components/custom/CustomSheet'
import { Button } from '@/components/ui/button'
import AdminLayout from '@/layouts/admin/AdminLayout'
import { formatText } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { DocumentRequestFields } from '@/data/admin/FetchUpdateDocReqFields'
import { PurposeofRequestField } from '@/data/admin/FetchUpdateDocReqFields'
import { ViewAttachment } from '@/data/admin/FetchUpdateDocReqFields'
import CustomForm from '@/components/custom/CustomFormFields'




const columns: ColumnDef<DocumentRequeset>[] = [
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
    accessorKey: "date_requested",
    header: () => <div className='text-center'>Date Requested</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("date_requested")}</div>
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

const DocumentRequeset = () => {
  return (
    <AdminLayout className='p-5 ' title='Document Request'>
      <CustomDataTable columns={columns} data={data} filterColumn='applicant_name' searchPlaceHolder="Search applicant's name" renderSheet={(trigger, row) => (
        <CustomSheet trigger={trigger} firstButton='Approve' firstButtonVariant='approve' secondButton='Reject' secondButtonVariant='reject' statusTitle='Under Review'
          form={
            <>
              <CustomForm fields={DocumentRequestFields} className="grid grid-cols-2 gap-2" />
              <CustomForm fields={PurposeofRequestField} className="grid grid-cols-1 pt-2" />
              <CustomForm fields={ViewAttachment} className="flex justify-center pt-2" />
            </>
          } />
      )} />
    </AdminLayout>
  )
}

export default DocumentRequeset