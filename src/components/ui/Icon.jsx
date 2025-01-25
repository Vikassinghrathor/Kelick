import React from 'react';
import Image from 'next/image';

const Icon = ({
  icon: IconComponent,
  src,
  className,
  loading = 'eager',
  width = 1.5,
  height = 1.5,
  color,
  disabled,
  loader,
  priority = false,
  alt = 'Icon',
  ...rest
}) => {
  if (!IconComponent && !src) return null;

  // Check if the passed `icon` is a React component (SVG)
  const isSvg = typeof IconComponent === 'function';

  return (
    <div
      className={`inline-flex justify-center items-center w-[${
        width || '24'
      }] h-[${height || '24'}] ${color ? `text-${color}` : ''} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      color={color}
      disabled={disabled}
      {...rest}
    >
      {isSvg ? (
        <Image
          as={IconComponent}
          width={width}
          height={height}
          alt={alt}
          layout="fill"
          objectFit="contain"
          className={`transition-all duration-200 ${
            color ? `fill-[${color}]` : ''
          }`}
        />
      ) : (
        <Image
          loader={loader}
          priority={priority}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
};

export default Icon;
