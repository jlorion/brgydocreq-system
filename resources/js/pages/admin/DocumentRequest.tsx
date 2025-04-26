import { CustomDataTable } from '@/components/custom/CustomDataTable'
import CustomSheet from '@/components/custom/CustomSheet'
import { Button } from '@/components/ui/button'
import AdminLayout from '@/layouts/admin/AdminLayout'
import { getStatusColors } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, File } from 'lucide-react'
import CustomForm from '@/components/custom/CustomFormFields'
import { DocReqFieldsFirstHalve, DocReqFieldsSecondHalve } from '@/data/admin/FetchUpdateDocReqFields'
import { SharedData, SubmittedDocumentForm } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import { format } from 'date-fns'
import CustomDialog from '@/components/custom/CustomDialog'
import TextLink from '@/components/custom/CustomTextLink'
import CustomIcon from '@/components/custom/CustomIcon'


const DocumentRequeset = () => {

  const { docrequests } = usePage<SharedData>().props;

  const { data, setData, post, processing, errors } = useForm<Required<SubmittedDocumentForm>>({
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
    document_status: '',
  })

  const dataDocReq: SubmittedDocumentForm[] = docrequests.map((docrequest) => ({
    user_id: docrequest.user_id,
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
    document_status: docrequest.document_status,
  }))


  const populateSheet = (docrequest: SubmittedDocumentForm) => {
    setData({
      user_id: docrequest.user_id,
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
      document_status: docrequest.document_status,
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
    // {
    //   accessorKey: "document_status",
    //   header: () => <div className='text-center'>Status</div>,
    //   cell: ({ row }) => {
    //     const status = row.getValue("document_status") as string;

    //     return (
    //       <div className='flex justify-center items-center'>
    //         <div className={`rounded w-3/5 py-1 capitalize text-center ${getStatusColors(status)}`}>
    //           {status}
    //         </div>
    //       </div>
    //     );
    //   },
    // },

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
            firstButton={<Button className='w-full' variant='approve'>Approve</Button>}
            secondButton={<Button className='w-full' variant='reject'>Reject</Button>}
            statusTitle='Under Review'
            form={
              <>
                <CustomForm fields={DocReqFieldsFirstHalve(data, setData, errors)} className="grid grid-cols-2 gap-2" />
                <CustomForm fields={DocReqFieldsSecondHalve(data, setData, errors)} className="grid grid-cols-1 pt-2" />
                <CustomDialog
                  width='w-150'
                  trigger={
                    <Button variant='link' className="text-sm">View Attachment</Button >
                  }
                  title='Attachment'
                  children={
                    <div className='flex justify-center items-center object-cover mt-2'>
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

export default DocumentRequeset