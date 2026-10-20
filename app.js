/**
 * ==========================================================================
 * PHẦN MỀM TRI ÂN 20/10 - CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM
 * Các nâng cấp đỉnh cao:
 * 1. Đèn rọi Spotlight Canvas 2D siêu tốc 0ms: Cắt lỗ sáng rực rỡ, KHÔNG BỊ MỜ,
 *    khuôn mặt học sinh sáng bừng tức thì không cần chờ load.
 * 2. Đã bỏ phần lời chúc trên mỗi video, tập trung vào khung video hoàng gia.
 * 3. Chuyển cảnh hoàn hảo: Khung trước mờ dần đi trước -> Bão hoa 160 cánh bay từ
 *    góc trên màn hình vụt chéo xuống -> Khung sau dần hiện lên mượt mà.
 * 4. Background giàu chi tiết: Các đốm sáng Bokeh đa sắc, vòng tròn hoa văn thanh xuân.
 * ==========================================================================
 */

let currentStudentIndex = 0;
let userUploadedVideos = {};
let audioCtx = null;
let isMusicPlaying = false;
let musicInterval = null;

// Biến điều khiển chuyển động 3D theo hướng chuột
let targetTiltX = 0, targetTiltY = 0;
let currentTiltX = 0, currentTiltY = 0;
let activeHoveredStudentId = null;

document.addEventListener("DOMContentLoaded", () => {
  initLarge3DParticlesEffect();
  initMouse3DParallaxTilt();
  initCanvas2DSpotlight();
  initBottomCarousel();
  initModalGrid();
  initEventListeners();
});

/* ==========================================================================
   1. HIỆU ỨNG ẢNH DI CHUYỂN THEO HƯỚNG CHUỘT (3D PARALLAX TILT)
   ========================================================================== */
function initMouse3DParallaxTilt() {
  const introWrapper = document.querySelector(".intro-wrapper");
  const tiltContainer = document.getElementById("photo-tilt-container");

  if (!introWrapper || !tiltContainer) return;

  introWrapper.addEventListener("mousemove", (e) => {
    const rect = introWrapper.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    targetTiltY = normX * 8.0;
    targetTiltX = -normY * 7.0;
  });

  introWrapper.addEventListener("mouseleave", () => {
    targetTiltX = 0;
    targetTiltY = 0;
  });

  function updateTilt() {
    currentTiltX += (targetTiltX - currentTiltX) * 0.08;
    currentTiltY += (targetTiltY - currentTiltY) * 0.08;

    tiltContainer.style.transform = `perspective(1500px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg) scale3d(1.012, 1.012, 1.012)`;

    requestAnimationFrame(updateTilt);
  }

  updateTilt();
}

/* ==========================================================================
   2. ĐÈN RỌI SPOTLIGHT CANVAS 2D SIÊU TỐC 0MS:
   MẶT HỌC SINH SÁNG RỰC RỠ, 100% SẮC NÉT (KHÔNG MỜ, KHÔNG CẦN CHỜ LOAD)
   ========================================================================== */
