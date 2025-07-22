import { AppButton } from '@/components/Button/AppButton';
import { AppCard } from '@/components/Card/AppCard';
import { AppForm } from '@/components/Form/AppForm';
import { AppFormField } from '@/components/Form/AppFormField';
import SafeAreaContainer from '@/components/SafeAreaContainer/SafeAreaContainer';
import { AppTextInput } from '@/components/TextInput/AppTextInput';
import { loginScreenStyles } from '@/styles/LoginScreen/loginScreenStyle';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { z } from 'zod';
const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
const LoginScreen = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: LoginFormValues) => {
    console.log('✅ Submit data:', data);
  };
  return (
    <SafeAreaContainer contentContainerStyle={loginScreenStyles.container}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View>
          <Text style={{ fontSize: 15 }}>Welcome to my</Text>
          <Text style={{ fontSize: 60, fontWeight: 'bold' }}>CHAT APP</Text>
        </View>
      </View>
      <AppCard
        title={'Login'}
        subTitle="Please fill all information to login"
        titlePosition="left"
        icon={'login'}
        content={
          <AppForm form={form}>
            <AppFormField
              name="email"
              label="Email"
              render={(field, error) => (
                <AppTextInput
                  placeholder="Enter email"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={!!error}
                />
              )}
            />
            <AppFormField
              name="password"
              label="Mật khẩu"
              render={(field, error) => (
                <AppTextInput
                  placeholder="Nhập mật khẩu"
                  secureTextEntry
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={!!error}
                />
              )}
            />
            <AppButton
              style={{ marginTop: 10 }}
              onPress={form.handleSubmit(onSubmit)}
            >
              Submit
            </AppButton>
          </AppForm>
        }
      />
    </SafeAreaContainer>
  );
};

export default LoginScreen;
