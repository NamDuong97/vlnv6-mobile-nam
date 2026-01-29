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
├── src/                          # Thư mục source code chính
│   │
│   ├── api/                      # Lớp API và services
│   │   ├── config/               # Cấu hình API
│   │   │   ├── apiConstants.ts   # Các hằng số API (endpoints, keys)
│   │   │   ├── axiosClient.ts    # Cấu hình Axios client
│   │   │   └── interceptors.ts   # Request/Response interceptors
│   │   └── services/             # Các service gọi API
│   │       ├── bannerService.ts  # Service quản lý banner
│   │       ├── cityService.ts    # Service quản lý dữ liệu thành phố
│   │       ├── classifiedService.ts # Service tin đăng tuyển dụng
│   │       ├── orgService.ts     # Service thông tin doanh nghiệp
│   │       └── pageMetaService.ts # Service metadata trang
│   │
│   ├── app/                      # Expo Router - Screens và routing
│   │   ├── (auth)/               # Group màn hình xác thực
│   │   │   ├── sign-in.tsx       # Màn hình đăng nhập
│   │   │   ├── sign-up.tsx       # Màn hình đăng ký
│   │   │   └── _layout.tsx       # Layout cho auth group
│   │   ├── (home)/               # Group màn hình chính
│   │   │   ├── index.tsx         # Màn hình trang chủ
│   │   │   └── _layout.tsx       # Layout cho home group
│   │   ├── _layout.tsx           # Root layout của app (SafeAreaProvider)
│   │   ├── +not-found.tsx        # Màn hình 404
│   │   └── modal.tsx             # Modal component
│   │
│   ├── components/               # React components
│   │   ├── common/               # Components dùng chung
│   │   │   ├── AppSplash.tsx     # Màn hình splash
│   │   │   ├── Footer.tsx        # Footer component
│   │   │   └── Header.tsx        # Header component
│   │   └── home/                 # Components cho trang chủ
│   │       ├── BannerSlideshow.tsx # Slideshow banner
│   │       ├── BenefitsSection.tsx # Section hiển thị lợi ích
│   │       ├── CategoryCard.tsx  # Card hiển thị danh mục (sprite sheet)
│   │       ├── CategorySection.tsx # Section danh mục nghề nghiệp
│   │       ├── CompanyCard.tsx   # Card thông tin công ty
│   │       ├── CompanyInfoSection.tsx # Section thông tin công ty chi tiết
│   │       ├── CompanyList.tsx   # Danh sách công ty
│   │       ├── CompanySection.tsx # Section các công ty nổi bật
│   │       ├── EmployerSection.tsx # Section dành cho nhà tuyển dụng
│   │       ├── FeatureCard.tsx   # Card tính năng
│   │       ├── FilterSection.tsx # Section bộ lọc tìm kiếm
│   │       ├── FixedFooter.tsx   # Footer cố định
│   │       ├── HotJobCard.tsx    # Card việc làm hot
│   │       ├── HotJobSection.tsx # Section việc làm nổi bật
│   │       ├── JobCard.tsx       # Card việc làm
│   │       ├── LastestJobSection.tsx # Section việc làm mới nhất
│   │       ├── LocaltionPickerModal.tsx # Modal chọn địa điểm
│   │       ├── NewsOfCompanySection.tsx # Section tin tức công ty
│   │       └── Tag.tsx           # Component tag/nhãn
│   │
│   ├── constants/                # Hằng số và cấu hình
│   │   └── colors.ts             # Bảng màu của app
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useBootstrap.ts       # Hook khởi tạo app (call API master)
│   │   └── useTheme.ts           # Hook quản lý theme
│   │
│   ├── store/                    # Zustand stores - State management
│   │   ├── cityStore.ts          # Store quản lý dữ liệu thành phố
│   │   ├── classifiedStore.ts    # Store quản lý tin đăng
│   │   ├── indexStore.ts         # Store chung/bootstrap state
│   │   ├── orgStore.ts           # Store quản lý doanh nghiệp
│   │   └── pageMetaStore.ts      # Store quản lý page metadata
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── city.ts               # Types cho thành phố
│   │   ├── classified.ts         # Types cho tin đăng
│   │   ├── index.ts              # Export types
│   │   ├── org.ts                # Types cho doanh nghiệp
│   │   └── pageMeta.ts           # Types cho page metadata
│   │
│   ├── utils/                    # Utility functions
│   │   ├── mappingType.ts        # Functions mapping dữ liệu
│   │   └── storage.ts            # AsyncStorage helpers
│   │
│   └── assets/                   # Tài nguyên tĩnh (hình ảnh, fonts)
│       ├── fonts/                # Custom fonts
│       └── images/               # Hình ảnh (banner, icons, sprites)
│
├── .env                          # Biến môi trường
├── .gitignore                    # Git ignore rules
├── app.json                      # Cấu hình Expo app
├── babel.config.js               # Cấu hình Babel (NativeWind preset)
├── expo-env.d.ts                 # Expo type definitions
├── global.css                    # Global CSS styles (Tailwind directives)
├── metro.config.js               # Cấu hình Metro bundler (NativeWind)
├── nativewind-env.d.ts           # NativeWind type definitions
├── package.json                  # Dependencies và scripts
├── tailwind.config.js            # Cấu hình Tailwind CSS (quét src/**)
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

