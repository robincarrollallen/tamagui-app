const categoryGameNames = ['ONE_API_HOT', 'ELECTRONIC', 'CHESS', 'FISHING', 'VIDEO', 'SPORTS', 'LOTTERY'] as const
const categoryPlatformNames = ['ONE_API_HOT', 'ELECTRONIC', 'CHESS', 'FISHING', 'VIDEO', 'SPORTS', 'LOTTERY'] as const
const rankAvatarBorderNames = [1, 2, 3] as const;

/** 精灵图配置 */
export const SPRITES = {
  category_game_25: {
    source: require('../src/sprite/game-category-25.png').default?.src || require('../src/sprite/game-category-25.png'),
    rows: 1,
    names: categoryGameNames,
  },
  category_platform_25: {
    source: require('../src/sprite/game-category-25.png').default?.src || require('../src/sprite/game-category-25.png'),
    rows: 1,
    names: categoryPlatformNames,
  },
  rank_avatar_border_25: {
    source: require('../src/sprite/rank-avatar-border-25.png').default?.src || require('../src/sprite/rank-avatar-border-25.png'),
    rows: 1,
    names: rankAvatarBorderNames,
  },
} as const;

/** 精灵图名称映射 */
export const SPRITE_NAME = Object.fromEntries(
  Object.keys(SPRITES).map(key => [
    key.toUpperCase(),
    key
  ])
) as Record<Uppercase<keyof typeof SPRITES>, keyof typeof SPRITES>;

/** 分类游戏名称映射 */
export const GAME_CATEGORY_NAME = Object.fromEntries(
  categoryGameNames.map(name => [name, name])
) as Record<typeof categoryGameNames[number], typeof categoryGameNames[number]>

/** 排名头像边框名称映射 */
export const RANK_AVATAR_BORDER_NAME = Object.fromEntries(
  rankAvatarBorderNames.map(name => [name, name])
) as Record<typeof rankAvatarBorderNames[number], typeof rankAvatarBorderNames[number]>