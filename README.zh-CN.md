# Tamagui Next.js + Expo 跨平台应用  [English](README.md)

#### 演示项目: https://robincarrollallen.github.io/tamagui-app

## 技术栈概述

本项目是一个基于 **Tamagui + Next.js 14 + Expo 53** 的现代化跨平台应用框架，支持 Web (SSR/CSR)、iOS 和 Android 原生开发。项目采用 Monorepo (Turborepo) 架构设计，具备完整的多语言、多主题、状态管理和数据持久化能力，适用于游戏平台、社交应用、金融等移动应用场景。

### 包管理工具

- 推荐使用 `yarn` (v4.5.0) 包管理器进行依赖管理和脚本执行
- 可选其他主流包管理器 (`npm`, `pnpm`, `bun`)

### 核心特性

- 🚀 **真正的跨平台**: Web + iOS + Android 统一开发，代码共享率高
- 🎨 **动态主题系统**: 支持 20+ 预定义主题，亮色/暗色模式切换
- 🌍 **国际化支持**: 7 种语言开箱即用，基于 react-i18next
- 💾 **完善的持久化**: Zustand + localStorage/sessionStorage 多层存储
- 📱 **移动端优化**: 原生级性能，Expo 生态支持
- 🔐 **类型安全**: 全面的 TypeScript 支持
- ⚡ **高性能**: SSR/CSR 可选，Tamagui 优化的组件渲染
- 🏗️ **Monorepo 架构**: Turborepo 管理，代码复用性强
- 🧪 **测试覆盖**: Vitest 单元测试框架

### 核心框架

| 技术 | 版本 | 用途 |
|------|------|------|
| **Tamagui** | ^1.130.8 | 通用 UI 组件库，跨平台设计系统 |
| **Next.js** | ^14.2.14 | Web 应用框架，支持 SSR/SSG |
| **Expo** | ^53.0.8 | React Native 框架，iOS/Android 开发 |
| **React** | ^19.0.0 | 响应式 UI 开发 |
| **React Native** | ^0.79.2 | 原生移动端开发 |
| **Solito** | ^4.2.2 | 跨平台路由/导航抽象层 |
| **Zustand** | ^5.0.8 | 轻量级状态管理 |

### UI 组件库

| 技术 | 版本 | 用途 |
|------|------|------|
| **Tamagui** | ^1.130.8 | 跨平台组件库 (Button, Input, Stack 等) |
| **@tamagui/lucide-icons** | ^1.130.8 | 图标库 |
| **@tamagui/themes** | ^1.130.8 | 主题系统 |
| **@tamagui/animations-react-native** | ^1.130.8 | 动画库 |
| **React Native Web** | ^0.20.0 | React Native 组件 Web 适配 |

### 工具库

| 技术 | 版本 | 用途 |
|------|------|------|
| **react-i18next** | ^15.6.0 | 国际化 |
| **i18next** | ^24.4.0 | i18n 核心库 |
| **dayjs** | ^1.11.18 | 日期时间处理 |
| **burnt** | ^0.12.2 | 原生 Toast 通知 |

### Expo 原生模块

| 模块 | 用途 |
|------|------|
| **expo-router** | 基于文件系统的路由 |
| **@react-navigation/native** | 原生导航 |
| **expo-clipboard** | 剪贴板 API |
| **expo-constants** | 设备常量 |
| **expo-image** | 高性能图片组件 |
| **expo-linear-gradient** | 渐变组件 |
| **expo-blur** | 模糊效果 |
| **expo-splash-screen** | 启动屏幕 |
| **expo-font** | 字体加载 |

### 开发工具

| 技术 | 版本 | 用途 |
|------|------|------|
| **TypeScript** | ^5.8.3 | 类型系统 |
| **Biome** | ^1.9.3 | 代码检查和格式化 |
| **Prettier** | ^3.3.3 | 代码格式化 |
| **Vitest** | ^2.1.1 | 单元测试 |
| **Turborepo** | ^1.13.4 | Monorepo 任务编排 |
| **Husky** | ^9.1.6 | Git Hooks |

### 其他技术与工具

- **Solito**: 跨平台导航抽象层，统一 Next.js 和 Expo Router
- **Expo Application Services (EAS)**: 云端构建和部署
- **GitHub Actions**: CI/CD 自动化部署
- **Vercel**: Web 应用托管（可选）

