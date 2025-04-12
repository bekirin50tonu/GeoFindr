# GeoFindr

GeoFindr, belirli bir coğrafi alan içinde işletmeleri kolayca bulmanı sağlayan bir araçtır. Google Haritalar API’sini kullanarak, seçtiğin bölgedeki işletmeleri filtreleyerek listelemeni sağlar. Belirli bir yarıçap içindeki dükkanları, kafeleri, restoranları ve diğer işletmeleri hızlıca keşfetmek için idealdir.

Özellikler:

- ✅ Çember içindeki işletmeleri listeleme – Seçtiğin bölge ve yarıçap içindeki işletmeleri kolayca görüntüle.
- ✅ Kategori bazlı arama – Restoran, kafe, market gibi belirli türdeki işletmeleri filtrele.
- ✅ Harita üzerinde görselleştirme – Sonuçları harita üzerinde etkileşimli olarak göster.
- ✅ Kolay entegrasyon – React ve Google Maps API ile modern bir arayüz sunar.

GeoFindr, yerel işletmeleri keşfetmek isteyen kullanıcılar ve veri analizi yapan geliştiriciler için güçlü bir çözümdür. 🚀

## Başlarken

Öncelikle geliştirme sunucusunu başlatın:

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresini tarayıcınızda açarak sonucu görebilirsiniz.

- Siteye girerken **?key=<API_KEY>** şeklinde Google Maps API anahtarı ile siteyi kullanabilirsiniz.

## API Route'ları

### 1. Konum Bilgisi Alma (`/api/maps/location`)

**Endpoint:** `GET /api/maps/location?address=[adres]&key=[api_key]`

**Parametreler:**

- `address` (zorunlu) - Adres bilgisi
- `key` (zorunlu) - Google Maps API anahtarı

**Açıklama:**

- Verilen adresin koordinatlarını (enlem/boylam) ve detaylı konum bilgisini döner
- Google Maps Geocoding API kullanır

**Örnek İstek:**

```bash
GET /api/maps/location?address=İstanbul&key=YOUR_API_KEY
```

**Başarılı Yanıt:**

```json
[
  {
    "geometry": {
      "location": {
        "lat": 41.0082,
        "lng": 28.9784
      }
    },
    "formatted_address": "İstanbul, Türkiye",
    "place_id": "ChIJawhoAASnyhQR0LABvJj-zOE"
  }
]
```

### 2. Yakın Yerleri Listeleme (`/api/maps/nearby`)

**Endpoint:** `GET /api/maps/nearby?lat=[enlem]&lng=[boylam]&types=[tipler]&radius=[yarıçap]&maxResults=[sonuç_sayısı]&key=[api_key]`

**Parametreler:**

- `lat` (zorunlu) - Enlem koordinatı
- `lng` (zorunlu) - Boylam koordinatı
- `types` (zorunlu) - Virgülle ayrılmış yer tipleri (örnek: "restaurant,cafe")
- `radius` (zorunlu) - Arama yarıçapı (metre)
- `maxResults` (zorunlu) - Dönecek maksimum sonuç sayısı
- `key` (zorunlu) - Google Maps API anahtarı

**Açıklama:**

- Verilen koordinatlar etrafındaki belirli tipteki yerleri listeler
- Google Maps Places API v1 kullanır
- Birden fazla yer tipi belirtilebilir (virgülle ayrılmış)
- Sonuçlar Türkçe dilinde döner

**Örnek İstek:**

```bash
GET /api/maps/nearby?lat=41.0082&lng=28.9784&types=restaurant,cafe&radius=1000&maxResults=5&key=YOUR_API_KEY
```

**Başarılı Yanıt:**

```json
[
  {
    "name": "Svalinn Hotel Izmir Gaziemir Airport",
    "formattedAddress": "Gazi, Akçay Cd. No:172, 35410 Gaziemir/İzmir, Türkiye",
    "rating": 4.6,
    "userRatingCount": 1869,
    "types": ["hotel", "spa", "lodging", "restaurant", "point_of_interest", "food", "establishment"],
    "location": {
      "latitude": 38.3316363,
      "longitude": 27.134696599999998
    }
  },
  {
    "name": "Pizza Vitorico",
    "formattedAddress": "Gazi, Hasan Güven Cd No:60/1A, 35120 Gaziemir/İzmir, Türkiye",
    "rating": 4,
    "userRatingCount": 330,
    "types": ["pizza_restaurant", "restaurant", "point_of_interest", "food", "establishment"],
    "location": {
      "latitude": 38.3252144,
      "longitude": 27.127582
    }
  }
]
```

## Kurulum

1. Depoyu klonlayın:

```bash
git clone https://github.com/bekirin50tonu/GeoFindr
cd GeoFindr
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

## Kullanılan Teknolojiler

- Next.js 15.2.4
- Google Maps API
- Axios (API istekleri için)
- TypeScript

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen önce bir issue açarak önerinizi tartışalım.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
