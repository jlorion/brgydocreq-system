import { useInitials } from '@/hooks/UseInitials';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import DefaultProfilePic from '../../../assets/default_profilepic.svg';
import { CameraIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useRef, useState } from 'react';

const CustomProfilePic = () => {
	const { auth } = usePage<SharedData>().props;
	const getInitials = useInitials();

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handleFileClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setPreviewUrl(imageUrl);
		}
	};

	const adminPhoto = previewUrl || (auth.admin?.admin_photopath ? `/storage/${auth.admin.admin_photopath}` : DefaultProfilePic);

	return (
		auth.user ? (
			<div className='py-7 flex flex-col justify-center items-center gap-y-2'>
				<Avatar className="size-30 overflow-hidden rounded-full">
					<AvatarImage src={auth.user.user_photopath} alt={auth.user.username} />
					<AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white text-4xl">
						{getInitials(auth.user.username)}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col justify-center items-center">
					<span className="truncate font-medium">{auth.user.username}</span>
					<span className="text-muted-foreground truncate text-sm">{auth.user.user_email}</span>
				</div>
			</div>
		) : auth.admin ? (
			<div className='py-7 flex flex-col justify-center items-center gap-y-2'>
				<div className='relative'>
					<Avatar className="size-40 overflow-hidden rounded-full">
						<AvatarImage className='object-cover' src={adminPhoto} alt={auth.admin.admin_username} />
					</Avatar>

					{/* File Input */}
					<input
						type="file"
						accept="image/*"
						className="hidden"
						ref={fileInputRef}
						onChange={handleFileChange}
					/>

					{/* Button to trigger file input */}
					<Button
						variant='secondary'
						className='absolute bottom-2 right-1 rounded-full size-9 border bg-gray-200'
						onClick={handleFileClick}
					>
						<CameraIcon />
					</Button>
				</div>

				<div className="flex flex-col justify-center items-center">
					<span className="truncate font-medium">{auth.admin.admin_username}</span>
					<span className="text-muted-foreground truncate text-sm">{auth.admin.admin_role}</span>
				</div>
			</div>
		) : null
	)
}

export default CustomProfilePic;
