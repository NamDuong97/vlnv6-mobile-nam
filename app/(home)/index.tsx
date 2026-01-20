import { CategoryCard } from '@/components/home/CategoryCard';
import { CompanyCard } from '@/components/home/CompanyCard';
import CompanyInfoSection from '@/components/home/CompanyInfoSection';
import { FixedFooter } from '@/components/home/FixedFooter';
import { Header } from '@/components/home/Header';
import { JobCard } from '@/components/home/JobCard';
import { SearchBar } from '@/components/home/SearchBar';
import { TagC } from '@/components/home/Tag';
import { mockCategories, mockCompanies, mockJobs, mockTags } from '@/data/mockData';
import { Company, Job, JobCategory, Tag } from '@/types';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
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
        <View className="px-4 pt-4">
          <View className="flex-row h-32 mb-4">
            <View className="flex-1 mr-2 bg-blue-100 rounded-xl items-center justify-center">
              <Text className="text-5xl">🧹</Text>
            </View>
            <View className="flex-1 mx-1 bg-green-100 rounded-xl items-center justify-center">
              <Text className="text-5xl">🚗</Text>
            </View>
            <View className="flex-1 ml-2 bg-orange-100 rounded-xl items-center justify-center">
              <Text className="text-5xl">⚙️</Text>
            </View>
          </View>
        </View>

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

        {/* Popular Tags */}
        <View className="px-4 mt-4 mb-2">
          <Text className="text-sm text-gray-600 mb-2">Tìm kiếm nhiều nhất hôm nay:</Text>
          <View className="flex-row flex-wrap">
            {mockTags.map((tag: Tag) => (
              <TagC key={tag.id} tag={tag} onPress={() => console.log('Tag pressed:', tag.name)} />
            ))}
          </View>
        </View>

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
        <View className="mt-4 mb-4 px-4">
          <View className="flex-row items-center mb-3">
            <Text className="text-xl mr-2">🆕</Text>
            <Text className="text-lg font-bold text-gray-800">Việc làm mới nhất</Text>
          </View>
          {mockJobs.slice(3, 6).map((job: Job) => (
            <JobCard
              key={job.id}
              job={job}
              onPress={() => console.log('Job pressed:', job.title)}
            />
          ))}
        </View>

        {/* Call to Action */}
        <View className="mx-4 my-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6">
          <Text className="text-2xl font-bold text-white mb-2">
            Bạn đang tìm kiếm việc làm?
          </Text>
          <Text className="text-white mb-4 opacity-90">
            Tạo hồ sơ ngay để kết nối được với nhiều nhà tuyển dụng hơn, tìm việc làm nhanh chóng tại vieclamnet
          </Text>
          <TouchableOpacity className="bg-white rounded-lg py-3 items-center">
            <Text className="text-primary-600 font-bold text-base">Tạo hồ sơ ngay</Text>
          </TouchableOpacity>
        </View>

        {/* Benefits Section */}
        <View className="mx-4 mb-6">
          <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Text className="text-3xl mr-3">✨</Text>
              <Text className="flex-1 font-bold text-gray-800">Tiếp cận nhiều nhà tuyển dụng</Text>
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Text className="text-3xl mr-3">🏆</Text>
              <Text className="flex-1 font-bold text-gray-800">Đánh giá hồ sơ tốt</Text>
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Text className="text-3xl mr-3">💡</Text>
              <Text className="flex-1 font-bold text-gray-800">Dễ xuất việc làm phù hợp</Text>
            </View>
          </View>
        </View>

        {/* Employer Section */}
        <View className="bg-red-500 mx-4 rounded-2xl p-6 mb-6">
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-2">🔥</Text>
            <Text className="text-xl font-bold text-white">Dành cho nhà tuyển dụng</Text>
          </View>

          <View className="bg-white/20 rounded-xl p-4 mb-3">
            <Text className="text-white font-semibold mb-2">Đăng tin & quản lý đăng tin</Text>
            <Text className="text-white/90 text-sm">
              Đăng tin dễ dàng cán hơn 1m+ ứng viên tiềm năng. Xem và thống kê hiệu quả trực quan
            </Text>
          </View>

          <View className="bg-white/20 rounded-xl p-4 mb-3">
            <Text className="text-white font-semibold mb-2">Tìm kiếm ứng viên</Text>
            <Text className="text-white/90 text-sm">
              Chủ động tìm kiếm ứng viên từ kho hồ sơ với 50,000+ hồ sơ chất lượng cao
            </Text>
          </View>

          <TouchableOpacity className="bg-white rounded-lg py-3 items-center">
            <Text className="text-red-500 font-bold text-base">Đăng tín miễn phí</Text>
          </TouchableOpacity>
        </View>

        {/* Company Info Section */}
        <CompanyInfoSection />

        {/* Footer */}
        <View className="bg-gray-100 px-4 pt-6 pb-20">
          <View className="flex-row items-center mb-4">
            <Image source={require('@/assets/images/vieclam.svg')}
              className="w-24 h-8"
              onError={(error) => console.log('Image loading error:', error)}
              style={{ width: 190, height: 32 }}
            />
          </View>

          {/* Schema */}
          <View className="mb-4">
            <Text className="font-bold text-gray-800 mb-2">Trung tâm hỗ trợ</Text>
            <Text className="text-sm text-gray-600 mb-4">
              CÔNG TY CỔ PHẦN ĐỊNH ANH
            </Text>
            <Text className="text-sm text-gray-600 mb-1">MST: 0100255844, cấp ngày 11/12/2008</Text>
            <Text className="text-sm text-gray-600 mb-1">Hotline: 028 7300 1234 - 024 7300 1234</Text>
            <Text className="text-sm text-gray-600 mb-1">Văn phòng giao dịch</Text>
            <Text className="text-sm text-gray-600 mb-1">A35 Nam Quang 2, P.Tân Phong, Quận 7, TPHCM</Text>
            <Text className="text-sm text-gray-600 mb-1">38 Cửa Đông, P.Cửa Đông, Quận Hoàn Kiếm, Hà Nội</Text>
          </View>

          {/* About Company And Candidate*/}
          <View className="flex-row justify-between mb-4">
            <View className="flex-1 mr-4">
              <Text className="font-semibold text-gray-800 mb-2">Về chúng tôi</Text>
              <Text className="text-sm text-gray-600 mb-1">Bảng giá dịch vụ</Text>
              <Text className="text-sm text-gray-600 mb-1">Điều khoản sử dụng</Text>
              <Text className="text-sm text-gray-600 mb-1">Quy chế hoạt động</Text>
              <Text className="text-sm text-gray-600 mb-1">Chính sách bảo mật</Text>
              <Text className="text-sm text-gray-600 mb-1">Giải quyết tranh chấp</Text>
            </View>

            <View className="flex-1">
              <Text className="font-semibold text-gray-800 mb-2">Dành cho ứng viên</Text>
              <Text className="text-sm text-gray-600 mb-1">Tạo hồ sơ</Text>
              <Text className="text-sm text-gray-600 mb-1">Tìm việc làm</Text>
              <Text className="text-sm text-gray-600 mb-1">Cẩm nang nghề nghiệp</Text>
              <Text className="text-sm text-gray-600 mb-1">Mẹo tìm việc</Text>
            </View>
          </View>

          {/* Employer And Social network*/}
          <View className="flex-row justify-between mb-4">
            <View className="flex-1 mr-4">
              <Text className="font-semibold text-gray-800 mb-2">Dành cho nhà tuyển dụng</Text>
              <Text className="text-sm text-gray-600 mb-1">Tìm kiếm ứng viên</Text>
              <Text className="text-sm text-gray-600 mb-1">Quản lý ứng viên</Text>
              <Text className="text-sm text-gray-600 mb-1">Quản lý tin tuyển dụng</Text>
              <Text className="text-sm text-gray-600 mb-1">Mẹo tuyển dụng</Text>
            </View>

            <View className="flex-1">
              <Text className="font-semibold text-gray-800 mb-2">Mạng xã hội</Text>

              <View className="flex-row mb-2">
                <Link href={'https://www.tiktok.com/@vieclamnet'} className='mr-2'>
                  <Image
                    source={require('@/assets/images/tiktok.png')}
                    className="w-6 h-6 mr-2"
                    style={{ width: 40, height: 40 }} />
                </Link>
                <Link href={'https://www.facebook.com/vieclamnet.official/'} >
                  <Image
                    source={require('@/assets/images/facebook.png')}
                    className="w-6 h-6 mr-2"
                    style={{ width: 40, height: 40 }} />
                </Link>
              </View>

              <View className="flex-row mb-3">
                <Link href={'https://www.youtube.com/@Vieclam_net'} className='mr-2'>
                  <Image
                    source={require('@/assets/images/youtube.png')}
                    className="w-6 h-6 mr-2"
                    style={{ width: 40, height: 40 }} />
                </Link>
                <Link href={'https://zalo.me/vieclamnet'}>
                  <Image
                    source={require('@/assets/images/zalo-footer.png')}
                    className="w-6 h-6 mr-3"
                    style={{ width: 40, height: 40 }} />
                </Link>
              </View>

              <View className="flex-row mb-3">
                <Link href={'https://www.dmca.com/Protection/Status.aspx?ID=123e32a1-48c0-4151-aa3b-3e80b4d96192&&refurl=https://vieclam.net/'} >
                  <Image
                    source={require('@/assets/images/dmca_protected.png')}
                    className="w-6 h-6 mr-2"
                    style={{ width: 124, height: 24 }} />
                </Link>
              </View>

              <View className="flex-row">
                <Link href={'http://online.gov.vn/Home/WebDetails/122616?AspxAutoDetectCookieSupport=1'} />
                <Image
                  source={require('@/assets/images/gov.png')}
                  className="w-6 h-6 mr-2"
                  style={{ width: 127, height: 39 }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {!isClosePostModal
        ?
        (<FixedFooter onPress={handlePressPostButton} onClose={handleClosePostModal} isClosePostModal={isClosePostModal} />) : ''
      }
    </SafeAreaProvider>
  );
}