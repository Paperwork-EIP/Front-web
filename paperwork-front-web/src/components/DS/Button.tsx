import { Button, SystemProps } from '@chakra-ui/react'
import React, { ComponentProps } from 'react';

const ButtonBase = ({
  size,
  placeholder,
  variant,
  name,
  colorScheme,
  value,
  className,
  style,
  isDisabled = false,
//   onClick,
  iconSpacing,
  isActive = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  spinner,
  spinnerPlacement,
  ...props
}: {
  size?: "xs" | "sm" | "md" | "lg";
  placeholder?: string;
  variant?: "solid" | "outline" | "ghost" | "link";
  name?: string;
  colorScheme?: string;
  value?: string | number | undefined;
  isDisabled?: boolean;
  isActive?: boolean;
  isLoading?: boolean;
  iconSpacing?: SystemProps["marginRight"];
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  spinner?: React.ReactElement;
  spinnerPlacement?: "end" | "start";
  style?: object;
//   onClick?: (e: React.MouseEventHandler<HTMLButtonElement>) => void;
} & ComponentProps<'button'>) => {
  let body = (
    <Button
      name={name}
      value={value}
      colorScheme={colorScheme || "gray"}
      style={style || {}}
      size={size || "md"}
      variant={variant}
      placeholder={placeholder || ""}
    //   onClick={onClick || (() => {})}
      isDisabled={isDisabled}
      isActive={isActive}
      isLoading={isLoading}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      spinner={spinner}
      spinnerPlacement={spinnerPlacement || "start"}
      {...props}
    />
  );

  return body;
};

export default ButtonBase;