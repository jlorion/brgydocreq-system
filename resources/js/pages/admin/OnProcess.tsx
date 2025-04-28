import { CustomDataTable } from '@/components/custom/CustomDataTable'
import { Button } from '@/components/ui/button'
import AdminLayout from '@/layouts/admin/AdminLayout'
import { getStatusColors } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import CustomSheet from '@/components/custom/CustomSheet'
import CustomForm from '@/components/custom/CustomFormFields'
import { SharedData, OnProcessForm } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import { format } from 'date-fns'
import { FetchFirstHalve, FetchSecondHalve } from '@/data/admin/OnProcessFields';
import { FormEventHandler } from 'react'


const OnProcess = () => {


  const { onprocess, auth } = usePage<SharedData>().props;

  const { data, setData, post, processing, errors, reset } = useForm<Required<OnProcessForm>>({
    onprocess_id: 0,
    admin_id: auth.admin.admin_id,
    status_id: 0,
    created_at: new Date(),
    updated_at: new Date(),
    requested_document_id: 0,
    officer_firstname: '',
    officer_middlename: '',
    officer_lastname: '',
    officer_suffix: '',
    resident_firstname: '',
    resident_middlename: '',
    resident_lastname: '',
    resident_suffix: '',
    document_name: '',
    status_name: '',
  })

  const onProcessSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('admin.on-process.update'), {
      onError: (errors) => {
        console.error("Form Validation error");
        Object.entries(errors).forEach(([field, message]) => {
          console.error(`Field: ${field}, Message: ${message}`);
        })
      }
    });
  }


  // populate sheet
  const populateSheet = (onprocess: OnProcessForm) => {
    setData({
      onprocess_id: onprocess.onprocess_id,
      admin_id: onprocess.admin_id,
      status_id: onprocess.status_id,
      created_at: onprocess.created_at,
      updated_at: onprocess.updated_at,
      requested_document_id: onprocess.requested_document_id,
      officer_firstname: onprocess.officer_firstname,
      officer_middlename: onprocess.officer_middlename,
      officer_lastname: onprocess.officer_lastname,
      officer_suffix: onprocess.officer_suffix,
      resident_firstname: onprocess.resident_firstname,
      resident_middlename: onprocess.resident_middlename,
      resident_lastname: onprocess.resident_lastname,
      resident_suffix: onprocess.resident_suffix,
      document_name: onprocess.document_name,
      status_name: onprocess.status_name,
    })
  }

  //data for every cell
  const onProcessData: OnProcessForm[] = onprocess.map((onprocess) => ({
    onprocess_id: onprocess.onprocess_id,
    admin_id: onprocess.admin_id,
    status_id: onprocess.status_id,
    created_at: onprocess.created_at,
    updated_at: onprocess.updated_at,
    requested_document_id: onprocess.requested_document_id,
    officer_firstname: onprocess.officer_firstname,
    officer_middlename: onprocess.officer_middlename,
    officer_lastname: onprocess.officer_lastname,
    officer_suffix: onprocess.officer_suffix,
    resident_firstname: onprocess.resident_firstname,
    resident_middlename: onprocess.resident_middlename,
    resident_lastname: onprocess.resident_lastname,
    resident_suffix: onprocess.resident_suffix,
    document_name: onprocess.document_name,
    status_name: onprocess.status_name,
  }));

  // columns for table
  const columns: ColumnDef<OnProcessForm>[] = [
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
      accessorKey: "approved_by",
      header: () => <div className='text-center'>Approved By</div>,
      cell: ({ row }) => {
        const { officer_firstname, officer_middlename, officer_lastname, officer_suffix } = row.original
        const middleInitial = officer_middlename ? `${officer_middlename.charAt(0).toUpperCase()}.` : '';
        const fullName = [
          officer_firstname,
          middleInitial,
          officer_suffix ? `${officer_lastname},` : officer_lastname,
          officer_suffix
        ].filter(Boolean).join(' ').trim()

        return <div className="capitalize text-center">{fullName}</div>
      },
    },
    {
      accessorKey: "created_at",
      header: () => <div className='text-center'>Date Approved</div>,
      cell: ({ row }) => {
        const date = row.getValue('created_at') as string;
        const formatDate = date ? format(new Date(date), "MMM. dd, yyyy '@' hh:mmaaa") : '';

        return <div className="capitalize text-center">{formatDate}</div>
      },
    },
    {
      accessorKey: "updated_at",
      header: () => <div className='text-center'>Date Updated</div>,
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
    <AdminLayout className='p-5' title='On Process'>
      <CustomDataTable
        columns={columns}
        data={onProcessData}
        filterColumn='applicant_name'
        onRowClick={(row: OnProcessForm) => (populateSheet(row))}
        searchPlaceHolder="Search applicant's name"
        renderSheet={(trigger, row) => (
          <CustomSheet
            key={row}
            onSubmit={onProcessSubmit}
            trigger={trigger}
            firstButton={
              data.status_name === 'Claimed' ? (
                <Button>Claimed</Button>
              ) : (
                <Button disabled={processing} className='w-full'>Save</Button>
              )
            }
            statusTitle={data.status_name}
            form={
              <>
                <input type="hidden" defaultValue={data.onprocess_id} />
                <CustomForm className='grid grid-cols-2 gap-x-3' fields={FetchFirstHalve(data, setData, errors)} />
                <CustomForm className='grid grid-cols-1 gap-x-3' fields={FetchSecondHalve(data, setData, errors)} />
              </>
            } />
        )} />
    </AdminLayout>
  )
}

export default OnProcess