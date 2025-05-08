import { SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { Avatar, AvatarImage } from '../ui/avatar';
import DefaultProfilePic from '../../../assets/default_profilepic.svg';
import { CameraIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { FormEventHandler, useRef, useState } from 'react';
import { toast } from 'sonner';

const CustomProfilePic = () => {
	const { auth } = usePage<SharedData>().props;

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handleFileClick = () => {
		fileInputRef.current?.click();
	};

	const { data, setData, post, errors, processing } = useForm<Required<{ photopath: File | null }>>({
		photopath: null
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setData('photopath', file);
			setPreviewUrl(URL.createObjectURL(file));
		}
	};

	const userSubmitPic: FormEventHandler = (e) => {
		e.preventDefault();
		post(route('user.settings.upload.pic'), {
			method: 'patch',
			forceFormData: true,
			onSuccess: () => {
				toast.success('Profile picture uploaded successfully');
				setPreviewUrl(null);
			},
			onError: () => {
				toast.error('Failed to upload profile picture');
			},
		});
	}

	const adminSubmitPic: FormEventHandler = (e) => {
		e.preventDefault();
		post(route('admin.settings.upload.pic'), {
			method: 'patch',
			forceFormData: true,
			onSuccess: () => {
				toast.success('Profile picture uploaded successfully');
				setPreviewUrl(null);
			},
			onError: () => {
				toast.error('Failed to upload profile picture');
			},
		});
	}


	const adminPhoto = previewUrl || (auth.admin?.admin_photopath ? `/storage/${auth.admin.admin_photopath}` : DefaultProfilePic);
	const userPhoto = previewUrl || (auth.user?.user_photopath ? `/storage/${auth.user.user_photopath}` : DefaultProfilePic);

	return (
		auth.user ? (
			<div className='py-7 flex flex-col justify-center items-center gap-y-2'>
				<form onSubmit={userSubmitPic} className='flex flex-col justify-center items-center gap-y-2'>
					<div className='relative'>
						<Avatar className='size-30 overflow-hidden rounded-full'>
							<AvatarImage src={userPhoto} alt={auth.user.username} />
						</Avatar>

						{/* Hidden file input */}
						<input
							type='file'
							accept='image/jpeg,image/png,image/jpg'
							ref={fileInputRef}
							className='hidden'
							onChange={handleFileChange}
						/>

						{/* Trigger button for file input */}
						<Button
							type='button'
							variant='secondary'
							className='absolute bottom-2 right-1 rounded-full size-9 border bg-gray-200'
							onClick={handleFileClick}
						>
							<CameraIcon />
						</Button>
					</div>

					<div className='flex flex-col justify-center items-center'>
						<span className='truncate font-medium'>{auth.user.username}</span>
						<span className='text-muted-foreground truncate text-sm'>{auth.user.user_email}</span>
					</div>

					{errors.photopath && (
						<p className='text-sm text-red-500 mt-2'>{errors.photopath}</p>
					)}

					<Button type='submit' className={`${!data.photopath ? 'opacity-75' : null}`} disabled={!data.photopath || processing}>
						{processing ? 'Uploading...' : 'Upload Photo'}
					</Button>
				</form>
			</div>
		) : auth.admin ? (
			<div className='py-7 flex flex-col justify-center items-center gap-y-2'>
				<form onSubmit={adminSubmitPic} className='flex flex-col justify-center items-center gap-y-2'>
					<div className='relative'>
						<Avatar className='size-30 overflow-hidden rounded-full'>
							<AvatarImage src={adminPhoto} alt={auth.admin.admin_username} />
						</Avatar>
						{/* Hidden file input */}
						<input
							type='file'
							accept='image/jpeg,image/png,image/jpg'
							ref={fileInputRef}
							className='hidden'
							onChange={handleFileChange}
						/>

						{/* Trigger button for file input */}
						<Button
							type='button'
							variant='secondary'
							className='absolute bottom-2 right-1 rounded-full size-9 border bg-gray-200'
							onClick={handleFileClick}
						>
							<CameraIcon />
						</Button>
					</div>

					<div className='flex flex-col justify-center items-center'>
						<span className='truncate font-medium'>{auth.admin.admin_username}</span>
						<span className='text-muted-foreground truncate text-sm'>{auth.admin.admin_role}</span>
					</div>

					{errors.photopath && (
						<p className='text-sm text-red-500 mt-2'>{errors.photopath}</p>
					)}

					<Button type='submit' className={`${!data.photopath ? 'opacity-75' : null}`} disabled={!data.photopath || processing}>
						{processing ? 'Uploading...' : 'Upload Photo'}
					</Button>
				</form>
			</div>
		) : null
	)
}

export default CustomProfilePic;
