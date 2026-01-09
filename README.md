# Personel Bilgi Sistemi (Personnel System)

Bu proje, personel kayıtlarını, departmanları ve unvanları yönetmek için geliştirilmiş tam kapsamlı bir web uygulamasıdır. Backend tarafında **ASP.NET Core Web API**, frontend tarafında ise **React (Vite)** kullanılmıştır.

## 📋 Gereksinimler

Projeyi çalıştırmadan önce bilgisayarınızda aşağıdakilerin kurulu olduğundan emin olun:
*   [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) (Backend için)
*   [Node.js](https://nodejs.org/) (Frontend için, önerilen v20+)

---

## 🚀 Kurulum ve Çalıştırma

Projeyi ayağa kaldırmak için **iki ayrı terminal** penceresi kullanmanız gerekmektedir. Birinde Backend'i, diğerinde Frontend'i çalıştıracağız.

### 1. Adım: Backend (Sunucu & Veritabanı)

Backend, veritabanı işlemlerini ve API servisini yönetir. Veritabanı olarak **SQLite** kullanıldığı için ekstra bir kurulum gerekmez; proje ilk çalıştığında veritabanı otomatik oluşur.

1.  Terminali açın ve backend klasörüne gidin:
    ```bash
    cd PersonnelSystem.Backend
    ```
2.  Uygulamayı çalıştırın:
    ```bash
    dotnet run
    ```
    *Bu komut veritabanını (`personnel.db`) oluşturacak, örnek verileri (seed data) yükleyecek ve API'yi başlatacaktır.*

Backend şu adreslerde çalışacaktır:
*   HTTPS: `https://localhost:7058`
*   HTTP: `http://localhost:5214`

### 2. Adım: Frontend (Arayüz)

Frontend, kullanıcı arayüzünü (React) sağlar.

1.  **Yeni bir terminal** açın ve frontend klasörüne gidin:
    ```bash
    cd frontend
    ```
2.  Gerekli paketleri yükleyin (Sadece ilk kurulumda):
    ```bash
    npm install
    ```
3.  Uygulamayı başlatın:
    ```bash
    npm run dev
    ```

Frontend şu adreste çalışacaktır:
*   Local: `http://localhost:5173`

---

## 🛠 Kullanılan Teknolojiler

*   **Backend**: C# ASP.NET Core, Entity Framework Core, SQLite
*   **Frontend**: React, Vite, Axios, React Router DOM
*   **Stil**: Modern CSS (Dark Theme destekli, Custom Design System)

## 📌 Özellikler

*   Personel Ekleme, Silme, Güncelleme, Listeleme (CRUD)
*   Departman ve Unvan Yönetimi
*   Karanlık Mod (Dark Theme) Desteği
*   Modern ve Responsive Arayüz
