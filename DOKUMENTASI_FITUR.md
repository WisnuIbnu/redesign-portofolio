# 📚 DOKUMENTASI FITUR - EduGrow Backend

**Tanggal:** 14 Februari 2026  
**Project:** EduGrow Backend (Laravel REST API)  
**Version:** 1.0

---

## 📋 Daftar Isi

1. [Overview](#overview)
2. [Authentication & Authorization](#authentication--authorization)
3. [Admission Module](#admission-module)
4. [Academic Management](#academic-management)
5. [Schedule & Lesson Planning](#schedule--lesson-planning)
6. [Learning & Assessment](#learning--assessment)
7. [Master Data Management](#master-data-management)
8. [API Response Format](#api-response-format)

---

## 🎯 Overview

**EduGrow Backend** adalah REST API untuk manajemen sistem pendidikan yang komprehensif. Sistem ini dibangun menggunakan **Laravel** dengan implementasi **MVC Pattern**, **Service Layer**, **Repository Pattern**, dan **RBAC (Role-Based Access Control)**.

### **Teknologi yang Digunakan:**
- Framework: **Laravel 11**
- Database: **MySQL**
- Authentication: **Laravel Sanctum**
- Authorization: **Spatie Laravel Permissions**
- API Style: **RESTful JSON**

### **Core Modules:**
1. **Authentication Module** - Login, Register, Token Management
2. **Admission Module** - Pendaftaran siswa baru dengan dokumen
3. **Academic Management** - Tahun ajaran, kurikulum, pembelajaran
4. **Schedule Management** - Kalender, jadwal kegiatan pembelajaran
5. **Assessment** - Nilai, progress pembelajaran
6. **Master Data** - Agama, imunisasi, kuesioner, dll

---

## 🔐 Authentication & Authorization

### **1. Registration (Pendaftaran)**

**Endpoint:** `POST /api/v1/register`

**Status:** Public (Tidak perlu login)

**Purpose:** Orang tua dapat mendaftar akun dan mendaftarkan anak sekaligus

**Request Body:**
```json
{
    "parent_name": "Budi Santoso",
    "parent_email": "budi@example.com",
    "parent_password": "password123",
    "parent_phone": "08123456789",
    "student_name": "Andi Santoso",
    "student_nik": "1234567890",
    "student_birth_date": "2015-01-01",
    "documents": [
        {
            "file": "file_upload",
            "document_type": "birth_certificate"
        },
        {
            "file": "file_upload",
            "document_type": "identity_card"
        }
    ]
}
```

**Response:** HTTP 201
```json
{
    "code": 201,
    "message": "Registrasi akun dan pendaftaran siswa berhasil",
    "results": {
        "registration_number": "REG-2026-001",
        "email": "budi@example.com",
        "student_name": "Andi Santoso",
        "admission_status": "submitted",
        "message_status": "Dokumen lengkap, menunggu verifikasi sekolah",
        "token": "1|abcdefghijklmnop..."
    }
}
```

**Features:**
- ✅ Validasi email unik
- ✅ Upload multiple files (dokumen)
- ✅ File move dari temp ke final storage
- ✅ Generate nomor registrasi otomatis
- ✅ Create user parent dengan role "parent"
- ✅ Create admission record dengan status

**Related Services:**
- `ParentRegisterService::handle()` - Handle logika registrasi

**Related Models:**
- `User` - Akun orang tua
- `Admission` - Data pendaftaran
- `AdmissionStudent` - Data siswa dalam pendaftaran
- `AdmissionParent` - Data orang tua dalam pendaftaran
- `AdmissionDocument` - Dokumen pendaftaran

---

### **2. Login**

**Endpoint:** `POST /api/v1/login`

**Status:** Public (Tidak perlu login)

**Purpose:** User login dengan email/NIK dan password

**Request Body:**
```json
{
    "username": "admin@example.com",
    "password": "admin123"
}
```

**Alternative (menggunakan NIK):**
```json
{
    "username": "123456789",
    "password": "admin123"
}
```

**Response:** HTTP 200
```json
{
    "code": 200,
    "message": "Login success",
    "results": {
        "user": {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440000",
            "name": "Admin User",
            "email": "admin@example.com",
            "phone": null,
            "is_active": true,
            "school_id": 1
        },
        "token": "1|abcdefghijklmnop..."
    }
}
```

**Features:**
- ✅ Flexible username (email atau NIK)
- ✅ Validasi password dengan hash
- ✅ Check apakah user active
- ✅ Generate Sanctum API token
- ✅ Return user data lengkap

**Related Services:**
- `AuthService::login()` - Handle logika login

**Related Models:**
- `User` - dengan relation school & roles/permissions

---

### **3. Get Current User**

**Endpoint:** `GET /api/v1/me`

**Status:** Protected (Perlu login + Sanctum token)

**Purpose:** Mendapatkan data user yang sedang login

**Request Header:**
```
Authorization: Bearer {token}
```

**Response:** HTTP 200
```json
{
    "id": 1,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Admin User",
    "email": "admin@example.com",
    "phone": null,
    "is_active": true,
    "school_id": 1,
    "roles": ["admin"]
}
```

---

### **4. Logout**

**Endpoint:** `POST /api/v1/logout`

**Status:** Protected (Perlu login)

**Purpose:** Logout user dan invalidate token

**Request Header:**
```
Authorization: Bearer {token}
```

**Response:** HTTP 200
```json
{
    "code": 200,
    "message": "Logout success",
    "results": null
}
```

**Features:**
- ✅ Delete current access token
- ✅ User tidak bisa pakai token lagi

---

### **5. Role-Based Access Control (RBAC)**

**Roles yang Tersedia:**

| Role | Deskripsi | Permissions |
|------|-----------|------------|
| **admin** | Administrator sistem | Semua permission |
| **principal** | Kepala sekolah | Melihat laporan, dashboard |
| **teacher** | Guru pengajar | Membuat pembelajaran, nilai, absensi |
| **parent** | Orang tua siswa | Melihat progress anak |

**Permissions:**

| Permission | Deskripsi |
|-----------|-----------|
| `curricula.create` | Buat kurikulum |
| `curricula.update` | Edit kurikulum |
| `curricula.delete` | Hapus kurikulum |
| `curricula.view` | Lihat kurikulum |
| `lesson_plan.create` | Buat rencana pembelajaran |
| `lesson_plan.update` | Edit rencana pembelajaran |
| `lesson_plan.delete` | Hapus rencana pembelajaran |
| `learning_activity.create` | Buat aktivitas pembelajaran |
| `learning_activity.update` | Edit aktivitas pembelajaran |
| `learning_activity.delete` | Hapus aktivitas pembelajaran |
| `attendance.create` | Buat absensi |
| `attendance.update` | Edit absensi |
| `grade.create` | Buat nilai |
| `grade.update` | Edit nilai |
| `progress.view` | Lihat progress pembelajaran |
| `payment.verify` | Verifikasi pembayaran |
| `payment.view` | Lihat pembayaran |
| `payment.create` | Buat pembayaran |
| `document.view` | Lihat dokumen |
| `parent.verify` | Verifikasi orang tua |

**Middleware Protection:**
```php
// Protected dengan role
Route::middleware('role:admin')->group(function () {
    // Hanya admin yang bisa akses
});

// Protected dengan permission
Route::middleware('permission:lesson_plan.create')->group(function () {
    // Hanya yang punya permission bisa akses
});
```

---

## 🎓 Admission Module

### **Purpose:** Mengelola proses pendaftaran siswa baru

### **1. Entity:** Admission

**Model:** `app/Models/Admission.php`

**Database Table:** `admissions`

**Key Fields:**
- `uuid` - Unique identifier
- `school_id` - Sekolah tempat pendaftaran
- `registration_number` - Nomor registrasi otomatis
- `status_admission` - Status: submitted, waiting_document, verified, rejected
- `created_at`, `updated_at` - Timestamp

**Relationships:**
- `student` - hasOne AdmissionStudent
- `parents` - hasMany AdmissionParent
- `documents` - hasMany AdmissionDocument
- `statusLogs` - hasMany AdmissionStatusLog
- `school` - belongsTo School

### **2. Entity:** AdmissionStudent

**Model:** `app/Models/AdmissionStudent.php`

**Represents:** Data siswa dalam proses pendaftaran

**Key Fields:**
- `admission_id` - Reference ke Admission
- `name` - Nama lengkap siswa
- `birth_date` - Tanggal lahir
- `gender` - Jenis kelamin
- `religion_id` - Agama

### **3. Entity:** AdmissionParent

**Model:** `app/Models/AdmissionParent.php`

**Represents:** Data orang tua dalam proses pendaftaran

**Key Fields:**
- `admission_id` - Reference ke Admission
- `name` - Nama orang tua
- `relationship` - Hubungan (ayah, ibu, wali)
- `phone` - Nomor telepon
- `email` - Email

### **4. Entity:** AdmissionDocument

**Model:** `app/Models/AdmissionDocument.php`

**Purpose:** Menyimpan dokumen-dokumen pendaftaran

**Key Fields:**
- `admission_id` - Reference ke Admission
- `document_type` - Tipe dokumen: birth_certificate, health_certificate, dll
- `file_path` - Path ke file

### **5. Entity:** AdmissionStatusLog

**Model:** `app/Models/AdmissionStatusLog.php`

**Purpose:** Tracking perubahan status pendaftaran

**Key Fields:**
- `admission_id` - Reference ke Admission
- `old_status` - Status sebelumnya
- `new_status` - Status baru
- `changed_by` - User yang mengubah
- `reason` - Alasan perubahan

### **Admission Flow:**

```
User Register
    ↓
1. Create User (parent) dengan role "parent"
2. Create Admission dengan status "waiting_document"
3. Create AdmissionStudent dengan data siswa
4. Create AdmissionParent dengan data orang tua
5. Upload AdmissionDocument (birth cert, health cert, dll)
    ↓
Admin Review
    ↓
6. Verifikasi dokumen
7. Update Admission status → "submitted" (jika complete) atau "waiting_document" (jika incomplete)
8. Create AdmissionStatusLog untuk tracking
    ↓
Final
    ↓
9. Approve → "verified" → Create Student record
   OR Reject → "rejected" → Notifikasi user
```

---

## 🏫 Academic Management

### **1. Academic Year (Tahun Ajaran)**

**Endpoints:**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/academic-years` | Get semua tahun ajaran |
| GET | `/api/v1/academic-years/{uuid}` | Get detail tahun ajaran |
| POST | `/api/v1/academic-years` | Create tahun ajaran |
| PUT | `/api/v1/academic-years/{uuid}` | Update tahun ajaran |
| DELETE | `/api/v1/academic-years/{uuid}` | Delete tahun ajaran |

**Status:** Public (belum RBAC)

**Service:** `AcademicYearService`

**Model:** `AcademicYear`

**Key Fields:**
- `name` - Nama tahun ajaran (contoh: "2025/2026")
- `start_date` - Tanggal mulai
- `end_date` - Tanggal berakhir
- `school_id` - Sekolah

**Response Example:**
```json
{
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "name": "2025/2026",
    "start_date": "2025-07-01",
    "end_date": "2026-06-30",
    "school_id": 1
}
```

---

### **2. Curricula (Kurikulum)**

**Endpoints:**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/curriculas` | Get semua kurikulum |
| GET | `/api/v1/curriculas/{uuid}` | Get detail kurikulum |
| POST | `/api/v1/curriculas` | Create kurikulum |
| PUT | `/api/v1/curriculas/{uuid}` | Update kurikulum |
| DELETE | `/api/v1/curriculas/{uuid}` | Delete kurikulum |

**Status:** Public (belum RBAC)

**Model:** `Curricula`

**Key Fields:**
- `name` - Nama kurikulum (contoh: "Kurikulum Merdeka")
- `description` - Deskripsi
- `school_id` - Sekolah

---

### **3. Lesson Theme (Tema Pembelajaran)**

**Endpoints:**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/lesson-themes` | Get semua tema |
| GET | `/api/v1/lesson-themes/{uuid}` | Get detail tema |
| POST | `/api/v1/lesson-themes` | Create tema |
| PUT | `/api/v1/lesson-themes/{uuid}` | Update tema |
| DELETE | `/api/v1/lesson-themes/{uuid}` | Delete tema |

**Status:** Public (belum RBAC)

**Model:** `LessonTheme`

**Key Fields:**
- `name` - Nama tema pembelajaran
- `school_id` - Sekolah

**Examples:**
- "Eksplorasi Alam"
- "Komunikasi"
- "Kreativitas"

---

### **4. Learning Category & Sub Category**

**Endpoints (Category):**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/learning-categories` | Get semua kategori |
| GET | `/api/v1/learning-categories/{uuid}` | Get detail kategori |
| POST | `/api/v1/learning-categories` | Create kategori |
| PUT | `/api/v1/learning-categories/{uuid}` | Update kategori |
| DELETE | `/api/v1/learning-categories/{uuid}` | Delete kategori |

**Endpoints (Sub Category):**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/learning-sub-categories` | Get semua sub kategori |
| GET | `/api/v1/learning-sub-categories/{uuid}` | Get detail sub kategori |
| POST | `/api/v1/learning-sub-categories` | Create sub kategori |
| PUT | `/api/v1/learning-sub-categories/{uuid}` | Update sub kategori |
| DELETE | `/api/v1/learning-sub-categories/{uuid}` | Delete sub kategori |

**Status:** Public (belum RBAC)

**Models:**
- `LearningCategory`
- `LearningSubCategory` (with foreignKey ke LearningCategory)

**Relationship:**
```
LearningCategory (1) ←→ (many) LearningSubCategory
```

**Examples of Category:**
- "Kognitif"
- "Bahasa"
- "Sosial Emosional"

**Examples of Sub Category (under Kognitif):**
- "Pemecahan Masalah"
- "Logika"
- "Analisis"

---

### **5. Cross Disciplinary (Lintas Disiplin)**

**Endpoints:**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/cross-disciplinaries` | Get semua lintas disiplin |
| GET | `/api/v1/cross-disciplinaries/{uuid}` | Get detail |
| POST | `/api/v1/cross-disciplinaries` | Create |
| PUT | `/api/v1/cross-disciplinaries/{uuid}` | Update |
| DELETE | `/api/v1/cross-disciplinaries/{uuid}` | Delete |

**Model:** `CrossDisciplinary`

**Key Fields:**
- `name` - Nama lintas disiplin
- `description` - Deskripsi

**Examples:**
- "Investasi Logis"
- "Atensi Detail"
- "Kolaborasi Cerdas"

---

### **6. Partnership (Kemitraan)**

**Endpoints:**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/partnerships` | Get semua kemitraan |
| GET | `/api/v1/partnerships/{uuid}` | Get detail |
| POST | `/api/v1/partnerships` | Create |
| PUT | `/api/v1/partnerships/{uuid}` | Update |
| DELETE | `/api/v1/partnerships/{uuid}` | Delete |

**Model:** `Partnership`

**Key Fields:**
- `name` - Nama partner
- `description` - Deskripsi

**Examples:**
- "Taman Kota"
- "Perpustakaan Daerah"
- "Museum Lokal"

---

### **7. Grade (Kelas)**

**Endpoints:**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/grades` | Get semua kelas |
| GET | `/api/v1/grades/{uuid}` | Get detail kelas |
| POST | `/api/v1/grades` | Create kelas |
| PUT | `/api/v1/grades/{uuid}` | Update kelas |
| DELETE | `/api/v1/grades/{uuid}` | Delete kelas |

**Status:** Public (belum RBAC)

**Model:** `Grade`

**Key Fields:**
- `type` - Tipe kelas (contoh: "A", "B", "1", "2")
- `description` - Deskripsi
- `is_active` - Status aktif
- `school_id` - Sekolah

**Relationships:**
- `gradeLevels` - hasMany GradeLevel (tingkat kesulitan)

---

### **8. Grade Level (Level Kelas)**

**Model:** `GradeLevel`

**Purpose:** Mendefinisikan tingkatan/level dalam sebuah kelas

**Key Fields:**
- `grade_id` - Reference ke Grade
- `level` - Level (1, 2, 3, etc)
- `name` - Nama level

---

---

## 📅 Schedule & Lesson Planning

### **1. Schedule (Kalender Sekolah)**

**Endpoints:**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/schedules?month=2026-02` | Get kalender bulanan |
| GET | `/api/v1/schedules/{date}` | Get detail tanggal |
| POST | `/api/v1/schedules/{date}/lesson-activities` | Add lesson activity |
| PATCH | `/api/v1/schedules/{date}/lesson-activities/{uuid}` | Update lesson activity |
| DELETE | `/api/v1/schedules/{date}/lesson-activities/{uuid}` | Remove lesson activity |

**Status:** Public (belum auth, tapi perlu di-add)

**Service:** `ScheduleService`

**Model:** `Schedule`

**Key Fields:**
- `school_id` - Sekolah
- `date` - Tanggal (DATE format)
- `description` - Deskripsi (optional)

**Relationships:**
- `scheduleLessonActivities` - hasMany ScheduleLessonActivity

**Example Response - Get Monthly Schedule:**
```json
{
    "code": 200,
    "message": "List schedule by month",
    "results": [
        {
            "uuid": "550e8400-e29b-41d4-a716-446655440000",
            "date": "2026-02-01",
            "description": null
        },
        {
            "uuid": "550e8400-e29b-41d4-a716-446655440001",
            "date": "2026-02-02",
            "description": "Upacara Bendera"
        }
    ]
}
```

**Example Response - Get Detail by Date:**
```json
{
    "code": 200,
    "message": "Schedule detail",
    "results": {
        "date": "2026-02-02",
        "lesson_activities": [
            {
                "uuid": "550e8400-e29b-41d4-a716-446655440000",
                "title": "Eksplorasi Alam - Bagian 1",
                "description": "Anak-anak melakukan eksplorasi di taman sekolah",
                "lesson_goal": "Mengenal lingkungan alam sekitar"
            }
        ]
    }
}
```

### **2. Schedule Lesson Activity (Aktivitas Pembelajaran di Jadwal)**

**Model:** `ScheduleLessonActivity`

**Purpose:** Menyimpan lesson activities yang dijadwalkan di tanggal tertentu

**Key Fields:**
- `schedule_id` - Reference ke Schedule
- `lesson_activity_id` - Reference ke LessonActivity
- `note` - Catatan tambahan

---

### **3. Lesson Activity (Aktivitas Pembelajaran)**

**Endpoints:**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/lesson-activities` | Get semua aktivitas |
| GET | `/api/v1/lesson-activities/{uuid}` | Get detail aktivitas |
| POST | `/api/v1/lesson-activities` | Create aktivitas |
| PUT | `/api/v1/lesson-activities/{uuid}` | Update aktivitas |
| DELETE | `/api/v1/lesson-activities/{uuid}` | Delete aktivitas |

**Status:** Public (belum RBAC)

**Service:** `LessonActivityService`

**Model:** `LessonActivity`

**Key Fields:**
- `school_id` - Sekolah
- `semester` - Semester (1 atau 2)
- `title` - Judul aktivitas pembelajaran
- `description` - Deskripsi detail
- `lesson_goal` - Tujuan pembelajaran
- `lesson_outcome` - Hasil pembelajaran yang diharapkan
- `lesson_environment` - Lingkungan pembelajaran (dalam kelas, outdoor, dll)
- `digital_utilization` - Pemanfaatan digital (ya/tidak)

**Relationships:**
- `lessonTheme` - belongsTo LessonTheme
- `learningCategory` - belongsTo LearningCategory
- `learningSubCategory` - belongsTo LearningSubCategory
- `crossDisciplinary` - belongsTo CrossDisciplinary
- `partnership` - belongsTo Partnership
- `academicYear` - belongsTo AcademicYear
- `grade` - belongsTo Grade

**Example Request:**
```json
{
    "school_id": 1,
    "semester": 1,
    "lesson_theme_id": 1,
    "learning_category_id": 1,
    "learning_sub_category_id": 1,
    "title": "Eksplorasi Alam - Bagian 1",
    "description": "Anak-anak melakukan eksplorasi di taman sekolah",
    "lesson_goal": "Mengenal lingkungan alam sekitar",
    "lesson_outcome": "Siswa dapat mengidentifikasi 5 jenis tumbuhan",
    "cross_disciplinary_id": 1,
    "lesson_environment": "outdoor",
    "partnership_id": 1,
    "academic_year_id": 1,
    "digital_utilization": false,
    "grade_id": 1
}
```

**Example Response:**
```json
{
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Eksplorasi Alam - Bagian 1",
    "description": "Anak-anak melakukan eksplorasi di taman sekolah",
    "lesson_goal": "Mengenal lingkungan alam sekitar",
    "lesson_outcome": "Siswa dapat mengidentifikasi 5 jenis tumbuhan",
    "lesson_environment": "outdoor",
    "digital_utilization": false,
    "semester": 1
}
```

### **4. Lesson Activity Dropdown Options**

**Endpoint:** `GET /api/v1/lesson-activity-options/{resource}`

**Purpose:** Get options untuk dropdown di form lesson activity

**Sub Endpoints:**

| Endpoint | Purpose |
|----------|---------|
| `/api/v1/lesson-activity-options/academic-years` | Get academic year options |
| `/api/v1/lesson-activity-options/lesson-themes` | Get lesson theme options |
| `/api/v1/lesson-activity-options/learning-categories` | Get learning category options |
| `/api/v1/lesson-activity-options/learning-sub-categories` | Get learning sub category options |
| `/api/v1/lesson-activity-options/cross-disciplinaries` | Get cross disciplinary options |
| `/api/v1/lesson-activity-options/partnerships` | Get partnership options |
| `/api/v1/lesson-activity-options/grades` | Get grade options |

**Response Example:**
```json
{
    "code": 200,
    "message": "Options loaded",
    "results": [
        {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440000",
            "name": "2025/2026"
        },
        {
            "id": 2,
            "uuid": "550e8400-e29b-41d4-a716-446655440001",
            "name": "2026/2027"
        }
    ]
}
```

---

## 📊 Learning & Assessment

### **1. Learning Activity (Aktivitas Belajar Siswa)**

**Model:** `LearningActivity`

**Purpose:** Mencatat aktivitas pembelajaran siswa

**Key Fields:**
- `student_id` - Siswa
- `learning_category_id` - Kategori pembelajaran
- `description` - Deskripsi aktivitas

---

### **2. Learning Documentation (Dokumentasi Pembelajaran)**

**Model:** `LearningDocumentation`

**Purpose:** Dokumentasi pembelajaran (foto, video, dll)

**Key Fields:**
- `learning_activity_id` - Reference ke LearningActivity
- `file_path` - Path ke file
- `file_type` - Tipe file (image, video, pdf, dll)

---

### **3. Learning Progress (Progress Pembelajaran)**

**Model:** `LearningProgress`

**Purpose:** Tracking progress pembelajaran siswa

**Key Fields:**
- `student_id` - Siswa
- `learning_category_id` - Kategori pembelajaran
- `progress` - Persentase progress (0-100)
- `status` - Status (belum_mulai, dalam_proses, selesai)

---

### **4. Attendance (Absensi)**

**Endpoints:**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/attendances` | Get daftar absensi |
| POST | `/api/v1/attendances` | Create absensi |
| PUT | `/api/v1/attendances/{uuid}` | Update absensi |
| DELETE | `/api/v1/attendances/{uuid}` | Delete absensi |

**Model:** `Attendance`

**Key Fields:**
- `uuid` - Unique identifier
- `student_id` - Siswa
- `school_id` - Sekolah
- `learning_activity_id` - Aktivitas pembelajaran
- `attendance_type` - Tipe kehadiran: hadir, sakit, izin, alfa

---

### **5. Grade Progress (Progress Nilai)**

**Model:** `GradeProgress`

**Purpose:** Mencatat progress nilai siswa

**Key Fields:**
- `student_id` - Siswa
- `grade_id` - Kelas
- `score` - Nilai
- `subject` - Mata pelajaran (jika ada)

---

### **6. Student Documentation (Dokumentasi Siswa)**

**Model:** `StudentDocumentation`

**Purpose:** Menyimpan dokumentasi siswa selama pembelajaran

**Key Fields:**
- `student_id` - Siswa
- `learning_documentation_id` - Reference ke dokumentasi pembelajaran
- `file_path` - Path ke file

---

---

## 🗂️ Master Data Management

### **1. Religion (Agama)**

**Endpoints:**

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/api/v1/religion` | Get semua agama | Public |
| POST | `/api/v1/religion` | Create agama | Protected |
| GET | `/api/v1/religion/{id}` | Get detail agama | Protected |
| PUT | `/api/v1/religion/{id}` | Update agama | Protected |
| DELETE | `/api/v1/religion/{id}` | Delete agama | Protected |

**Model:** `Religion`

**Key Fields:**
- `id` - ID
- `name` - Nama agama

**Examples:**
- "Islam"
- "Kristen Protestan"
- "Kristen Katolik"
- "Hindu"
- "Budha"
- "Konghucu"

---

### **2. Immunization (Imunisasi)**

**Endpoints:**

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/api/v1/immunization-options` | Get semua imunisasi | Public |
| GET | `/api/v1/immunizations` | Get semua imunisasi | Admin only |
| POST | `/api/v1/immunizations` | Create imunisasi | Admin only |
| GET | `/api/v1/immunizations/{id}` | Get detail imunisasi | Admin only |
| PUT | `/api/v1/immunizations/{id}` | Update imunisasi | Admin only |
| DELETE | `/api/v1/immunizations/{id}` | Delete imunisasi | Admin only |

**Model:** `Immunization`

**Key Fields:**
- `id` - ID
- `name` - Nama imunisasi
- `description` - Deskripsi

**Examples:**
- "BCG"
- "DPT"
- "Polio"
- "Campak"
- "Hepatitis B"

---

### **3. Student Immunization (Imunisasi Siswa)**

**Model:** `StudentImmunization`

**Purpose:** Track imunisasi yang sudah diterima siswa

**Key Fields:**
- `student_id` - Siswa
- `immunization_id` - Jenis imunisasi
- `date_received` - Tanggal menerima imunisasi
- `status` - Status: completed, pending

---

### **4. Questionnaire (Kuesioner)**

**Endpoints:**

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/api/v1/questionnaire` | Get semua kuesioner | Public |
| GET | `/api/v1/questionnaire/{uuid}` | Get detail kuesioner | Public |
| POST | `/api/v1/questionnaire` | Create kuesioner | Admin only |
| PUT | `/api/v1/questionnaire/{uuid}` | Update kuesioner | Admin only |
| DELETE | `/api/v1/questionnaire/{uuid}` | Delete kuesioner | Admin only |

**Model:** `Questionnaire`

**Key Fields:**
- `uuid` - Unique identifier
- `title` - Judul kuesioner
- `description` - Deskripsi
- `school_id` - Sekolah

**Relationships:**
- `options` - hasMany QuestionnaireOption
- `answers` - hasMany QuestionnaireAnswer

---

### **5. Questionnaire Option (Pilihan Kuesioner)**

**Model:** `QuestionnaireOption`

**Key Fields:**
- `questionnaire_id` - Reference ke Questionnaire
- `label` - Label pilihan
- `value` - Nilai/score

**Example:**
```
Questionnaire: "Seberapa puas Anda dengan pelayanan kami?"
Options:
  - Sangat Tidak Puas (1)
  - Tidak Puas (2)
  - Cukup Puas (3)
  - Puas (4)
  - Sangat Puas (5)
```

---

### **6. Questionnaire Answer (Jawaban Kuesioner)**

**Model:** `QuestionnaireAnswer`

**Key Fields:**
- `questionnaire_id` - Kuesioner
- `questionnaire_option_id` - Pilihan yang dipilih
- `respondent_id` - User yang menjawab
- `respondent_type` - Tipe respondent (parent, teacher, student, dll)

---

### **7. Organization (Organisasi)**

**Model:** `Organization`

**Purpose:** Data organisasi/lembaga pengelola sekolah

**Key Fields:**
- `uuid` - UUID
- `name` - Nama organisasi
- `address` - Alamat
- `phone` - Telepon
- `email` - Email

---

### **8. School (Sekolah)**

**Model:** `School`

**Key Fields:**
- `uuid` - UUID
- `name` - Nama sekolah
- `address` - Alamat
- `phone` - Telepon
- `email` - Email
- `organization_id` - Reference ke Organization

---

### **9. Teacher (Guru)**

**Model:** `Teacher`

**Key Fields:**
- `uuid` - UUID
- `user_id` - Reference ke User
- `nik` - NIK guru
- `school_id` - Sekolah
- `specialization` - Spesialisasi mengajar

---

### **10. Classroom (Ruang Kelas)**

**Endpoints:**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/classrooms` | Get semua ruang kelas |
| POST | `/api/v1/classrooms` | Create ruang kelas |
| GET | `/api/v1/classrooms/{uuid}` | Get detail |
| PUT | `/api/v1/classrooms/{uuid}` | Update |
| DELETE | `/api/v1/classrooms/{uuid}` | Delete |

**Model:** `Classroom`

**Key Fields:**
- `uuid` - UUID
- `name` - Nama ruang kelas
- `school_id` - Sekolah

---

### **11. Student Class (Kelas Siswa)**

**Model:** `StudentClass`

**Purpose:** Relasi antara siswa dan kelas

**Key Fields:**
- `student_id` - Siswa
- `classroom_id` - Kelas
- `academic_year_id` - Tahun ajaran

---

### **12. Student Parent (Orang Tua Siswa)**

**Model:** `StudentParent`

### **Key Fields:**
- `student_id` - Siswa
- `name` - Nama orang tua
- `relationship` - Hubungan (ayah, ibu, wali)
- `phone` - Telepon
- `email` - Email

---

### **13. Student (Siswa)**

**Model:** `Student`

**Key Fields:**
- `uuid` - UUID
- `nik` - NIK siswa
- `name` - Nama siswa
- `nickname` - Nama panggilan
- `gender` - Jenis kelamin
- `birth_place` - Tempat lahir
- `birth_date` - Tanggal lahir
- `address` - Alamat
- `religion_id` - Agama
- `school_id` - Sekolah
- `student_class_id` - Kelas saat ini
- `status` - Status siswa (aktif, tidak aktif, lulus, dll)

---

### **14. User (User Sistem)**

**Model:** `User`

**Key Fields:**
- `uuid` - UUID
- `name` - Nama lengkap
- `email` - Email
- `password` - Password (hashed)
- `nik` - NIK (untuk login alternatif)
- `phone` - Nomor telepon
- `is_active` - Status aktif
- `school_id` - Sekolah
- `userable_id` - Polymorphic relation ke Student/Teacher/Parent/Admin
- `userable_type` - Tipe dari userable

**Relationships:**
- `school` - belongsTo School
- `userable` - morphTo (bisa Student, Teacher, atau model lain)

---

---

## 🎨 API Response Format

### **Success Response**

**Format:**
```json
{
    "code": 200,
    "message": "Operation successful",
    "results": {
        // Data payload
    }
}
```

**Example - List:**
```json
{
    "code": 200,
    "message": "Fetch academic years success",
    "results": [
        {
            "uuid": "550e8400-e29b-41d4-a716-446655440000",
            "name": "2025/2026",
            "start_date": "2025-07-01",
            "end_date": "2026-06-30"
        }
    ]
}
```

**Example - Single:**
```json
{
    "code": 200,
    "message": "Create academic year success",
    "results": {
        "uuid": "550e8400-e29b-41d4-a716-446655440000",
        "name": "2025/2026",
        "start_date": "2025-07-01",
        "end_date": "2026-06-30"
    }
}
```

### **Error Response**

**Bad Request (400):**
```json
{
    "code": 400,
    "message": "Validation failed",
    "results": {
        "name": ["The name field is required"],
        "email": ["The email must be a valid email"]
    }
}
```

**Unauthorized (401):**
```json
{
    "code": 401,
    "message": "Unauthorized access",
    "results": null
}
```

**Not Found (404):**
```json
{
    "code": 404,
    "message": "Resource not found",
    "results": null
}
```

**Server Error (500):**
```json
{
    "code": 500,
    "message": "Internal server error",
    "results": null
}
```

### **HTTP Status Codes Used**

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Validation error / invalid input |
| 401 | Unauthorized | No authentication token |
| 403 | Forbidden | No permission to access |
| 404 | Not Found | Resource not found |
| 422 | Unprocessable Entity | Business logic validation failed |
| 500 | Internal Server Error | Server error |

---

---

## 📌 Feature Status Summary

| Feature | Status | Auth | RBAC | Notes |
|---------|--------|------|------|-------|
| **Authentication** | ✅ Complete | - | - | Login, Register, Logout |
| **User Profile** | ✅ Complete | ✅ Required | - | Get current user |
| **Admission** | ✅ Complete | - | - | Full registration flow with documents |
| **Academic Year** | ✅ Complete | - | - | CRUD operations |
| **Curricula** | ✅ Complete | - | - | CRUD operations |
| **Lesson Theme** | ✅ Complete | - | - | CRUD operations |
| **Learning Category** | ✅ Complete | - | - | CRUD operations |
| **Learning Sub Category** | ✅ Complete | - | - | CRUD operations |
| **Cross Disciplinary** | ✅ Complete | - | - | CRUD operations |
| **Partnership** | ✅ Complete | - | - | CRUD operations |
| **Grade** | ✅ Complete | - | - | CRUD operations |
| **Grade Level** | ✅ Complete | - | - | CRUD operations |
| **Lesson Activity** | ✅ Complete | - | - | Full CRUD + dropdown options |
| **Schedule** | ✅ Complete | - | 🔄 Partial | Monthly calendar, lesson activity management |
| **Attendance** | ✅ Complete | ⚠️ Partial | - | CRUD operations |
| **Religion** | ✅ Complete | ✅ Required | ✅ Admin only | CRUD operations |
| **Immunization** | ✅ Complete | ✅ Required | ✅ Admin only | CRUD operations |
| **Questionnaire** | ✅ Complete | ✅ Required | ✅ Admin only | CRUD operations |
| **Learning Progress** | ✅ Complete | - | - | Basic implementation |
| **Lesson Plan** | ✅ Partial | - | 🔄 Partial | RBAC test endpoint available |

---

## 🚀 Next Steps for Development

### **Features to Enhance:**
1. ✅ Add full RBAC protection to all endpoints
2. ✅ Implement Grade/Assessment system
3. ✅ Add Payment integration
4. ✅ Implement Learning Documentation system
5. ✅ Add Student Progress Reports
6. ✅ Implement Parent-Student dashboard
7. ✅ Add Attendance Reports
8. ✅ Implement Analytics & Dashboard

### **API Endpoints Still Needed:**
- [ ] Class management endpoints
- [ ] Teacher assignment endpoints
- [ ] Report generation endpoints
- [ ] Notification system
- [ ] File download endpoints
- [ ] Bulk operations endpoints

---

## 📞 API Base URL

```
Local: http://localhost:8000/api/v1
Production: https://api.edugrow.com/v1
```

---

## 🔗 Related Documentation

- **[Architecture Guide](./PANDUAN_MEMBUAT_FITUR_BARU.md)** - Cara membuat fitur baru
- **Database Schema** - Structure database
- **Authentication Flow** - Detail authentication
- **RBAC Setup** - Role & Permission configuration

---

**Dokumentasi ini diperbarui terakhir: 14 Februari 2026**

Untuk pertanyaan atau update fitur, silakan hubungi tech lead.
