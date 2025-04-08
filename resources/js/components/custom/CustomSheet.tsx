import React from 'react'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import  CustomForm  from "./CustomForm"
import { CustomFormField } from "@/components/custom/CustomForm"

interface CustomSheetProps {
	button?: React.ReactNode;
	trigger: React.ReactNode;
	className?: string;
	title: string;
	formFields: CustomFormField[];
}

const CustomSheet = ({ trigger, title, formFields }: CustomSheetProps) => {

	return (
		<Sheet>
			<SheetTrigger asChild>
				{trigger}
			</SheetTrigger>
			<SheetContent side="right" className="flex flex-col p-4 w-120">
				<SheetHeader className="gap-1">
					<SheetTitle>{title}</SheetTitle>
				</SheetHeader>
				<div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
					<CustomForm fields={formFields} />
				</div>
				<SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
					<Button className="w-full">Save</Button>
					<SheetClose asChild>
						<Button variant="outline" className="w-full">
							Close
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>

	)
}

export default CustomSheet