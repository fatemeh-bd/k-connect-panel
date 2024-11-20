import { UserIcon } from "@heroicons/react/24/solid";

const Avatar = () => {
  return (
    <div className="relative w-10 h-10 overflow-hidden bg-secondary-100  rounded-full">
      <UserIcon className="absolute w-10 h-10 text-secondary-500 -left-0 -bottom-1" />
    </div>
  );
};

export default Avatar;
