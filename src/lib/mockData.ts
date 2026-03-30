import { Story, Chapter } from './types';

const generateChapterContent = (storyTitle: string, chapterNum: number): string => {
  const paragraphs = [
    `Trong không gian bao la của ${storyTitle}, chương ${chapterNum} mở ra với những biến cố không ngờ tới. Ánh mắt của nhân vật chính sáng lên như vì sao, phản chiếu sự quyết tâm không gì lay chuyển được.`,
    `Gió thổi qua những ngọn núi hùng vĩ, mang theo hơi thở của đất trời. Tiếng gươm kiếm chạm nhau vang vọng giữa thinh không, như bản nhạc của những kẻ anh hùng. Mỗi bước chân đều in đậm dấu ấn của số phận.`,
    `"Ngươi không thể thắng được ta!" - tiếng hét vang lên như sấm sét, nhưng trong đôi mắt của chiến binh trẻ, không có chút sợ hãi nào. Hắn bước tới, khí thế ngút trời, tay nắm chặt vũ khí của mình.`,
    `Bầu trời đột nhiên tối sầm, những đám mây đen kéo đến bao phủ cả vùng trời rộng lớn. Sức mạnh bí ẩn từ bốn phương tám hướng hội tụ lại, tạo nên một cơn lốc xoáy của năng lượng thuần túy.`,
    `Trong trái tim của mỗi người đều ẩn chứa một ngọn lửa không bao giờ tắt. Ngọn lửa đó chính là ý chí, là sự kiên trì, là niềm tin vào bản thân mình. Và hôm nay, ngọn lửa đó đang bùng cháy mạnh mẽ hơn bao giờ hết.`,
    `Sư phụ đứng trên đỉnh núi cao nhất, nhìn xuống với ánh mắt sâu thẳm. Ngài đã trải qua hàng nghìn năm tu luyện, chứng kiến biết bao thăng trầm của thiên hạ, nhưng người đệ tử này... có điều gì đó đặc biệt.`,
    `Bí kíp võ học cổ xưa hiện ra trước mắt, những dòng chữ vàng tỏa sáng huyền hoặc. Mỗi từ, mỗi chữ đều chứa đựng tinh hoa của hàng vạn năm tu tập, sức mạnh bên trong khiến không khí rung động.`,
    `Trận chiến kéo dài đến tận lúc hoàng hôn. Máu và mồ hôi hòa lẫn vào nhau, nhưng ý chí chiến đấu không hề suy giảm. Đây chính là bản chất của một người tu luyện thực sự - không bao giờ bỏ cuộc.`,
    `Ánh sáng của ngàn sao le lói trên bầu trời đêm, soi sáng con đường phía trước. Hành trình còn dài, thử thách còn nhiều, nhưng mỗi bước đi đều là một bước tiến gần hơn đến đỉnh cao vinh quang.`,
    `Cuối cùng, sau bao nhiêu gian khổ và thử thách, chân lý đã hiện ra. Không phải là sức mạnh, không phải là tài năng - mà chính là lòng kiên nhẫn và ý chí không khuất phục mới là con đường đến đích.`,
  ];
  return paragraphs.join('\n\n');
};

