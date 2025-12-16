# Tamagui Next.js + Expo Cross-Platform App  [中文](README.zh-CN.md)

#### Demo Project: https://robincarrollallen.github.io/tamagui-app

## Technology Stack Overview

This project is a modern cross-platform application framework based on **Tamagui + Next.js 14 + Expo 53**, supporting Web (SSR/CSR), iOS, and Android native development. The project adopts a Monorepo (Turborepo) architecture with comprehensive multi-language, multi-theme, state management, and data persistence capabilities, suitable for gaming platforms, social applications, finance, and other mobile application scenarios.

### Package Manager

- Recommended: `yarn` (v4.5.0) for dependency management and script execution
- Alternative: Other mainstream package managers (`npm`, `pnpm`, `bun`)

### Core Features

- 🚀 **True Cross-Platform**: Unified development for Web + iOS + Android with high code sharing
- 🎨 **Dynamic Theme System**: 20+ predefined themes with light/dark mode switching
- 🌍 **Internationalization**: 7 languages out of the box, based on react-i18next
- 💾 **Complete Persistence**: Zustand + localStorage/sessionStorage multi-layer storage
- 📱 **Mobile Optimized**: Native-level performance with Expo ecosystem support
- 🔐 **Type Safety**: Full TypeScript support
- ⚡ **High Performance**: SSR/CSR options, Tamagui-optimized component rendering
- 🏗️ **Monorepo Architecture**: Turborepo management with strong code reusability
- 🧪 **Test Coverage**: Vitest unit testing framework

### Core Frameworks

| Technology | Version | Purpose |
|------|------|------|
| **Tamagui** | ^1.130.8 | Universal UI component library, cross-platform design system |
| **Next.js** | ^14.2.14 | Web application framework with SSR/SSG support |
| **Expo** | ^53.0.8 | React Native framework for iOS/Android development |
| **React** | ^19.0.0 | Reactive UI development |
| **React Native** | ^0.79.2 | Native mobile development |
| **Solito** | ^4.2.2 | Cross-platform routing/navigation abstraction |
| **Zustand** | ^5.0.8 | Lightweight state management |

### UI Component Library

| Technology | Version | Purpose |
|------|------|------|
| **Tamagui** | ^1.130.8 | Cross-platform components (Button, Input, Stack, etc.) |
| **@tamagui/lucide-icons** | ^1.130.8 | Icon library |
| **@tamagui/themes** | ^1.130.8 | Theme system |
| **@tamagui/animations-react-native** | ^1.130.8 | Animation library |
| **React Native Web** | ^0.20.0 | React Native components for web |

### Utility Libraries

| Technology | Version | Purpose |
|------|------|------|
| **react-i18next** | ^15.6.0 | Internationalization |
| **i18next** | ^24.4.0 | i18n core library |
| **dayjs** | ^1.11.18 | Date/time utilities |
| **burnt** | ^0.12.2 | Native toast notifications |

### Expo Native Modules

| Module | Purpose |
|------|------|
| **expo-router** | File-based routing |
| **@react-navigation/native** | Native navigation |
| **expo-clipboard** | Clipboard API |
| **expo-constants** | Device constants |
| **expo-image** | High-performance image component |
| **expo-linear-gradient** | Gradient component |
| **expo-blur** | Blur effects |
| **expo-splash-screen** | Splash screen |
| **expo-font** | Font loading |

### Development Tools

| Technology | Version | Purpose |
|------|------|------|
| **TypeScript** | ^5.8.3 | Type system |
| **Biome** | ^1.9.3 | Code linting and formatting |
| **Prettier** | ^3.3.3 | Code formatting |
| **Vitest** | ^2.1.1 | Unit testing |
| **Turborepo** | ^1.13.4 | Monorepo task orchestration |
| **Husky** | ^9.1.6 | Git hooks |

### Other Technologies & Tools

- **Solito**: Cross-platform navigation abstraction, unifying Next.js and Expo Router
- **Expo Application Services (EAS)**: Cloud build and deployment
- **GitHub Actions**: CI/CD automation
- **Vercel**: Web application hosting (optional)

## Directory Structure