function initCanvas2DSpotlight() {
  const groupImg = document.getElementById("group-photo-img");
  const photoStage = document.getElementById("photo-stage");
  const spotlightCanvas = document.getElementById("spotlight-canvas");
  const personHalo = document.getElementById("person-halo");
  const speechBubble = document.getElementById("speech-bubble");

  const sCtx = spotlightCanvas.getContext("2d");

  function resizeSpotlightCanvas() {
    const rect = groupImg.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      spotlightCanvas.width = rect.width;
      spotlightCanvas.height = rect.height;
    }
  }

  window.addEventListener("resize", resizeSpotlightCanvas);

  const onImageReady = () => {
    resizeSpotlightCanvas();

    const cropCanvas = document.createElement("canvas");
    const cropCtx = cropCanvas.getContext("2d");
    cropCanvas.width = 120;
    cropCanvas.height = 120;

    const imgW = groupImg.naturalWidth || 1024;
    const imgH = groupImg.naturalHeight || 682;

    STUDENTS_DATA.forEach(student => {
      const crop = student.avatarCrop || {
        x: Math.max(0, student.coords.x - 3.5),
        y: Math.max(0, student.coords.y - 6.0),
        w: 7.0,
        h: 12.0
      };

      const sx = (crop.x / 100) * imgW;
      const sy = (crop.y / 100) * imgH;
      const sw = (crop.w / 100) * imgW;
      const sh = (crop.h / 100) * imgH;

      cropCtx.clearRect(0, 0, 120, 120);
      try {
        cropCtx.drawImage(groupImg, sx, sy, sw, sh, 0, 0, 120, 120);
        student.avatarUrl = cropCanvas.toDataURL("image/jpeg", 0.9);
      } catch (e) {
        student.avatarUrl = "assets/original.jpg";
      }
    });

    refreshAllAvatars();
  };

  if (groupImg.complete) {
    onImageReady();
  } else {
    groupImg.addEventListener("load", onImageReady);
  }

  // TÍNH TOÁN TRỰC TIẾP TỌA ĐỘ CHUỘT: 0MS PHẢN HỒI TỨC THÌ
  photoStage.addEventListener("mousemove", (e) => {
    const rect = groupImg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    if (spotlightCanvas.width !== rect.width || spotlightCanvas.height !== rect.height) {
      spotlightCanvas.width = rect.width;
      spotlightCanvas.height = rect.height;
    }

    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    const student = STUDENTS_DATA.find(s => {
      return (
        mouseX >= s.bounds.x &&
        mouseX <= s.bounds.x + s.bounds.w &&
        mouseY >= s.bounds.y &&
        mouseY <= s.bounds.y + s.bounds.h
      );
    });

    if (student) {
      if (activeHoveredStudentId !== student.id) {
        activeHoveredStudentId = student.id;
        drawInstantSpotlight(student, spotlightCanvas, sCtx, personHalo, speechBubble, rect);
        playChimeSound();
      } else {
        updateSpeechBubblePos(student, speechBubble, rect);
      }
    } else {
      if (activeHoveredStudentId !== null) {
        const bubbleRect = speechBubble.getBoundingClientRect();
        const isInBubble = (
          e.clientX >= bubbleRect.left &&
          e.clientX <= bubbleRect.right &&
          e.clientY >= bubbleRect.top &&
          e.clientY <= bubbleRect.bottom
        );
        if (!isInBubble) {
          activeHoveredStudentId = null;
          clearSpotlight(spotlightCanvas, sCtx, personHalo, speechBubble);
        }
      }
    }
  });

  photoStage.addEventListener("mouseleave", (e) => {
    const bubbleRect = speechBubble.getBoundingClientRect();
    const isInBubble = (
      e.clientX >= bubbleRect.left &&
      e.clientX <= bubbleRect.right &&
      e.clientY >= bubbleRect.top &&
      e.clientY <= bubbleRect.bottom
    );
    if (!isInBubble) {
      activeHoveredStudentId = null;
      clearSpotlight(spotlightCanvas, sCtx, personHalo, speechBubble);
    }
  });

  speechBubble.addEventListener("mouseleave", () => {
    activeHoveredStudentId = null;
    clearSpotlight(spotlightCanvas, sCtx, personHalo, speechBubble);
  });

  photoStage.addEventListener("click", () => {
    if (activeHoveredStudentId !== null) {
      const idx = STUDENTS_DATA.findIndex(s => s.id === activeHoveredStudentId);
      if (idx !== -1) openStudentVideo(idx);
    }
  });
}

/**
 * Vẽ đèn Spotlight trên Canvas 2D: Cắt lỗ trong suốt và rọi luồng sáng vàng ấm
 * Lên khuôn mặt học sinh. Tốc độ < 0.1ms, HOÀN TOÀN KHÔNG BỊ MỜ, SÁNG BỪNG TỨC THÌ.
 */
