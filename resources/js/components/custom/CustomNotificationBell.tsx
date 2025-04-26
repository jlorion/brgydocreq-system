import { Bell } from 'lucide-react';
import React from 'react'
import echo from '@/echo'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';

const CustomNotificationBell = () => {
	const [newNotification, setNewNotification] = React.useState(false);

	React.useEffect(() => {
		echo.channel('admin.notifications').listen('DocRequestSubmitted', (e: any) => {
			console.log('New document request submitted', e);
			setNewNotification(true);
		})

	})

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Bell className="h-8 cursor-pointer hover:text-s3" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-69'>
					<DropdownMenuGroup>
						<DropdownMenuItem>
							notif 1
						</DropdownMenuItem>
						<Separator />
						<DropdownMenuItem>
							notif 2
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			{newNotification &&
				<span className='bg-red-600 text-white rounded-2xl px-[7px] py-[2px] text-xs absolute mb-6 ml-3 cursor-pointer'>3</span>
			}
		</>
	);
}

export default CustomNotificationBell