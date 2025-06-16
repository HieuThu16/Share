// Khởi tạo dữ liệu
let youtubeData = [];
let bookReviewsData = [];
let videoAuthors = [];
let bookAuthors = [];

// Hàm tạo placeholder image bằng Canvas
function createPlaceholderImage(width, height, text) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  // Background
  ctx.fillStyle = "#f8f9fa";
  ctx.fillRect(0, 0, width, height);

  // Border
  ctx.strokeStyle = "#dee2e6";
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, width - 2, height - 2);

  // Text
  ctx.fillStyle = "#6c757d";
  ctx.font = "bold 16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Icon
  const icon = text === "Video" ? "🎥" : "📚";
  ctx.font = "bold 24px Arial";
  ctx.fillText(icon, width / 2, height / 2 - 15);

  // Text
  ctx.font = "bold 14px Arial";
  ctx.fillText(`No ${text}`, width / 2, height / 2 + 15);

  return canvas.toDataURL();
}

// Load dữ liệu từ file JSON
async function loadData() {
  try {
    // Trong development mode, ưu tiên load từ localStorage
    if (isDevelopment()) {
      const savedYoutubeData = localStorage.getItem("youtubeData");
      const savedBookData = localStorage.getItem("bookReviewsData");

      if (savedYoutubeData) {
        youtubeData = JSON.parse(savedYoutubeData);
        console.log(
          "Loaded YouTube data from localStorage:",
          youtubeData.length,
          "items"
        );
      }

      if (savedBookData) {
        bookReviewsData = JSON.parse(savedBookData);
        console.log(
          "Loaded book data from localStorage:",
          bookReviewsData.length,
          "items"
        );
      }
    }

    // Nếu chưa có dữ liệu, load từ file JSON
    if (youtubeData.length === 0) {
      try {
        const youtubeResponse = await fetch("data/youtube.json");
        if (youtubeResponse.ok) {
          youtubeData = await youtubeResponse.json();
        } else {
          youtubeData = window.sampleYoutubeData || [];
        }
      } catch (e) {
        youtubeData = window.sampleYoutubeData || [];
      }
    }

    if (bookReviewsData.length === 0) {
      try {
        const bookResponse = await fetch("data/books.json");
        if (bookResponse.ok) {
          bookReviewsData = await bookResponse.json();
        } else {
          bookReviewsData = window.sampleBookReviews || [];
        }
      } catch (e) {
        bookReviewsData = window.sampleBookReviews || [];
      }
    }

    // Load authors từ localStorage
    loadAuthors();

    // Extract authors từ dữ liệu hiện có
    extractAuthorsFromData();

    // Populate author lists
    populateAuthorLists();

    // Render dữ liệu
    renderYoutubeCards();
    renderBookReviews();
  } catch (error) {
    console.error("Error loading data:", error);
    // Fallback to sample data
    youtubeData = window.sampleYoutubeData || [];
    bookReviewsData = window.sampleBookReviews || [];
    loadAuthors();
    extractAuthorsFromData();
    populateAuthorLists();
    renderYoutubeCards();
    renderBookReviews();
  }
}

// Hàm lưu dữ liệu vào server
async function saveDataToServer(type, data) {
  try {
    // Sử dụng Mock API trong development mode
    if (isDevelopment() && window.MockAPI) {
      console.log("Using Mock API in development mode");
      const mockApi = new window.MockAPI();
      const result = await mockApi.saveData(type, data);
      console.log("Mock API result:", result);
      return result;
    }

    // Sử dụng real API trong production
    const response = await fetch("/api/save-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
        data: data,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Data saved successfully:", result);
    return result;
  } catch (error) {
    console.error("Error saving data to server:", error);

    // Fallback: lưu vào localStorage nếu không thể lưu lên server
    if (isDevelopment()) {
      console.log("Fallback to localStorage in development mode");
      if (type === "youtube") {
        localStorage.setItem("youtubeData", JSON.stringify(youtubeData));
      } else if (type === "books") {
        localStorage.setItem(
          "bookReviewsData",
          JSON.stringify(bookReviewsData)
        );
      }
      showNotification(
        "⚠️ Đã lưu vào localStorage (development mode)",
        "warning"
      );
      return { success: true, message: "Saved to localStorage" };
    } else {
      showNotification("❌ Có lỗi khi lưu dữ liệu: " + error.message, "error");
      throw error;
    }
  }
}

// Hàm kiểm tra môi trường development
function isDevelopment() {
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.includes("localhost")
  );
}