function drawInstantSpotlight(student, canvas, ctx, halo, bubble, imgRect) {
  const cw = canvas.width;
  const ch = canvas.height;

  const spotX = student.headPos ? student.headPos.x : student.coords.x;
  const spotY = student.headPos ? student.headPos.y : student.coords.y;

  const px = (spotX / 100) * cw;
  const py = (spotY / 100) * ch;
  const radius = Math.min(cw, ch) * 0.105; // Bán kính rọi sáng phù hợp khuôn mặt

  ctx.clearRect(0, 0, cw, ch);

  // 1. Phủ lớp tối êm ái xung quanh
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(10, 16, 28, 0.65)";
  ctx.fillRect(0, 0, cw, ch);

  // 2. CẮT LỖ HOÀN TOÀN TRONG SUỐT NGAY KHUÔN MẶT HỌC SINH (destination-out)
  // Nhờ đó khuôn mặt học sinh 100% là ảnh gốc sắc nét, không bị mờ chút nào!
  ctx.globalCompositeOperation = "destination-out";
  const cutGrad = ctx.createRadialGradient(px, py, 0, px, py, radius);
  cutGrad.addColorStop(0, "rgba(0, 0, 0, 1)");
  cutGrad.addColorStop(0.72, "rgba(0, 0, 0, 1)");
  cutGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = cutGrad;
  ctx.beginPath();
  ctx.arc(px, py, radius, 0, Math.PI * 2);
  ctx.fill();

  // 3. RỌI LUỒNG ÁNH SÁNG VÀNG ẤM ÁP LÊN MẶT (lighter / screen)
  // Khiến khuôn mặt sáng bừng lên rạng rỡ và nổi bật hơn hẳn
  ctx.globalCompositeOperation = "screen";
  const lightGrad = ctx.createRadialGradient(px, py, 0, px, py, radius * 0.9);
  lightGrad.addColorStop(0, "rgba(255, 245, 220, 0.32)");
  lightGrad.addColorStop(0.55, "rgba(251, 191, 36, 0.16)");
  lightGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = lightGrad;
  ctx.beginPath();
  ctx.arc(px, py, radius * 0.9, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = "source-over";
  canvas.classList.add("active");

  // Vòng hào quang vàng kim viền quanh
  halo.style.left = `${spotX}%`;
  halo.style.top = `${spotY}%`;
  halo.style.width = `${radius * 2}px`;
  halo.style.height = `${radius * 2}px`;
  halo.classList.add("active");

  // Cập nhật nội dung bong bóng lời nói
  document.getElementById("bubble-avatar-img").src = student.avatarUrl || "assets/original.jpg";
  const namePrefix = student.isTeacher ? "🌟 " : "🌸 ";
  document.getElementById("bubble-student-name").textContent = namePrefix + student.name;
  document.getElementById("bubble-greeting-text").textContent = student.greeting;

  const actionBtn = document.getElementById("bubble-view-video-btn");
  actionBtn.onclick = (e) => {
    e.stopPropagation();
    const idx = STUDENTS_DATA.findIndex(s => s.id === student.id);
    openStudentVideo(idx);
  };

  updateSpeechBubblePos(student, bubble, imgRect);
  bubble.classList.add("show");
}

function clearSpotlight(canvas, ctx, halo, bubble) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.classList.remove("active");
  if (halo) halo.classList.remove("active");
  if (bubble) bubble.classList.remove("show");
}

function updateSpeechBubblePos(student, bubble, imgRect) {
  const spotX = student.headPos ? student.headPos.x : student.coords.x;
  const spotY = student.headPos ? student.headPos.y : student.coords.y;

  const headScreenX = imgRect.left + (spotX / 100) * imgRect.width;
  const headScreenY = imgRect.top + (spotY / 100) * imgRect.height;

  const bubbleW = 320;
  const bubbleH = 175;
  let bubbleLeft = headScreenX;
  let bubbleTop = headScreenY - 18;
  let flippedDown = false;

  if (headScreenY - bubbleH < 15) {
    bubbleTop = headScreenY + 45;
    flippedDown = true;
  }

  if (bubbleLeft - bubbleW / 2 < 16) {
    bubbleLeft = bubbleW / 2 + 16;
  } else if (bubbleLeft + bubbleW / 2 > window.innerWidth - 16) {
    bubbleLeft = window.innerWidth - bubbleW / 2 - 16;
  }

  bubble.style.left = `${bubbleLeft}px`;
  bubble.style.top = `${bubbleTop}px`;

  if (flippedDown) {
    bubble.classList.add("flipped-down");
  } else {
    bubble.classList.remove("flipped-down");
  }
}

