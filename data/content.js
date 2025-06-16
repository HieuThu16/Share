// YouTube Videos Data
const youtubeVideos = [
  {
    id: "programming-best-practices",
    title: "💻 Lập Trình Hiệu Quả",
    author: "Traversy Media",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
    duration: "15:32",
    views: "1.2M lượt xem",
    publishDate: "2 ngày trước",
    category: "Lập trình",
    url: "https://www.youtube.com/watch?v=example1",
    summary:
      "Những mẹo hay và best practices trong lập trình từ các kênh như Traversy Media, freeCodeCamp. Bao gồm clean code, design patterns và debugging.",
    coreContent: `
      Video này tập trung vào các nguyên tắc cơ bản để viết code hiệu quả:
      
      • **Clean Code Principles**: Đặt tên biến rõ ràng, functions ngắn gọn, comments hữu ích
      • **Design Patterns**: Singleton, Observer, Factory patterns và cách áp dụng
      • **Debugging Techniques**: Sử dụng debugger, logging hiệu quả, unit testing
      • **Code Review**: Cách review code và nhận feedback constructive
      • **Performance Optimization**: Tối ưu hóa algorithms và memory management
      
      Tác giả Brad Traversy chia sẻ kinh nghiệm 10+ năm trong ngành, với examples thực tế và demo code trực tiếp.
    `,
    personalShare: `
      Tôi đã áp dụng ngay kỹ thuật "Comment-Driven Development" mà Brad đề cập. Thay vì viết code trước rồi comment sau, tôi viết comment outline trước, sau đó implement. Kết quả là code structure rõ ràng hơn nhiều.
      
      Đặc biệt ấn tượng với phần debugging workflow. Việc sử dụng console.table() thay vì console.log() đã giúp tôi debug objects phức tạp dễ dàng hơn rất nhiều.
      
      Recommend cho: Developers từ junior đến senior, đặc biệt những ai muốn improve code quality.
    `,
  },
  {
    id: "productivity-methods",
    title: "⚡ Tăng Năng Suất Làm Việc",
    author: "Ali Abdaal",
    thumbnail:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=200&fit=crop",
    duration: "22:15",
    views: "2.1M lượt xem",
    publishDate: "1 tuần trước",
    category: "Năng suất",
    url: "https://www.youtube.com/watch?v=example2",
    summary:
      "Phương pháp Pomodoro, GTD và các kỹ thuật quản lý thời gian hiệu quả. Học từ Ali Abdaal và Thomas Frank về cách tối ưu hóa workflow.",
    coreContent: `
      Ali Abdaal chia sẻ system năng suất của anh được xây dựng qua nhiều năm:
      
      • **Time Blocking**: Lên kế hoạch chi tiết cho từng block thời gian trong ngày
      • **2-Minute Rule**: Nếu task < 2 phút, làm ngay, không delay
      • **Energy Management**: Làm deep work khi energy cao nhất (thường là sáng)
      • **Digital Minimalism**: Tối ưu notification, app usage, focus modes
      • **Review Systems**: Weekly/monthly review để adjust và improve
      
      Anh cũng demo cách setup Notion workspace và share templates thực tế đang sử dụng.
    `,
    personalShare: `
      Sau khi xem video này, tôi đã implement "Energy-Based Scheduling" thay vì traditional to-do lists. Tôi track energy levels theo giờ trong 2 tuần, nhận ra 9-11AM và 2-4PM là lúc tôi focus tốt nhất.
      
      Bây giờ tôi schedule deep work (coding, writing) vào khung giờ này, còn meeting và admin tasks vào lúc energy thấp. Productivity tăng đáng kể!
      
      Tool recommend: RescueTime để track thời gian, Notion cho planning, Freedom để block distractions.
    `,
  },
  {
    id: "ui-ux-design",
    title: "🎨 Thiết Kế UI/UX",
    author: "Design Course",
    thumbnail:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=200&fit=crop",
    duration: "28:45",
    views: "856K lượt xem",
    publishDate: "3 ngày trước",
    category: "Thiết kế",
    url: "https://www.youtube.com/watch?v=example3",
    summary:
      "Nguyên tắc thiết kế giao diện, color theory và user experience. Học từ các designer chuyên nghiệp về cách tạo ra sản phẩm dễ sử dụng.",
    coreContent: `
      Gary Simon từ Design Course đi sâu vào principles của good UI/UX:
      
      • **Visual Hierarchy**: Sử dụng size, color, spacing để guide user attention
      • **Color Psychology**: Cách màu sắc ảnh hưởng emotions và user behavior  
      • **Typography**: Font pairing, readability, spacing cho different devices
      • **User Flow**: Mapping user journey, identifying pain points, optimizing conversion
      • **Accessibility**: WCAG guidelines, color contrast, keyboard navigation
      
      Video bao gồm case study redesign một e-commerce app từ wireframe đến final design.
    `,
    personalShare: `
      Tôi đã áp dụng ngay "5-Second Test" mà Gary đề cập. Show design cho người khác 5 giây, sau đó hỏi họ nhớ gì. Kết quả shocking - design tôi nghĩ "clear" nhưng users hoàn toàn confused!
      
      Lesson learned: Don't assume users sẽ hiểu design như mình. Test early, test often. Tôi bắt đầu prototype với paper sketches trước khi nhảy vào Figma.
      
      Tools sử dụng: Figma cho design, Maze cho user testing, Coolors.co cho color palette.
    `,
  },
  {
    id: "learning-techniques",
    title: "🧠 Kỹ Thuật Học Tập",
    author: "Study MD",
    thumbnail:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop",
    duration: "18:20",
    views: "1.5M lượt xem",
    publishDate: "5 ngày trước",
    category: "Học tập",
    url: "https://www.youtube.com/watch?v=example4",
    summary:
      "Phương pháp Feynman, spaced repetition và active recall. Cách học hiệu quả và ghi nhớ lâu dài kiến thức mới.",
    coreContent: `
      Dr. Jubbal chia sẻ evidence-based learning techniques từ neuroscience research:
      
      • **Feynman Technique**: Explain concepts đơn giản như dạy người khác
      • **Active Recall**: Test bản thân thay vì passive re-reading
      • **Spaced Repetition**: Review theo intervals tăng dần (1 day, 3 days, 1 week...)
      • **Interleaving**: Mix different topics thay vì block practice
      • **Elaborative Interrogation**: Hỏi "why" và "how" để hiểu deeper
      
      Video include scientific studies và practical examples cho từng technique.
    `,
    personalShare: `
      Game changer cho tôi là "Active Recall". Trước đây tôi highlight và re-read notes nhiều lần, feeling như đã "học". Nhưng khi test thì blank!      
      Bây giờ tôi tạo flashcards và practice recall thay vì highlight. Dùng Anki với spaced repetition algorithm. Retention rate tăng từ ~60% lên ~90% sau 1 tháng.
      
      Pro tip: Record voice notes explaining concepts, rồi listen lại để catch gaps trong understanding.
    `,
  },
  {
    id: "ai-machine-learning",
    title: "🤖 AI & Machine Learning cơ bản",
    author: "3Blue1Brown",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
    duration: "25:47",
    views: "3.2M lượt xem",
    publishDate: "4 ngày trước",
    category: "Công nghệ",
    url: "https://www.youtube.com/watch?v=aircAruvnKk",
    summary:
      "Giải thích Neural Networks và Deep Learning một cách trực quan, dễ hiểu. Series nổi tiếng của 3Blue1Brown về AI cơ bản.",
    coreContent: `
      Grant Sanderson giải thích AI/ML với animations tuyệt vời:
      
      • **Neural Networks Basics**: Cách neurons kết nối và truyền tín hiệu
      • **Backpropagation**: Thuật toán học của neural networks được giải thích trực quan
      • **Gradient Descent**: Tối ưu hóa weights thông qua mathematical visualization
      • **Real-world Applications**: Từ image recognition đến natural language processing
      • **Mathematical Intuition**: Hiểu bản chất toán học đằng sau AI mà không cần PhD
      
      Series này famous vì biến concepts phức tạp thành visual animations dễ hiểu.
    `,
    personalShare: `
      Đây là series đã thay đổi cách tôi nhìn về AI! Trước đây AI với tôi như "black magic", nhưng Grant đã làm sáng tỏ mọi thứ.
      
      Tôi đã implement một neural network đơn giản bằng Python sau khi xem xong. Feeling tuyệt vời khi finally hiểu tại sao model "learns" và cách adjust parameters.
      
      Recommend strongly cho: Bất kỳ ai muốn hiểu AI thật sự, không chỉ sử dụng tools. Perfect cho beginners và cả experienced developers.
    `,
  },
];

