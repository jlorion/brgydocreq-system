
export const personalDetails = [
	{
		label: 'First name',
		id: 'first-name',
		type: 'text',
		placeholder: 'Juan',
		value: '',
		tabIndex: 1,
		autoComplete: 'first-name',
		onChange: (value: string) => (null),
		errorMessage: 'first-name',
	},
	{
		label: 'Middle name',
		id: 'middle-name',
		type: 'text',
		placeholder: 'Reyes',
		value: '',
		tabIndex: 2,
		autoComplete: 'middle-name',
		onChange: (value: string) => console.log('Middle Name:', value),
		errorMessage: 'middle-name',
	},
	{
		label: 'Last name',
		id: 'last-name',
		type: 'text',
		placeholder: 'Dela Cruz',
		value: '',
		tabIndex: 3,
		autoComplete: 'last-name',
		onChange: (value: string) => console.log('Last Name:', value),
		errorMessage: 'last-name',
	},
	{
		label: 'Suffix',
		id: 'suffix',
		type: 'text',
		placeholder: 'Sr.',
		value: '',
		tabIndex: 4,
		autoComplete: 'suffix',
		onChange: (value: string) => console.log('Suffix:', value),
		errorMessage: 'suffix',
	},
	{
		label: 'Sex',
		type: 'text',
		id: 'sex',
		placeholder: 'Male',
		value: '',
		tabIndex: 5,
		autoComplete: 'sex',
		onChange: (value: string) => console.log('Sex:', value),
		errorMessage: 'sex',
	},
	{
		label: 'Birthdate',
		type: 'date',
		id: 'birthdate',
		placeholder: 'Pick your birthday',
		value: 'date',
		tabIndex: 6,
		autoComplete: 'birthdate',
		onChange: (value: string) => console.log('Birthday:', value),
		errorMessage: 'birthdate',
	},
	{
		label: 'Precint',
		id: 'precint',
		type: 'text',
		placeholder: 'ACX1034613',
		value: '',
		tabIndex: 7,
		onChange: (value: string) => console.log('Precint:', value),
		errorMessage: 'precint',
	},
];
export const contactDetails = [

	{
		label: 'Email',
		type: 'email',
		placeholder: 'juan@gmail.com',
		id: 'email',
		value: '',
		tabIndex: 8,
		autoComplete: 'email',
		onChange: (value: string) => console.log('Email:', value),
		errorMessage: 'email',
	},
	{
		label: 'Phone number',
		type: 'text',
		id: 'phone-number',
		placeholder: '09074245108',
		value: '',
		tabIndex: 9,
		autoComplete: 'phone-number',
		onChange: (value: string) => console.log('Phone number:', value),
		errorMessage: 'phone-number',
	},
]

export const attachmentDetail = [

	{
		label: 'Purok clearance',
		id: 'purok-clearance',
		type: 'file',
		value: '',
		tabIndex: 10,
		autoComplete: 'purok-clearance',
		onChange: (value: string) => console.log('Purok clearance:', value),
		errorMessage: 'purok-clearance',
	},


]
export const purposeDetail = [
	{
		label: 'Purpose of Filing',
		id: 'purpose',
		type: 'textarea',
		placeholder: 'For Employment, School purposes, etc.',
		value: '',
		tabIndex: 11,
		autoComplete: 'purpose',
		onChange: (value: string) => console.log('Purpose:', value),
		errorMessage: 'purpose',
		additionalProps: {
			className: 'h-32',
		}

	},
]