```
tamagui-next-expo/
├── apps/                           # Application entry points
│   ├── next/                       # Web application (Next.js)
│   │   ├── app/                    # App Router structure
│   │   │   ├── (tabbar)/           # Main tabbed interface group
│   │   │   │   ├── home/           # Home screen
│   │   │   │   ├── deposit/        # Deposit/Payment screen
│   │   │   │   ├── activity/       # Activity screen
│   │   │   │   └── profile/        # User profile
│   │   │   ├── game/               # Game-related pages
│   │   │   │   ├── category/       # Game categories
│   │   │   │   └── search/         # Game search
│   │   │   ├── activity/invite/    # Invite page
│   │   │   └── withdraw/           # Withdrawal pages
│   │   ├── next.config.js          # Next.js configuration
│   │   ├── vercel.json             # Vercel deployment config
│   │   └── package.json
│   │
│   └── expo/                       # Native mobile app (Expo)
│       ├── app/                    # Expo Router file-based routing
│       │   ├── (tabbar)/           # Tabbar navigation group
│       │   ├── game/               # Game screens
│       │   └── activity/           # Activity screens
│       ├── eas.json                # EAS Build configuration
│       ├── app.json                # Expo configuration
│       └── package.json
│
├── packages/                       # Shared packages
│   ├── app/                        # Core business logic (cross-platform shared)
│   │   ├── features/               # Feature-organized modules
│   │   │   ├── home/              # Home feature
│   │   │   ├── game/              # Game feature
│   │   │   ├── login/             # Authentication
│   │   │   ├── activity/          # Activity/Events
│   │   │   ├── deposit/           # Payment deposits
│   │   │   ├── profile/           # User profile
│   │   │   ├── tabbar/            # Tab navigation component
│   │   │   └── transaction/       # Transaction history
│   │   ├── widgets/               # Reusable business widgets
│   │   │   ├── GameCard/          # Game card display
│   │   │   ├── GameWrapper/       # Game wrapper component
│   │   │   ├── VerticalInfiniteScroll/ # Infinite scroll list
│   │   │   ├── List/              # List component
│   │   │   ├── VipWrapper/        # VIP features wrapper
│   │   │   └── Sidebar/           # Sidebar navigation
│   │   ├── store/                 # State management (Zustand)
│   │   │   ├── modules/           # Store modules
│   │   │   │   ├── app.ts         # App-wide state
│   │   │   │   ├── user.ts        # User state
│   │   │   │   ├── game.ts        # Game state
│   │   │   │   ├── theme.ts       # Theme state
│   │   │   │   ├── activity.ts    # Activity state
│   │   │   │   ├── language.ts    # Language state
│   │   │   │   ├── style.ts       # Style state
│   │   │   │   ├── vip.ts         # VIP state
│   │   │   │   ├── responsive.ts  # Responsive design state
│   │   │   │   ├── platform.ts    # Platform detection
│   │   │   │   └── router.ts      # Router state
│   │   │   └── middleware/        # Persist middleware
│   │   ├── provider/              # React Context Providers
│   │   │   ├── LoadingProvider.tsx
│   │   │   ├── StoreProvider.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── NextTamaguiProvider.tsx
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── input.ts
│   │   │   ├── message.ts
│   │   │   ├── router.ts
│   │   │   └── theme.ts
│   │   ├── data/                  # Mock/Static data (JSON)
│   │   │   ├── gameList.json
│   │   │   ├── homeList.json
│   │   │   ├── userInfo.json
│   │   │   └── vipInfo.json
│   │   ├── enums/                 # TypeScript enums
│   │   ├── types/                 # Type definitions
│   │   ├── utils/                 # Utility functions
│   │   └── i18n/                  # Internationalization
│   │       ├── index.ts           # i18n initialization
│   │       └── locales/           # Language files
│   │
│   ├── ui/                        # Custom UI component library (@my/ui)
│   │   └── src/
│   │       ├── MyComponent.tsx
│   │       ├── Field.tsx
│   │       ├── ShimmerButton.tsx
│   │       ├── RippleButton.tsx
│   │       ├── SearchBar/
│   │       ├── ProgressBar/
│   │       ├── PasswordInput.tsx
│   │       ├── Picker.tsx
│   │       ├── Segment.tsx
│   │       ├── Icon.tsx
│   │       ├── LazyImage.tsx
│   │       ├── CustomToast.tsx
│   │       ├── Svg/               # SVG components
│   │       └── index.tsx
│   │
│   ├── config/                    # Tamagui configuration (@my/config)
│   │   └── src/
│   │       ├── tamagui.config.ts  # Main Tamagui config
│   │       ├── themes/            # Theme definitions
│   │       │   ├── variables/     # Theme variables
│   │       │   │   └── style_25.ts # Custom theme variant
│   │       │   └── index.ts
│   │       ├── animations.ts      # Animation configurations
│   │       └── fonts.ts           # Font configurations
│   │
│   └── assets/                    # Static assets (@my/assets)
│       └── src/
│
├── .github/
│   └── workflows/
│       └── nextjs.yml             # GitHub Actions CI/CD
│
├── Configuration Files
│   ├── package.json               # Root workspace config
│   ├── tsconfig.json              # TypeScript root config
│   ├── tsconfig.base.json         # Base TypeScript config
│   ├── turbo.json                 # Turborepo configuration
│   ├── biome.json                 # Biome linter config
│   ├── vitest.config.mts          # Testing config
│   ├── .yarnrc.yml                # Yarn v4 configuration
│   └── .prettierrc                # Prettier formatting
```

