import { CircleCheck, FileCheck, FileSearch } from "lucide-react";
import { FaWalking } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { GrCycle } from "react-icons/gr";

const steps = [
	{ label: "Under Review", icon: FileSearch, value: 5 },
	{ label: "Approved", icon: FileCheck, value: 11 },
	{ label: "Processing", icon: GrCycle, value: 6 },
	{ label: "For pick-up", icon: FaWalking, value: 7 },
	{ label: "Claimed", icon: CircleCheck, value: 2 },
];

interface StepperProps {
	currentStatus: number;
	className?: string;
}

export default function Stepper({ currentStatus, className }: StepperProps) {
	const currentIndex = steps.findIndex(step => step.value === currentStatus);

	return (
		<div className={`flex items-center justify-between w-full max-w-4xl mx-auto ${className}`}>
			{steps.map((step, index) => {
				const Icon = step.icon;
				const isCompleted = index <= currentIndex;

				return (
					<>
						<div key={step.value} className="flex-1 flex flex-col items-center relative">
							<div
								className={cn(
									"flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors duration-300 z-20",
									"border-gray-300 bg-white text-gray-500",
									isCompleted && "bg-green-500 text-white border-green-500",
								)}
							>
								<Icon className="w-6 h-6" />
							</div>
							<span className="text-xs mt-2 text-center w-24 break-words">
								{step.label}
							</span>
						</div>
						<div className="w-full h-0.5 mb-5 -mx-4">
							<div
								className={cn(
									"h-full w-full bg-gray-300",
									index <= currentIndex && "bg-green-500"
								)}
							></div>
						</div>

					</>
				);
			})}
		</div>
	);
}