## 目录结构与用途

```
tamagui-next-expo/
├── apps/                           # 应用入口
│   ├── next/                       # Web 应用 (Next.js)
│   │   ├── app/                    # App Router 结构
│   │   │   ├── (tabbar)/           # 主界面 Tabbar 分组
│   │   │   │   ├── home/           # 首页
│   │   │   │   ├── deposit/        # 充值页
│   │   │   │   ├── activity/       # 活动页
│   │   │   │   └── profile/        # 个人资料
│   │   │   ├── game/               # 游戏相关
│   │   │   │   ├── category/       # 游戏分类
│   │   │   │   └── search/         # 游戏搜索
│   │   │   ├── activity/invite/    # 邀请页面
│   │   │   └── withdraw/           # 提现页面
│   │   ├── next.config.js          # Next.js 配置
│   │   ├── vercel.json             # Vercel 部署配置
│   │   └── package.json
│   │
│   └── expo/                       # 原生移动应用 (Expo)
│       ├── app/                    # Expo Router 文件路由
│       │   ├── (tabbar)/           # Tabbar 导航分组
│       │   ├── game/               # 游戏屏幕
│       │   └── activity/           # 活动屏幕
│       ├── eas.json                # EAS 构建配置
│       ├── app.json                # Expo 配置
│       └── package.json
│
├── packages/                       # 共享包
│   ├── app/                        # 核心业务逻辑（跨平台共享）
│   │   ├── features/               # 功能模块化组织
│   │   │   ├── home/              # 首页功能
│   │   │   ├── game/              # 游戏功能
│   │   │   ├── login/             # 登录认证
│   │   │   ├── activity/          # 活动功能
│   │   │   ├── deposit/           # 充值功能
│   │   │   ├── profile/           # 个人资料
│   │   │   ├── tabbar/            # Tabbar 组件
│   │   │   └── transaction/       # 交易记录
│   │   ├── widgets/               # 可复用业务组件
│   │   │   ├── GameCard/          # 游戏卡片
│   │   │   ├── GameWrapper/       # 游戏包装器
│   │   │   ├── VerticalInfiniteScroll/ # 无限滚动列表
│   │   │   ├── List/              # 列表组件
│   │   │   ├── VipWrapper/        # VIP 功能包装器
│   │   │   └── Sidebar/           # 侧边栏
│   │   ├── store/                 # 状态管理 (Zustand)
│   │   │   ├── modules/           # Store 模块
│   │   │   │   ├── app.ts         # 应用全局状态
│   │   │   │   ├── user.ts        # 用户状态
│   │   │   │   ├── game.ts        # 游戏状态
│   │   │   │   ├── theme.ts       # 主题状态
│   │   │   │   ├── activity.ts    # 活动状态
│   │   │   │   ├── language.ts    # 语言状态
│   │   │   │   ├── style.ts       # 样式状态
│   │   │   │   ├── vip.ts         # VIP 状态
│   │   │   │   ├── responsive.ts  # 响应式状态
│   │   │   │   ├── platform.ts    # 平台检测
│   │   │   │   └── router.ts      # 路由状态
│   │   │   └── middleware/        # 持久化中间件
│   │   ├── provider/              # React Context Providers
│   │   │   ├── LoadingProvider.tsx
│   │   │   ├── StoreProvider.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── NextTamaguiProvider.tsx
│   │   ├── hooks/                 # 自定义 React Hooks
│   │   │   ├── input.ts
│   │   │   ├── message.ts
│   │   │   ├── router.ts
│   │   │   └── theme.ts
│   │   ├── data/                  # 模拟/静态数据 (JSON)
│   │   │   ├── gameList.json
│   │   │   ├── homeList.json
│   │   │   ├── userInfo.json
│   │   │   └── vipInfo.json
│   │   ├── enums/                 # 枚举定义
│   │   ├── types/                 # TypeScript 类型定义
│   │   ├── utils/                 # 工具函数
│   │   └── i18n/                  # 国际化配置
│   │       ├── index.ts           # i18n 初始化
│   │       └── locales/           # 语言文件
│   │
│   ├── ui/                        # 自定义 UI 组件库 (@my/ui)
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
│   │       ├── Svg/               # SVG 组件
│   │       └── index.tsx
│   │
│   ├── config/                    # Tamagui 配置 (@my/config)
│   │   └── src/
│   │       ├── tamagui.config.ts  # Tamagui 主配置
│   │       ├── themes/            # 主题定义
│   │       │   ├── variables/     # 主题变量
│   │       │   │   └── style_25.ts # 自定义主题
│   │       │   └── index.ts
│   │       ├── animations.ts      # 动画配置
│   │       └── fonts.ts           # 字体配置
│   │
│   └── assets/                    # 静态资源 (@my/assets)
│       └── src/
│
├── .github/
│   └── workflows/
│       └── nextjs.yml             # GitHub Actions CI/CD
│
├── 配置文件
│   ├── package.json               # 根工作区配置
│   ├── tsconfig.json              # TypeScript 根配置
│   ├── tsconfig.base.json         # TypeScript 基础配置
│   ├── turbo.json                 # Turborepo 配置
│   ├── biome.json                 # Biome 配置
│   ├── vitest.config.mts          # Vitest 测试配置
│   ├── .yarnrc.yml                # Yarn v4 配置
│   └── .prettierrc                # Prettier 格式化配置
```

