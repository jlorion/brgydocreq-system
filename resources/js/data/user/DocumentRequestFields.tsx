import { CustomFormField, DocumentReqForm } from "@/types"


export const DocumentRequestFields = (data: DocumentReqForm, setData: (key: keyof DocumentReqForm, value: string | File | null) => void, errors: Partial<Record<keyof DocumentReqForm, string>>): CustomFormField[] => {

	return [
		{
			label: 'Attachment',
			type: 'file',
			id: 'document_photo',
			tabIndex: -4,
			onChange: (e) => {
				const file = e.target.files?.[0];
				if (file) {
					setData('attachment', file);
				}
			},
			accept: "image/jpeg,image/png,image/jpg",
			errorMessage: errors.attachment,
		},
		{
			label: 'Purpose of Filing',
			type: 'textarea',
			id: 'request_purpose',
			disabled: data.request_purpose === null,
			value: data.request_purpose ?? 'N/A',
			tabIndex: -2,
			onChange: (e) => setData('request_purpose', e.target.value),
			errorMessage: errors.request_purpose,
			additionalProps: {
				className: 'h-24',
			}
		},

	]

}