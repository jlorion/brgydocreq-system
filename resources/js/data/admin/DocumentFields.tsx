import { CustomFormField, DocumentForm, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";

export const fetchUpdateFirstHalve = (data: DocumentForm, setData: (key: keyof DocumentForm, value: string | File | number) => void, errors: Partial<Record<keyof DocumentForm, string>>): CustomFormField[] => {
	const { status } = usePage<SharedData>().props

	return [
		{
			label: 'Document Name',
			type: 'text',
			id: 'document',
			disabled: data.document_name === null,
			value: data.document_name ?? 'N/A',
			tabIndex: -1,
			onChange: (e) => setData('document_name', e.target.value),
			errorMessage: errors.document_name,
		},
		{
			label: 'Price',
			type: 'text',
			id: 'price',
			disabled: data.price === null,
			value: data.price ?? 'N/A',
			tabIndex: -3,
			onChange: (e) => setData('price', e.target.value),
			errorMessage: errors.price,
		},
		{
			label: 'Document Photo',
			type: 'file',
			id: 'document_photo',
			tabIndex: -4,
			onChange: (e) => {
				const file = e.target.files?.[0];
				if (file) {
					setData('document_photopath', file);
				}
			},
			accept: "image/jpeg,image/png,image/jpg",
			errorMessage: errors.document_photopath,
		},
		{
			label: 'Status',
			type: 'select',
			id: 'status',
			disabled: data.status_id === null,
			value: data.status_id ?? 0,
			tabIndex: -6,
			onChange: (value: number) => setData('status_id', value),
			errorMessage: errors.status_id,
			selectItems: status.map((status) => ({
				label: status.status_name,
				value: status.status_id,
			})),
		},
	]
}


export const fetchUpdateSecondHalve = (data: DocumentForm, setData: (key: keyof DocumentForm, value: string) => void, errors: Partial<Record<keyof DocumentForm, string>>): CustomFormField[] => {

	return [
		{
			label: 'Description',
			type: 'textarea',
			id: 'description',
			disabled: data.description === null,
			value: data.description ?? 'N/A',
			tabIndex: -2,
			onChange: (e) => setData('description', e.target.value),
			errorMessage: errors.description,
			additionalProps: {
				className: 'h-24',
			}
		},
	]
}

export const addFirstHalve = (data: Omit<DocumentForm, 'document_id'>, setData: (key: keyof Omit<DocumentForm, 'document_id'>, value: string | Date | number | null) => void, errors: Partial<Record<keyof Omit<DocumentForm, 'document_id'>, string>>): CustomFormField[] => {
	const { status } = usePage<SharedData>().props

	return [
		{
			label: 'Document Name',
			type: 'text',
			id: 'document_name',
			placeholder: 'Barangay Clearance',
			autofocus: true,
			value: data.document_name,
			tabIndex: 1,
			autoComplete: 'document',
			onChange: (e) => setData('document_name', e.target.value),
			errorMessage: errors.document_name,
		},
		{
			label: 'Price',
			type: 'text',
			id: 'price',
			placeholder: '₱50',
			value: data.price,
			tabIndex: 2,
			autoComplete: 'amount',
			onChange: (e) => setData('price', e.target.value),
			errorMessage: errors.price,
		},

		{
			label: 'DocumentForm Photo',
			type: 'file',
			id: 'last_name',
			value: data.document_photopath,
			tabIndex: 3,
			onChange: (e) => setData('document_photopath', e.target.value),
			errorMessage: errors.document_photopath,
		},
		{
			label: 'Status',
			type: 'select',
			id: 'status',
			value: data.status_id,
			tabIndex: 4,
			onChange: (value) => setData('status_id', value),
			errorMessage: errors.status_id,
			selectItems: status.map((status) => ({
				label: status.status_name,
				value: status.status_id
			}))
		},
	]
}


export const addSecondHalve = (data: Omit<DocumentForm, 'document_id'>, setData: (key: keyof Omit<DocumentForm, 'document_id'>, value: string | Date | number | null) => void, errors: Partial<Record<keyof Omit<DocumentForm, 'document_id'>, string>>): CustomFormField[] => {

	return [
		{
			label: 'Description',
			type: 'textarea',
			id: 'description',
			value: data.description,
			tabIndex: 4,
			onChange: (e) => setData('status_id', e.target.value),
			errorMessage: errors.description,
			additionalProps: {
				className: 'h-24',
			}
		},
	]
}