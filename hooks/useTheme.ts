import { THEMES } from '@/constants/colors';
import { useColorScheme } from 'react-native';

export function useTheme() {
    const colorScheme = useColorScheme();
    const themeName = colorScheme === 'dark' ? 'dark' : 'light';
    const colors = THEMES[themeName];

    return {
        colors,
        themeName,
        isDark: themeName === 'dark',
    };
}