/* ==========================================================================
   3. CHUYỂN CẢNH HOÀN HẢO:
   Khung trước phai mờ đi trước -> Bão hoa 160 cánh bay từ góc trên màn hình vụt chéo xuống
   -> Khung sau dần hiện lên mượt mà
   ========================================================================== */
function runFloralFlurryTransition(onSwitchContent) {
  const canvas = document.getElementById("gust-canvas");
  const ctx = canvas.getContext("2d");

  const w = (canvas.width = window.innerWidth);
  const h = (canvas.height = window.innerHeight);

  canvas.classList.add("active");

  // Tạo cơn bão gồm 160 cánh hoa cỡ lớn xuất phát từ mép trên và góc trên bên trái
  const petals = [];
  const petalCount = 160;

  for (let i = 0; i < petalCount; i++) {
    petals.push({
      // BẮT ĐẦU TỪ GÓC MÀN HÌNH PHÍA TRÊN & MÉP TRÊN
      x: -150 + Math.random() * (w * 0.8),
      y: -160 + Math.random() * 80, // Sát trên mép màn hình
      size: 26 + Math.random() * 36,
      vx: 20 + Math.random() * 18,
      vy: 16 + Math.random() * 15,
      rotation: Math.random() * 360,
      rotSpeed: 4 + Math.random() * 8,
      opacity: 0.88 + Math.random() * 0.12,
      type: Math.random() > 0.4 ? "rose" : "cherry"
    });
  }

  let startTime = performance.now();
  let contentSwitched = false;

  function renderGust(now) {
    const elapsed = now - startTime;
    ctx.clearRect(0, 0, w, h);

    // Ở 300ms: Khi bão hoa bắt đầu che kín màn hình, chuyển đổi nội dung
    if (elapsed >= 300 && !contentSwitched) {
      contentSwitched = true;
      if (typeof onSwitchContent === "function") onSwitchContent();
    }

    petals.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.65);
      ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.45, p.size * 0.6, p.size * 0.45, 0, p.size * 0.75);
      ctx.bezierCurveTo(-p.size * 0.6, p.size * 0.45, -p.size * 0.6, -p.size * 0.45, 0, -p.size * 0.65);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, -p.size * 0.65, 0, p.size * 0.75);
      if (p.type === "rose") {
        grad.addColorStop(0, "rgba(255, 200, 215, 0.95)");
        grad.addColorStop(0.5, "rgba(225, 29, 72, 0.9)");
        grad.addColorStop(1, "rgba(159, 18, 57, 0.95)");
      } else {
        grad.addColorStop(0, "rgba(254, 240, 138, 0.95)");
        grad.addColorStop(0.6, "rgba(251, 191, 36, 0.9)");
        grad.addColorStop(1, "rgba(244, 63, 94, 0.9)");
      }
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.restore();
    });

    if (elapsed < 850) {
      requestAnimationFrame(renderGust);
    } else {
      ctx.clearRect(0, 0, w, h);
      canvas.classList.remove("active");
    }
  }

  requestAnimationFrame(renderGust);
}

/* ==========================================================================
   4. RẠP CHIẾU VIDEO NGHỆ THUẬT (ĐÃ BỎ LỜI CHÚC TRÊN MỖI VIDEO)
   ========================================================================== */
