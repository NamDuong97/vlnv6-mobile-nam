import { useTheme } from '@/hooks/useTheme';
import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from 'react-native';

export default function ModalScreen() {
  const { colors } = useTheme();

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <Text
        className="text-[20px] font-bold"
        style={{ color: colors.text }}
      >
        Modal
      </Text>

      <View
        className="my-[30px] h-px w-4/5"
        style={{ backgroundColor: colors.border }}
      />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
