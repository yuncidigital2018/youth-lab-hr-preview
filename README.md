# 有事青年 · 人事介面展示

獨立 React 19 / TypeScript / Vite 原型。所有資料皆為合成示範，公開 repo 不包含原系統或正式人事資料。

- 展示：https://yuncidigital2018.github.io/youth-lab-hr-preview/
- 原始碼：https://github.com/yuncidigital2018/youth-lab-hr-preview
- 公開展示不提供 email 存取限制，不需要登入。

## 開發與驗證

```sh
git clone https://github.com/yuncidigital2018/youth-lab-hr-preview.git
cd youth-lab-hr-preview
npm ci
npm run dev
```

開啟 http://127.0.0.1:5174/ 。

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

## 可以操作的情境

- 員工／主管視角切換；主管可見團隊簽核與人員清單。
- 工作台：工時、特休可用額度、待處理數字、班表卡片可導航。
- 打卡：休息開始／結束、下班、再次上班；多個區間累加並排除休息。初始示範時間固定 2026/10/23 14:55，每次打卡推進一分鐘；不是裝置真實時間或 GPS 打卡。
- 出勤：全部／未處理異常篩選、缺卡補登申請；送出後顯示「補卡待確認」，不當成正式核准或實際工時更正。
- 請假：日期、時數、原因、送出摘要、簡式流程；必填、半小時單位、餘額與同日重複檢查。特休待簽核即預留，撤回／退回釋放，核准不重複扣減。
- 主管簽核：待簽核、已處理、我的申請；核准／退回。這是流程展示，沒有通知外部人員。
- 班表：員工週卡片／月曆；主管人員×日期矩陣，可修改林小禾的本週班別。其餘人員唯讀；下週展示未發布空狀態。月曆僅提供 10/19–25 的示範班表，其他日期明示未提供。
- 薪資：8／9 月合成薪資、10 月未發布空狀態、示範 CSV 匯出。
- 人員：合成人員名單、搜尋／清空與資料視窗。
- 手機：單欄、底部主要導覽、出勤紀錄卡片化；班表採逐日卡片，不縮小桌面矩陣。
- 彈窗支援取消、Escape、焦點循環及關閉後焦點返回。可重設所有示範資料。

## 資料與界線

所有姓名、任職資料、金額、班表與申請都是合成示範資料，沒有讀取正式 API／資料庫／憑證。無 Firebase、認證 SDK、分析追蹤或外部字型。所有操作僅修改當頁 React 記憶體，重整即還原；請勿輸入真實個資。

角色切換只是介面展示，不是後端授權。原系統的後端授權、多段／跨日、計薪風險尚未修復。示範區間函式能表示跨午夜的分鐘數，但沒有實作正式班次歸屬、時區或薪資政策。固定薪資金額不根據班表、請假或打卡重新計算。無法規符合性保證。

`app/src/App.tsx` 為介面與記憶體狀態；`app/src/model.ts` 為合成資料及純計算；`app/src/styles.css` 為原創響應式樣式。後續整合應拆成頁面／領域元件，再接經過授權稽核的正式 API，不可把展示角色當成存取控制。

## 設計參考與限制

採用自己的「有事青年」品牌、葉片圖形、綠色資訊區與橙色主要操作。沒有複製 104 Logo、素材或私有畫面。

依父對話檢視的官方公開資料，借鏡角色工作區分流、任務優先、篩選後處理異常、表單狀態與班表矩陣等資訊架構：

- https://marketing.pro.104.com.tw/hrm/shift_arrangement.html
- https://marketing.pro.104.com.tw/source/images/shift_arrangement/checkclass_01_01.png
- https://marketing.pro.104.com.tw/source/images/shift_arrangement/quicklyscheduling-1.gif
- https://marketing.pro.104.com.tw/psc/attendance.html
- https://marketing.pro.104.com.tw/psc/forms.html
- https://s3-us-west-2.amazonaws.com/104pro-marketing/HRM20180322.pdf （2018 歷史互動參考，不當成目前後台）

這是「公開介面研究，非登入後完整系統比較」。本機實作依父對話提供的研究摘要，未登入 104 系統。

## 驗證記錄（2026-10-23）

- TypeScript 與 Vite build：通過。
- Vitest：11 個測試通過（5 個模型測試、6 個 jsdom 元件互動測試）。
- 涵蓋多段累加／休息排除、未結束區間、翌日時間表示、預留／釋放、核准不重扣；取消清空、雙擊送出只新增一筆、角色切換、核准後按鈕消失、多段打卡、補卡與重複入口消失、班別編輯、搜尋空狀態、月曆與未發布班表／薪資。
- 真實瀏覽器互動、視覺截圖、手機尺寸／實機、下載檔案落地：未驗證。Computer Use 回報 Chrome 不可用、瀏覽器清單為空，未改以其他 UI 自動化工具繞過。
- 響應式 CSS 已實作，但尚需在真實桌面及手機瀏覽器檢查溢位、觸控及視覺密度；jsdom 不提供視覺排版保證。

手動驗收建議：開啟預覽 → 員工打卡／新增請假 → 主管核准 → 返回員工查看進度；測試 Escape／取消與重複操作；切 390px 寬度檢查底部導覽、出勤卡片與月曆；匯出示範薪資 CSV；確認重新整理會重設。


## 原始碼與 Pages

- `app/`：開發入口、React 原始碼與測試。
- `dist/`：CI 編譯後上傳 Pages 的靜態檔案，未追蹤。
- `index.html`、`assets/`：可直接提供的編譯展示產物，與原始碼一同保留。
- `scripts/publish-pages.mjs`：build 後同步根目錄展示產物，不覆蓋 app/。
- Vite `base: './'` 使用相對資產路徑，可在 repo 子路徑開啟。
- `.github/workflows/pages.yml`：main push 時安裝依賴、typecheck、11 個測試、build，只上傳 dist/ 並部署 Pages。

每次修改後執行測試與 build，一併提交來源與根目錄展示產物。沒有 service worker、正式 API、環境密鑰或後端服務。角色切換只是本機記憶體展示，不是授權系統。