## Internationalization

### Technical Solution

Uses the standard **react-i18next + i18next** combination:

```typescript
// packages/app/i18n/index.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      zh: { translation: zhTranslation },
      // ... other languages
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
  })
```

### Supported Languages

| Language Code | Language Name |
|---------|---------|
| en | English |
| zh | 中文 (Chinese) |
| pt | Português (Portuguese) |
| id | Bahasa Indonesia |
| hi | हिंदी (Hindi) |
| vi | Tiếng Việt (Vietnamese) |
| ph | English (Philippines) |

### Language Switching Mechanism

#### State Management

Language state is managed by [packages/app/store/modules/language.ts](packages/app/store/modules/language.ts):

```typescript
import { create } from 'zustand'
import i18n from '@my/app/i18n'

export const useLanguageStore = create((set) => ({
  locale: 'en',
  setLocale: (locale: string) => {
    i18n.changeLanguage(locale)
    set({ locale })
  },
}))
```

### Usage Examples

#### In Components

```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t, i18n } = useTranslation()

  return (
    <View>
      <Text>{t('label.deposit')}</Text>
      <Button onPress={() => i18n.changeLanguage('zh')}>
        Switch to Chinese
      </Button>
    </View>
  )
}
```

## Theme Configuration

### Theme Manager

The theme system is managed by Tamagui configuration in [packages/config/src/tamagui.config.ts](packages/config/src/tamagui.config.ts).

### Supported Themes

The project supports **20+ predefined themes**, including:

- `light` - Light theme
- `dark` - Dark theme
- `style_1` - Custom theme 1
- `style_25` - Custom theme 25 (default)
- ... more theme variants

### Theme Variable System

Each theme has independent variable definitions:

```typescript
// packages/config/src/themes/variables/style_25.ts
export const style_25 = {
  // Color system
  primary: '#ff6b00',
  secondary: '#4caf50',
  background: '#ffffff',

  // Spacing system
  space: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  // Typography system
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
}
```

### Theme Switching Flow

```
1. User selects theme
   ↓
2. useThemeStore.setTheme(theme)
   ↓
3. Tamagui automatically applies theme
   ↓
4. Persisted to localStorage
```

### Usage Examples

#### Using Themes in Components

```tsx
import { YStack, Button, useTheme } from 'tamagui'

function MyComponent() {
  const theme = useTheme()

  return (
    <YStack bg="$background" p="$4">
      <Button bg="$primary" color="$color">
        Click Me
      </Button>
    </YStack>
  )
}
```

## State Management & Persistence

### Zustand Store Architecture

The project uses a modular Zustand Store design:

```typescript
// packages/app/store/modules/app.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set) => ({
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'app-storage', // localStorage key
    }
  )
)
```

### Store Module List

| Store Module | Purpose |
|-----------|-----|
| **app.ts** | App-wide global state (loading states, etc.) |
| **user.ts** | User information, authentication state |
| **game.ts** | Game list, game state |
| **theme.ts** | Theme configuration |
| **language.ts** | Language settings |
| **activity.ts** | Activity data |
| **vip.ts** | VIP-related state |
| **responsive.ts** | Responsive layout state |
| **platform.ts** | Platform detection |
| **router.ts** | Router state |

