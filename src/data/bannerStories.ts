/**
 * BANNER STORIES — 3 truyện hiển thị trên Hero Banner trang chủ.
 *
 * Chỉnh sửa tại đây (hoặc qua admin panel sau này):
 *   - cover  : URL ảnh bìa (khuyến nghị tỉ lệ 16:9, tối thiểu 1280×720)
 *   - title  : Tên truyện
 *   - description : Mô tả ngắn (2-3 dòng)
 *   - tags   : Thể loại (hiển thị tối đa 3 tag đầu)
 *   - rating : Điểm đánh giá (1.0 – 5.0)
 *   - slug   : Đường dẫn truyện (khớp với route /story/[slug])
 */

export interface BannerStory {
  id: string;
  slug: string;
  title: string;
  /** URL ảnh bìa — nên dùng ảnh landscape 16:9, ít nhất 1280×720 */
  cover: string;
  description: string;
  tags: string[];
  rating: number;
}

export const BANNER_STORIES: BannerStory[] = [
  {
    id: 'than-dao-dan-ton',
    slug: 'than-dao-dan-ton',
    title: 'Thần Đạo Đan Tôn',
    // Thay bằng ảnh thật: đặt file vào public/images/banner/than-dao-dan-ton.webp
    cover: '/images/banner/slider-1.webp',
    description:
      'Diệp Thần, một thiên tài luyện đan đệ nhất thiên hạ, bị hãm hại chết đi, linh hồn đầu thai vào một thiếu niên bị cả gia tộc ruồng bỏ. Từ đó, hắn bước trên con đường thần đạo, luyện đan vô song, trở thành đan tôn thiên hạ đệ nhất!',
    tags: ['Tu tiên', 'Luyện đan', 'Huyền huyễn'],
    rating: 4.8,
  },
  {
    id: 'dau-pha-thuong-khung',
    slug: 'dau-pha-thuong-khung',
    title: 'Đấu Phá Thương Khung',
    // Thay bằng ảnh thật: đặt file vào public/images/banner/dau-pha-thuong-khung.webp
    cover: '/images/banner/slider-2.webp',
    description:
      'Tài năng thiên phú từ nhỏ, Tiêu Viêm từng là thần đồng đất Ô Thán. Nhưng ba năm sau, hắn trở thành phế vật khi hôn ước bị hủy. Với chí khí kiên cường, Tiêu Viêm quyết tâm lấy lại tất cả những gì đã mất, trở thành đấu đế vô song!',
    tags: ['Đấu khí', 'Võ thuật', 'Huyền huyễn'],
    rating: 4.9,
  },
  {
    id: 'vo-thuong-than-de',
    slug: 'vo-thuong-than-de',
    title: 'Vô Thượng Thần Đế',
    // Thay bằng ảnh thật: đặt file vào public/images/banner/vo-thuong-than-de.webp
    cover: '/images/banner/slider-3.webp',
    description:
      'Trần Phong, một phàm nhân bình thường, tình cờ nhặt được một mảnh ngọc cổ xưa mang trong mình bí ẩn của vũ trụ. Từ đây, hắn bước vào con đường tu tiên, đối mặt với vô số hiểm nguy, luyện thân như thần, trở thành vô thượng thần đế thiên địa!',
    tags: ['Tu tiên', 'Thần đạo', 'Sử thi'],
    rating: 4.7,
  },
];
