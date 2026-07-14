# Hướng dẫn sử dụng & Cấu hình tính năng AI (La Bàn Giá Trị)

Tài liệu này hướng dẫn bạn cách thiết lập môi trường và hiểu cách hoạt động của tính năng phân tích tính cách (AI Compass) bằng Google Gemini trong dự án này.

---

## 1. Cấu hình Môi trường (API Key)

Hệ thống sử dụng **Google Gemini API** (phiên bản `gemini-flash-latest`) để thực hiện phân tích hành vi người dùng. Bạn cần cung cấp API Key để hệ thống có thể kết nối với Google.

### Các bước cài đặt:
1. Truy cập [Google AI Studio](https://aistudio.google.com/app/apikey) để tạo cho mình một API Key (Hoàn toàn miễn phí).
2. Trở lại thư mục gốc của dự án này, tạo một file mới có tên là `.env.local` (nếu chưa có).
3. Thêm dòng mã sau vào trong file `.env.local`:
   ```env
   GEMINI_API_KEY=điền_api_key_cua_ban_vao_day
   ```
4. Lưu file và khởi động lại Server (`npm run dev`) để nhận biến môi trường mới.

> **Lưu ý Quan trọng:** KHÔNG bao giờ chia sẻ file `.env.local` hoặc lưu API Key thực tế vào mã nguồn công khai (như push lên GitHub). Git đã được thiết lập để bỏ qua file này trong `.gitignore`.

---

## 2. Luồng hoạt động của AI (AI Flow)

Tính năng La Bàn AI (Result Compass) hoạt động theo chu trình sau:

- **Bước 1 (Thu thập dữ liệu):** Ở khối giao diện `Scenarios`, người chơi lần lượt đưa ra các lựa chọn (A, B, C) cho 6 tình huống thực tế của Gia đình 4.0.
- **Bước 2 (Lưu trữ):** Các lựa chọn được ghi nhận trực tiếp vào Global State (thông qua React Context: `FamilyValueContext.tsx`).
- **Bước 3 (Kích hoạt):** Sau khi hoàn thành đủ 6 câu, hệ thống mở khoá nút "Bắt đầu Phân tích AI" tại component `ResultCompass`. 
- **Bước 4 (Gọi API Server):** Khi bấm nút, Next.js truyền toàn bộ 6 câu trả lời tới Route Handler `/api/analyze-values` nằm ở phía Backend.
- **Bước 5 (Giao tiếp với Gemini):** API Route định dạng lại chuỗi prompt (chỉ định AI đóng vai một chuyên gia tâm lý) và gọi thư viện `@google/generative-ai` để phân tích.
- **Bước 6 (Hiển thị kết quả):** Phản hồi trả về được Frontend tiếp nhận và in ra trên màn hình với hiệu ứng Typing (gõ chữ) cực kỳ chân thực và Sci-fi.

---

## 3. Quản lý hạn mức (Quota Limits)

Do dự án đang chạy trên API gói **Miễn phí** (Free Tier), hãy lưu ý một số rào cản từ Google:
- API thỉnh thoảng có thể trả về lỗi `429 Too Many Requests` nếu có nhiều người gọi phân tích cùng lúc.
- Trong trường hợp đó, hệ thống sẽ hiện thông báo lỗi. Bạn chỉ cần chờ khoảng 1-2 phút và bấm **Bắt đầu Phân tích AI** lại.
- Nếu bạn có nhu cầu chạy thực tế cho hàng nghìn người chơi (Production), bạn cần truy cập Google Cloud Console để nâng cấp giới hạn thanh toán của API (Pay-as-you-go).

---

## 4. Tùy chỉnh AI Prompt

Nếu bạn muốn thay đổi "giọng điệu", "tính cách" hoặc cách nhận xét của chuyên gia tâm lý AI, hãy chỉnh sửa trực tiếp nội dung Prompt tại file:
👉 `app/api/analyze-values/route.ts`

Trong file này, bạn có thể chỉnh sửa các đoạn System Prompt như:
- *"Hãy đóng vai một chuyên gia phân tích tâm lý gia đình..."*
- Hoặc chỉnh sửa cấu trúc của bảng đánh giá kết quả (ví dụ yêu cầu AI trả về format JSON thay vì Text thuần).
