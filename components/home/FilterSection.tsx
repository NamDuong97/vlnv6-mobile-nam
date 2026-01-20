import React from 'react'
import { Text, View } from 'react-native'
import { SearchBar } from './SearchBar'

const FilterSection = () => {
    return (
        <View className="py-5 bg-white border-2 rounded-t-3xl mb-1">
            {/* Title Section */}
            <View className="px-4 mb-4">
                <Text className="text-xl font-bold text-gray-800 mb-1">
                    Việc tìm đúng người
                </Text>
                <Text className="text-2xl font-bold text-primary-600">
                    Người tìm đúng việc
                </Text>
            </View>

            {/* Search Bar */}
            <SearchBar onSearch={() => console.log('Searching...')} />
        </View>
    )
}

export default FilterSection