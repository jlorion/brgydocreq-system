import { CustomFormField, ResidentForm, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { format } from "date-fns";

export const FetchUpdateResidentsFields = (data: ResidentForm, setData: (key: keyof ResidentForm, value: string | Date | number | null) => void, errors: Partial<Record<keyof ResidentForm, string>>): CustomFormField[] => {
	const { puroks, status } = usePage<SharedData>().props

	return [
		{
			label: 'First Name',
			type: 'text',
			id: 'first_name',
			required: true,
			disabled: data.resident_firstname === null,
			value: data.resident_firstname ?? 'N/A',
			tabIndex: -1,
			onChange: (e) => setData('resident_firstname', e.target.value),
			errorMessage: errors.resident_firstname,
		},
		{
			label: 'Middle Name',
			type: 'text',
			id: 'middle_name',
			required: true,
			disabled: data.resident_middlename === null,
			value: data.resident_middlename ?? 'N/A',
			tabIndex: -2,
			onChange: (e) => setData('resident_middlename', e.target.value),
			errorMessage: errors.resident_middlename,
		},

		{
			label: 'Last Name',
			type: 'text',
			id: 'last_name',
			required: true,
			disabled: data.resident_lastname === null,
			value: data.resident_lastname ?? 'N/A',
			tabIndex: -3,
			onChange: (e) => setData('resident_lastname', e.target.value),
			errorMessage: errors.resident_lastname,
		},
		{
			label: 'Suffix',
			type: 'text',
			id: 'suffix',
			disabled: data.resident_suffix === null,
			value: data.resident_suffix ?? 'N/A',
			tabIndex: -4,
			onChange: (e) => setData('resident_suffix', e.target.value),
			errorMessage: errors.resident_suffix,
		},
		{
			label: 'Birthdate',
			type: 'date',
			required: true,
			id: 'birthdate',
			disabled: data.resident_birthdate === null,
			tabIndex: -5,
			value: data.resident_birthdate ?? 'N/A',
			onChange: (date: Date | null) => {
				setData('resident_birthdate', date ? format(date, 'yyyy-MM-dd') : '');
			},
			errorMessage: errors.resident_birthdate,
		},
		{
			label: 'Gender',
			type: 'text',
			id: 'gender',
			required: true,
			disabled: data.resident_gender === null,
			value: data.resident_gender ?? 'N/A',
			tabIndex: -6,
			onChange: (e) => setData('resident_gender', e.target.value),
			errorMessage: errors.resident_gender,
		},

		{
			label: 'Precinct Number',
			type: 'text',
			required: true,
			id: 'precinct_number',
			disabled: data.resident_precinct === null,
			value: data.resident_precinct ?? 'N/A',
			tabIndex: -7,
			onChange: (e) => setData('resident_precinct', e.target.value),
			errorMessage: errors.resident_precinct,
		},
		{
			label: 'Purok',
			type: 'select',
			required: true,
			id: 'purok',
			disabled: data.resident_purokid === null,
			value: data.resident_purokid ?? 0,
			tabIndex: -13,
			onChange: (value: number) => setData('resident_purokid', value),
			errorMessage: errors.resident_purokid,
			selectItems: puroks.map((purok) => ({
				label: purok.purok,
				value: purok.address_id,
			}))
		},
		{
			label: 'Building Serial Number',
			type: 'text',
			id: 'building_number',
			required: true,
			disabled: data.resident_householdnum === null,
			value: data.resident_householdnum ?? 'N/A',
			tabIndex: -9,
			onChange: (e) => setData('resident_householdnum', e.target.value),
			errorMessage: errors.resident_householdnum,
		},
		{
			label: 'Status',
			type: 'select',
			id: 'status',
			required: true,
			disabled: data.resident_statusid === null,
			value: data.resident_statusid ?? 0,
			tabIndex: -6,
			onChange: (value: number) => setData('resident_statusid', value),
			errorMessage: errors.resident_statusid,
			selectItems: status.map((status) => ({
				label: status.status_name,
				value: status.status_id,
			})),
		},
	]
}

export const AddResidentsFields = (data: Omit<ResidentForm, 'resident_id'>, setData: (key: keyof Omit<ResidentForm, 'resident_id'>, value: string | Date | number | null) => void, errors: Partial<Record<keyof Omit<ResidentForm, 'resident_id'>, string>>): CustomFormField[] => {

	const { puroks } = usePage<SharedData>().props
	return [
		{
			label: 'First Name',
			type: 'text',
			required: true,
			id: 'first_name',
			placeholder: 'John',
			autofocus: true,
			value: data.resident_firstname,
			tabIndex: 1,
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
			label: 'Gender',
			type: 'text',
			id: 'gender',
			required: true,
			placeholder: 'Male',
			value: data.resident_gender,
			tabIndex: 5,
			autoComplete: 'additional-name',
			onChange: (e) => setData('resident_gender', e.target.value),
			errorMessage: errors.resident_gender,

		},
		{
			label: 'Birthdate',
			type: 'date',
			required: true,
			id: 'birthdate',
			placeholder: 'Pick your birthdate',
			tabIndex: 6,
			value: data.resident_birthdate ? new Date(data.resident_birthdate) : null,
			onChange: (date: Date | null) => {
				setData('resident_birthdate', date ? format(date, 'yyyy-MM-dd') : '');
			},
			errorMessage: errors.resident_birthdate,
		},
		{
			label: 'Purok',
			type: 'select',
			required: true,
			id: 'purok',
			placeholder: 'Select purok',
			value: data.resident_purokid,
			tabIndex: 7,
			onChange: (value) => setData('resident_purokid', value),
			errorMessage: errors.resident_purok,
			selectItems: puroks.map((purok) => ({
				label: purok.purok,
				value: purok.address_id,
			}))

		},
		{
			label: 'House or Building Serial Number',
			type: 'text',
			required: true,
			id: 'house_serial_number',
			placeholder: '0004',
			value: data.resident_householdnum,
			tabIndex: 8,
			autoComplete: 'address-line1',
			onChange: (e) => setData('resident_householdnum', e.target.value),
			errorMessage: errors.resident_householdnum,
		},
		{
			label: 'Precinct Number',
			type: 'text',
			id: 'precinct_number',
			required: true,
			placeholder: 'CD5646500A',
			value: data.resident_precinct,
			tabIndex: 9,
			autoComplete: 'address-line1',
			onChange: (e) => setData('resident_precinct', e.target.value),
			errorMessage: errors.resident_precinct,
		},
	]
}

