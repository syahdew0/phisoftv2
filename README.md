# Phisoft — Dokumentasi Nametag CMS

Dokumen ini mencatat seluruh **nametag** yang digunakan komponen frontend untuk mengambil konten dari CMS, beserta `customPageData` key (localStorage) dan struktur file terkait.

---

## Struktur Folder

```
src/
├── App.vue                          → fetch Footer page data
├── components/
│   ├── NavbarApp.vue                → baca Home cache (logo)
│   ├── FooterPage.vue               → baca Footer cache
│   └── sections/
│       ├── HeroSection.vue          → Home page
│       ├── AboutSection.vue         → Home page
│       ├── WhyUsSection.vue         → Home page
│       ├── ClientsSection.vue       → Home page
│       ├── TestimonialsSection.vue  → Home page
│       ├── ServicesSection.vue      → Home page
│       ├── FAQSection.vue           → Home page
│       ├── ProductsSection.vue      → Home page
│       ├── WorkflowSection.vue      → Home page
│       ├── companyListSection.vue   → Home page
│       └── ContactSection.vue       → Home page
└── views/
    ├── PageManagement.vue           → fetch & simpan Home page data
    ├── ContactPage.vue              → fetch Contact page data
    ├── AboutPage.vue
    ├── BlogPage.vue
    ├── HelpPage.vue
    ├── ListingPage.vue
    └── ListingDetailPage.vue
```

---

## customPageData Keys (localStorage)

| Key                       | Dipakai oleh                          | API `page` param |
|---------------------------|---------------------------------------|------------------|
| `customPageData:Home`     | NavbarApp, semua sections, PageManagement | `Home`       |
| `customPageData:Footer`   | App.vue, FooterPage, ContactPage      | `Footer`         |
| `customPageData:Contact`  | ContactPage                           | `Contact`        |

---

## Nametag per Halaman

---

### Home Page — `customPageData:Home`

Fetch dilakukan oleh **PageManagement.vue**. Semua section di bawah membaca dari localStorage key `customPageData:Home`.

#### NavbarApp.vue
| Nametag          | Field yang dibaca | Keterangan       |
|------------------|-------------------|------------------|
| `logo_phisoft30` | `image`, `url`    | Logo navbar      |

#### HeroSection.vue
| Nametag               | Field yang dibaca                 | Keterangan              |
|-----------------------|-----------------------------------|-------------------------|
| `home_badge30`        | `title`, `name`                   | Badge label hero        |
| `home_main30`         | `title`, `name` / `content`, `description` | Heading & subheading |
| `home_buttonDaftar30` | `title`, `label` / `link`, `url`  | Tombol daftar           |
| `home_buttonKonsul30` | `title`, `label` / `link`, `url`  | Tombol konsultasi       |
| `home_image_title30`  | `image`, `url`                    | Gambar utama hero       |
| `home_atribut30`      | `title` / `value` / `label`       | Statistik/atribut (array)|

#### AboutSection.vue
| Nametag          | Field yang dibaca                        | Keterangan           |
|------------------|------------------------------------------|----------------------|
| `about_badge30`  | `title`, `name`                          | Badge label          |
| `about_main30`   | `title` / `content`, `description`       | Heading & deskripsi  |
| `about_atribut30`| `title` / `content` / `image`, `icon`   | Item poin (array)    |

#### WhyUsSection.vue
| Nametag         | Field yang dibaca                  | Keterangan         |
|-----------------|------------------------------------|--------------------|
| `whyus_badge30` | `title`, `name`                    | Badge label        |
| `whyus_main30`  | `title` / `content`, `description` | Heading & deskripsi|
| `whyus_item30`  | `title` / `content` / `icon`       | Item kartu (array) |

#### ClientsSection.vue
| Nametag          | Field yang dibaca  | Keterangan          |
|------------------|--------------------|---------------------|
| `clients_main30` | `title`, `content` | Heading section     |
| `clients_item30` | `image`, `title`   | Logo klien (array)  |

#### TestimonialsSection.vue
| Nametag             | Field yang dibaca  | Keterangan           |
|---------------------|--------------------|----------------------|
| `testimoni_badge30` | `title`, `name`    | Badge label          |
| `testimoni_title30` | `title`, `content` | Heading section      |

#### ServicesSection.vue
| Nametag           | Field yang dibaca                  | Keterangan          |
|-------------------|------------------------------------|---------------------|
| `service_badge30` | `title`, `name`                    | Badge label         |
| `service_main30`  | `title` / `content`, `description` | Heading & deskripsi |
| `service_item30`  | `title` / `content` / `icon`       | Item layanan (array)|

