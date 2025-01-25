import React from 'react';
import clsx from 'clsx';
import Icon from './Icon';
import Text from './Text';

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  altIcon = 'button-icon',
  iconStart,
  iconEnd,
  ...props
}) => {
  const baseClasses = 'rounded-lg transition-all duration-200 ease-in-out';

  const variants = {
    primary:
      'text-white hover:bg-teal-600 disabled:bg-gray-300 items-center flex justify-around w-44 rounded-xl bg-light-teal border-light-gray-200 border-[1px] px-4 py-2 font-semibold leading-6 font-quicksand',
    secondary:
      'text-dark-gray hover:bg-gray-200 disabled:bg-gray-300 items-center flex justify-around w-40 rounded-xl bg-light-gray-400 border-light-gray-200 border-[1px] px-4 py-2 text-dark-gray font-semibold leading-6 font-quicksand',
    danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300',
    outline:
      'border-2 border-light-teal text-light-teal hover:bg-light-teal hover:text-white disabled:bg-gray-300 disabled:border-gray-300',
    ghost: 'bg-transparent disabled:text-gray-300',
  };

  const sizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  const buttonClasses = clsx(
    baseClasses,
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {iconStart && <Icon src={iconStart} className="mr-2" alt={altIcon} />}
      <Text className="flex items-center justify-center">{children}</Text>
      {iconEnd && <Icon src={iconEnd} className="ml-2" alt={altIcon} />}
    </button>
  );
};
