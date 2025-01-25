import { ICONS } from '@/assets';
import { Button } from '.';
import Text from './Text';

const Modal = ({
  isOpen,
  title,
  onClose,
  width = '50%',
  height = '66%',
  children,
}) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          {/* Modal Content */}
          <div
            className={`flex flex-col gap-5 bg-white rounded-xl p-1 lg:p-6 lg:pt-1 xs:w-[95%] lg:max-w-[${width}] lg:w-[${width}] h-[${height}]  mx-4 relative`}
          >
            {/* Close Button */}
            <div className="flex flex-row justify-between">
              <Text className="font-quicksand font-bold text-xl leading-8 tracking-tighter text-primary-black">
                {title}
              </Text>
              <Button
                iconStart={ICONS.CancelIcon}
                variant="ghost"
                onClick={onClose}
                className=" text-gray-600 hover:text-gray-900 h-6 w-6"
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
