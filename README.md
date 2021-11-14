# 專案 README

# DAYEAYEAYEA 生活選物

這是一個使用 React 建立的電子商務前端專案，為虛構的生活選物品牌 **DAYEAYEAYEA** 打造購物網站及管理後台。使用者分為一般消費者和店家管理員，消費者可在前台網站享受流暢的購物體驗、管理會員資料及查看訂單紀錄，而管理員則可以在後台針對「會員」、「商品」和「訂單」三大區塊進行管理。

> [DAYEAYEAYEA 購物網站](https://jackielin7789978.github.io/DAYEAYEAYEA-frontend/) > [管理後台](https://jackielin7789978.github.io/DAYEAYEAYEA-frontend/admin/login)：測試帳號 admin01 / 密碼: Admin1357

![](https://i.imgur.com/nSdyHE7.gif)
![](https://i.imgur.com/znJvjej.png)
![](https://i.imgur.com/7adGrfG.png)

## 使用技術和第三方套件

- Create React App - 建立專案項目環境
- React - Function Components + Hooks
- Prettier - 統一程式碼格式
- [React Router](https://www.npmjs.com/package/react-router) - Web App 路由管理
- [Styled Components](https://styled-components.com/) - 以組件為單位撰寫 CSS 樣式
- [React Hook Form](https://www.npmjs.com/package/react-hook-form) - 處理表單驗證
- [React Slick](https://www.npmjs.com/package/react-slick) - Carousel 輪轉圖組件
- [React Spinners](https://www.davidhu.io/react-spinners/) - 製作 Loading 動畫
- [use-tw-zipcode](https://www.npmjs.com/package/use-tw-zipcode) - 製作台灣縣市、行政區下拉式選單，並取得郵遞區號
- [jwt-decode](https://www.npmjs.com/package/jwt-decode) - JTW token 解碼
- [qs](https://www.npmjs.com/package/qs) - 解析 query string，用於搜尋商品功能
- [gh-pages](https://www.npmjs.com/package/gh-pages) - 方便將前端專案部署至 GitHub Pages

## 功能介紹

- 前台

  - 商品瀏覽：
    - 按照分類瀏覽商品、搜尋商品並點進商品頁面查看詳細資料
    - 一鍵將商品加入購物車，也可進入商品詳細頁面調整要購買的數量
    - 點選首頁輪轉圖可進入活動頁面，選購店家精心挑選的優惠商品
    - 若商品不在架上或數量不足，商品圖片會拉灰並顯示已售完
    - 若商品超出庫存數量，會提示使用者商品庫存不足
  - 購物車：

    - icon 同步顯示購物車商品數量
    - 移除購物車商品
    - 查看訂單商品數量、金額及訂單總額

  - 登入/註冊：
    - 表單驗證功能，若輸入格式不符的資料將無法登入/註冊
  - 結帳系統：
    - 查看、修改購物車明細
    - 若未登入，會提示使用者在結帳前先登入/註冊會員
    - 填寫寄件資訊時可自動帶入會員資料
    - 送出訂單前會驗證地址是否符合格式
    - 若商品超出庫存數量，或已不在架上，將無法成立訂單
    - 訂單成立後顯示訂單明細
  - 會員中心：
    - 查看、編輯個人資料
    - 取消仍在處理中的訂單
    - 查看歷史訂單

- 後台
  - 會員管理：
    - 查看會員列表 (含搜尋、篩選功能)
    - 查看會員詳細資料與歷史訂單
    - 更改會員等級
  - 商品管理：
    - 查看商品列表 (含搜尋、篩選功能)
    - 新增商品
    - 在商品列表頁直接刪除商品，調整商品庫存數量以及上下架狀態
    - 進入詳細頁面進一步編輯商品資料
  - 訂單管理：
    - 查看訂單列表 (含搜尋、篩選功能)
    - 查看訂單詳細資料
    - 管理訂單狀態
    - 封存已完成的訂單

## 專案 DEMO

### 購物體驗

- 將商品一鍵加入購物車，icon 會同步顯示購物車商品數量。

![](https://i.imgur.com/yf4qRMV.gif)

- 在商品詳細頁中調整購買數量，若數量超過庫存會顯示提示。

![](https://i.imgur.com/WG34LAi.gif)

- 結帳時可自動帶入會員收件資訊。

![](https://i.imgur.com/0dj0Ma2.gif)

- 下單時檢查庫存數量，若不足則提示使用者修改商品數量
  ![](https://i.imgur.com/j1RwrD5.gif)

### 管理後台

- 會員、訂單及商品頁面相互連結，方便店家進行管理。

![](https://i.imgur.com/0yfTYF7.gif)

- 使用搜尋、篩選功能輕鬆找到所需資料

![](https://i.imgur.com/O7UFeWk.gif)

## 功能地圖

### 前台：

![](https://i.imgur.com/Jh9nlrA.jpg)

### 後台：

![](https://i.imgur.com/h41DhVL.jpg)

## 如何執行

#### `npm install`

安裝此專案所需的第三方套件

#### `yarn start`

在 [http://localhost:3000](http://localhost:3000) 上啟動此專案

#### `yarn build`

在 `build` 資料夾中建立此專案的 production 版本

#### `yarn deploy`

在 GitHub Page 上部屬此專案網站
