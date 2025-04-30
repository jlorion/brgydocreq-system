import { CustomFormField, DocumentProcessingForm, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { format } from "date-fns";

export const FetchFirstHalve = (data: DocumentProcessingForm, setData: (key: keyof DocumentProcessingForm, value: string | Date | null) => void, errors: Partial<Record<keyof DocumentProcessingForm, string>>): CustomFormField[] => {
	const { docprocessing } = usePage<SharedData>().props;

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
			label: 'Amount',
			type: 'text',
			id: 'price',
			disabled: true,
			value: data.amount,
			tabIndex: -5,
			onChange: (e) => setData('amount', e.target.value),
			errorMessage: errors.amount,

		},
		{
			label: 'Date Requested',
			type: 'date',
			id: 'date_requested',
			disabled: true,
			tabIndex: -6,
			value: data.created_at,
			formatDate: "MMM. dd, yyyy '@' hh:mmaaa",
			onChange: (date: Date | null) => {
				setData('created_at', date ? format(date, "MMM. dd, yyyy '@' hh:mmaaa") : '');
			},
			errorMessage: errors.created_at,

		},

	]
}


export const FetchSecondHalve = (data: DocumentProcessingForm, setData: (key: keyof DocumentProcessingForm, value: string) => void, errors: Partial<Record<keyof DocumentProcessingForm, string>>): CustomFormField[] => {

	return [
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