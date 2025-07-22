import React, { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

interface AppTextInputProps extends TextInputProps {
  underlineColorFixed?: string; // màu underline
  secureTextEntry?: boolean; // có phải input mật khẩu không?
}

export const AppTextInput: React.FC<AppTextInputProps> = ({
  underlineColorFixed = '#666',
  secureTextEntry = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextInput
      mode="flat"
      underlineColor={underlineColorFixed}
      activeUnderlineColor={underlineColorFixed}
      secureTextEntry={secureTextEntry && !showPassword} // chỉ ẩn khi secure và chưa show
      right={
        secureTextEntry ? (
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword((prev) => !prev)}
          />
        ) : undefined
      }
      style={{
        backgroundColor: 'transparent',
        height: 40,
        fontSize: 14,
        paddingHorizontal: 0,
      }}
      {...props}
    />
  );
};
