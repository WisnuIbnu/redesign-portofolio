# Rencana Belajar: 15–18 Februari 2026

Target: Pelajari kode backend EduGrow dengan pattern (Controller → Request → Service → Repository → Model → Resource). Setiap hari ada materi, file referensi, dan latihan praktis.

---

## Format harian
- Waktu estimasi: 3–4 jam/hari
- Struktur: overview → baca file referensi → catatan utama → latihan (practical)

---

## Hari 1 — 15 Feb: Architecture overview (MVC, Service, Repository)
Tujuan: Pahami struktur project, dependency injection, trait, dan alur request → response.

File referensi utama:
- `app/Models/User.php`
- `app/Http/Controllers/API/AuthController.php`
- `app/Traits/ApiResponse.php`
- `app/Repositories/UserRepository.php`
- `app/Services/AuthService.php`
- `routes/api.php`

Hal yang harus dicatat:
- Peran `Request`, `Controller`, `Service`, `Repository`, `Model`, `Resource`.
- Cara `HasApiTokens` (Sanctum) dan `HasRoles` (Spatie) digunakan di `User` model.
- Trait `ApiResponse` untuk format response.

Latihan:
1. Telusuri alur `POST /api/v1/login` dari `routes/api.php` → `AuthController::login()` → `AuthService::login()` → `UserRepository::findByUsername()`.
2. Tambahkan komentar singkat di local editor untuk 5 langkah utama alur tersebut.
3. Buat catatan 1 halaman (di file atau gdoc) berisi diagram alur request→token.

---

## Hari 2 — 16 Feb: Authentication, RBAC, User & Admission flow
Tujuan: Dalami mekanisme login (email/NIK), register dengan dokumen, seeding roles & permissions.

File referensi utama:
- `app/Services/AuthService.php`
- `app/Repositories/UserRepository.php`
- `app/Http/Requests/Auth/LoginRequest.php`
- `app/Http/Requests/Auth/RegisterRequest.php`
- `app/Http/Controllers/API/AuthController.php`
- `database/seeders/RolePermissionSeeder.php`
- `database/seeders/AdminSeeder.php`
- `database/seeders/DatabaseSeeder.php`
- `app/Services/Register/ParentRegisterService.php`

Hal yang harus dicatat:
- Validasi di `LoginRequest` vs `RegisterRequest`.
- Flow upload dokumen: tmp store → move to final path (`AuthController::register`).
- Cara seeder membuat roles & assign role to user.

Latihan:
1. Jalankan (manual) baca `RolePermissionSeeder.php` dan sebutkan 5 permission yang penting.
2. Cari di code: dimana token di-generate pada register & login.
3. (Opsional) Jalankan seeder lokal jika environment tersedia: 

```bash
php artisan db:seed --class=RolePermissionSeeder
php artisan db:seed --class=AdminSeeder
```

---

## Hari 3 — 17 Feb: Learning modules — LessonActivity, Schedule, Options
Tujuan: Pahami model `LessonActivity`, `Schedule`, dan endpoint options untuk form.

File referensi utama:
- `app/Models/LessonActivity.php`
- `app/Models/Schedule.php`
- `app/Http/Controllers/API/ScheduleController.php`
- `app/Http/Controllers/API/LessonActivityOptionController.php`
- `app/Services/LessonActivityService.php`
- `app/Repositories/*` (cari repository terkait lesson/schedule jika ada)

Hal yang harus dicatat:
- Relasi model (`belongsTo`, `hasMany`) dan penggunaan `HasUuid` trait.
- Endpoint kalender: `GET /api/v1/schedules?month=YYYY-MM` dan detail tanggal.
- Cara menambahkan `lesson_activity` ke tanggal (storeLessonActivity).

Latihan:
1. Telusuri method `ScheduleService::getMonthlySchedules` (atau yang relevan) — catat input/output.
2. Simulasikan request: buat contoh payload untuk menambahkan lesson activity ke tanggal.
3. Jika nyaman, tambahkan log `logger()` di controller untuk melihat payload saat testing manual.

---

## Hari 4 — 18 Feb: Master data, Testing & Small hands-on task
Tujuan: Review master data (religion, immunization, questionnaire) dan buat 1 perubahan kecil + test.

File referensi utama:
- `app/Http/Controllers/API/ReligionController.php`
- `app/Http/Controllers/API/ImmunizationController.php`
- `app/Http/Controllers/API/QuestionnaireController.php`
- `database/seeders/*` untuk contoh data
- `tests/` (jika ada) untuk contoh test patterns

Latihan (hands-on):
1. Pilih 1 endpoint publik (misal `GET /api/v1/religion`) dan tambahkan unit/feature test di `tests/Feature/ReligionTest.php`.
2. Jalankan tests: 

```bash
php artisan test --filter ReligionTest
```

3. Alternatif kecil: tambahkan validasi tambahan di `RegisterRequest` atau perbaiki response message di satu controller.

---

## Catatan Praktis & Tips
- Gunakan `grep`/IDE search untuk cepat menemukan method/usage.
- Tambahkan komentar di kode saat membaca untuk membantu pemahaman.
- Jika environment lokal tidak lengkap, fokus pada read-only code tracing.
- Simpan catatan ringkas setiap hari: 10–15 poin belajar.

---

## Output yang diharapkan setelah 4 hari
- Diagram arsitektur personal dan catatan alur autentikasi
- Ringkasan fungsi utama per folder (`Models`, `Services`, `Repositories`, `Controllers`, `Requests`)
- Minimal 1 unit/feature test dibuat pada hari ke-4 atau 1 perubahan kecil yang diuji
- Daftar follow-up tasks (fitur yang ingin diimplementasikan)

---

Jika setuju, saya bisa:
- Menambahkan link file langsung ke setiap referensi (line numbers), atau
- Membuat template test file dan commit perubahan kecil untuk latihan.

