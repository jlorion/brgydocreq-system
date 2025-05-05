import { FaBell } from "react-icons/fa";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';
import CustomNotifications from './CustomNotifications';
import { Link, router, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { useEffect, useRef, useState } from 'react';

const CustomNotifBell = () => {
	const { notifications } = usePage<SharedData>().props;
	const prevNotificationIdsRef = useRef<number[]>([]);
	const [newCount, setNewCount] = useState(0);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const currentIds = notifications.map(n => n.notification_id);

		if (prevNotificationIdsRef.current.length > 0) {
			const newNotifications = currentIds.filter(
				id => !prevNotificationIdsRef.current.includes(id)
			);

			if (newNotifications.length > 0) {
				setNewCount(prev => prev + newNotifications.length);
			}
		}

		prevNotificationIdsRef.current = currentIds;
	}, [notifications]);

	useEffect(() => {
		const interval = setInterval(() => {
			router.reload({ only: ['notifications'] });
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	// Reset count when dropdown opens
	useEffect(() => {
		if (menuOpen) setNewCount(0);
	}, [menuOpen]);

	return (
		<>
			<DropdownMenu onOpenChange={setMenuOpen}>
				<DropdownMenuTrigger className="relative focus:outline-none focus:ring-0">
					<FaBell className="text-green-700 h-8 w-5 cursor-pointer hover:text-green-600" />
					{newCount > 0 && (
						<span className='bg-red-600 text-white rounded-full px-[7px] py-[2px] text-[10px] font-semibold absolute bottom-4 cursor-pointer'>
							{newCount}
						</span>
					)}
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-full max-h-[650px] overflow-y-auto scroll-invisible" align="center" sideOffset={6}>
					<DropdownMenuGroup>
						{notifications.map((notification, index) => (
							<div key={index}>
								<Link href={route('user.settings.document-request')}>
									<DropdownMenuItem>
										<CustomNotifications
											status={notification.status_name}
											notification={notification.notification}
											updated_at={notification.updated_at}
										/>
									</DropdownMenuItem>
								</Link>
								<Separator />
							</div>
						))}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>

		</>
	);
};

export default CustomNotifBell;