khởi động lại Metro bundler và clear cache
```bash
npx expo start --clear
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
- Các file trong `src/app/` tự động tạo thành routes
- `_layout.tsx` định nghĩa layout cho group
- `(folder)` là route groups (không ảnh hưởng URL)
- `+not-found.tsx` là 404 page
- Root layout (`src/app/_layout.tsx`) wrap app với `SafeAreaProvider`

### State Management Pattern

Sử dụng Zustand với pattern:
- Mỗi domain có store riêng (cityStore, orgStore, classifiedStore)
- Store chứa state + actions
- Tách biệt business logic khỏi UI components
- Bootstrap store quản lý trạng thái khởi tạo app

### API Layer

- **Services**: Các function gọi API (trong `src/api/services/`)
- **Axios Client**: Centralized HTTP client với interceptors
- **Types**: Type-safe với TypeScript definitions
- **Config**: API constants và base URLs

### Component Structure

- **Common components**: Dùng chung cho toàn app (`src/components/common/`)
- **Feature components**: Nhóm theo tính năng (`src/components/home/`, etc.)
- **Atomic design**: Cards, Sections, Lists
- Sử dụng NativeWind (Tailwind) cho styling với `className`

## 🌐 API Endpoints

Dự án kết nối với 2 API servers:
- **Primary API**: https://sandbox-api.muaban.net
- **Secondary API**: https://vieclam.net

## 🐛 Troubleshooting

### CSS không hoạt động / Styles không áp dụng

Nếu Tailwind CSS không hoạt động, kiểm tra:
1. File `tailwind.config.js` phải quét đúng thư mục `./src/**/*.{js,jsx,ts,tsx}`
2. Restart Metro bundler với cache clear: `npx expo start --clear`
3. Kiểm tra file `babel.config.js` có preset `nativewind/babel`
4. Kiểm tra file `metro.config.js` đã wrap với `withNativeWind`

### Lỗi "Couldn't find a navigation context"

Đây là lỗi phổ biến khi:
1. Sử dụng `SafeAreaProvider` sai vị trí (phải wrap ở root layout, không wrap trong screen)
2. Import hooks từ `@react-navigation/native` thay vì `expo-router`
3. Giải pháp: Đảm bảo `SafeAreaProvider` chỉ nằm trong `src/app/_layout.tsx`

### App không load hoặc màn hình trắng

1. Check console log để xem lỗi chi tiết
2. Đảm bảo fonts đã load xong trong `_layout.tsx`
3. Kiểm tra API endpoints trong file `.env` có đúng không
4. Clear cache: `npx expo start --clear`

## 🤝 Development Workflow

1. Tạo type definitions trong `src/types/`
2. Tạo các url endpoint trong `src/api/config/apiConstants.ts`
3. Tạo API service trong `src/api/services/`
4. Tạo Zustand store trong `src/store/`
5. Tạo UI components trong `src/components/`
6. Tạo screen/route trong `src/app/`

## 📌 Important Notes

- **Cấu trúc thư mục**: Toàn bộ source code nằm trong thư mục `src/`, giúp tổ chức code rõ ràng và dễ maintain
- **Tailwind config**: File `tailwind.config.js` đã được cấu hình để quét `./src/**/*.{js,jsx,ts,tsx}` thay vì root folders
- **Path aliases**: Sử dụng `@/` để import từ `src/` (ví dụ: `import { Header } from '@/components/common/Header'`)
- **SafeAreaProvider**: Đã được wrap ở root layout (`src/app/_layout.tsx`), không cần wrap lại trong các screen con
- **NativeWind**: Sử dụng `className` prop với Tailwind CSS syntax, đã config trong `babel.config.js` và `metro.config.js`


Được phát triển với ❤️ bởi team VLNV6 - Nam ^^
