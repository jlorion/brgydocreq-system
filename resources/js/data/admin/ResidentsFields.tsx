import { createDateSetter, createStringSetter } from "@/lib/utils";
import { CustomFormField, ResidentFetch } from "@/types";

export const ResidentFields = (data: ResidentFetch, setData: (key: keyof ResidentFetch, value: string | Date | null) => void, errors: Partial<Record<keyof ResidentFetch, string>>): CustomFormField[] => {
	const stringSetter = createStringSetter(setData);
	const dateSetter = createDateSetter(setData);

	return [
		{
			label: 'First Name',
			type: 'text',
			id: 'first_name',
			disabled: data.resident_firstname === null,
			value: data.resident_firstname ?? 'N/A',
			tabIndex: -1,
			onChange: stringSetter('resident_firstname'),
			errorMessage: errors.resident_firstname,
		},
		{
			label: 'Middle Name',
			type: 'text',
			id: 'middle_name',
			disabled: data.resident_middlename === null,
			value: data.resident_middlename ?? 'N/A',
			tabIndex: -2,
			onChange: stringSetter('resident_middlename'),
			errorMessage: errors.resident_middlename,
		},

		{
			label: 'Last Name',
			type: 'text',
			id: 'last_name',
			disabled: data.resident_lastname === null,
			value: data.resident_lastname ?? 'N/A',
			tabIndex: -3,
			onChange: stringSetter('resident_lastname'),
			errorMessage: errors.resident_lastname,
		},
		{
			label: 'Suffix',
			type: 'text',
			id: 'suffix',
			disabled: data.resident_suffix === null,
			value: data.resident_suffix ?? 'N/A',
			tabIndex: -4,
			onChange: stringSetter('resident_suffix'),
			errorMessage: errors.resident_suffix,
		},
		{
			label: 'Birthdate',
			type: 'date',
			id: 'birthdate',
			disabled: data.resident_birthdate === null,
			tabIndex: -9,
			value: data.resident_birthdate ?? 'N/A',
			onChange: dateSetter('resident_birthdate'),
			errorMessage: errors.resident_birthdate,
		},
		{
			label: 'Gender',
			type: 'text',
			id: 'gender',
			disabled: data.resident_gender === null,
			value: data.resident_gender ?? 'N/A',
			tabIndex: -8,
			onChange: stringSetter('resident_gender'),
			errorMessage: errors.resident_gender,
		},

		{
			label: 'Precinct Number',
			type: 'text',
			id: 'precinct_number',
			disabled: data.resident_precinct === null,
			value: data.resident_precinct ?? 'N/A',
			tabIndex: -10,
			onChange: stringSetter('resident_precinct'),
			errorMessage: errors.resident_precinct,
		},
		{
			label: 'Purok',
			type: 'text',
			id: 'purok',
			disabled: data.resident_purok === null,
			value: data.resident_purok ?? 'N/A',
			tabIndex: -11,
			onChange: stringSetter('resident_purok'),
			errorMessage: errors.resident_purok,
		},
		{
			label: 'Building Serial Number',
			type: 'text',
			id: 'building_number',
			disabled: data.resident_householdnum === null,
			value: data.resident_householdnum ?? 'N/A',
			tabIndex: -12,
			onChange: stringSetter('resident_householdnum'),
			errorMessage: errors.resident_householdnum,
		},
		{
			label: 'Status',
			type: 'select',
			id: 'status',
			disabled: data.resident_status === null,
			value: data.resident_status ?? 'N/A',
			tabIndex: -13,
			onChange: stringSetter('resident_status'),
			errorMessage: errors.resident_status,
			selectItems: [
				{ label: data.resident_status, value: data.resident_status },
			],
		},
	]
}
