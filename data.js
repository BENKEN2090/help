/**
 * ==========================================================================
 * DỮ LIỆU TẬP THỂ LỚP & VIDEO TRI ÂN 20/10
 * Danh sách 35 thành viên theo đúng thứ tự người dùng cung cấp (Từ trái qua phải)
 * ==========================================================================
 */

const STUDENTS_DATA = [
  // ========================================================================
  // HÀNG NGỒI PHÍA TRƯỚC (SÀN) - 10 BẠN (Từ trái sang phải)
  // Uyên Nhi, Khánh Vy, Kim Nga, Bảo My, Thanh Thư, Nhã Trúc, Phương Linh, Hải Lam, L.H Bảo Châu, Cẩm Ly
  // ========================================================================
  {
    id: 1,
    name: "Uyên Nhi",
    gender: "female",
    coords: { x: 6.2, y: 72.0 },
    bounds: { x: 1.5, y: 58.0, w: 9.5, h: 36.0 },
    headPos: { x: 6.2, y: 64.0 },
    avatarCrop: { x: 3.5, y: 61.5, w: 7.5, h: 12.0 },
    greeting: "Con chúc Mẹ 20/10 luôn tràn đầy sức khỏe, bình an và hạnh phúc bên gia đình!",
    video: "videos/video_uyen_nhi.mp4"
  },
  {
    id: 2,
    name: "Khánh Vy",
    gender: "female",
    coords: { x: 16.5, y: 78.0 },
    bounds: { x: 10.5, y: 64.0, w: 12.0, h: 32.0 },
    headPos: { x: 16.5, y: 70.0 },
    avatarCrop: { x: 13.5, y: 68.0, w: 7.5, h: 12.0 },
    greeting: "Chúc Mẹ một ngày 20/10 thật nhiều niềm vui, luôn rạng rỡ và tươi trẻ ạ!",
    video: "videos/video_khanh_vy.mp4"
  },
  {
    id: 3,
    name: "Kim Nga",
    gender: "female",
    coords: { x: 28.0, y: 78.0 },
    bounds: { x: 23.0, y: 66.0, w: 10.5, h: 30.0 },
    headPos: { x: 28.0, y: 72.5 },
    avatarCrop: { x: 25.0, y: 70.5, w: 7.5, h: 12.0 },
    greeting: "Cảm ơn Mẹ vì tất cả sự hy sinh thầm lặng. Con chúc Mẹ mãi an vui!",
    video: "videos/video_kim_nga.mp4"
  },
  {
    id: 4,
    name: "Bảo My",
    gender: "female",
    coords: { x: 35.5, y: 77.0 },
    bounds: { x: 30.5, y: 65.0, w: 10.0, h: 30.0 },
    headPos: { x: 35.5, y: 70.0 },
    avatarCrop: { x: 32.5, y: 68.0, w: 7.5, h: 12.0 },
    greeting: "Con chúc Mẹ luôn bình yên, mọi lo toan nhường chỗ cho nụ cười rạng ngời!",
    video: "videos/video_bao_my.mp4"
  },
  {
    id: 5,
    name: "Thanh Thư",
    gender: "female",
    coords: { x: 44.0, y: 78.0 },
    bounds: { x: 39.5, y: 66.0, w: 10.5, h: 30.0 },
    headPos: { x: 44.0, y: 72.0 },
    avatarCrop: { x: 40.5, y: 69.5, w: 7.5, h: 12.0 },
    greeting: "Mong Mẹ bớt vất vả, lúc nào cũng dồi dào sức khỏe và vui vẻ cùng chúng con!",
    video: "videos/video_thanh_thu.mp4"
  },
  {
    id: 6,
    name: "Nhã Trúc",
    gender: "female",
    coords: { x: 57.0, y: 78.0 },
    bounds: { x: 52.0, y: 66.0, w: 10.5, h: 30.0 },
    headPos: { x: 57.0, y: 72.0 },
    avatarCrop: { x: 54.0, y: 70.0, w: 7.5, h: 12.0 },
    greeting: "Chúc Mẹ 20/10 ngập tràn hoa, con hứa sẽ luôn chăm ngoan để Mẹ tự hào!",
    video: "videos/video_nha_truc.mp4"
  },
  {
    id: 7,
    name: "Phương Linh",
    gender: "female",
    coords: { x: 67.5, y: 78.0 },
    bounds: { x: 62.5, y: 66.0, w: 10.5, h: 30.0 },
    headPos: { x: 67.5, y: 72.0 },
    avatarCrop: { x: 64.5, y: 70.0, w: 7.5, h: 12.0 },
    greeting: "Con chúc Mẹ yêu mỗi ngày đều vui, luôn là ngọn lửa ấm áp của cả nhà!",
    video: "videos/video_phuong_linh.mp4"
  },
  {
    id: 8,
    name: "Hải Lam",
    gender: "female",
    coords: { x: 75.8, y: 78.0 },
    bounds: { x: 71.0, y: 66.0, w: 10.0, h: 30.0 },
    headPos: { x: 75.8, y: 72.0 },
    avatarCrop: { x: 73.0, y: 69.5, w: 7.5, h: 12.0 },
    greeting: "Chúc Mẹ ngày Phụ Nữ Việt Nam thật ý nghĩa, ấm áp và luôn được yêu thương!",
    video: "videos/video_hai_lam.mp4"
  },
  {
    id: 9,
    name: "L.H Bảo Châu",
    gender: "female",
    coords: { x: 84.5, y: 78.0 },
    bounds: { x: 79.5, y: 67.0, w: 10.0, h: 29.0 },
    headPos: { x: 84.5, y: 73.0 },
    avatarCrop: { x: 81.5, y: 70.5, w: 7.5, h: 12.0 },
    greeting: "Con yêu Mẹ nhiều lắm, chúc Mẹ 20/10 mãi tươi trẻ và tràn đầy năng lượng!",
    video: "videos/video_lh_bao_chau.mp4"
  },
  {
    id: 10,
    name: "Cẩm Ly",
    gender: "female",
    coords: { x: 93.5, y: 78.0 },
    bounds: { x: 88.5, y: 67.0, w: 10.5, h: 29.0 },
    headPos: { x: 93.5, y: 73.0 },
    avatarCrop: { x: 90.5, y: 70.0, w: 7.5, h: 12.0 },
    greeting: "Chúc Mẹ luôn yêu đời, bình an và luôn nở nụ cười rạng rỡ trên môi!",
    video: "videos/video_cam_ly.mp4"
  },

  // ========================================================================
  // HÀNG 2: NGỒI GIỮA / QUỲ / THẦY CHỦ NHIỆM - 8 THÀNH VIÊN (Từ trái sang phải)
  // Nguyệt Ánh, Bích Trâm, Thiên Lam, Mai Anh, thầy Tuấn (GVCN), Khả Phương, Quỳnh Như, Minh Quyên
  // ========================================================================
  {
    id: 11,
    name: "Nguyệt Ánh",
    gender: "female",
    coords: { x: 14.5, y: 61.5 },
    bounds: { x: 10.5, y: 53.0, w: 9.5, h: 24.0 },
    headPos: { x: 14.5, y: 57.5 },
    avatarCrop: { x: 12.0, y: 55.5, w: 7.0, h: 12.0 },
    greeting: "Con chúc Mẹ 20/10 thật nhiều niềm vui, luôn mạnh khỏe và bình an!",
    video: "videos/video_nguyet_anh.mp4"
  },
  {
    id: 12,
    name: "Bích Trâm",
    gender: "female",
    coords: { x: 24.2, y: 63.5 },
    bounds: { x: 20.0, y: 55.0, w: 9.0, h: 24.0 },
    headPos: { x: 24.2, y: 60.0 },
    avatarCrop: { x: 21.5, y: 57.5, w: 7.0, h: 12.0 },
    greeting: "Cảm ơn Mẹ đã luôn bên cạnh chở che. Chúc Mẹ một ngày 20/10 trọn vẹn!",
    video: "videos/video_bich_tram.mp4"
  },
  {
    id: 13,
    name: "Thiên Lam",
    gender: "female",
    coords: { x: 31.0, y: 59.0 },
    bounds: { x: 27.0, y: 51.0, w: 8.5, h: 24.0 },
    headPos: { x: 31.0, y: 55.5 },
    avatarCrop: { x: 28.5, y: 53.0, w: 7.0, h: 12.0 },
    greeting: "Chúc Mẹ luôn trẻ đẹp, công việc thuận lợi và luôn tự hào về con nhé!",
    video: "videos/video_thien_lam.mp4"
  },
  {
    id: 14,
    name: "Mai Anh",
    gender: "female",
    coords: { x: 37.5, y: 62.5 },
    bounds: { x: 33.5, y: 54.0, w: 8.5, h: 24.0 },
    headPos: { x: 37.5, y: 59.0 },
    avatarCrop: { x: 35.0, y: 56.5, w: 7.0, h: 12.0 },
    greeting: "Con chúc Mẹ một ngày 20/10 tràn ngập tiếng cười và ấm áp nhất!",
    video: "videos/video_mai_anh.mp4"
  },
  {
    id: 15,
    name: "Thầy Tuấn (GVCN)",
    gender: "male",
    isTeacher: true,
    coords: { x: 47.0, y: 47.5 },
    bounds: { x: 42.0, y: 38.0, w: 10.5, h: 29.0 },
    headPos: { x: 47.0, y: 43.5 },
    avatarCrop: { x: 44.0, y: 39.5, w: 8.0, h: 13.0 },
    greeting: "Thay mặt tập thể lớp, xin kính chúc các bậc phụ huynh luôn dồi dào sức khỏe, an vui và hạnh phúc!",
    video: "videos/video_thay_tuan.mp4"
  },
  {
    id: 16,
    name: "Khả Phương",
    gender: "female",
    coords: { x: 54.5, y: 60.5 },
    bounds: { x: 51.0, y: 52.0, w: 8.0, h: 24.0 },
    headPos: { x: 54.5, y: 57.5 },
    avatarCrop: { x: 52.0, y: 54.5, w: 7.0, h: 12.0 },
    greeting: "Chúc Mẹ ngày 20/10 nhận được muôn vàn lời chúc tốt đẹp và quà yêu thương!",
    video: "videos/video_kha_phuong.mp4"
  },
  {
    id: 17,
    name: "Quỳnh Như",
    gender: "female",
    coords: { x: 58.5, y: 59.5 },
    bounds: { x: 55.0, y: 51.0, w: 8.0, h: 24.0 },
    headPos: { x: 58.5, y: 56.5 },
    avatarCrop: { x: 56.0, y: 53.5, w: 7.0, h: 12.0 },
    greeting: "Con chúc Mẹ luôn tràn đầy năng lượng tích cực và luôn nở nụ cười xinh!",
    video: "videos/video_quynh_nhu.mp4"
  },
  {
    id: 18,
    name: "Minh Quyên",
    gender: "female",
    coords: { x: 66.0, y: 63.5 },
    bounds: { x: 62.0, y: 54.0, w: 9.0, h: 24.0 },
    headPos: { x: 66.0, y: 60.0 },
    avatarCrop: { x: 63.5, y: 57.5, w: 7.0, h: 12.0 },
    greeting: "Mẹ là người phụ nữ tuyệt vời nhất của con. Chúc Mẹ 20/10 thật hạnh phúc!",
    video: "videos/video_minh_quyen.mp4"
  },

  // ========================================================================
  // HÀNG 3: ĐỨNG PHÍA SAU - 17 BẠN (Từ trái sang phải)
  // Đình Khang, Minh Khang, Thành Đạt, Bảo Thịnh, Quốc Kỳ, Thành Công, Minh Triết, Minh Nhật, Lê Danh, Hoàng Long, Quang Nhật, Hoàng Vũ, Phú Thành, Kính Luân, Q.Bảo Châu, Gia Huy, Quốc Thái
  // ========================================================================
  {
    id: 19,
    name: "Đình Khang",
    gender: "male",
    coords: { x: 18.5, y: 43.5 },
    bounds: { x: 15.0, y: 34.0, w: 7.5, h: 25.0 },
    headPos: { x: 18.5, y: 38.5 },
    avatarCrop: { x: 16.0, y: 37.0, w: 7.0, h: 12.0 },
    greeting: "Con chúc Mẹ luôn mạnh khỏe, công việc hanh thông và bớt vất vả vì con!",
    video: "videos/video_dinh_khang.mp4"
  },
  {
    id: 20,
    name: "Minh Khang",
    gender: "male",
    coords: { x: 26.5, y: 42.5 },
    bounds: { x: 23.0, y: 34.0, w: 7.5, h: 25.0 },
    headPos: { x: 26.5, y: 38.0 },
    avatarCrop: { x: 24.0, y: 36.0, w: 7.0, h: 12.0 },
    greeting: "Chúc Mẹ 20/10 luôn tươi vui, hạnh phúc và luôn an tâm về con trai!",
    video: "videos/video_minh_khang.mp4"
  },
  {
    id: 21,
    name: "Thành Đạt",
    gender: "male",
    coords: { x: 32.8, y: 46.5 },
    bounds: { x: 29.5, y: 37.0, w: 7.0, h: 24.0 },
    headPos: { x: 32.8, y: 42.0 },
    avatarCrop: { x: 30.5, y: 40.5, w: 6.8, h: 12.0 },
    greeting: "Cảm ơn Mẹ đã luôn là điểm tựa vững vàng. Con chúc Mẹ mãi mạnh khỏe!",
    video: "videos/video_thanh_dat.mp4"
  },
  {
    id: 22,
    name: "Bảo Thịnh",
    gender: "male",
    coords: { x: 36.2, y: 42.5 },
    bounds: { x: 33.5, y: 34.0, w: 6.5, h: 24.0 },
    headPos: { x: 36.2, y: 38.5 },
    avatarCrop: { x: 34.0, y: 36.0, w: 6.8, h: 12.0 },
    greeting: "Con chúc Mẹ ngày 20/10 thật nhiều niềm vui và luôn bình an bên bố và con!",
    video: "videos/video_bao_thinh.mp4"
  },
  {
    id: 23,
    name: "Quốc Kỳ",
    gender: "male",
    coords: { x: 39.5, y: 47.5 },
    bounds: { x: 36.5, y: 38.0, w: 7.0, h: 24.0 },
    headPos: { x: 39.5, y: 43.5 },
    avatarCrop: { x: 37.0, y: 41.5, w: 6.8, h: 12.0 },
    greeting: "Chúc Mẹ yêu của con luôn trẻ trung, xinh đẹp và mỗi ngày đều là một ngày vui!",
    video: "videos/video_quoc_ky.mp4"
  },
  {
    id: 24,
    name: "Thành Công",
    gender: "male",
    coords: { x: 42.5, y: 42.5 },
    bounds: { x: 39.5, y: 34.0, w: 6.5, h: 24.0 },
    headPos: { x: 42.5, y: 38.5 },
    avatarCrop: { x: 40.0, y: 36.5, w: 6.8, h: 12.0 },
    greeting: "Con mong Mẹ luôn khỏe mạnh, cười nhiều hơn và bớt lo âu về con nhé!",
    video: "videos/video_thanh_cong.mp4"
  },
  {
    id: 25,
    name: "Minh Triết",
    gender: "male",
    coords: { x: 50.0, y: 43.5 },
    bounds: { x: 47.0, y: 35.0, w: 6.5, h: 24.0 },
    headPos: { x: 50.0, y: 39.5 },
    avatarCrop: { x: 47.5, y: 37.0, w: 6.8, h: 12.0 },
    greeting: "Chúc Mẹ 20/10 nhận được thật nhiều hoa, quà và tràn ngập tiếng cười!",
    video: "videos/video_minh_triet.mp4"
  },
  {
    id: 26,
    name: "Minh Nhật",
    gender: "male",
    coords: { x: 53.5, y: 45.5 },
    bounds: { x: 50.5, y: 37.0, w: 6.5, h: 24.0 },
    headPos: { x: 53.5, y: 41.5 },
    avatarCrop: { x: 51.0, y: 39.5, w: 6.8, h: 12.0 },
    greeting: "Con chúc Mẹ luôn dồi dào sức khỏe, hạnh phúc và vạn sự như ý ạ!",
    video: "videos/video_minh_nhat.mp4"
  },
  {
    id: 27,
    name: "Lê Danh",
    gender: "male",
    coords: { x: 57.0, y: 46.5 },
    bounds: { x: 54.0, y: 37.5, w: 6.5, h: 24.0 },
    headPos: { x: 57.0, y: 42.5 },
    avatarCrop: { x: 54.5, y: 40.5, w: 6.8, h: 12.0 },
    greeting: "Cảm ơn Mẹ đã luôn chăm sóc chu đáo cho gia đình. Chúc Mẹ luôn an vui!",
    video: "videos/video_le_danh.mp4"
  },
  {
    id: 28,
    name: "Hoàng Long",
    gender: "male",
    coords: { x: 62.0, y: 44.0 },
    bounds: { x: 59.0, y: 35.0, w: 6.5, h: 24.0 },
    headPos: { x: 62.0, y: 39.5 },
    avatarCrop: { x: 59.5, y: 37.5, w: 6.8, h: 12.0 },
    greeting: "Con chúc Mẹ luôn rạng rỡ, xinh tươi và mọi điều may mắn đều đến với Mẹ!",
    video: "videos/video_hoang_long.mp4"
  },
  {
    id: 29,
    name: "Quang Nhật",
    gender: "male",
    coords: { x: 65.5, y: 48.0 },
    bounds: { x: 62.5, y: 39.0, w: 6.8, h: 24.0 },
    headPos: { x: 65.5, y: 44.0 },
    avatarCrop: { x: 63.0, y: 42.0, w: 6.8, h: 12.0 },
    greeting: "Chúc Mẹ 20/10 thật nhiều bất ngờ vui và mãi là chỗ dựa ấm áp của con!",
    video: "videos/video_quang_nhat.mp4"
  },
  {
    id: 30,
    name: "Hoàng Vũ",
    gender: "male",
    coords: { x: 70.0, y: 44.0 },
    bounds: { x: 67.0, y: 35.0, w: 6.5, h: 24.0 },
    headPos: { x: 70.0, y: 39.5 },
    avatarCrop: { x: 67.5, y: 38.0, w: 6.8, h: 12.0 },
    greeting: "Con chúc Mẹ luôn vui tươi, trẻ trung và gia đình mình mãi đầm ấm!",
    video: "videos/video_hoang_vu.mp4"
  },
  {
    id: 31,
    name: "Phú Thành",
    gender: "male",
    coords: { x: 73.8, y: 50.0 },
    bounds: { x: 70.5, y: 40.0, w: 6.8, h: 24.0 },
    headPos: { x: 73.8, y: 45.0 },
    avatarCrop: { x: 71.0, y: 44.0, w: 6.8, h: 12.0 },
    greeting: "Chúc Mẹ ngày 20/10 ngập tràn tiếng cười và thật nhiều sức khỏe!",
    video: "videos/video_phu_thanh.mp4"
  },
  {
    id: 32,
    name: "Kính Luân",
    gender: "male",
    coords: { x: 76.5, y: 44.0 },
    bounds: { x: 73.5, y: 35.0, w: 6.5, h: 24.0 },
    headPos: { x: 76.5, y: 39.5 },
    avatarCrop: { x: 74.0, y: 38.0, w: 6.8, h: 12.0 },
    greeting: "Con cảm ơn Mẹ vì tất cả tình yêu thương. Chúc Mẹ luôn khỏe mạnh và an yên!",
    video: "videos/video_kinh_luan.mp4"
  },
  {
    id: 33,
    name: "Q.Bảo Châu",
    gender: "male",
    coords: { x: 80.0, y: 48.0 },
    bounds: { x: 77.0, y: 39.0, w: 6.5, h: 24.0 },
    headPos: { x: 80.0, y: 44.0 },
    avatarCrop: { x: 77.5, y: 42.0, w: 6.8, h: 12.0 },
    greeting: "Chúc Mẹ một ngày 20/10 ấm áp, trọn vẹn và luôn hạnh phúc bên gia đình!",
    video: "videos/video_q_bao_chau.mp4"
  },
  {
    id: 34,
    name: "Gia Huy",
    gender: "male",
    coords: { x: 83.8, y: 49.0 },
    bounds: { x: 80.5, y: 40.0, w: 6.8, h: 24.0 },
    headPos: { x: 83.8, y: 45.0 },
    avatarCrop: { x: 81.0, y: 43.0, w: 6.8, h: 12.0 },
    greeting: "Con chúc Mẹ luôn tươi cười, công việc thuận lợi và mãi bình an!",
    video: "videos/video_gia_huy.mp4"
  },
  {
    id: 35,
    name: "Quốc Thái",
    gender: "male",
    coords: { x: 93.0, y: 46.0 },
    bounds: { x: 89.0, y: 36.0, w: 8.5, h: 26.0 },
    headPos: { x: 93.0, y: 41.0 },
    avatarCrop: { x: 90.0, y: 40.0, w: 7.0, h: 12.0 },
    greeting: "Chúc Mẹ 20/10 thật hạnh phúc, nhiều niềm vui và luôn tự hào về con trai!",
    video: "videos/video_quoc_thai.mp4"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { STUDENTS_DATA };
}
