import { useTheme } from '@/hooks/useTheme';
import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />

      <View
        className="flex-1 items-center justify-center p-5"
        style={{ backgroundColor: colors.background }}
      >
        <Text
          className="text-[20px] font-bold"
          style={{ color: colors.text }}
        >
          This screen doesn't exist.
        </Text>

        <Link href="/" className="mt-[15px] py-[15px]">
          <Text
            className="text-[14px]"
            style={{ color: colors.primary }}
          >
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}
