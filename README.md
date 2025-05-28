# 📝 Robosme Case Çalışması

Bu proje, kullanıcıların bir API'den alınan gönderileri (posts) görüntüleyip düzenlemesine olanak tanır. Postlar localStorage'da saklanır ve yapılan düzenlemeler kalıcı olarak burada tutulur. Uygulama Next.js (App Router) yapısı kullanılarak oluşturulmuştur.

---

## 🚀 Özellikler

- 📄 Postları API'den çekme (`jsonplaceholder.typicode.com`)
- 🔍 Başlık ve içerik (body) üzerinden arama filtresi
- ✍️ Her bir postu detay sayfasında düzenleyebilme
- 💾 localStorage kullanarak düzenlenmiş verileri saklama
- 🔐 sessionStorage ile basit bir oturum kontrolü

---

## 🧠 Teknik Kararlar ve Gerekçeler

### ✅ **Next.js App Router Tercihi**
App Router mimarisi, daha modern ve segment bazlı yapı sunması nedeniyle tercih edilmiştir. Ayrıca, server ve client bileşenleri arasında net bir ayrım yapılmasını sağlar.

### ✅ **Veri Saklama: localStorage**
Postları düzenledikten sonra kalıcılık sağlamak için `localStorage` kullanılmıştır. Gerçek bir backend olmadığı için veri tutarlılığı bu yolla korunmuştur.

### ✅ **Oturum Yönetimi: sessionStorage**
Kullanıcının login işlemini basitçe takip etmek amacıyla `sessionStorage` kullanılmış ve e-posta bilgisi burada tutulmuştur.

### ✅ **useParams + localStorage Entegrasyonu**
Detay sayfasında dinamik route üzerinden gelen `id` ile `localStorage`'daki ilgili post bulunmuş ve düzenleme yapılabilir hale getirilmiştir.

---

## 🤖 Yapay Zeka (ChatGPT) Yardımı Alınan Alanlar

Bu projeyi geliştirirken yapay zeka desteğiyle aşağıdaki konularda rehberlik aldım:

- ✅ Form validasyonlarının best-practice yöntemleri hakkında fikir danıştım.
- ✅ `router.push` vs `router.replace` farkları ve nerede hangisinin kullanılacağı hakkında sorular sordum.
- ✅ TypeScript'le ilgili çıkan bazı hatalarda verdiği çözümleri kullandım.
- ✅ Bu README.md dosyasını, hangi açıklamaları yapacağını söyleyerek oluşturttum.
---

## 🛠️ Kullanılan Teknolojiler

- **Next.js 14 (App Router)**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Axios**

---

## 📁 Proje Kurulumu

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
