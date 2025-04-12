import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

interface CustomSelectProps {
	placeholder?: string;
	items: { value: string, label: string }[];
	className?: string;
	onChange?: (value: string) => void;
	value?: string;
}

const CustomSelect = ({ placeholder, items = [], className, onChange, value, }: CustomSelectProps) => {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className={`w-full ${className}`}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{items.map((item, index) => (
						<SelectItem key={index} value={item.value}>{item.label}</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

export default CustomSelect