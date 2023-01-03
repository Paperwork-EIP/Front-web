import { Textarea, Input } from '@chakra-ui/react'
import React from 'react';
import { ComponentProps } from 'react';

const InputBase = ({
  size,
  placeholder,
  variant,
  name,
  label,
  additionalLabel,
  value,
  className,
  style,
  type,
  errorBorderColor,
  focusBorderColor,
  isDisabled = false,
  onChange,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
  _placeholder,
  ...props
}: {
  size?: "xs" | "sm" | "md" | "lg";
  placeholder?: string;
  variant?: "outline" | "flushed" | "filled" | "unstyled";
  name?: string;
  value?: string | number | undefined;
  label?: string;
  additionalLabel?: string;
  type?: string;
  errorBorderColor?: string;
  focusBorderColor?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  _placeholder?: object;
  style?: object;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & ComponentProps<'input'>) => {
  let body = (
    <Input
      name={name}
      value={value}
      type={type || "text"}
      style={style || {}}
      size={size || "md"}
      variant={variant}
      placeholder={placeholder || ""}
      onChange={onChange || (() => {})}
      errorBorderColor={errorBorderColor}
      focusBorderColor={focusBorderColor}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      {...props}
    />
  );
  if (type === "textarea") {
    body = (
      <Textarea
        name={name}
        value={value}
        style={style || {}}
        size={size}
        variant={variant}
        placeholder={placeholder || ""}
        onChange={onChange || (() => {})}
        errorBorderColor={errorBorderColor}
        focusBorderColor={focusBorderColor}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      />
    );
  }
  if (additionalLabel) {
    body = (
      <div>
        <div className="mb-2">
          <span className="mb-2 fw-bold">{label}</span>
          <span className="additionalLabel-lighter">{additionalLabel}</span>
        </div>
        {body}
      </div>
    );
  }
  if (!additionalLabel && label) {
    body = (
      <div>
        <div className="mb-2 fw-bold">{label}</div>
        {body}
      </div>
    );
  }

  return body;
};

export default InputBase;