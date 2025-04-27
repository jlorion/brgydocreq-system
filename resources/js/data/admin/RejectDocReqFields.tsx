
import { CustomFormField, SubmittedDocumentForm, } from "@/types";

export const RejectDocReqFields = (data: SubmittedDocumentForm, setData: (key: keyof SubmittedDocumentForm, value: string) => void, errors: Partial<Record<keyof SubmittedDocumentForm, string>>): CustomFormField[] => {

	return [
		{
			label: 'Reason of Rejection',
			type: 'textarea',
			id: 'request_rejected',
			value: data.content,
			tabIndex: -7,
			onChange: (e) => setData('content', e.target.value),
			errorMessage: errors.content,
			additionalProps: {
				className: 'h-24',
			}
		},

	]
}

