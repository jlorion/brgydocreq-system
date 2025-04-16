import { createDateSetter, createStringSetter } from "@/lib/utils";
import { AdminRegisterForm, CustomFormField } from "@/types";



export const PersonalDetails = (data: AdminRegisterForm, setData: (key: keyof AdminRegisterForm, value: string | Date | null) => void, errors: Partial<Record<keyof AdminRegisterForm, string>>): CustomFormField[] => {
	const stringSetter = createStringSetter(setData);
	const dateSetter = createDateSetter(setData);

	return [

		{
			label: 'First Name',
			type: 'text',
			id: 'first_name',
			placeholder: 'John',
			value: data.officer_firstname,
			tabIndex: 1,
			autoComplete: 'given-name',
			onChange: stringSetter('officer_firstname'),
			errorMessage: errors.officer_firstname,
		},
		{
			label: 'Middle Name',
			type: 'text',
			id: 'middle_name',
			placeholder: 'Santos',
			value: data.officer_middlename,
			tabIndex: 2,
			autoComplete: 'additional-name',
			onChange: stringSetter('officer_middlename'),
			errorMessage: errors.officer_middlename,
		},

		{
			label: 'Last Name',
			type: 'text',
			id: 'last_name',
			placeholder: 'Doe',
			value: data.officer_lastname,
			tabIndex: 3,
			autoComplete: 'family-name',
			onChange: stringSetter('officer_lastname'),
			errorMessage: errors.officer_lastname,
		},
		{
			label: 'Suffix',
			type: 'text',
			id: 'suffix',
			placeholder: 'Jr.',
			value: data.officer_suffix,
			tabIndex: 4,
			autoComplete: 'additional-name',
			onChange: stringSetter('officer_suffix'),
			errorMessage: errors.officer_suffix,
		},
		{
			label: 'Birthdate',
			type: 'date',
			id: 'birthdate',
			placeholder: 'Pick your birthdate',
			tabIndex: 5,
			autoComplete: 'bday',
			value: data.officer_birthdate ? new Date(data.officer_birthdate) : null,
			onChange: dateSetter('officer_birthdate'),
			errorMessage: errors.officer_birthdate,
		},
		{
			label: 'House or Building Serial Number',
			type: 'text',
			id: 'house_serial_number',
			placeholder: '0004',
			value: data.officer_householdnum,
			tabIndex: 6,
			autoComplete: 'address-line1',
			onChange: stringSetter('officer_householdnum'),
			errorMessage: errors.officer_householdnum,
		},
	]
}


export const AccountDetails = (data: AdminRegisterForm, setData: (key: keyof AdminRegisterForm, value: string) => void, errors: Partial<Record<keyof AdminRegisterForm, string>>): CustomFormField[] => {
	const stringSetter = createStringSetter(setData);

	return [

		{
			label: 'Email',
			type: 'email',
			id: 'email',
			disabled: true,
			placeholder: 'john@gmail.com',
			value: data.admin_email,
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
			value: data.admin_phonenum,
			tabIndex: 8,
			autoComplete: 'tel',
			onChange: stringSetter('admin_phonenum'),
			errorMessage: errors.admin_phonenum,
		},
		{
			label: 'Username',
			type: 'text',
			id: 'username',
			placeholder: 'john_doe',
			value: data.admin_username,
			tabIndex: 9,
			autoComplete: 'username',
			onChange: stringSetter('admin_username'),
			errorMessage: errors.admin_username,
		},
		{
			label: 'Role',
			type: 'text',
			id: 'role',
			value: data.admin_role,
			tabIndex: 10,
			autoComplete: 'role',
			disabled: true,
			onChange: stringSetter('admin_role'),
			errorMessage: errors.admin_role,
		},
		{
			label: 'Password',
			type: 'password',
			id: 'password',
			value: data.admin_password,
			placeholder: '**********',
			tabIndex: 11,
			autoComplete: 'new-password',
			onChange: stringSetter('admin_password'),
			errorMessage: errors.admin_password,
		},
		{
			label: 'Confirm Password',
			type: 'password',
			id: 'confirm_password',
			value: data.admin_password_confirmation,
			tabIndex: 12,
			placeholder: '**********',
			autoComplete: 'new-password',
			onChange: stringSetter('admin_password_confirmation'),
			errorMessage: errors.admin_password_confirmation,
		},
	]
}