import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
	children,
	title,
	description,
}: PropsWithChildren<{
	name?: string;
	title?: string;
	description?: string;
}>) {
	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-5 md:p-10">
			<div className="flex w-full max-w-2xl flex-col gap-6">
				<Card className="rounded-xl">
					<CardHeader className="px-10 pt-5 pb-0 text-center text-s3">
						<CardTitle className="text-xl">{title}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardContent className="px-10 py-5">{children}</CardContent>
				</Card>
			</div>
		</div>
	);
}