## 多语言实现

### 技术方案

采用 **react-i18next + i18next** 的标准组合：

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
      // ... 其他语言
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React 已转义
    },
  })
```

### 支持的语言

| 语言代码 | 语言名称 |
|---------|---------|
| en | English |
| zh | 中文 |
| pt | Português |
| id | Bahasa Indonesia |
| hi | हिंदी |
| vi | Tiếng Việt |
| ph | English (Philippines) |

### 语言切换机制

#### 状态管理

语言状态由 [packages/app/store/modules/language.ts](packages/app/store/modules/language.ts) 管理：

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

### 使用示例

#### 在组件中使用

```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t, i18n } = useTranslation()

  return (
    <View>
      <Text>{t('label.deposit')}</Text>
      <Button onPress={() => i18n.changeLanguage('zh')}>
        切换中文
      </Button>
    </View>
  )
}
```

## 主题配置

### 主题管理器

主题系统由 Tamagui 配置管理 [packages/config/src/tamagui.config.ts](packages/config/src/tamagui.config.ts)。

### 支持的主题

项目支持 **20+ 预定义主题**，包括：

- `light` - 亮色主题
- `dark` - 暗色主题
- `style_1` - 自定义主题 1
- `style_25` - 自定义主题 25（默认）
- ... 更多主题变体

### 主题变量系统

每个主题都有独立的变量定义：

```typescript
// packages/config/src/themes/variables/style_25.ts
export const style_25 = {
  // 颜色系统
  primary: '#ff6b00',
  secondary: '#4caf50',
  background: '#ffffff',

  // 间距系统
  space: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  // 字体系统
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
}
```

### 主题切换流程

```
1. 用户选择主题
   ↓
2. useThemeStore.setTheme(theme)
   ↓
3. Tamagui 自动应用主题
   ↓
4. 持久化到 localStorage
```

### 使用示例

#### 在组件中使用主题

```tsx
import { YStack, Button, useTheme } from 'tamagui'

function MyComponent() {
  const theme = useTheme()

  return (
    <YStack bg="$background" p="$4">
      <Button bg="$primary" color="$color">
        点击我
      </Button>
    </YStack>
  )
}
```

## 状态管理与持久化

### Zustand Store 架构

项目采用模块化的 Zustand Store 设计：

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

### Store 模块列表

| Store 模块 | 用途 |
|-----------|-----|
| **app.ts** | 应用全局状态（加载状态等） |
| **user.ts** | 用户信息、认证状态 |
| **game.ts** | 游戏列表、游戏状态 |
| **theme.ts** | 主题配置 |
| **language.ts** | 语言设置 |
| **activity.ts** | 活动数据 |
| **vip.ts** | VIP 相关状态 |
| **responsive.ts** | 响应式布局状态 |
| **platform.ts** | 平台检测 |
| **router.ts** | 路由状态 |

### 持久化机制

**localStorage 存储**:
- 使用 `zustand/middleware` 的 `persist` 中间件
- 自动序列化/反序列化
- 支持选择性持久化

**使用示例**:

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
        token: state.token // 只持久化 token
      }),
    }
  )
)
```

