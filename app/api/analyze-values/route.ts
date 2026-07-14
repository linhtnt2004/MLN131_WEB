import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    // 1. Lấy dữ liệu người dùng gửi lên
    const body = await request.json();
    const { choices } = body;

    // Lấy API key từ header (do frontend gửi)
    const userApiKey = request.headers.get("x-gemini-api-key");
    
    // Ưu tiên dùng key của user, nếu không có thì dùng key ở .env
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Thiếu API Key. Vui lòng nhập API Key hoặc cấu hình trên server." },
        { status: 401 },
      );
    }

    // Khởi tạo Gemini với key vừa lấy được
    const genAI = new GoogleGenerativeAI(apiKey);

    if (!choices || !Array.isArray(choices) || choices.length === 0) {
      return NextResponse.json(
        { success: false, error: "Vui lòng chọn ít nhất một tình huống" },
        { status: 400 },
      );
    }

    // 2. Format lại danh sách lựa chọn để AI dễ hiểu
    const formattedChoices = choices
      .map(
        (c: any, index: number) =>
          `Tình huống ${index + 1}: Người dùng chọn "${c.optionText}"`,
      )
      .join("\n");

    // 3. Viết Prompt ra lệnh cho AI
    const prompt = `
Bạn là một chuyên gia xã hội học về gia đình Việt Nam. Bạn đang phân tích kết quả trắc nghiệm của một người trẻ tuổi trong thời kỳ 4.0.

Dưới đây là các lựa chọn của họ trong các tình huống gia đình:
${formattedChoices}

Yêu cầu:
1. Viết một đoạn nhận xét ngắn (khoảng 3-4 câu) bằng giọng văn gần gũi, hài hước và thân thiện.
2. Phân tích xem phong cách sống của họ đang nghiêng về Truyền thống, Hiện đại, hay Cân bằng.
3. Đưa ra 1 lời khuyên ngắn gọn để giúp họ kết nối các giá trị truyền thống với nhịp sống số.
Lưu ý: Không dùng markdown in đậm in nghiêng, trả về định dạng text thuần để dễ làm hiệu ứng gõ chữ (typewriter).
`;

    // 4. Gọi API Gemini Flash Latest
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // 5. Trả kết quả về cho Frontend
    return NextResponse.json({
      success: true,
      result: responseText,
    });
  } catch (error: any) {
    console.error("Lỗi khi gọi AI API:", error);
    return NextResponse.json(
      { success: false, error: "Đã xảy ra lỗi khi phân tích dữ liệu." },
      { status: 500 },
    );
  }
}
