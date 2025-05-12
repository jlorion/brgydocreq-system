import { CustomFormField, ResidentVerificationForm } from "@/types"
import { format } from "date-fns";

export const ResidentReferenceFields = (data: ResidentVerificationForm, setData: (key: keyof ResidentVerificationForm, value: string | Date | null) => void, errors: Partial<Record<keyof ResidentVerificationForm, string>>): CustomFormField[] => {

	return [
		{
			label: 'First Name',
			type: 'text',
			id: 'first_name',
			required: true,
			placeholder: 'John',
			value: data.resident_firstname,
			tabIndex: 1,
			autofocus: true,
			autoComplete: 'given-name',
			onChange: (e) => setData('resident_firstname', e.target.value),
			errorMessage: errors.resident_firstname,
		},
		{
			label: 'Middle Name',
			type: 'text',
			id: 'middle_name',
			required: true,
			placeholder: 'Santos',
			value: data.resident_middlename,
			tabIndex: 2,
			autoComplete: 'additional-name',
			onChange: (e) => setData('resident_middlename', e.target.value),
			errorMessage: errors.resident_middlename,
		},
		{
			label: 'Last Name',
			type: 'text',
			id: 'last_name',
			required: true,
			placeholder: 'Doe',
			value: data.resident_lastname,
			tabIndex: 3,
			autoComplete: 'family-name',
			onChange: (e) => setData('resident_lastname', e.target.value),
			errorMessage: errors.resident_lastname,
		},
		{
			label: 'Suffix',
			type: 'text',
			id: 'suffix',
			placeholder: 'Jr.',
			value: data.resident_suffix,
			tabIndex: 4,
			autoComplete: 'additional-name',
			onChange: (e) => setData('resident_suffix', e.target.value),
			errorMessage: errors.resident_suffix,
		},
		{
			label: 'Birthdate',
			type: 'date',
			id: 'birthdate',
			required: true,
			tabIndex: 5,
			value: data.resident_birthdate ? new Date(data.resident_birthdate) : null,
			onChange: (date: Date | null) => {
				setData('resident_birthdate', date ? format(date, 'yyyy-MM-dd') : '');
			},
			errorMessage: errors.resident_birthdate,
		},
		{
			label: 'Building Serial Number',
			type: 'text',
			id: 'house_serial_number',
			placeholder: '0004',
			value: data.resident_householdnum,
			required: true,
			tabIndex: 6,
			autoComplete: 'address-line1',
			onChange: (e) => {
				const value = e.target.value;
				if (/^\d{0,4}$/.test(value)) {
					setData('resident_householdnum', value);
				}
			},
			errorMessage: errors.resident_householdnum,
		},

		{
			label: 'Email',
			type: 'email',
			id: 'email',
			placeholder: 'john@gmail.com',
			value: data.email,
			tabIndex: 7,
			required: true,
			autoComplete: 'email',
			onChange: (e) => setData('email', e.target.value),
			errorMessage: errors.email,
		},
		{
			label: 'Phone Number',
			type: 'text',
			id: 'phone_number',
			required: true,
			placeholder: '09123456789',
			value: data.phone_number,
			tabIndex: 8,
			autoComplete: 'tel',
			onChange: (e) => {
				const value = e.target.value;
				// Accept only digits, and trim if over 11
				if (/^\d{0,11}$/.test(value)) {
					setData('phone_number', value);
				}
			},
			errorMessage: errors.phone_number,
		},

	]

}