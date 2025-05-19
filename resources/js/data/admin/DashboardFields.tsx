import { CustomFormField, DashboardColumn } from "@/types";
import { format } from "date-fns";

export const FetchDashboard = (data: DashboardColumn, setData: (key: keyof DashboardColumn, value: string | Date | null) => void, errors: Partial<Record<keyof DashboardColumn, string>>): CustomFormField[] => {

	return [
		{
			label: 'Metric',
			type: 'text',
			id: 'metric',
			disabled: true,
			value: data.metric,
			tabIndex: -3,
			onChange: (e) => setData('metric', e.target.value),
			errorMessage: errors.metric,
		},
		{
			label: 'Total Count',
			type: 'text',
			id: 'total_count',
			disabled: true,
			value: data.count,
			tabIndex: -3,
			onChange: (e) => setData('count', e.target.value),
			errorMessage: errors.count,
		},
		{
			label: 'Last Updated',
			type: 'date',
			id: 'last_updated',
			disabled: true,
			tabIndex: -6,
			value: data.last_updated,
			formatDate: "MMM. dd, yyyy '@' hh:mmaaa",
			onChange: (date: Date | null) => {
				setData('last_updated', date ? format(date, "MMM. dd, yyyy '@' hh:mmaaa") : '');
			},
			errorMessage: errors.last_updated,

		},
		{
			label: 'Change',
			type: 'text',
			id: 'price',
			disabled: true,
			value: data.change,
			tabIndex: -5,
			onChange: (e) => setData('change', e.target.value),
			errorMessage: errors.change,
		},


	]
}