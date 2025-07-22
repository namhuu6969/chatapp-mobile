import React from 'react';
import { Avatar, Card, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-screens/lib/typescript/components/BottomTabsScreen';

interface Props {
  title?: string | React.ReactNode;
  subTitle?: string;
  icon?: string;
  content?: React.ReactNode;
  titlePosition?: 'left' | 'center' | 'right';
}

export const AppCard = ({
  content,
  icon,
  subTitle,
  title,
  titlePosition = 'left',
}: Props) => {
  const LeftContent = icon
    ? (props: any) => <Avatar.Icon {...props} icon={icon} />
    : undefined;
  const renderTitle = () => {
    if (!title) return null;
    if (typeof title === 'string') {
      return (
        <Text
          style={{ textAlign: titlePosition, fontSize: 20, fontWeight: 'bold' }}
        >
          {title}
        </Text>
      );
    }
    return (
      <View
        style={[
          styles.titleWrapper,
          titlePosition === 'center' && styles.center,
          titlePosition === 'right' && styles.right,
        ]}
      >
        {title}
      </View>
    );
  };

  const renderSubtitle = () => {
    if (!subTitle) return null;

    return (
      <Text
        style={{
          textAlign: titlePosition,
          fontSize: 16,
          color: '#aaa',
        }}
      >
        {subTitle}
      </Text>
    );
  };

  return (
    <Card>
      <Card.Title
        title={renderTitle()}
        subtitle={renderSubtitle()}
        left={LeftContent}
      />
      <Card.Content>{content}</Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    width: '100%',
  },
  center: {
    alignItems: 'center',
  },
  right: {
    alignItems: 'flex-end',
  },
});
