import { UserIcon } from "@heroicons/react/24/solid";

const Avatar = () => {
  return (
    <div className="relative w-10 h-10 overflow-hidden bg-gray-100  rounded-full">
      <UserIcon className="absolute w-10 h-10 text-gray-400 -left-0 -bottom-1" />
    </div>
  );
};

export default Avatar;
