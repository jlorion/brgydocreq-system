import { createDateSetter, createStringSetter } from "@/lib/utils"
import { CustomFormField, ResidentVerificationForm } from "@/types"

export const ResidentReferenceFormFields = (data: ResidentVerificationForm, setData: (key: keyof ResidentVerificationForm, value: string | Date | null) => void, errors: Partial<Record<keyof ResidentVerificationForm, string>>): CustomFormField[] => {
	const stringSetter = createStringSetter<ResidentVerificationForm>(setData);
	const dateSetter = createDateSetter<ResidentVerificationForm>(setData);

	return [
		{
			label: 'First Name',
			type: 'text',
			id: 'first_name',
			placeholder: 'John',
			value: data.resident_firstname,
			tabIndex: 1,
			autofocus: true,
			autoComplete: 'given-name',
			onChange: stringSetter('resident_firstname'),
			errorMessage: errors.resident_firstname,
		},
		{
			label: 'Middle Name',
			type: 'text',
			id: 'middle_name',
			placeholder: 'Santos',
			value: data.resident_middlename,
			tabIndex: 2,
			autoComplete: 'additional-name',
			onChange: stringSetter('resident_middlename'),
			errorMessage: errors.resident_middlename,
		},
		{
			label: 'Last Name',
			type: 'text',
			id: 'last_name',
			placeholder: 'Doe',
			value: data.resident_lastname,
			tabIndex: 3,
			autoComplete: 'family-name',
			onChange: stringSetter('resident_lastname'),
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
			onChange: stringSetter('resident_suffix'),
			errorMessage: errors.resident_suffix,
		},
		{
			label: 'Birthdate',
			type: 'date',
			id: 'birthdate',
			placeholder: 'Pick your birthdate',
			tabIndex: 5,
			autoComplete: 'bday',
			value: data.resident_birthdate ? new Date(data.resident_birthdate) : null,
			onChange: dateSetter('resident_birthdate'),
			errorMessage: errors.resident_birthdate,
		},
		{
			label: 'Building Serial Number',
			type: 'text',
			id: 'house_serial_number',
			placeholder: '0004',
			value: data.resident_householdnum,
			tabIndex: 6,
			autoComplete: 'address-line1',
			onChange: stringSetter('resident_householdnum'),
			errorMessage: errors.resident_householdnum,
		},

		{
			label: 'Email',
			type: 'email',
			id: 'email',
			placeholder: 'john@gmail.com',
			value: data.email,
			tabIndex: 7,
			autoComplete: 'email',
			onChange: stringSetter('email'),
			errorMessage: errors.email,
		},
		{
			label: 'Phone Number',
			type: 'text',
			id: 'phone_number',
			placeholder: '09123456789',
			value: data.phone_number,
			tabIndex: 8,
			autoComplete: 'tel',
			onChange: stringSetter('phone_number'),
			errorMessage: errors.phone_number,
		},

	]

}