// Book Reviews Data
const bookReviews = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=200&fit=crop",
    rating: "⭐⭐⭐⭐⭐ 5/5",
    category: "Phát triển bản thân",
    completedDate: "15/11/2024",
    review:
      "Cuốn sách kinh điển về xây dựng thói quen tích cực. Phương pháp 1% improvement mỗi ngày thực sự hiệu quả và có thể áp dụng ngay.",
  },
  {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    cover:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=200&fit=crop",
    rating: "⭐⭐⭐⭐⭐ 5/5",
    category: "Lập trình",
    completedDate: "28/10/2024",
    review:
      "Bible của mọi lập trình viên. Những nguyên tắc viết code sạch, dễ đọc và dễ maintain. Must-read cho developer.",
  },
  {
    id: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop",
    rating: "⭐⭐⭐⭐⭐ 5/5",
    category: "Lịch sử, Khoa học",
    completedDate: "05/12/2024",
    review:
      "Cuốn sách mở mang tầm mắt về lịch sử loài người. Harari giải thích một cách dễ hiểu về quá trình tiến hóa của xã hội và văn minh.",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    cover:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
    rating: "⭐⭐⭐⭐⭐ 5/5",
    category: "Năng suất, Tập trung",
    completedDate: "20/01/2025",
    review:
      "Kỹ năng quan trọng nhất thế kỷ 21. Newport hướng dẫn cách tập trung sâu và tạo ra giá trị thực sự trong công việc.",
  },
];