function openStudentVideo(index) {
  if (index < 0) index = STUDENTS_DATA.length - 1;
  if (index >= STUDENTS_DATA.length) index = 0;

  const currentView = document.getElementById("intro-view");
  const nextView = document.getElementById("theater-view");

  // BƯỚC 1: KHUNG TRƯỚC ĐÓ PHAI DẦN ĐI TRƯỚC
  currentView.classList.add("fade-out");

  // BƯỚC 2: BÃO HOA BAY VỤT TỪ GÓC TRÊN MÀN HÌNH CHÉO XUỐNG
  runFloralFlurryTransition(() => {
    currentStudentIndex = index;
    const student = STUDENTS_DATA[index];

    // Ẩn khung cũ, bật khung mới
    currentView.classList.remove("active-view", "fade-out");
    nextView.classList.add("active-view");

    window.scrollTo({ top: 100, behavior: "smooth" });

    // Cập nhật thông tin học sinh (Không còn lời chúc trên video)
    document.getElementById("theater-page-count").textContent = `Trang ${index + 1} / ${STUDENTS_DATA.length}`;
    document.getElementById("card-index-tag").textContent = `${String(index + 1).padStart(2, "0")} / ${STUDENTS_DATA.length} • 11B2`;
    document.getElementById("card-student-name").textContent = student.name;
    document.getElementById("card-avatar-img").src = student.avatarUrl || "assets/original.jpg";

    const videoElem = document.getElementById("active-video-player");
    const placeholderCard = document.getElementById("video-placeholder-card");

    const uploadedVideoUrl = userUploadedVideos[student.id];
    const videoSrc = uploadedVideoUrl || student.video;

    videoElem.pause();
    videoElem.removeAttribute("src");

    if (uploadedVideoUrl) {
      videoElem.src = uploadedVideoUrl;
      videoElem.classList.add("ready");
      placeholderCard.style.display = "none";
      videoElem.play().catch(() => {});
    } else {
      fetch(videoSrc, { method: "HEAD" })
        .then(res => {
          if (res.ok) {
            videoElem.src = videoSrc;
            videoElem.classList.add("ready");
            placeholderCard.style.display = "none";
            videoElem.play().catch(() => {});
          } else {
            showPlaceholderVideo(videoElem, placeholderCard);
          }
        })
        .catch(() => {
          showPlaceholderVideo(videoElem, placeholderCard);
        });
    }

    highlightCarouselItem(index);

    // BƯỚC 3: CÁC CHI TIẾT KHUNG SAU DẦN HIỆN LÊN SAU LUỒNG GIÓ HOA
    triggerStaggeredEntrance();
  });
}

function triggerStaggeredEntrance() {
  const staggers = document.querySelectorAll(".stagger-1, .stagger-2, .stagger-3, .stagger-4");
  staggers.forEach(el => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "";
  });
}

function showPlaceholderVideo(videoElem, placeholderCard) {
  videoElem.classList.remove("ready");
  videoElem.style.display = "none";
  placeholderCard.style.display = "flex";
}