export const STORIES: Story[] = [
  {
    id: 'than-dao-dan-ton',
    slug: 'than-dao-dan-ton',
    categoryId: 'tu-tien',
    title: 'Thần Đạo Đan Tôn',
    cover: 'https://picsum.photos/seed/thandaodanton/300/400',
    author: 'Cô Đơn Địa Phi',
    translator: 'TruyệnNhàTee',
    status: 'ongoing',
    rating: 4.8,
    ratingCount: 156,
    views: 820_750,
    followers: 342,
    isAdult: false,
    description:
      'Diệp Thần, một thiên tài luyện đan đệ nhất thiên hạ, bị hãm hại chết đi, linh hồn đầu thai vào một thiếu niên bị cả gia tộc ruồng bỏ. Từ đó, hắn bước trên con đường thần đạo, luyện đan vô song, trở thành đan tôn thiên hạ đệ nhất!',
    tags: ['Tu tiên', 'Luyện đan', 'Huyền huyễn', 'Mạnh mẽ'],
    latestChapter: 20,
    chapters: Array.from({ length: 20 }, (_, i) => ({
      chapterNumber: i + 1,
      title: `Chương ${i + 1}: ${
        [
          'Đầu Thai Trọng Sinh',
          'Thiên Tài Luyện Đan',
          'Gia Tộc Ruồng Bỏ',
          'Bí Kíp Thần Kỳ',
          'Cảnh Giới Đột Phá',
          'Kẻ Thù Gặp Lại',
          'Đan Dược Vô Song',
          'Thi Đấu Lớn',
          'Đỉnh Cao Vinh Quang',
          'Huyền Bí Lộ Ra',
          'Sức Mạnh Thức Tỉnh',
          'Trận Chiến Sinh Tử',
          'Bí Ẩn Tiền Kiếp',
          'Đệ Nhất Đan Tôn',
          'Thiên Địa Biến Sắc',
          'Vượt Qua Giới Hạn',
          'Thần Lực Hiển Linh',
          'Đại Chiến Cuối Cùng',
          'Đỉnh Đạo Đan Tôn',
          'Kết Thúc Và Khởi Đầu',
        ][i]
      }`,
      content: generateChapterContent('Thần Đạo Đan Tôn', i + 1),
    })),
  },
  {
    id: 'dau-pha-thuong-khung',
    slug: 'dau-pha-thuong-khung',
    categoryId: 'dau-khi',
    title: 'Đấu Phá Thương Khung',
    cover: 'https://picsum.photos/seed/dauphathuongkhung/300/400',
    author: 'Thiên Tằm Thổ Đậu',
    translator: 'TruyệnNhàTee',
    status: 'completed',
    rating: 4.9,
    ratingCount: 2_340,
    views: 3_250_000,
    followers: 1_580,
    isAdult: false,
    description:
      'Tài năng thiên phú từ nhỏ, Tiêu Viêm từng là thần đồng đất Ô Thán. Nhưng ba năm sau, hắn trở thành phế vật khi hôn ước bị hủy. Với chí khí kiên cường, Tiêu Viêm quyết tâm lấy lại tất cả những gì đã mất, trở thành đấu đế vô song!',
    tags: ['Đấu khí', 'Võ thuật', 'Huyền huyễn', 'Hào hùng'],
    latestChapter: 20,
    chapters: Array.from({ length: 20 }, (_, i) => ({
      chapterNumber: i + 1,
      title: `Chương ${i + 1}: ${
        [
          'Phế Vật Hóa Thiên Tài',
          'Hôn Ước Bị Hủy',
          'Lão Yao Xuất Hiện',
          'Đấu Khí Giác Tỉnh',
          'Sơn Động Bí Bảo',
          'Đại Hội Gia Tộc',
          'Kẻ Thù Cũ Gặp Lại',
          'Học Viện Giảng Võ',
          'Đấu Thi Kinh Thiên',
          'Bí Kíp Gia Truyền',
          'Cảnh Giới Đấu Linh',
          'Trận Chiến Sinh Tử',
          'Bí Ẩn Mẫu Thân',
          'Đại Lục Phong Vân',
          'Thiên Hỏa Bí Bảo',
          'Cổ Giới Vô Song',
          'Đấu Đế Chi Đường',
          'Thiên Địa Vĩ Đại',
          'Đỉnh Cao Đấu Khí',
          'Truyền Kỳ Vĩnh Cửu',
        ][i]
      }`,
      content: generateChapterContent('Đấu Phá Thương Khung', i + 1),
    })),
  },
  {
    id: 'vo-thuong-than-de',
    slug: 'vo-thuong-than-de',
    categoryId: 'than-dao',
    title: 'Vô Thượng Thần Đế',
    cover: 'https://picsum.photos/seed/vothuongthande/300/400',
    author: 'Change',
    translator: 'Cá Mận Mòi',
    status: 'completed',
    rating: 5.0,
    ratingCount: 3,
    views: 1_420_000,
    followers: 720,
    isAdult: true,
    description:
      'Trần Phong, một phàm nhân bình thường, tình cờ nhặt được một mảnh ngọc cổ xưa mang trong mình bí ẩn của vũ trụ. Từ đây, hắn bước vào con đường tu tiên, đối mặt với vô số hiểm nguy, luyện thân như thần, trở thành vô thượng thần đế thiên địa!',
    tags: ['Tu tiên', 'Thần đạo', 'Sức mạnh', 'Sử thi'],
    latestChapter: 20,
    chapters: Array.from({ length: 20 }, (_, i) => ({
      chapterNumber: i + 1,
      title: `Chương ${i + 1}: ${
        [
          'Phàm Nhân Đắc Bảo',
          'Tu Tiên Khởi Đầu',
          'Thần Lực Bí Ẩn',
          'Vượt Qua Thử Thách',
          'Thiên Tài Hiện Thế',
          'Bí Mật Ngọc Thạch',
          'Cảnh Giới Thần Hóa',
          'Kẻ Địch Mạnh Mẽ',
          'Đại Chiến Thiên Đình',
          'Bí Ẩn Vũ Trụ',
          'Thần Đế Giác Tỉnh',
          'Trận Chiến Vô Tiền',
          'Thiên Mệnh Của Ta',
          'Vô Thượng Chi Đạo',
          'Thiên Địa Đại Kiếp',
          'Sức Mạnh Cực Hạn',
          'Thần Đế Chi Vị',
          'Vũ Trụ Vĩnh Hằng',
          'Đỉnh Cao Thiên Đạo',
          'Vô Thượng Thần Đế',
        ][i]
      }`,
      content: generateChapterContent('Vô Thượng Thần Đế', i + 1),
    })),
  },
];

export function getStoryBySlug(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}

export function getChapter(slug: string, chapterNumber: number): Chapter | undefined {
  const story = getStoryBySlug(slug);
  return story?.chapters.find((c) => c.chapterNumber === chapterNumber);
}