// Dữ liệu mẫu cho YouTube videos
const sampleYoutubeData = [
  {
    title: "🤖 AI & Machine Learning cơ bản",
    author: "3Blue1Brown",
    duration: "25:47",
    publishDate: "4 ngày trước",
    url: "https://www.youtube.com/watch?v=aircAruvnKk",
    thumbnail: "https://i.ytimg.com/vi/aircAruvnKk/maxresdefault.jpg",
    summary: "Video giới thiệu về AI và Machine Learning cho người mới bắt đầu",
    coreContent:
      "- Giới thiệu về AI và Machine Learning\n- Các khái niệm cơ bản\n- Ứng dụng thực tế",
    personalShare:
      "Video này giúp tôi hiểu rõ hơn về AI và cách nó hoạt động trong thực tế.",
  },
  {
    title: "📚 Cách đọc sách hiệu quả",
    author: "Thomas Frank",
    duration: "15:30",
    publishDate: "1 tuần trước",
    url: "https://www.youtube.com/watch?v=example2",
    thumbnail: "https://i.ytimg.com/vi/example2/maxresdefault.jpg",
    summary: "Hướng dẫn cách đọc sách hiệu quả và ghi nhớ thông tin",
    coreContent:
      "- Phương pháp đọc nhanh\n- Cách ghi chú hiệu quả\n- Kỹ thuật ghi nhớ",
    personalShare:
      "Những tips trong video này đã giúp tôi đọc sách hiệu quả hơn rất nhiều.",
  },
];

// Dữ liệu mẫu cho book reviews
const sampleBookReviews = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    rating: 5,
    summary: "Cuốn sách về cách xây dựng thói quen tốt và phá bỏ thói quen xấu",
    review:
      "Một cuốn sách tuyệt vời về cách thay đổi bản thân thông qua những thói quen nhỏ.",
    coverImage: "https://example.com/atomic-habits.jpg",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    rating: 4,
    summary: "Hướng dẫn cách tập trung làm việc hiệu quả trong thời đại số",
    review:
      "Cuốn sách giúp tôi hiểu được tầm quan trọng của việc tập trung sâu trong công việc.",
    coverImage: "https://example.com/deep-work.jpg",
  },
];

// Export dữ liệu
window.sampleYoutubeData = sampleYoutubeData;
window.sampleBookReviews = sampleBookReviews;
