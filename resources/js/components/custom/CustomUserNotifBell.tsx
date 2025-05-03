import { Bell } from 'lucide-react';
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';
import CustomNotifications from './CustomNotifications';
import { Link, usePage } from '@inertiajs/react';
import { NotificationItem, SharedData } from '@/types';


const CustomUserNotifBell = () => {
	const { auth } = usePage<SharedData>().props;
	
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger >
					<Bell className="h-8 cursor-pointer hover:text-s3" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className='"w-full max-h-[650px] overflow-y-auto scroll-invisible' align="center" sideOffset={6}>
					<DropdownMenuGroup>
						{/* {newNotification.map((notification, index) => (
							<>
								<Link href={route('user.settings.document-request')} key={index}>
									<DropdownMenuItem >
										<CustomNotifications
											key={index}
											status={notification.status_name}
											notification={notification.notification}
											updated_at={notification.updated_at}
										/>
									</DropdownMenuItem>
								</Link>
								<Separator />
							</>
						))} */}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			{/* {newCount > 0 &&
				<span className='bg-red-600 text-white rounded-2xl px-[7px] py-[2px] text-xs absolute mb-6 ml-3 cursor-pointer'>
					{newCount}
				</span>
			} */}
		</>
	);
}

export default CustomUserNotifBell