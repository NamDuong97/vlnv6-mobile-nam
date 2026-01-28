# VLNV6 Mobile

Ứng dụng di động cho nền tảng ViecLam.Net, được xây dựng bằng React Native và Expo.

## 📱 Giới thiệu

VLNV6 Mobile là ứng dụng tìm kiếm việc làm cho phép người dùng:
- Xem danh sách việc làm mới nhất và nổi bật
- Tìm kiếm việc làm theo địa điểm, ngành nghề
- Xem thông tin doanh nghiệp
- Đọc tin tức tuyển dụng từ các công ty

## 🏗️ Cấu trúc thư mục

```
vlnv6-mobile/
│
├── api/                          # Lớp API và services
│   ├── config/                   # Cấu hình API
│   │   ├── apiConstants.ts       # Các hằng số API (endpoints, keys)
│   │   ├── axiosClient.ts        # Cấu hình Axios client
│   │   └── interceptors.ts       # Request/Response interceptors
│   └── services/                 # Các service gọi API
│       ├── cityService.ts        # Service quản lý dữ liệu thành phố
│       ├── classifiedService.ts  # Service tin đăng tuyển dụng
│       ├── orgService.ts         # Service thông tin doanh nghiệp
│       └── pageMetaService.ts    # Service metadata trang
│
├── app/                          # Expo Router - Screens và routing
│   ├── (auth)/                   # Group màn hình xác thực
│   │   ├── sign-in.tsx           # Màn hình đăng nhập
│   │   ├── sign-up.tsx           # Màn hình đăng ký
│   │   └── _layout.tsx           # Layout cho auth group
│   ├── (home)/                   # Group màn hình chính
│   │   ├── index.tsx             # Màn hình trang chủ
│   │   └── _layout.tsx           # Layout cho home group
│   ├── _layout.tsx               # Root layout của app
│   ├── +not-found.tsx            # Màn hình 404
│   └── modal.tsx                 # Modal component
│
├── components/                   # React components
│   ├── common/                   # Components dùng chung
│   │   ├── AppSplash.tsx         # Màn hình splash
│   │   ├── Footer.tsx            # Footer component
│   │   └── Header.tsx            # Header component
│   └── home/                     # Components cho trang chủ
│       ├── BannerSlideshow.tsx   # Slideshow banner
│       ├── BenefitsSection.tsx   # Section hiển thị lợi ích
│       ├── CategoryCard.tsx      # Card hiển thị danh mục
│       ├── CategorySection.tsx   # Section danh mục nghề nghiệp
│       ├── CompanyCard.tsx       # Card thông tin công ty
│       ├── CompanyInfoSection.tsx # Section thông tin công ty chi tiết
│       ├── CompanyList.tsx       # Danh sách công ty
│       ├── CompanySection.tsx    # Section các công ty nổi bật
│       ├── EmployerSection.tsx   # Section dành cho nhà tuyển dụng
│       ├── FeatureCard.tsx       # Card tính năng
│       ├── FilterSection.tsx     # Section bộ lọc tìm kiếm
│       ├── FixedFooter.tsx       # Footer cố định
│       ├── HotJobCard.tsx        # Card việc làm hot
│       ├── HotJobSection.tsx     # Section việc làm nổi bật
│       ├── JobCard.tsx           # Card việc làm
│       ├── LastestJobSection.tsx # Section việc làm mới nhất
│       ├── LocaltionPickerModal.tsx # Modal chọn địa điểm
│       ├── NewsOfCompanySection.tsx # Section tin tức công ty
│       └── Tag.tsx               # Component tag/nhãn
│
├── constants/                    # Hằng số và cấu hình
│   └── colors.ts                 # Bảng màu của app
│
├── hooks/                        # Custom React hooks
│   ├── useBootstrap.ts           # Hook khởi tạo app (fonts, data)
│   └── useTheme.ts               # Hook quản lý theme
│
├── store/                        # Zustand stores - State management
│   ├── cityStore.ts              # Store quản lý dữ liệu thành phố
│   ├── classifiedStore.ts        # Store quản lý tin đăng
│   ├── indexStore.ts             # Store chung/index
│   ├── orgStore.ts               # Store quản lý doanh nghiệp
│   └── pageMetaStore.ts          # Store quản lý page metadata
│
├── types/                        # TypeScript type definitions
│   ├── city.ts                   # Types cho thành phố
│   ├── classified.ts             # Types cho tin đăng
│   ├── index.ts                  # Export types
│   ├── org.ts                    # Types cho doanh nghiệp
│   └── pageMeta.ts               # Types cho page metadata
│
├── utils/                        # Utility functions
│   ├── mappingType.ts            # Functions mapping dữ liệu
│   └── storage.ts                # AsyncStorage helpers
│
├── assets/                       # Tài nguyên tĩnh (hình ảnh, fonts)
│
├── .env                          # Biến môi trường
├── .gitignore                    # Git ignore rules
├── app.json                      # Cấu hình Expo app
├── babel.config.js               # Cấu hình Babel
├── expo-env.d.ts                 # Expo type definitions
├── global.css                    # Global CSS styles
├── metro.config.js               # Cấu hình Metro bundler
├── nativewind-env.d.ts           # NativeWind type definitions
├── package.json                  # Dependencies và scripts
├── tailwind.config.js            # Cấu hình Tailwind CSS
└── tsconfig.json                 # Cấu hình TypeScript
```

