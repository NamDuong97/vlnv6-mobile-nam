import Footer from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import BannerSlideshow from '@/components/home/BannerSlideshow';
import BenefitsSection from '@/components/home/BenefitsSection';
import CategorySection from '@/components/home/CategorySection';
import CompanyInfoSection from '@/components/home/CompanyInfoSection';
import CompanySection from '@/components/home/CompanySection';
import EmployerSection from '@/components/home/EmployerSection';
import FilterSection from '@/components/home/FilterSection';
import { FixedFooter } from '@/components/home/FixedFooter';
import HotJobSection from '@/components/home/HotJobSection';
import LastestJobSection from '@/components/home/LastestJobSection';
import NewsOfCompanySection from '@/components/home/NewsOfCompanySection';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function HomeScreen() {
  const [isPressPostButton, setIsPressPostButton] = useState(false);
  const [isClosePostModal, setIsClosePostModal] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const handleClosePostModal = () => {
    setIsClosePostModal(true);
  }

  const handlePressPostButton = () => {
    setIsPressPostButton(true);
    router.push('/')
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      <Header />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section with Images */}
        <View>
          <Image
            source={require('@/assets/images/bg-500.png')}
            className='h-44'
            style={{ width: '100%', minHeight: 178 }}
          />
        </View>

        <FilterSection />

        {/* Job Categories */}
        <CategorySection />

        {/* Featured Companies */}
        <CompanySection />

        {/* Hot Jobs Section */}
        <HotJobSection />

        {/* Hot Jobs Section */}
        <BannerSlideshow />

        {/* News Of Company Section */}
        <NewsOfCompanySection />

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
    </View>
  );
}