import { AppSplash } from '@/components/common/AppSplash';
import { useBootstrap } from '@/hooks/useBootstrap';
import { useTheme } from '@/hooks/useTheme';
import { useBootstrapStore } from '@/store/indexStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import '../../global.css';

// Prevent splash screen auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Bootstrap để call api master hiển thị giao diện homepage
  useBootstrap();

  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Kiểm tra xem dữ liệu đã load xong chưa rồi mới render UI
  const ready = useBootstrapStore(s => s.ready)

  useEffect(() => {
    if (fontError) {
      console.error('Font loading error:', fontError);
      // Có thể show error UI ở đây nếu cần
    }
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Hoặc return loading indicator
    return null;
  }

  if (!ready) {
    return <AppSplash />
  }

  return (
    <SafeAreaProvider>
      <RootLayoutNav />
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      backgroundColor: colors.background
    }}>
      <Stack>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Modal',
        }} />
      </Stack>
    </View>
  );
}