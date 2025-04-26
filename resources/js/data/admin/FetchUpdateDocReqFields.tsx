import TextLink from "@/components/custom/CustomTextLink"

export const DocumentRequestFields = [
	{
		label: "Applicant's Name",
		type: 'text',
		id: 'admin',
		value: 'Jeffrey Boy',
		tabIndex: 1,
		autoComplete: 'birthdate',
		disabled: true,
		onChange: (value: string) => console.log('Birthday:', value),
		errorMessage: 'birthdate',


	},
	{
		label: 'Document Type',
		id: 'document_type',
		type: 'text',
		value: 'Barangay Clearance',
		tabIndex: 2,
		disabled: true,
		onChange: (value: string) => console.log('Precint:', value),
		errorMessage: 'document_type',
	},
	{
		label: 'Amount',
		id: 'amount',
		type: 'text',
		value: 'Php 50.00',
		tabIndex: 3,
		disabled: true,
		onChange: (value: string) => console.log('Precint:', value),
		errorMessage: 'amount',
	},
	{
		label: 'Date Requested',
		id: 'date_requested',
		type: 'text',
		value: 'Nov. 10, 2023 @ 10:34 AM',
		tabIndex: 4,
		disabled: true,
		onChange: (value: string) => console.log('Precint:', value),
		errorMessage: 'date_requested',
	},
]

export const PurposeofRequestField = [
	{
		label: 'Purpose of Request',
		id: 'purpose',
		type: 'textarea',
		value: 'Requirement for job application',
		tabIndex: 4,
		disabled: true,
		onChange: (value: string) => console.log('Precint:', value),
		errorMessage: 'purpose',
		additionalProps: {
			className: 'h-24',
		}
	},

]
export const ViewAttachment = [
	{
		type: 'link',
		value: 'View Attachment',
		onChange: (value: string) => console.log('Precint:', value),
	},
]