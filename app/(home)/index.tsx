import Footer from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import BenefitsSection from '@/components/home/BenefitsSection';
import { CategoryCard } from '@/components/home/CategoryCard';
import { CompanyCard } from '@/components/home/CompanyCard';
import CompanyInfoSection from '@/components/home/CompanyInfoSection';
import EmployerSection from '@/components/home/EmployerSection';
import FilterSection from '@/components/home/FilterSection';
import { FixedFooter } from '@/components/home/FixedFooter';
import { JobCard } from '@/components/home/JobCard';
import LastestJobSection from '@/components/home/LastestJobSection';
import { mockCategories, mockCompanies, mockJobs } from '@/data/mockData';
import { Company, Job, JobCategory } from '@/types';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [isPressPostButton, setIsPressPostButton] = useState(false);
  const [isClosePostModal, setIsClosePostModal] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const handleClosePostModal = () => {
    setIsClosePostModal(true);
  }

  const handlePressPostButton = () => {
    setIsPressPostButton(true);
    router.push('/news/create')
  }

  const handlePressLoadMore = () => {
    setIsLoadMore(!isLoadMore);
  }

  return (
    <SafeAreaProvider className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      <Header />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section with Images */}
        <View>
          <Image
            source={require('@/assets/images/bg-500.png')}
            style={{ width: 430, minHeight: 178 }}
          />
        </View>

        <FilterSection />

        {/* Job Categories */}
        <View className="mt-6 mb-4">
          <View className="flex-row items-center justify-between px-4 mb-4">
            <View className="flex-row items-center">
              <Text className="text-xl mr-2">🔍</Text>
              <Text className="text-lg font-bold text-gray-800">
                Tìm việc nhanh theo ngành nghề
              </Text>
            </View>
          </View>
          <View className="px-4 flex-row flex-wrap justify-between">
            {mockCategories.map((category: JobCategory) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => console.log('Category pressed:', category.name)}
              />
            ))}
          </View>
        </View>

        {/* Featured Companies */}
        <View className="mt-4 mb-4">
          <View className="flex-row items-center justify-between px-4 mb-3">
            <Text className="text-lg font-bold text-gray-800">Doanh nghiệp nổi bật</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-sm text-primary-600 mr-1">›</Text>
              <Text className="text-sm text-primary-600 mr-1">›</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            {mockCompanies.map((company: Company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onPress={() => console.log('Company pressed:', company.name)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Hot Jobs Section */}
        <View className="mt-4 mb-4 px-4">
          <View className="flex-row items-center mb-3">
            <Text className="text-xl mr-2">🔥</Text>
            <Text className="text-lg font-bold text-gray-800">Việc làm nổi bật</Text>
          </View>
          {mockJobs.slice(0, 3).map((job: Job) => (
            <JobCard
              key={job.id}
              job={job}
              onPress={() => console.log('Job pressed:', job.title)}
            />
          ))}
        </View>

        {/* Latest Jobs Section */}
        <LastestJobSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Employer Section */}
        <EmployerSection />

        {/* Company Info Section */}
        <CompanyInfoSection />

        {/* Footer */}
        <Footer />
      </ScrollView>
      {!isClosePostModal
        ?
        (<FixedFooter onPress={handlePressPostButton} onClose={handleClosePostModal} isClosePostModal={isClosePostModal} />) : ''
      }
    </SafeAreaProvider>
  );
}