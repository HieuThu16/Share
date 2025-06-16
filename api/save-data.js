import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Chỉ cho phép POST request
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type, data } = req.body;

    if (!type || !data) {
      return res.status(400).json({ error: "Missing type or data" });
    }

    // Xác định file path
    let filePath;
    if (type === "youtube") {
      filePath = path.join(process.cwd(), "data", "youtube.json");
    } else if (type === "books") {
      filePath = path.join(process.cwd(), "data", "books.json");
    } else {
      return res.status(400).json({ error: "Invalid type" });
    }

    // Đọc dữ liệu hiện tại
    let currentData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      currentData = JSON.parse(fileContent);
    }

    // Thêm dữ liệu mới vào đầu mảng
    currentData.unshift(data);

    // Ghi lại file
    fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));

    return res.status(200).json({
      success: true,
      message: "Data saved successfully",
      totalItems: currentData.length,
    });
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
