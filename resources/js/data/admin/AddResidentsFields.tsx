import { createDateSetter, createStringSetter } from "@/lib/utils";
import { ResidentFetch, CustomFormField, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";


export const AddResidentsFields = (data: Omit<ResidentFetch, 'resident_id'>, setData: (key: keyof Omit<ResidentFetch, 'resident_id'>, value: string | Date | number | null) => void, errors: Partial<Record<keyof Omit<ResidentFetch, 'resident_id'>, string>>): CustomFormField[] => {
	const stringSetter = createStringSetter(setData);
	const dateSetter = createDateSetter(setData);

	const { puroks } = usePage<SharedData>().props
	return [
		{
			label: 'First Name',
			type: 'text',
			id: 'first_name',
			placeholder: 'John',
			autofocus: true,
			value: data.resident_firstname,
			tabIndex: 1,
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
			label: 'Gender',
			type: 'text',
			id: 'gender',
			placeholder: 'Male',
			value: data.resident_gender,
			tabIndex: 5,
			autoComplete: 'additional-name',
			onChange: stringSetter('resident_gender'),
			errorMessage: errors.resident_gender,

		},
		{
			label: 'Birthdate',
			type: 'date',
			id: 'birthdate',
			placeholder: 'Pick your birthdate',
			tabIndex: 6,
			autoComplete: 'bday',
			value: data.resident_birthdate ? new Date(data.resident_birthdate) : null,
			onChange: dateSetter('resident_birthdate'),
			errorMessage: errors.resident_birthdate,
		},
		{
			label: 'Purok',
			type: 'select',
			id: 'purok',
			placeholder: 'Select purok',
			value: data.resident_purokid,
			tabIndex: 7,
			autoComplete: 'address-line1',
			onChange: stringSetter('resident_purokid'),
			errorMessage: errors.resident_purok,
			selectItems: puroks.map((purok) => ({
				label: purok.purok,
				value: purok.address_id,
			}))

		},
		{
			label: 'House or Building Serial Number',
			type: 'text',
			id: 'house_serial_number',
			placeholder: '0004',
			value: data.resident_householdnum,
			tabIndex: 8,
			autoComplete: 'address-line1',
			onChange: stringSetter('resident_householdnum'),
			errorMessage: errors.resident_householdnum,
		},
		{
			label: 'Precinct Number',
			type: 'text',
			id: 'precinct_number',
			placeholder: 'CD5646500A',
			value: data.resident_precinct,
			tabIndex: 9,
			autoComplete: 'address-line1',
			onChange: stringSetter('resident_precinct'),
			errorMessage: errors.resident_precinct,
		},
	]
}