// Hàm download JSON file
function downloadJSON(data, filename) {
  const dataStr = JSON.stringify(data, null, 2);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const exportFileDefaultName = filename;
  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

// Hàm load authors từ localStorage
function loadAuthors() {
  const savedVideoAuthors = localStorage.getItem("videoAuthors");
  const savedBookAuthors = localStorage.getItem("bookAuthors");

  if (savedVideoAuthors) {
    videoAuthors = JSON.parse(savedVideoAuthors);
  }

  if (savedBookAuthors) {
    bookAuthors = JSON.parse(savedBookAuthors);
  }
}

// Hàm lưu authors vào localStorage
function saveAuthors() {
  localStorage.setItem("videoAuthors", JSON.stringify(videoAuthors));
  localStorage.setItem("bookAuthors", JSON.stringify(bookAuthors));
}

// Hàm extract authors từ dữ liệu hiện có
function extractAuthorsFromData() {
  // Extract video authors
  youtubeData.forEach((video) => {
    if (video.author && !videoAuthors.includes(video.author)) {
      videoAuthors.push(video.author);
    }
  });

  // Extract book authors
  bookReviewsData.forEach((book) => {
    if (book.author && !bookAuthors.includes(book.author)) {
      bookAuthors.push(book.author);
    }
  });

  // Sort authors alphabetically
  videoAuthors.sort();
  bookAuthors.sort();
}

// Hàm thêm author mới
function addNewAuthor(author, type) {
  if (type === "video" && !videoAuthors.includes(author)) {
    videoAuthors.push(author);
    videoAuthors.sort();
    saveAuthors();
    populateAuthorLists();
  } else if (type === "book" && !bookAuthors.includes(author)) {
    bookAuthors.push(author);
    bookAuthors.sort();
    saveAuthors();
    populateAuthorLists();
  }
}

// Hàm populate author lists
function populateAuthorLists() {
  // Populate video authors list
  const videoAuthorsList = document.getElementById("authorsList");
  if (videoAuthorsList) {
    videoAuthorsList.innerHTML = "";
    videoAuthors.forEach((author) => {
      const option = document.createElement("option");
      option.value = author;
      videoAuthorsList.appendChild(option);
    });
  }

  // Populate book authors list
  const bookAuthorsList = document.getElementById("bookAuthorsList");
  if (bookAuthorsList) {
    bookAuthorsList.innerHTML = "";
    bookAuthors.forEach((author) => {
      const option = document.createElement("option");
      option.value = author;
      bookAuthorsList.appendChild(option);
    });
  }
}

// Hàm hiển thị section
function showSection(sectionId) {
  // Ẩn tất cả các section
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  // Hiển thị section được chọn
  document.getElementById(sectionId).classList.add("active");

  // Cập nhật trạng thái active của navigation
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  document
    .querySelector(`[onclick="showSection('${sectionId}')"]`)
    .classList.add("active");
}

// Hàm mở form thêm video
function openAddVideoForm() {
  document.getElementById("addVideoModal").style.display = "block";
}

// Hàm đóng form thêm video
function closeAddVideoForm() {
  document.getElementById("addVideoModal").style.display = "none";
  document.getElementById("addVideoForm").reset();
}

// Hàm mở form thêm sách
function openAddBookForm() {
  document.getElementById("addBookModal").style.display = "block";
}

// Hàm đóng form thêm sách
function closeAddBookForm() {
  document.getElementById("addBookModal").style.display = "none";
  document.getElementById("addBookForm").reset();
}

// Xử lý submit form thêm video
document.addEventListener("DOMContentLoaded", function () {
  const addVideoForm = document.getElementById("addVideoForm");
  if (addVideoForm) {
    addVideoForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const author = formData.get("author");
      const videoData = {
        id: Date.now(), // Simple ID generation
        title: formData.get("title"),
        author: author,
        url: formData.get("url"),
        summary: formData.get("summary"),
        coreContent: formData.get("coreContent"),
        personalShare: formData.get("personalShare"),
        thumbnail: formData.get("thumbnail")
          ? URL.createObjectURL(formData.get("thumbnail"))
          : null,
        dateAdded: new Date().toISOString(),
      };

      // Thêm author mới vào danh sách nếu chưa có
      addNewAuthor(author, "video");

      // Lưu dữ liệu lên server
      saveDataToServer("youtube", videoData)
        .then(() => {
          // Thêm vào mảng dữ liệu local
          youtubeData.unshift(videoData);

          // Render lại danh sách video
          renderYoutubeCards();

          // Đóng form và reset
          closeAddVideoForm();

          // Hiển thị thông báo thành công
          showNotification("✅ Video đã được thêm thành công!", "success");
        })
        .catch((error) => {
          console.error("Failed to save video:", error);
          // Vẫn thêm vào local array để user không mất dữ liệu
          youtubeData.unshift(videoData);
          renderYoutubeCards();
          closeAddVideoForm();
          showNotification(
            "⚠️ Video đã được thêm nhưng có thể chưa lưu lên server",
            "warning"
          );
        });
    });
  }

  // Xử lý submit form thêm sách
  const addBookForm = document.getElementById("addBookForm");
  if (addBookForm) {
    addBookForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const author = formData.get("author");
      const bookData = {
        id: Date.now(),
        title: formData.get("title"),
        author: author,
        rating: parseInt(formData.get("rating")),
        summary: formData.get("summary"),
        review: formData.get("review"),
        coverImage: formData.get("coverImage")
          ? URL.createObjectURL(formData.get("coverImage"))
          : null,
        dateAdded: new Date().toISOString(),
      };

      // Thêm author mới vào danh sách nếu chưa có
      addNewAuthor(author, "book");

      // Lưu dữ liệu lên server
      saveDataToServer("books", bookData)
        .then(() => {
          // Thêm vào mảng dữ liệu local
          bookReviewsData.unshift(bookData);

          // Render lại danh sách sách
          renderBookReviews();

          // Đóng form và reset
          closeAddBookForm();

          // Hiển thị thông báo thành công
          showNotification(
            "✅ Review sách đã được thêm thành công!",
            "success"
          );
        })
        .catch((error) => {
          console.error("Failed to save book:", error);
          // Vẫn thêm vào local array để user không mất dữ liệu
          bookReviewsData.unshift(bookData);
          renderBookReviews();
          closeAddBookForm();
          showNotification(
            "⚠️ Review đã được thêm nhưng có thể chưa lưu lên server",
            "warning"
          );
        });
    });
  }
});

