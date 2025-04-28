
import { CustomFormField, SubmittedDocumentForm, } from "@/types";

export const ApproveDocReqFields = (data: SubmittedDocumentForm, setData: (key: keyof SubmittedDocumentForm, value: string) => void, errors: Partial<Record<keyof SubmittedDocumentForm, string>>): CustomFormField[] => {

	return [
		{
			label: 'Notification',
			type: 'text',
			id: 'notification',
			disabled: true,
			value: data.notification,
			tabIndex: -1,
			errorMessage: errors.notification,
		},
		{
			label: 'Additional Message',
			placeholder: 'This is optional..',
			type: 'textarea',
			id: 'request_approved',
			value: data.additional_message,
			autoFocus: true,
			tabIndex: 1,
			errorMessage: errors.additional_message,
			additionalProps: {
				className: 'h-24',
			}
		},

	]
}


export const RejectDocReqFields = (data: SubmittedDocumentForm, setData: (key: keyof SubmittedDocumentForm, value: string) => void, errors: Partial<Record<keyof SubmittedDocumentForm, string>>): CustomFormField[] => {

	return [
		{
			label: 'Notification',
			type: 'text',
			id: 'notification',
			disabled: true,
			value: data.notification,
			tabIndex: -1,
			onChange: (e) => setData('notification', 'Your request has been rejected.'),
			errorMessage: errors.notification,
		},
		{
			label: 'Reason of Rejection',
			placeholder: 'State your brief reason of rejection...',
			type: 'textarea',
			id: 'request_rejected',
			value: data.additional_message,
			autoFocus: true,
			tabIndex: 1,
			onChange: (e) => setData('additional_message', e.target.value),
			errorMessage: errors.additional_message,
			additionalProps: {
				className: 'h-24',
			}
		},

	]
}