## 跨平台导航

### Solito 路由抽象

Solito 提供统一的路由 API：

```tsx
import { Link } from 'solito/link'
import { useRouter } from 'solito/router'

function MyComponent() {
  const router = useRouter()

  return (
    <>
      {/* 声明式导航 */}
      <Link href="/game/search">
        <Text>搜索游戏</Text>
      </Link>

      {/* 命令式导航 */}
      <Button onPress={() => router.push('/profile')}>
        个人资料
      </Button>
    </>
  )
}
```

### 路由配置

**Next.js (Web)**:
- 基于 App Router 的文件系统路由
- 位置: `apps/next/app/`

**Expo (Native)**:
- 基于 Expo Router 的文件系统路由
- 位置: `apps/expo/app/`

## 启动与构建

### 安装依赖

```bash
# 推荐使用 yarn v4
yarn install

# 或使用其他包管理器
npm install
pnpm install
bun install
```

### 开发模式

#### Web 开发

```bash
# 启动 Next.js 开发服务器 (with Tamagui extraction)
yarn web

# SSR 模式
yarn web:ssr

# CSR 模式
yarn web:csr
```

开发服务器启动在 `http://localhost:3000`

#### 原生开发

```bash
# 启动 Expo 开发服务器
yarn native

# iOS 模拟器
yarn ios

# Android 模拟器
yarn android

# 预构建原生依赖
yarn native:prebuild
```

**要求**:
- **iOS**: macOS + Xcode
- **Android**: Android Studio + Android SDK

### 生产构建

```bash
# Web 构建 (SSR)
yarn web:prod

# Web 构建 (CSR)
yarn web:prod:csr

# 构建所有包
yarn build

# Serve 生产构建
yarn web:serve
```

构建输出位于 `apps/next/.next/` 或 `apps/next/out/` (静态导出)。

### 原生应用构建

使用 EAS Build:

```bash
# 开发构建
eas build --profile development

# 生产构建
eas build --profile production
```

配置位于 [apps/expo/eas.json](apps/expo/eas.json)。

### 代码检查

```bash
# 检查代码
yarn lint

# 运行测试
yarn test

# 监听模式测试
yarn test:watch
```

## 部署

### Web 部署

#### GitHub Pages

项目配置了自动化部署到 GitHub Pages：

1. 推送到 `release` 分支
2. GitHub Actions 自动触发
3. 构建静态站点 (CSR 模式)
4. 部署到 GitHub Pages

配置文件: [.github/workflows/nextjs.yml](.github/workflows/nextjs.yml)

#### Vercel 部署

1. 导入项目到 Vercel
2. 设置根目录: `apps/next`
3. 选择 Next.js 框架
4. 自动部署

配置文件: [apps/next/vercel.json](apps/next/vercel.json)

### 原生应用部署

使用 EAS Submit:

```bash
# 提交到 App Store
eas submit --platform ios

# 提交到 Google Play
eas submit --platform android
```

## 项目统计

- **应用数量**: 2 个 (Next.js Web + Expo Native)
- **共享包**: 4 个 (app, ui, config, assets)
- **功能模块**: 8+ 个 features
- **业务组件**: 6+ 个 widgets
- **UI 组件**: 15+ 个自定义组件
- **状态管理**: 10+ 个 Zustand stores
- **国际化语言**: 7 种语言
- **支持主题**: 20+ 主题
- **原生平台**: iOS + Android + Web

## 技术亮点

### 1. 代码共享率高

- 业务逻辑层 100% 共享 (`packages/app`)
- UI 组件 90%+ 共享 (Tamagui)
- 平台特定代码 < 10%

### 2. 性能优化

- Tamagui 编译时优化
- Next.js SSR/CSR 可选
- React Native 原生性能
- 懒加载和代码分割

### 3. 开发体验

- TypeScript 全栈类型安全
- Monorepo 依赖管理
- 热重载 (HMR)
- Biome 快速 Lint

### 4. 可扩展性

- 模块化架构
- 可插拔的 Store 模块
- 主题可扩展
- 多语言可扩展

## 许可证

MIT

---

**最后更新**: 2025-12-16