// Hàm render danh sách video
function renderYoutubeCards() {
  const container = document.getElementById("youtubeCardsContainer");
  if (!container) return;

  container.innerHTML = "";

  if (youtubeData.length === 0) {
    container.innerHTML =
      '<p class="no-data">Chưa có video nào. Hãy thêm video đầu tiên!</p>';
    return;
  }

  youtubeData.forEach((video, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const imgSrc = video.thumbnail || createPlaceholderImage(300, 200, "Video");
    const placeholderSrc = createPlaceholderImage(300, 200, "Video");

    card.innerHTML = `
      <img src="${imgSrc}" alt="${video.title}" 
           onerror="this.src='${placeholderSrc}'" 
           onload="this.classList.remove('loading')"
           class="loading">
      <div class="card-content">
        <h3>${video.title}</h3>
        <p class="author">👨‍💻 ${video.author}</p>
        <p class="summary">${video.summary}</p>
        <div class="card-actions">
          <button onclick="showVideoDetail(${index})" class="btn btn-primary">Xem chi tiết</button>
          <a href="${video.url}" target="_blank" class="btn btn-secondary">YouTube</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Hàm render danh sách sách
function renderBookReviews() {
  const container = document.getElementById("bookReviewsContainer");
  if (!container) return;

  container.innerHTML = "";

  if (bookReviewsData.length === 0) {
    container.innerHTML =
      '<p class="no-data">Chưa có review sách nào. Hãy thêm review đầu tiên!</p>';
    return;
  }

  bookReviewsData.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const imgSrc = book.coverImage || createPlaceholderImage(300, 400, "Book");
    const placeholderSrc = createPlaceholderImage(300, 400, "Book");

    card.innerHTML = `
      <img src="${imgSrc}" alt="${book.title}" 
           onerror="this.src='${placeholderSrc}'" 
           onload="this.classList.remove('loading')"
           class="loading">
      <div class="card-content">
        <h3>${book.title}</h3>
        <p class="author">✍️ ${book.author}</p>
        <p class="rating">${"⭐".repeat(book.rating)} (${book.rating}/5)</p>
        <p class="summary">${book.summary}</p>
        <button onclick="showBookDetail(${index})" class="btn btn-primary">Xem review</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Hàm hiển thị chi tiết video
function showVideoDetail(index) {
  const video = youtubeData[index];
  const modal = document.getElementById("videoModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = video.title;
  modalBody.innerHTML = `
    <div class="video-detail">
      <div class="video-thumbnail">
        <img src="${
          video.thumbnail || createPlaceholderImage(400, 300, "Video")
        }" alt="${video.title}">
      </div>
      <div class="detail-content">
        <div class="video-meta">
          <p><strong>👨‍💻 Tác giả:</strong> ${video.author}</p>
        </div>
        <div class="video-summary">
          <h4>📋 Tóm tắt:</h4>
          <p>${video.summary}</p>
        </div>
        <div class="core-content">
          <h4>📚 Nội dung cốt lõi:</h4>
          <div>${video.coreContent.replace(/\n/g, "<br>")}</div>
        </div>
        <div class="personal-share">
          <h4>💭 Chia sẻ cá nhân:</h4>
          <div>${video.personalShare}</div>
        </div>
        <div class="video-actions">
          <a href="${
            video.url
          }" target="_blank" class="btn btn-primary">🎥 Xem trên YouTube</a>
        </div>
      </div>
    </div>
  `;

  modal.style.display = "block";
}

// Hàm hiển thị chi tiết sách
function showBookDetail(index) {
  const book = bookReviewsData[index];
  const modal = document.getElementById("videoModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = book.title;
  modalBody.innerHTML = `
    <div class="book-detail">
      <div class="book-cover">
        <img src="${
          book.coverImage || createPlaceholderImage(300, 400, "Book")
        }" alt="${book.title}">
      </div>
      <div class="detail-content">
        <div class="book-meta">
          <p><strong>✍️ Tác giả:</strong> ${book.author}</p>
          <p><strong>⭐ Đánh giá:</strong> ${book.rating}/5 sao</p>
        </div>
        <div class="book-summary">
          <h4>📋 Tóm tắt:</h4>
          <p>${book.summary}</p>
        </div>
        <div class="book-review">
          <h4>📝 Review chi tiết:</h4>
          <div>${book.review}</div>
        </div>
      </div>
    </div>
  `;

  modal.style.display = "block";
}

// Hàm đóng modal
function closeModal() {
  document.getElementById("videoModal").style.display = "none";
}

// Đóng modal khi click outside
window.onclick = function (event) {
  const videoModal = document.getElementById("videoModal");
  const addVideoModal = document.getElementById("addVideoModal");
  const addBookModal = document.getElementById("addBookModal");

  if (event.target === videoModal) {
    videoModal.style.display = "none";
  }
  if (event.target === addVideoModal) {
    closeAddVideoForm();
  }
  if (event.target === addBookModal) {
    closeAddBookForm();
  }
};

// Hàm hiển thị thông báo
function showNotification(message, type = "info") {
  // Tạo element thông báo
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Xác định màu sắc
  let bgColor;
  switch (type) {
    case "success":
      bgColor = "#28a745";
      break;
    case "error":
      bgColor = "#dc3545";
      break;
    case "warning":
      bgColor = "#ffc107";
      break;
    default:
      bgColor = "#007bff";
  }

  // Thêm styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${bgColor};
    color: ${type === "warning" ? "#000" : "#fff"};
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    z-index: 1002;
    animation: slideIn 0.3s ease;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    max-width: 300px;
  `;

  // Thêm CSS animation
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // Thêm vào trang
  document.body.appendChild(notification);

  // Xóa sau 4 giây
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Hiển thị development mode indicator
function showDevModeIndicator() {
  if (isDevelopment()) {
    const indicator = document.createElement("div");
    indicator.innerHTML = "🔧 DEV MODE - Data saved to localStorage";
    indicator.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: #17a2b8;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.8rem;
      z-index: 1000;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(indicator);
  }
}

// Load dữ liệu khi trang được tải
window.addEventListener("load", function () {
  loadData();
  showDevModeIndicator();
});
