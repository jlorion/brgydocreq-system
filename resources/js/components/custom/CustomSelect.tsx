import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

interface CustomSelectProps {
	placeholder?: string;
	items: { value: number, label: string, disabled?: boolean }[];
	className?: string;
	onChange?: (value: number) => void;
	value: number | null;
	disabled?: boolean
}

const CustomSelect = ({ placeholder, items = [], className, onChange, value, disabled }: CustomSelectProps) => {
	return (
		<Select required disabled={disabled} value={value !== null ? value.toString() : undefined} onValueChange={(val) => onChange?.(parseInt(val))}>
			<SelectTrigger className={`w-full ${className}`}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{items.map((item, index) => (
						<SelectItem key={index} disabled={item.disabled} value={item.value.toString()}>{item.label}</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

export default CustomSelect