function backToGroupIntro() {
  const currentView = document.getElementById("theater-view");
  const nextView = document.getElementById("intro-view");

  currentView.classList.add("fade-out");

  runFloralFlurryTransition(() => {
    const videoElem = document.getElementById("active-video-player");
    videoElem.pause();

    currentView.classList.remove("active-view", "fade-out");
    nextView.classList.add("active-view");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function switchVideoWithCardFlip(newIndex) {
  const royalFrame = document.getElementById("royal-video-frame");
  royalFrame.classList.remove("flip-in");
  royalFrame.classList.add("flip-out");

  setTimeout(() => {
    openStudentVideoImmediate(newIndex);
    royalFrame.classList.remove("flip-out");
    royalFrame.classList.add("flip-in");
  }, 220);
}

function openStudentVideoImmediate(index) {
  if (index < 0) index = STUDENTS_DATA.length - 1;
  if (index >= STUDENTS_DATA.length) index = 0;

  currentStudentIndex = index;
  const student = STUDENTS_DATA[index];

  document.getElementById("theater-page-count").textContent = `Trang ${index + 1} / ${STUDENTS_DATA.length}`;
  document.getElementById("card-index-tag").textContent = `${String(index + 1).padStart(2, "0")} / ${STUDENTS_DATA.length} • 11B2`;
  document.getElementById("card-student-name").textContent = student.name;
  document.getElementById("card-avatar-img").src = student.avatarUrl || "assets/original.jpg";

  const videoElem = document.getElementById("active-video-player");
  const placeholderCard = document.getElementById("video-placeholder-card");

  const uploadedVideoUrl = userUploadedVideos[student.id];
  const videoSrc = uploadedVideoUrl || student.video;

  videoElem.pause();
  videoElem.removeAttribute("src");

  if (uploadedVideoUrl) {
    videoElem.src = uploadedVideoUrl;
    videoElem.classList.add("ready");
    placeholderCard.style.display = "none";
    videoElem.play().catch(() => {});
  } else {
    fetch(videoSrc, { method: "HEAD" })
      .then(res => {
        if (res.ok) {
          videoElem.src = videoSrc;
          videoElem.classList.add("ready");
          placeholderCard.style.display = "none";
          videoElem.play().catch(() => {});
        } else {
          showPlaceholderVideo(videoElem, placeholderCard);
        }
      })
      .catch(() => {
        showPlaceholderVideo(videoElem, placeholderCard);
      });
  }

  highlightCarouselItem(index);
}

function prevVideo() {
  switchVideoWithCardFlip(currentStudentIndex - 1);
}

function nextVideo() {
  switchVideoWithCardFlip(currentStudentIndex + 1);
}

/* ==========================================================================
   5. CÁNH HOA & TRÁI TIM RƠI NỀN (3D TO RÕ LỘNG LẪY)
   ========================================================================== */
function initLarge3DParticlesEffect() {
  const canvas = document.getElementById("petals-canvas");
  const ctx = canvas.getContext("2d");

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const particlesCount = 42;
  const particles = [];

  for (let i = 0; i < particlesCount; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      z: 40 + Math.random() * 380,
      type: Math.random() > 0.4 ? "heart" : "petal",
      baseSize: 30 + Math.random() * 26,
      speedX: -0.6 + Math.random() * 1.2,
      speedY: 1.1 + Math.random() * 1.6,
      speedZ: -0.2 + Math.random() * 0.4,
      yaw: Math.random() * Math.PI * 2,
      pitch: Math.random() * Math.PI * 2,
      roll: Math.random() * Math.PI * 2,
      dYaw: 0.012 + Math.random() * 0.02,
      dPitch: 0.008 + Math.random() * 0.016,
      dRoll: 0.006 + Math.random() * 0.012,
      sway: Math.random() * 100,
      swaySpeed: 0.018 + Math.random() * 0.014,
      hue: Math.random() > 0.2 ? 350 : 45
    });
  }

  const lightDir = { x: -0.4, y: -0.6, z: 0.7 };
  const lightLen = Math.hypot(lightDir.x, lightDir.y, lightDir.z);
  lightDir.x /= lightLen;
  lightDir.y /= lightLen;
  lightDir.z /= lightLen;

  function drawBig3DHeart(ctx, size, diffuseLight) {
    ctx.beginPath();
    const topCurveHeight = size * 0.35;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(-size * 0.52, -size * 0.22, -size * 0.82, size * 0.42, 0, size * 0.98);
    ctx.bezierCurveTo(size * 0.82, size * 0.42, size * 0.52, -size * 0.22, 0, topCurveHeight);
    ctx.closePath();

    const brightR = Math.min(255, Math.floor(228 * diffuseLight + 27));
    const brightG = Math.min(255, Math.floor(29 * diffuseLight + 22));
    const brightB = Math.min(255, Math.floor(74 * diffuseLight + 32));

    const grad = ctx.createRadialGradient(-size * 0.22, -size * 0.1, 0, 0, size * 0.4, size);
    grad.addColorStop(0, `rgb(${brightR + 25}, ${brightG + 65}, ${brightB + 85})`);
    grad.addColorStop(0.65, `rgb(${brightR}, ${brightG}, ${brightB})`);
    grad.addColorStop(1, `rgb(${Math.floor(brightR * 0.65)}, 12, 28)`);

    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(-size * 0.24, size * 0.12, size * 0.2, size * 0.09, -0.4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.45 * diffuseLight})`;
    ctx.fill();
  }

  function drawBig3DPetal(ctx, size, diffuseLight) {
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.65);
    ctx.bezierCurveTo(size * 0.6, -size * 0.45, size * 0.6, size * 0.45, 0, size * 0.75);
    ctx.bezierCurveTo(-size * 0.6, size * 0.45, -size * 0.6, -size * 0.45, 0, -size * 0.65);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, -size * 0.65, 0, size * 0.75);
    grad.addColorStop(0, `rgba(255, 225, 235, ${diffuseLight * 0.95})`);
    grad.addColorStop(0.55, `rgba(244, 63, 94, ${diffuseLight * 0.9})`);
    grad.addColorStop(1, `rgba(190, 18, 60, ${diffuseLight * 0.85})`);

    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, -size * 0.5);
    ctx.quadraticCurveTo(size * 0.1, 0, 0, size * 0.6);
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 * diffuseLight})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  function render() {
    ctx.clearRect(0, 0, w, h);

    particles.sort((a, b) => b.z - a.z);
    const fov = 420;

    particles.forEach(p => {
      p.sway += p.swaySpeed;
      p.x += p.speedX + Math.sin(p.sway) * 1.1;
      p.y += p.speedY;
      p.z += p.speedZ;

      p.yaw += p.dYaw;
      p.pitch += p.dPitch;
      p.roll += p.dRoll;

      if (p.y > h + 50) {
        p.y = -50;
        p.x = Math.random() * w;
        p.z = 40 + Math.random() * 380;
      }
      if (p.x > w + 50) p.x = -50;
      if (p.x < -50) p.x = w + 50;

      const depthScale = fov / (fov + p.z);
      const renderSize = p.baseSize * depthScale;

      const cosYaw = Math.cos(p.yaw);
      const sinYaw = Math.sin(p.yaw);
      const cosPitch = Math.cos(p.pitch);
      const sinPitch = Math.sin(p.pitch);

      const normX = -sinYaw * cosPitch;
      const normY = sinPitch;
      const normZ = cosYaw * cosPitch;

      const dot = normX * lightDir.x + normY * lightDir.y + normZ * lightDir.z;
      const diffuseLight = Math.max(0.45, Math.min(1.25, 0.7 + dot * 0.45));
      const alpha = Math.max(0.35, Math.min(0.98, (500 - p.z) / 450));

      ctx.save();
      ctx.translate(p.x, p.y);

      ctx.transform(
        cosYaw * depthScale,
        sinPitch * sinYaw * depthScale,
        0,
        cosPitch * depthScale,
        0,
        0
      );
      ctx.rotate(p.roll);
      ctx.globalAlpha = alpha;

      ctx.shadowColor = p.hue === 350 ? "rgba(244, 63, 94, 0.45)" : "rgba(251, 191, 36, 0.45)";
      ctx.shadowBlur = 10 * depthScale;

      if (p.type === "heart") {
        drawBig3DHeart(ctx, renderSize, diffuseLight);
      } else {
        drawBig3DPetal(ctx, renderSize, diffuseLight);
      }

      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   6. BĂNG CHUYỀN AVATAR & MODAL DANH SÁCH CẢ LỚP
   ========================================================================== */
function initBottomCarousel() {
  const container = document.getElementById("avatar-scroll-container");
  container.innerHTML = "";

  STUDENTS_DATA.forEach((student, index) => {
    const item = document.createElement("div");
    item.className = "carousel-student-item";
    item.dataset.index = index;
    item.id = `carousel-item-${index}`;

    item.innerHTML = `
      <div class="carousel-avatar-wrap">
        <img class="carousel-avatar-img student-avatar-${student.id}" src="${student.avatarUrl || 'assets/original.jpg'}" alt="${student.name}" />
      </div>
      <span class="carousel-name">${student.name}</span>
    `;

    item.addEventListener("click", () => {
      openStudentVideo(index);
    });

    container.appendChild(item);
  });
}

function highlightCarouselItem(index) {
  document.querySelectorAll(".carousel-student-item").forEach(item => {
    item.classList.remove("active");
  });

  const activeItem = document.getElementById(`carousel-item-${index}`);
  if (activeItem) {
    activeItem.classList.add("active");
    activeItem.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }
}

function refreshAllAvatars() {
  STUDENTS_DATA.forEach(student => {
    if (student.avatarUrl) {
      document.querySelectorAll(`.student-avatar-${student.id}`).forEach(img => {
        img.src = student.avatarUrl;
      });
    }
  });
}

function initModalGrid() {
  const grid = document.getElementById("modal-grid-body");
  grid.innerHTML = "";

  STUDENTS_DATA.forEach((student, index) => {
    const item = document.createElement("div");
    item.className = "grid-student-item";
    item.dataset.name = student.name.toLowerCase();

    item.innerHTML = `
      <img class="grid-avatar student-avatar-${student.id}" src="${student.avatarUrl || 'assets/original.jpg'}" alt="${student.name}" />
      <span class="grid-name">${student.name}</span>
    `;

    item.addEventListener("click", () => {
      closeAllModal();
      openStudentVideo(index);
    });

    grid.appendChild(item);
  });
}

function openAllModal() {
  document.getElementById("modal-all-students").classList.add("open");
  document.getElementById("modal-search-input").value = "";
  filterModalStudents("");
}

function closeAllModal() {
  document.getElementById("modal-all-students").classList.remove("open");
}

function filterModalStudents(keyword) {
  const items = document.querySelectorAll(".grid-student-item");
  const cleanKey = keyword.toLowerCase().trim();

  items.forEach(item => {
    if (!cleanKey || item.dataset.name.includes(cleanKey)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

/* ==========================================================================
   7. PHÁT NHẠC NỀN MP3 TỪ FILE "nhac.mp3"
   ========================================================================== */
function toggleBackgroundMusic() {
  const audio = document.getElementById("bg-audio");
  const btn = document.getElementById("toggle-music-btn");

  if (!audio) {
    console.warn("Không tìm thấy thẻ audio có id 'bg-audio' trong HTML!");
    return;
  }

  if (isMusicPlaying) {
    audio.pause();
    isMusicPlaying = false;
    if (btn) {
      btn.classList.remove("active");
      btn.innerHTML = `<span>🎵</span> Bật Nhạc`;
    }
  } else {
    audio.play().then(() => {
      isMusicPlaying = true;
      if (btn) {
        btn.classList.add("active");
        btn.innerHTML = `<span>🎶</span> Tắt Nhạc`;
      }
    }).catch(err => {
      console.log("Lỗi phát nhạc MP3:", err);
    });
  }
}

function startAcousticMelody() {}

function playChimeSound() {
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.15);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {}
}

function playChimeSound() {
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.15);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {}
}

/* ==========================================================================
   8. SỰ KIỆN TƯƠNG TÁC KHÁC
   ========================================================================== */
function initEventListeners() {
  const btnBlend = document.getElementById("mode-blend-btn");
  const btnOriginal = document.getElementById("mode-orig-btn");
  const groupImg = document.getElementById("group-photo-img");

  btnBlend.addEventListener("click", () => {
    btnBlend.classList.add("active");
    btnOriginal.classList.remove("active");
    groupImg.classList.add("blended-mode");
  });

  btnOriginal.addEventListener("click", () => {
    btnOriginal.classList.add("active");
    btnBlend.classList.remove("active");
    groupImg.classList.remove("blended-mode");
  });

  const videoInput = document.getElementById("local-video-input");
  videoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const currentStudent = STUDENTS_DATA[currentStudentIndex];
      const videoBlobUrl = URL.createObjectURL(file);
      userUploadedVideos[currentStudent.id] = videoBlobUrl;

      const videoElem = document.getElementById("active-video-player");
      const placeholderCard = document.getElementById("video-placeholder-card");

      videoElem.src = videoBlobUrl;
      videoElem.style.display = "block";
      videoElem.classList.add("ready");
      placeholderCard.style.display = "none";
      videoElem.play();
    }
  });

  const searchInput = document.getElementById("modal-search-input");
  searchInput.addEventListener("input", (e) => {
    filterModalStudents(e.target.value);
  });

  window.addEventListener("keydown", (e) => {
    const theaterView = document.getElementById("theater-view");
    if (theaterView.classList.contains("active-view")) {
      if (e.key === "ArrowLeft") prevVideo();
      if (e.key === "ArrowRight") nextVideo();
      if (e.key === "Escape") backToGroupIntro();
    }
  });
}

function sendLoveHeart(event) {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.innerHTML = ["💖", "🌸", "💐", "❤️", "✨"][Math.floor(Math.random() * 5)];

  const x = event.clientX || window.innerWidth / 2;
  const y = event.clientY || window.innerHeight / 2;

  heart.style.left = `${x - 12 + (Math.random() * 24 - 12)}px`;
  heart.style.top = `${y - 12}px`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1300);

  playChimeSound();
}
