import { Bell } from 'lucide-react';
import React from 'react'
import echo from '@/echo'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';
import CustomNotifications from './CustomNotifications';


const CustomUserNotifBell = () => {
	const [newNotification, setNewNotification] = React.useState(false);

	React.useEffect(() => {
		echo.channel('admin.notifications').listen('DocRequestSubmitted', (e: any) => {
			console.log('New document request submitted', e);
			setNewNotification(true);
		})

	})


	const NotificationsData = [
		{
			status: 'Approved',
			notification: 'Your request has been approved successfully.',
			updated_at: '1d',
		},
		{
			status: 'Rejected',
			notification: 'Your request has been rejected.',
			updated_at: '2d',
		},
		{
			status: 'Claimed',
			notification: 'Your request has been rejected.',
			updated_at: '2d',
		},
		{
			status: 'Processing',
			notification: 'Your request is pending.',
			updated_at: '3d',
		},
		{
			status: 'For pickup',
			notification: 'Your request is pending.',
			updated_at: '3d',
		},
	];

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Bell className="h-8 cursor-pointer hover:text-s3" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className='"w-full max-h-[650px] overflow-y-auto scroll-invisible' align="center" sideOffset={6}>
					<DropdownMenuGroup>
						{NotificationsData.map((notification, index) => (
							<>
								<DropdownMenuItem key={index}>
									<CustomNotifications
										key={index}
										status={notification.status}
										notification={notification.notification}
										updated_at={notification.updated_at}
									/>
								</DropdownMenuItem>
								<Separator />
							</>
						))}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			{newNotification &&
				<span className='bg-red-600 text-white rounded-2xl px-[7px] py-[2px] text-xs absolute mb-6 ml-3 cursor-pointer'>3</span>
			}
		</>
	);
}

export default CustomUserNotifBell