import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/UseInitials';
import { type Admin } from '@/types';

export function UserInfo({ user, showEmail = false }: { user: Admin; showEmail?: boolean }) {
    const getInitials = useInitials();

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.admin_photopath} alt={user.admin_username} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.admin_username)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.admin_username}</span>
                {showEmail && <span className="text-muted-foreground truncate text-xs">{user.admin_email}</span>}
            </div>
        </>
    );
}
