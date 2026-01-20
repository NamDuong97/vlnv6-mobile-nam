import { THEMES } from '@/constants/colors';
import { useColorScheme } from 'react-native';

export function useTheme() {
    const colorScheme = useColorScheme(); // 'light' | 'dark' | null
    const themeName = colorScheme === 'dark' ? 'dark' : 'light';
    const colors = THEMES[themeName];

    return {
        colors,
        themeName,
        isDark: themeName === 'dark',
    };
}