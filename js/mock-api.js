// Mock API cho môi trường development
class MockAPI {
  constructor() {
    this.baseUrl = window.location.origin;
  }

  async saveData(type, data) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      // Lưu vào localStorage như fallback
      const storageKey = type === "youtube" ? "youtubeData" : "bookReviewsData";
      let currentData = [];

      const stored = localStorage.getItem(storageKey);
      if (stored) {
        currentData = JSON.parse(stored);
      }

      // Thêm dữ liệu mới vào đầu
      currentData.unshift(data);

      // Lưu lại
      localStorage.setItem(storageKey, JSON.stringify(currentData));

      console.log(`Mock API: Saved ${type} data to localStorage`, data);

      return {
        success: true,
        message: "Data saved successfully (mock)",
        totalItems: currentData.length,
      };
    } catch (error) {
      throw new Error("Mock API error: " + error.message);
    }
  }
}

// Export mock API
window.MockAPI = MockAPI;