### Persistence Mechanism

**localStorage Storage**:
- Uses `zustand/middleware`'s `persist` middleware
- Automatic serialization/deserialization
- Supports selective persistence

**Usage Example**:

```typescript
export const useUserStore = create(
  persist(
    (set) => ({
      token: '',
      userInfo: null,
      setToken: (token) => set({ token }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        token: state.token // Only persist token
      }),
    }
  )
)
```

## Cross-Platform Navigation

### Solito Routing Abstraction

Solito provides a unified routing API:

```tsx
import { Link } from 'solito/link'
import { useRouter } from 'solito/router'

function MyComponent() {
  const router = useRouter()

  return (
    <>
      {/* Declarative navigation */}
      <Link href="/game/search">
        <Text>Search Games</Text>
      </Link>

      {/* Imperative navigation */}
      <Button onPress={() => router.push('/profile')}>
        Profile
      </Button>
    </>
  )
}
```

### Routing Configuration

**Next.js (Web)**:
- File-based routing with App Router
- Location: `apps/next/app/`

**Expo (Native)**:
- File-based routing with Expo Router
- Location: `apps/expo/app/`

## Getting Started & Build

### Install Dependencies

```bash
# Recommended: yarn v4
yarn install

# Or use other package managers
npm install
pnpm install
bun install
```

### Development Mode

#### Web Development

```bash
# Start Next.js dev server (with Tamagui extraction)
yarn web

# SSR mode
yarn web:ssr

# CSR mode
yarn web:csr
```

Development server starts at `http://localhost:3000`

#### Native Development

```bash
# Start Expo dev server
yarn native

# iOS simulator
yarn ios

# Android emulator
yarn android

# Prebuild native dependencies
yarn native:prebuild
```

**Requirements**:
- **iOS**: macOS + Xcode
- **Android**: Android Studio + Android SDK

### Production Build

```bash
# Web build (SSR)
yarn web:prod

# Web build (CSR)
yarn web:prod:csr

# Build all packages
yarn build

# Serve production build
yarn web:serve
```

Build output is in `apps/next/.next/` or `apps/next/out/` (static export).

### Native App Build

Using EAS Build:

```bash
# Development build
eas build --profile development

# Production build
eas build --profile production
```

Configuration is in [apps/expo/eas.json](apps/expo/eas.json).

### Code Quality

```bash
# Lint code
yarn lint

# Run tests
yarn test

# Watch mode testing
yarn test:watch
```

## Deployment

### Web Deployment

#### GitHub Pages

The project is configured for automated deployment to GitHub Pages:

1. Push to `release` branch
2. GitHub Actions automatically triggers
3. Build static site (CSR mode)
4. Deploy to GitHub Pages

Configuration: [.github/workflows/nextjs.yml](.github/workflows/nextjs.yml)

#### Vercel Deployment

1. Import project to Vercel
2. Set root directory: `apps/next`
3. Select Next.js framework
4. Automatic deployment

Configuration: [apps/next/vercel.json](apps/next/vercel.json)

### Native App Deployment

Using EAS Submit:

```bash
# Submit to App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android
```

## Project Statistics

- **Applications**: 2 (Next.js Web + Expo Native)
- **Shared Packages**: 4 (app, ui, config, assets)
- **Feature Modules**: 8+ features
- **Business Widgets**: 6+ widgets
- **UI Components**: 15+ custom components
- **State Management**: 10+ Zustand stores
- **Languages**: 7 languages
- **Themes**: 20+ themes
- **Native Platforms**: iOS + Android + Web

## Technical Highlights

### 1. High Code Sharing Rate

- Business logic layer 100% shared (`packages/app`)
- UI components 90%+ shared (Tamagui)
- Platform-specific code < 10%

### 2. Performance Optimization

- Tamagui compile-time optimization
- Next.js SSR/CSR options
- React Native native performance
- Lazy loading and code splitting

### 3. Developer Experience

- TypeScript full-stack type safety
- Monorepo dependency management
- Hot Module Replacement (HMR)
- Fast Biome linting

### 4. Extensibility

- Modular architecture
- Pluggable Store modules
- Extensible themes
- Extensible multi-language

## License

MIT

---

**Last Updated**: 2025-12-16
