import { Avatar } from "@/components/ui/avatar";
import { User } from "@/types/auth";

interface UserAvatarProps {
  user: User;
}

export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        {user.avatar ? (
          <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
        ) : (
          <div className="bg-purple-100 text-purple-600 h-full w-full flex items-center justify-center">
            {user.firstName.charAt(0)}
          </div>
        )}
      </Avatar>
      <div>
        <h4 className="text-sm font-medium">{`${user.firstName} ${user.lastName}`}</h4>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}