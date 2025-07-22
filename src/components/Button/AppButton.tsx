import React from 'react';
import { Button, ButtonProps } from 'react-native-paper';

interface Props extends ButtonProps {
  children: string;
  icon?: string;
  mode?: 'contained' | 'outlined' | 'text' | 'elevated' | 'contained-tonal';
}

export const AppButton: React.FC<Props> = ({
  children,
  mode = 'contained',
  icon,
  ...props
}) => {
  return (
    <Button icon={icon} mode={mode} {...props}>
      {children}
    </Button>
  );
};