## 🚀 Hướng dẫn cài đặt và chạy dự án

### Yêu cầu hệ thống

- **Node.js**: >= 18.x
- **npm** 
- **Expo CLI**: Tự động cài đặt qua dependencies
- **Expo Go app**: Cài trên điện thoại (iOS/Android) để test

### Bước 1: Clone dự án

```bash
git clone <repository-url>
cd vlnv6-mobile
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Cấu hình biến môi trường

File `.env` đã có sẵn với cấu hình:

```env
EXPO_PUBLIC_API_URL = "https://sandbox-api.muaban.net"
EXPO_PUBLIC_API_URL2 = "https://vieclam.net"
```

### Bước 4: Chạy ứng dụng

#### Chạy development server:

```bash
npm start
```
hoặc 

```bash
npx expo
```

Sau đó bạn có thể chọn:
- Nhấn `a` - Mở trên Android emulator
- Nhấn `i` - Mở trên iOS simulator
- Nhấn `r` - Để load lại ứng dụng
- Quét QR code bằng Expo Go app trên điện thoại

#### Hoặc chạy trực tiếp trên platform:

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 📦 Packages quan trọng

### Core Framework

- **expo** (~54.0.31): Framework chính để build React Native app, cung cấp các API native và công cụ development
- **react-native** (0.81.5): Framework để xây dựng ứng dụng mobile native bằng React
- **react** (19.1.0): Thư viện UI component-based

### Navigation & Routing

- **expo-router** (~6.0.21): File-based routing cho React Native, giống Next.js. Tự động tạo navigation từ cấu trúc thư mục trong folder `app/`
- **@react-navigation/native** (^7.1.8): Navigation core, được sử dụng bởi expo-router

### UI & Styling

- **nativewind** (^4.2.1): Tailwind CSS cho React Native, cho phép styling bằng className như web
- **tailwindcss** (^3.3.2): Utility-first CSS framework
- **@expo/vector-icons** (^15.0.3): Bộ icon fonts (MaterialIcons, FontAwesome, etc.)
- **expo-image** (~3.0.11): Component Image được tối ưu hóa với caching

### State Management

- **zustand** (^5.0.10): Thư viện quản lý state đơn giản, nhẹ và hiệu suất cao. Thay thế cho Redux với API đơn giản hơn

### Data Fetching

- **axios** (^1.13.2): HTTP client để gọi API, hỗ trợ interceptors và request/response transformation

### Performance

- **@shopify/flash-list** (2.0.2): Thay thế FlatList với hiệu suất cao hơn cho danh sách dài
- **react-native-reanimated** (~4.1.1): Thư viện animation hiệu suất cao
- **react-native-worklets** (0.5.1): JavaScript worklets cho animations và gestures

### Storage

- **@react-native-async-storage/async-storage** (2.2.0): Local storage cho React Native, tương tự localStorage trên web

### Other Essential

- **expo-font** (~14.0.10): Load custom fonts
- **expo-splash-screen** (~31.0.13): Quản lý splash screen
- **expo-status-bar** (~3.0.9): Control status bar
- **expo-constants** (~18.0.13): Access app constants và config
- **expo-linking** (~8.0.11): Deep linking và URL handling
- **react-native-safe-area-context** (~5.6.0): Safe area boundaries (notch, home indicator)
- **react-native-screens** (~4.16.0): Native screen optimization

## 🔧 Scripts

```bash
npm start          # Khởi động Expo development server
npm run android    # Chạy trên Android emulator/device
npm run ios        # Chạy trên iOS simulator/device
npm run web        # Chạy trên web browser
```

## 🏛️ Kiến trúc ứng dụng

### File-based Routing (Expo Router)

Dự án sử dụng Expo Router với file-based routing:
- Các file trong `app/` tự động tạo thành routes
- `_layout.tsx` định nghĩa layout cho group
- `(folder)` là route groups (không ảnh hưởng URL)
- `+not-found.tsx` là 404 page

### State Management Pattern

Sử dụng Zustand với pattern:
- Mỗi domain có store riêng (cityStore, orgStore, classifiedStore)
- Store chứa state + actions
- Tách biệt business logic khỏi UI components

### API Layer

- **Services**: Các function gọi API (trong `api/services/`)
- **Axios Client**: Centralized HTTP client với interceptors
- **Types**: Type-safe với TypeScript definitions

### Component Structure

- **Common components**: Dùng chung cho toàn app
- **Feature components**: Nhóm theo tính năng (home, auth)
- **Atomic design**: Cards, Sections, Lists

## 🌐 API Endpoints

Dự án kết nối với 2 API servers:
- **Primary API**: https://sandbox-api.muaban.net
- **Secondary API**: https://vieclam.net

## 📝 Notes

- Dự án sử dụng **TypeScript** để type-safe
- **NativeWind** cho phép viết Tailwind CSS trong React Native
- **Expo Router** tự động tạo TypeScript types cho routes
- **New Architecture** được enable trong Expo config

## 🤝 Development Workflow

1. Tạo type definitions trong `types/`
2. Tạo các url endpoint trong `api/apiConstants`
3. Tạo API service trong `api/services/`
4. Tạo Zustand store trong `store/`
5. Tạo UI components trong `components/`
6. Tạo screen/route trong `app/`


Được phát triển với ❤️ bởi team VLNV6 - Nam ^^
