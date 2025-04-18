import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/custom/CustomTextLink';
import InputError from '@/components/custom/InputError';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthSplitLayout from '@/layouts/shared/AuthSplitLayout';
import LoginImage from '../../../../assets/login-side-image.svg';

type LoginForm = {
	admin_username: string;
	admin_password: string;
	remember: boolean;
};

interface LoginProps {
	status?: string;
	canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
	const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
		admin_username: '',
		admin_password: '',
		remember: false,
	});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		post(route('admin.login.store'), {
			onFinish: () => reset('admin_password'),
			onError: (errors) => {
				console.error('Form submission failed. Validation errors:');
				Object.entries(errors).forEach(([field, message]) => {
					console.error(`Field: ${field}, Error: ${message}`);
				});

			},

		});
	};

	return (
		<AuthSplitLayout title="Welcome Back!" description="Login to access your account" image={LoginImage}>
			<Head title="Log in" />
			<form className="mt-4 flex flex-col gap-6" onSubmit={submit}>
				<div className="grid gap-6">
					<div className="grid gap-2">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							type="text"
							autoFocus
							tabIndex={1}
							autoComplete="username"
							value={data.admin_username}
							onChange={(e) => setData('admin_username', e.target.value)}
							placeholder="Enter your username"
						/>
						<InputError message={errors.admin_username} />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							tabIndex={2}
							autoComplete="current-password"
							value={data.admin_password}
							onChange={(e) => setData('admin_password', e.target.value)}
							placeholder="Enter your password"
						/>
						<div className="flex items-center justify-between">
							<div className="ml-2 flex items-center space-x-3">
								<Checkbox
									id="remember"
									name="remember"
									checked={data.remember}
									onClick={() => setData('remember', !data.remember)}
									tabIndex={3}
								/>
								<Label htmlFor="remember">Remember me</Label>
							</div>

							<div className="flex items-center">
								{(
									<TextLink href={route('admin.forgot-password')} className="text-sm" tabIndex={4}>
										Forgot password?
									</TextLink>
								)}
							</div>
						</div>

						<InputError message={errors.admin_password} />
					</div>

					<Button type="submit" variant="primary" className="mt-5 w-full" tabIndex={5} disabled={processing}>
						{processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
						Log in
					</Button>
				</div>
			</form>

			{status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
		</AuthSplitLayout>
	);
}
