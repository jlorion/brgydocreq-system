import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

interface CustomSelectProps {
	placeholder: string;
	items: { value: string, label: string }[];
}

const CustomSelect = ({ placeholder, items = [] }: CustomSelectProps) => {
	return (
		<Select>
			<SelectTrigger className="w-[180px]">
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