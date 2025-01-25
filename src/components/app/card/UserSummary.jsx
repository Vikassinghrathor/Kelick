import { ICONS } from '@/assets';
import { Icon, Text } from '@/components/ui';
import { useAppContext } from '@/context/AppContext';

export const AccountBrief = () => {
  const { appContext: { accountInfo: { userName, email } = {} } = {} } =
    useAppContext() || {};
  return (
    <div className="flex flex-row gap-4 items-center ml-1">
      <Icon
        width={2}
        height={2}
        src={ICONS.AvatarIcon}
        className="w-8 h-8"
        alt="Account Icon"
      />
      <div className="flex flex-col gap-[2px]">
        <Text className="text-black font-quicksand text-xs font-medium leading-5">
          {userName}
        </Text>
        <Text className="text-light-gray-300 font-quicksand text-xs font-medium leading-5">
          {email}
        </Text>
      </div>
    </div>
  );
};
