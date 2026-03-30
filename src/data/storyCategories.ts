import { StoryCategory } from '@/lib/types';

export const STORY_CATEGORIES: StoryCategory[] = [
  { id: 'tu-tien',     order: 1, name: 'Tu Tiên',     url: '/the-loai/tu-tien',     count: 18_420 },
  { id: 'dau-khi',     order: 2, name: 'Đấu Khí',     url: '/the-loai/dau-khi',     count: 12_305 },
  { id: 'than-dao',    order: 3, name: 'Thần Đạo',    url: '/the-loai/than-dao',    count:  9_870 },
  { id: 'huyen-huyen', order: 4, name: 'Huyền Huyễn', url: '/the-loai/huyen-huyen', count: 22_140 },
  { id: 'vo-thuat',    order: 5, name: 'Võ Thuật',    url: '/the-loai/vo-thuat',    count: 11_600 },
  { id: 'kiem-hiep',   order: 6, name: 'Kiếm Hiệp',   url: '/the-loai/kiem-hiep',   count:  8_930 },
  { id: 'ngon-tinh',   order: 7, name: 'Ngôn Tình',   url: '/the-loai/ngon-tinh',   count: 20_245 },
  { id: 'do-thi',      order: 8, name: 'Đô Thị',      url: '/the-loai/do-thi',      count: 14_710 },
];

export function getStoryCategoryById(id: string) {
  return STORY_CATEGORIES.find((category) => category.id === id);
}
