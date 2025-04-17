import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/UseInitials';
import { User, type Admin } from '@/types';

interface UserInfoProps {
    user?: User;
    admin?: Admin;
    showEmail: boolean;
}


export function UserInfo({ user, admin, showEmail = false }: UserInfoProps) {
    const getInitials = useInitials();

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                {admin && (
                    <>
                        <AvatarImage src={admin.admin_photopath} alt={admin.admin_username} />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials(admin.admin_username)}
                        </AvatarFallback>
                    </>
                )}
                {user && (
                    <>
                        <AvatarImage src={user.user_photopath} alt={user.username} />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials(user.username)}
                        </AvatarFallback>
                    </>
                )}

            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                {admin && (
                    <>
                        <span className="truncate font-medium">{admin.admin_username}</span>
                        {showEmail && <span className="text-muted-foreground truncate text-xs">{admin.admin_email}</span>}
                    </>
                )}
                {user && (
                    <>
                        <span className="truncate font-medium">{user.username}</span>
                        {showEmail && <span className="text-muted-foreground truncate text-xs">{user.user_email}</span>}
                    </>
                )}
            </div>
        </>
    );
}