#### FAQSection.vue
| Nametag       | Field yang dibaca              | Keterangan        |
|---------------|--------------------------------|-------------------|
| `faq_title30` | `title`, `content`             | Heading section   |
| `faq_item30`  | `title` / `content`, `answer`  | Item FAQ (array)  |

#### ProductsSection.vue
| Nametag            | Field yang dibaca                  | Keterangan          |
|--------------------|------------------------------------|---------------------|
| `products_badge30` | `title`, `name`                    | Badge label         |
| `products_main30`  | `title` / `content`, `description` | Heading & deskripsi |
| `products_item30`  | `title` / `content` / `image`      | Item produk (array) |

#### WorkflowSection.vue
| Nametag             | Field yang dibaca                  | Keterangan           |
|---------------------|------------------------------------|----------------------|
| `workflow_badge30`  | `title`, `name`                    | Badge label          |
| `workflow_main30`   | `title` / `content`, `description` | Heading & deskripsi  |
| `workflow_item30`   | `title` / `content` / `icon`       | Item step (array)    |

#### companyListSection.vue
| Nametag                | Field yang dibaca                  | Keterangan           |
|------------------------|------------------------------------|----------------------|
| `propertyList_badge30` | `title`, `name`                    | Badge label          |
| `propertyList_main30`  | `title` / `content`, `description` | Heading & deskripsi  |
| `propertyList_button30`| `title`, `label` / `link`, `url`   | Tombol CTA           |

#### ContactSection.vue (section di Home)
| Nametag                 | Field yang dibaca                  | Keterangan           |
|-------------------------|------------------------------------|----------------------|
| `contact_home_badge30`  | `title`, `name`                    | Badge label          |
| `contact_home_main30`   | `title` / `content`, `description` | Heading & deskripsi  |
| `contact_home_info30`   | `title` / `content` / `icon`       | Info kontak (array)  |

---

### Footer Page — `customPageData:Footer`

Fetch dilakukan oleh **App.vue**. FooterPage membaca dari localStorage key `customPageData:Footer`.

#### FooterPage.vue
| Nametag            | Tipe   | Field yang dibaca                        | Keterangan                         |
|--------------------|--------|------------------------------------------|------------------------------------|
| `footer_brand30`   | Object | `name`, `title` / `description`, `content` / `operationalHours`, `hours` | Brand name, deskripsi, jam operasional |
| `footer_contact30` | Array  | `[0]` → phone (`title`) / `[1]` → email (`title`) / `[2]` → address (`title`) | Kontak (3 item berurutan) |
| `footer_social30`  | Array  | `icon`, `class` / `link`, `url`          | Ikon sosial media                  |
| `footer_link30`    | Array  | `label`, `title` / `path`, `url`         | Link navigasi footer               |

> **Catatan `footer_contact30`:** Data disimpan sebagai array 3 item. Urutan item menentukan jenis kontak:
> - Index `0` → Nomor telepon
> - Index `1` → Alamat email
> - Index `2` → Alamat kantor

---

### Contact Page — `customPageData:Contact`

Fetch dilakukan oleh **ContactPage.vue** sendiri. Juga membaca `customPageData:Footer` untuk data kontak.

#### ContactPage.vue
| Nametag              | Tipe   | Field yang dibaca                        | Keterangan                       |
|----------------------|--------|------------------------------------------|----------------------------------|
| `contact_header30`   | Object | `image`, `url` / `title`, `name` / `content`, `description` | Gambar, judul, & subtitle hero |
| `contact_badge30`    | Object | `title`, `name`                          | Badge label section info kontak  |
| `contact_main30`     | Object | `title`, `name` / `content`, `description` | Heading & deskripsi form       |
| `contact_maps30`     | Object | `link`, `url`                            | URL embed Google Maps            |
| `footer_contact30`   | Array  | (lihat Footer) — dari cache `customPageData:Footer` | Phone, email, alamat  |

---

## Catatan Umum

- Semua nametag menggunakan suffix `30` sebagai konvensi project ini.
- Jika data dari API tidak tersedia atau field kosong, komponen fallback ke nilai `baseSection` yang hardcoded di masing-masing file.
- Data diambil sekali saat `onMounted`, disimpan ke `localStorage`, dan dipakai ulang saat halaman dimuat ulang (cache-first, lalu refresh dari API).
- Field lookup selalu mencoba dua kemungkinan nama (contoh: `title` atau `name`) untuk kompatibilitas lintas template CMS.
