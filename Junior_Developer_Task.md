# Personel Bilgi Sistemi - Junior Yazılımcı Adayı Mülakat Projesi

## Proje Özeti

Backend'de .NET Core Web API, frontend'de React JS ve veritabanı olarak SQLite kullanarak basit bir personel bilgi yönetim sistemi geliştirilmesi.

## Teknik Gereksinimler

### Backend

- **.NET Core 6.0 veya üzeri** Web API projesi
- **Entity Framework Core** (ORM)
- **SQLite** veritabanı
- RESTful API standartlarına uygun endpoint'ler
- CORS yapılandırması (React uygulaması için)

### Frontend

- **React JS** (Hooks kullanımı tercih edilir)
- **Axios** veya Fetch API (Backend iletişimi için)
- **React Router** (Sayfa yönlendirmeleri için)
- İsteğe bağlı: Bootstrap, Material-UI veya Ant Design

### Veritabanı

- **SQLite** database dosyası
- **Entity Framework Code First** yaklaşımı

## Fonksiyonel Gereksinimler

### 1. Departman Yönetimi

- Departman listesi görüntüleme
- Yeni departman ekleme
- Departman düzenleme
- Departman silme
- **Alanlar:** Id, Departman Adı, Açıklama

### 2. Ünvan Yönetimi

- Ünvan listesi görüntüleme
- Yeni ünvan ekleme
- Ünvan düzenleme
- Ünvan silme
- **Alanlar:** Id, Ünvan Adı, Açıklama

### 3. Personel Yönetimi

- Personel listesi görüntüleme (kart veya tablo formatında)
- Modal/Dialog ile yeni personel ekleme
- Personel bilgilerini düzenleme
- Personel silme
- Personel fotoğrafı yükleme
- **Alanlar:**
  - Sicil No (unique)
  - Ad
  - Soyad
  - Departman (Dropdown - Departman tablosundan gelecek)
  - Ünvan (Dropdown - Ünvan tablosundan gelecek)
  - İşe Giriş Tarihi
  - Fotoğraf
  - Aktif/Pasif durumu

### 4. Kullanıcı Arayüzü Gereksinimleri

- Responsive tasarım (mobil uyumlu)
- Basit bir login ekranı (hardcoded kullanıcı adı/şifre yeterli)
- Navigation menüsü (Departmanlar, Ünvanlar, Personeller)
- Form validasyonları
- Kullanıcı dostu hata mesajları
- Başarılı işlem bildirimleri

## API Endpoint Önerileri

### Departman Endpoints

```
GET    /api/departmanlar
GET    /api/departmanlar/{id}
POST   /api/departmanlar
PUT    /api/departmanlar/{id}
DELETE /api/departmanlar/{id}
```

### Ünvan Endpoints

```
GET    /api/unvanlar
GET    /api/unvanlar/{id}
POST   /api/unvanlar
PUT    /api/unvanlar/{id}
DELETE /api/unvanlar/{id}
```

### Personel Endpoints

```
GET    /api/personeller
GET    /api/personeller/{id}
POST   /api/personeller
PUT    /api/personeller/{id}
DELETE /api/personeller/{id}
POST   /api/personeller/upload-foto
```

## Değerlendirme Kriterleri

### Teknik Beceriler (50%)

- Kod kalitesi ve okunabilirlik
- Klasör/dosya yapısı organizasyonu
- Entity Framework kullanımı
- API tasarımı ve RESTful prensiplere uyum
- React component yapısı ve state yönetimi

### Fonksiyonellik (30%)

- Tüm CRUD işlemlerinin çalışması
- Form validasyonları
- Fotoğraf upload özelliği
- Dropdown'ların doğru çalışması

### Kullanıcı Deneyimi (20%)

- Arayüz tasarımı
- Responsive tasarım
- Hata yönetimi ve kullanıcı bildirimleri
- Genel kullanım kolaylığı

## Teslim Edilecekler

1. **Kaynak Kod**

   - Git repository linki (GitHub/GitLab)
   - README.md dosyası (kurulum ve çalıştırma talimatları)

2. **Veritabanı**

   - SQLite database dosyası veya migration scriptleri

3. **Dokümantasyon**
   - API endpoint'lerinin listesi
   - Projeyi ayağa kaldırma adımları
   - Kullanılan teknolojiler ve kütüphaneler listesi

## Kurulum Talimatları (README'ye eklenecek)

Projenizi teslim ederken aşağıdaki bilgileri içeren bir README.md hazırlayın:

- Gerekli yazılımlar (.NET SDK versiyonu, Node.js versiyonu)
- Backend'i çalıştırma adımları
- Frontend'i çalıştırma adımları
- Varsayılan login bilgileri
- Örnek test senaryoları

## Süre

**Tamamlanma Süresi:** Teslim tarihi en kısa zamanda tarafımıza mail yoluyla bildirilmelidir.

## Sorular

Proje hakkında teknik sorularınız olursa szyilmaz@yukselproje.com.tr ve mmahmutoglu@yukselproje.com.tr üzerinden iletişime geçebilirsiniz.

## Bonus Özellikler (Opsiyonel)

- Dashboard sayfasında basit istatistikler (toplam personel, departman sayısı vb.)
- Personel arama/filtreleme özelliği
- Personel listesinde sayfalama (pagination)
- Dark mode desteği
- Unit test yazımı

---

**Not:** Projenin amacı temel yazılım geliştirme becerilerinizi değerlendirmektir. Mükemmel bir ürün yerine, temiz kod, düzgün yapı ve temel fonksiyonelliğin çalışması önceliklidir.

Başarılar dileriz! 🚀
