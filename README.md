
# Backend cho Burogu

## Tổng Quan
Backend cho burogu.dev (blog app).

## Cấu Trúc Dự Án
Các thư mục và tệp chính trong dự án như sau:

- **config/**: Chứa các tệp cấu hình cho ứng dụng (ví dụ: CORS).
- **controllers/**: Chứa các bộ điều khiển định nghĩa logic xử lý yêu cầu và phản hồi.
- **lib/**: Bao gồm các tệp thư viện cung cấp các hàm tiện ích và trợ giúp (ví dụ: db).
- **middlewares/**: Chứa các hàm middleware xử lý yêu cầu trước khi đến các bộ điều khiển.
- **prisma/**: Chứa cấu hình và tệp schema của Prisma ORM cho tương tác cơ sở dữ liệu.
- **routes/**: Định nghĩa các route API và liên kết chúng với các hàm bộ điều khiển tương ứng.
- **.gitignore**: Chỉ định các tệp và thư mục sẽ bị Git bỏ qua.
- **package.json**: Liệt kê các phụ thuộc của dự án và các script.
- **server.js**: Thiết lập server.

## Sơ Đồ Cơ Sở Dữ Liệu
![Sơ Đồ Cơ Sở Dữ Liệu](https://github.com/TaThasi/burogu/assets/120630656/9c4766db-d5fc-4d6a-b0f2-188410351c4a)

## Hướng Dẫn Cài Đặt

### Clone Repository:
```sh
git clone https://github.com/TaThasi/burogu.git
cd burogu
```
### Cài Đặt Dependencies:
```sh
npm install
```
### Cài đặt biến môi trường
```sh
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
PORT=
CLIENT_URL=""
DATABASE_URL=""
DIRECT_URL="p"
```
### Chạy Migration Cơ Sở Dữ Liệu:
```sh
npx prisma migrate dev
```
### Khởi Động Server:
```sh
npm start
```

## 日本語の説明

### プロジェクトの概要
このプロジェクトは、burogu.dev（ブログアプリ）のバックエンドです。

### プロジェクト構造
プロジェクト内の主なフォルダーとファイルは次のとおりです：

- **config/**: アプリケーションの設定ファイル（例：CORS）を含みます。
- **controllers/**: リクエストとレスポンスを処理するロジックを定義するコントローラーを含みます。
- **lib/**: ユーティリティ関数とヘルパーを提供するライブラリファイルを含みます（例：db）。
- **middlewares/**: コントローラーに到達する前にリクエストを処理するミドルウェア関数を含みます。
- **prisma/**: データベースとやり取りするためのPrisma ORMの設定とスキーマファイルを含みます。
- **routes/**: APIのルートを定義し、対応するコントローラー関数にリンクします。
- **.gitignore**: Gitが無視するファイルとフォルダーを指定します。
- **package.json**: プロジェクトの依存関係とスクリプトをリストします。
- **server.js**: サーバーを設定します。

### データベーススキーマ
![データベーススキーマ](https://github.com/TaThasi/burogu/assets/120630656/9c4766db-d5fc-4d6a-b0f2-188410351c4a)

### インストール手順

#### リポジトリをクローンする：
```sh
git clone https://github.com/TaThasi/burogu.git
cd burogu
```
#### 依存関係をインストールする：
```sh
npm install
```
#### 環境変数を設定する
```sh
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
PORT=
CLIENT_URL=""
DATABASE_URL=""
DIRECT_URL="p"
```
#### データベースマイグレーションを実行する：
```sh
npx prisma migrate dev
```
#### サーバーを起動する：
```sh
npm start
```
