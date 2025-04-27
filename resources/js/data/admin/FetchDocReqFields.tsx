
import { CustomFormField, SubmittedDocumentForm } from "@/types";
import { format } from "date-fns";

export const DocReqFieldsFirstHalve = (data: SubmittedDocumentForm, setData: (key: keyof SubmittedDocumentForm, value: string | Date | null) => void, errors: Partial<Record<keyof SubmittedDocumentForm, string>>): CustomFormField[] => {

	return [
		{
			label: 'First Name',
			type: 'text',
			id: 'first_name',
			disabled: true,
			value: data.resident_firstname,
			tabIndex: -1,
			onChange: (e) => setData('resident_firstname', e.target.value),
			errorMessage: errors.resident_firstname,
		},
		{
			label: 'Middle Name',
			type: 'text',
			id: 'middle_name',
			disabled: true,
			value: data.resident_middlename,
			tabIndex: -2,
			onChange: (e) => setData('resident_middlename', e.target.value),
			errorMessage: errors.resident_middlename,
		},

		{
			label: 'Last Name',
			type: 'text',
			id: 'last_name',
			disabled: true,
			value: data.resident_lastname,
			tabIndex: -3,
			onChange: (e) => setData('resident_lastname', e.target.value),
			errorMessage: errors.resident_lastname,
		},
		{
			label: 'Suffix',
			type: 'text',
			id: 'suffix',
			disabled: true,
			value: data.resident_suffix ?? 'N/A',
			tabIndex: -4,
			onChange: (e) => setData('resident_suffix', e.target.value),
			errorMessage: errors.resident_suffix,
		},

		{
			label: 'Type of Document',
			type: 'text',
			id: 'gender',
			disabled: true,
			value: data.document_name,
			tabIndex: -4,
			onChange: (e) => setData('document_name', e.target.value),
			errorMessage: errors.document_name,
		},

		{
			label: 'Amount',
			type: 'text',
			id: 'price',
			disabled: true,
			value: data.amount,
			tabIndex: -5,
			onChange: (e) => setData('amount', e.target.value),
			errorMessage: errors.amount,
		},


	]
}

export const DocReqFieldsSecondHalve = (data: SubmittedDocumentForm, setData: (key: keyof SubmittedDocumentForm, value: string) => void, errors: Partial<Record<keyof SubmittedDocumentForm, string>>): CustomFormField[] => {

	return [
		{
			label: 'Date Requested',
			type: 'date',
			id: 'date_requested',
			disabled: true,
			tabIndex: -6,
			value: data.date_requested,
			formatDate: "MMM. dd, yyyy '@' hh:mmaaa",
			onChange: (date: Date | null) => {
				setData('date_requested', date ? format(date, "MMM. dd, yyyy '@' hh:mmaaa") : '');
			},
			errorMessage: errors.date_requested,

		},
		{
			label: 'Purpose of Filing',
			type: 'textarea',
			id: 'requested_purpose',
			disabled: true,
			value: data.requested_purpose ?? 'N/A',
			tabIndex: -7,
			onChange: (e) => setData('requested_purpose', e.target.value),
			errorMessage: errors.requested_purpose,
			additionalProps: {
				className: 'h-24',
			}
		},

	]
}

