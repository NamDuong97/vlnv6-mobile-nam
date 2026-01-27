// utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
    set: async <T>(key: string, value: T): Promise<void> => {
        try {
            // Validate input
            if (value === undefined || value === null) {
                throw new Error(`Cannot store undefined/null value for key: ${key}`);
            }

            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            console.error(`Storage set error for key "${key}":`, error);
            throw error; // Re-throw để xử lý ở caller
        }
    },

    get: async <T>(key: string, defaultValue: T | null = null): Promise<T | null> => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);

            if (jsonValue === null) {
                return defaultValue;
            }

            return JSON.parse(jsonValue) as T;
        } catch (error) {
            console.error(`Storage get error for key "${key}":`, error);
            return defaultValue;
        }
    },

    // Remove item
    remove: async (key: string): Promise<void> => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error(`Storage remove error for key "${key}":`, error);
            throw error;
        }
    },

    // Clear all
    clear: async (): Promise<void> => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Storage clear error:', error);
            throw error;
        }
    },

    multiSet: async (keyValuePairs: [string, string][]): Promise<void> => {
        try {
            await AsyncStorage.multiSet(keyValuePairs);
        } catch (error) {
            console.error('Storage multiSet error:', error);
            throw error;
        }
    },
};