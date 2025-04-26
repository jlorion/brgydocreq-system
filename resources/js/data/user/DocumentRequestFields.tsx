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
					setData('attachment_path', file);
				}
			},
			accept: "image/*",
			errorMessage: errors.attachment_path,
		},
		{
			label: 'Purpose of Filing',
			type: 'textarea',
			id: 'request_purpose',
			disabled: data.requested_purpose === null,
			value: data.requested_purpose ?? 'N/A',
			tabIndex: -2,
			onChange: (e) => setData('requested_purpose', e.target.value),
			errorMessage: errors.requested_purpose,
			additionalProps: {
				className: 'h-24',
			}
		},

	]

}