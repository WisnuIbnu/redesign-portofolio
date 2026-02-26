# 🔐 RBAC (Role-Based Access Control) — Perbedaan Roles vs Permissions

**Project:** EduGrow Backend  
**Library:** Spatie Laravel Permissions

---

## 📊 Diagram: Relasi Roles, Permissions & Users

```
┌─────────────────────────────────────────────────────────────────┐
│                         DATABASE TABLES                         │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐                          ┌──────────────┐
│    ROLES     │ ◄──────────────────────► │ PERMISSIONS  │
├──────────────┤    role_has_permissions  ├──────────────┤
│ id           │  (many-to-many)          │ id           │
│ name         │◄──────────────────►      │ name         │
│ (admin)      │                          │ (curricula   │
│ (principal)  │                          │  .create)    │
│ (teacher)    │                          │              │
│ (parent)     │                          │              │
└──────────────┘                          └──────────────┘
       ▲                                          ▲
       │                                          │
       │ model_has_roles                          │
       │ (many-to-many)                           │
       │                                          │
       │ model_has_permissions                    │
       │ (many-to-many)                           │
       │                                          │
┌──────┴──────┐                          ┌───────┴────────┐
│    USERS     │                          │  (direct perms)│
├──────────────┤                          └────────────────┘
│ id           │
│ name         │
│ email        │
│ role: admin  │ ◄──── bisa punya multiple roles
│              │       dan direct permissions
└──────────────┘

```

---

## 🎯 Perbedaan Fundamental

### **ROLES vs PERMISSIONS**

| Aspek | **Roles** | **Permissions** |
|-------|-----------|-----------------|
| **Apa itu?** | Kelompok/kategori user (nama jabatan) | Aksi spesifik yang boleh dilakukan |
| **Contoh** | `admin`, `teacher`, `parent` | `curricula.create`, `grade.view`, `payment.verify` |
| **Jumlah** | Sedikit (4–10 roles) | Banyak (puluhan permissions) |
| **Relasi** | 1 user bisa punya banyak roles | 1 role punya banyak permissions |
| **Scope** | "Siapa Anda?" | "Apa yang boleh Anda lakukan?" |

---

## 💡 Analogi Sederhana

**Roles = Jabatan di perusahaan:**
- Manager
- HR
- Developer
- Designer

**Permissions = Akses tertentu:**
- "Bisa approve leave"
- "Bisa lihat gaji"
- "Bisa push code"
- "Bisa upload design"

**User:**
```
Ahmad (Manager) 
  → memiliki ROLE: "manager"
  → role "manager" punya PERMISSIONS: 
    - approve_leave ✅
    - view_salary ✅
    - manage_team ✅
    - push_code ❌ (tidak ada di role manager)

Budi (Developer)
  → memiliki ROLE: "developer"
  → role "developer" punya PERMISSIONS:
    - push_code ✅
    - approve_leave ❌ (tidak ada di role developer)
    - view_salary ❌
```

---

## 📋 Database Tables yang Dibuat Spatie

Saat seeder dijalankan, Spatie otomatis membuat table ini:

### **1. Tables (created by Spatie automatically)**

```sql
-- Table untuk permissions
CREATE TABLE permissions (
    id INT PRIMARY KEY,
    name VARCHAR(255) UNIQUE,  -- "curricula.create"
    guard_name VARCHAR(255),   -- "api" atau "web"
    created_at TIMESTAMP
);

-- Table untuk roles
CREATE TABLE roles (
    id INT PRIMARY KEY,
    name VARCHAR(255) UNIQUE,  -- "admin", "teacher", dll
    guard_name VARCHAR(255),   -- "api" atau "web"
    created_at TIMESTAMP
);

-- Relasi: Role punya Permissions
CREATE TABLE role_has_permissions (
    permission_id INT,
    role_id INT,
    PRIMARY KEY (permission_id, role_id)
);

-- Relasi: User punya Roles
CREATE TABLE model_has_roles (
    role_id INT,
    model_id BIGINT,     -- user_id
    model_type VARCHAR   -- "App\\Models\\User"
);

-- Relasi: User punya direct Permissions (opsional)
CREATE TABLE model_has_permissions (
    permission_id INT,
    model_id BIGINT,
    model_type VARCHAR
);
```

---

## 🔧 Cara Kerja di Code

### **Step 1: Buat Permission (RolePermissionSeeder.php)**

```php
// Dari: database/seeders/RolePermissionSeeder.php

$permissions = [
    'curricula.create',      // ← Ini permission
    'curricula.update',
    'curricula.delete',
    'curricula.view',
    
    'lesson_plan.create',
    'lesson_plan.update',
    'lesson_plan.delete',
    'lesson_plan.view',
    
    'grade.create',
    'grade.view',
    
    'payment.verify',        // ← Permission untuk admin
];

// Create permissions di database
foreach ($permissions as $permission) {
    Permission::firstOrCreate(['name' => $permission]);
}

// Sekarang di table `permissions` sudah ada:
// ┌────┬──────────────────┐
// │ id │ name             │
// ├────┼──────────────────┤
// │ 1  │ curricula.create │
// │ 2  │ curricula.update │
// │ 3  │ curricula.delete │
// ...
```

---

### **Step 2: Buat Role (RolePermissionSeeder.php)**

```php
// Dari: database/seeders/RolePermissionSeeder.php

$admin     = Role::firstOrCreate(['name' => 'admin']);
$principal = Role::firstOrCreate(['name' => 'principal']);
$teacher   = Role::firstOrCreate(['name' => 'teacher']);
$parent    = Role::firstOrCreate(['name' => 'parent']);

// Sekarang di table `roles`:
// ┌────┬───────────┐
// │ id │ name      │
// ├────┼───────────┤
// │ 1  │ admin     │
// │ 2  │ principal │
// │ 3  │ teacher   │
// │ 4  │ parent    │
// └────┴───────────┘
```

---

### **Step 3: Hubungkan Role ← Permissions (RolePermissionSeeder.php)**

```php
// Give permissions to role ADMIN
$admin->givePermissionTo([
    'payment.verify',    // ← Admin bisa verify payment
    'payment.view',
    'document.view',
]);

// Ini akan INSERT di table `role_has_permissions`:
// ┌────────────┬────────┐
// │permission_id│ role_id │
// ├─────────────┼────────┤
// │ 60          │ 1      │  (payment.verify → admin)
// │ 61          │ 1      │  (payment.view → admin)
// │ 62          │ 1      │  (document.view → admin)
// └─────────────┴────────┘

// Give permissions to role TEACHER
$teacher->givePermissionTo([
    'class.view',
    'lesson_plan.create',
    'lesson_plan.update',
    'attendance.create',
    'grade.create',
    // ... banyak permissions untuk teacher
]);

// Ini akan INSERT di table `role_has_permissions`:
// ┌────────────┬────────┐
// │permission_id│ role_id │
// ├─────────────┼────────┤
// │ 15          │ 3      │  (class.view → teacher)
// │ 20          │ 3      │  (lesson_plan.create → teacher)
// │ 21          │ 3      │  (lesson_plan.update → teacher)
// ...
```

---

### **Step 4: Assign Role ke User (AdminSeeder.php)**

```php
// Dari: database/seeders/AdminSeeder.php

$admin = User::firstOrCreate([...]);

// Assign role 'admin' ke user admin@example.com
$admin->assignRole('admin');

// Ini akan INSERT di table `model_has_roles`:
// ┌────────┬────────┤──────────────────────┐
// │ role_id │model_id│ model_type           │
// ├─────────┼────────┼──────────────────────┤
// │ 1       │ 1      │ App\Models\User      │
// └─────────┴────────┴──────────────────────┘
```

---

### **Step 5: Check Permission di Controller/Route**

```php
// Dari: app/Http/Controllers/API/AuthController.php

class AuthController extends Controller {
    
    public function login(LoginRequest $request) {
        $result = $this->authService->login($request->validated());
        
        // $result['user'] adalah User dengan role 'admin'
        // User ini punya akses ke permissions yang terkait role 'admin'
        
        return $this->success($result, 'Login success');
    }
}
```

---

### **Step 6: Middleware Protection (routes/api.php)**

```php
// Dari: routes/api.php

// ✅ Check apakah user punya ROLE 'admin'
Route::middleware('role:admin')->group(function () {
    // Hanya user dengan role 'admin' yang bisa akses
    Route::get('/immunizations', [ImmunizationController::class, 'index']);
});

// ✅ Check apakah user punya PERMISSION 'payment.verify'
Route::middleware('permission:payment.verify')->group(function () {
    // Hanya user yang punya permission 'payment.verify' yang bisa akses
    Route::post('/payments/{id}/verify', [PaymentController::class, 'verify']);
});

// ✅ Kombinasi ROLE dan PERMISSION
Route::middleware(['auth:sanctum', 'role:admin|teacher'])->group(function () {
    // Hanya admin atau teacher yang bisa akses
});
```

---

### **Step 7: Check di Controller Method**

```php
// Cara 1: Check role
if ($user->hasRole('admin')) {
    // User adalah admin
}

// Cara 2: Check multiple roles
if ($user->hasAnyRole(['admin', 'principal'])) {
    // User adalah admin atau principal
}

// Cara 3: Check permission
if ($user->hasPermissionTo('payment.verify')) {
    // User boleh verify payment
}

// Cara 4: Check jika permission ada
if (auth()->user()->can('teacher.create')) {
    // User boleh create teacher
}
```

---

## 🔀 Full Flow: Login → Check Permission

```
USER LOGIN
    ↓
1. POST /api/v1/login
    ↓
2. AuthController::login()
   - Validasi via AuthService
   - Generate token
    ↓
3. Return User dengan role 'admin'
   {
       "user": {
           "id": 1,
           "name": "Admin User",
           "email": "admin@example.com",
           "roles": ["admin"]
       },
       "token": "1|abc..."
   }
    ↓
4. Frontend simpan token di header: Authorization: Bearer 1|abc...
    ↓
5. REQUEST ke protected endpoint:
   POST /api/v1/payments/123/verify
   Authorization: Bearer 1|abc...
    ↓
6. Middleware check:
   - Validasi token via Sanctum ✅
   - Check role: 'admin' ✅
   - Check permission: 'payment.verify' ✅
    ↓
7. Request allowed → execute controller method
    ↓
8. Response 200 OK
```

---

## 📌 Contoh Praktis dari Project

### **Admin bisa do:**

```php
// Admin punya role 'admin'
// Role 'admin' punya permissions:
// - payment.verify
// - payment.view
// - document.view

$admin = User::findByEmail('admin@example.com');

$admin->hasRole('admin');                    // ✅ true
$admin->hasPermissionTo('payment.verify');   // ✅ true
$admin->hasPermissionTo('grade.create');     // ❌ false (tidak ada di admin)
```

### **Teacher bisa do:**

```php
// Teacher punya role 'teacher'
// Role 'teacher' punya permissions:
// - lesson_plan.create
// - lesson_plan.update
// - employment.create
// - grade.create
// - class.view
// - etc

$teacher = User::findByEmail('teacher@example.com');

$teacher->hasRole('teacher');                 // ✅ true
$teacher->hasPermissionTo('lesson_plan.create');  // ✅ true
$teacher->hasPermissionTo('payment.verify');      // ❌ false (tidak ada di teacher)
```

### **Parent bisa do:**

```php
// Parent punya role 'parent'
// Role 'parent' punya permissions:
// - student.view
// - grade.view
// - progress.view
// - attendance.view

$parent = User::findByEmail('parent@example.com');

$parent->hasRole('parent');                   // ✅ true
$parent->hasPermissionTo('student.view');     // ✅ true
$parent->hasPermissionTo('grade.create');     // ❌ false (read-only)
```

---

## 🎯 Summary: Roles vs Permissions

### **ROLES (Spatie table `roles`)**
- Kelompok user dengan akses serupa
- Contoh: `admin`, `teacher`, `parent`
- **Digunakan untuk:** Organizational structure, role-based groups

### **PERMISSIONS (Spatie table `permissions`)**
- Aksi spesifik yang bisa dilakukan
- Contoh: `curricula.create`, `payment.verify`, `grade.view`
- **Digunakan untuk:** Fine-grained access control

### **Relasi:**
- 1 User → Multiple Roles (via `model_has_roles`)
- 1 Role → Multiple Permissions (via `role_has_permissions`)
- Result: User mendapat semua permissions dari semua roles-nya

---

## 🚀 Tambahan: Direct Permissions ke User

Ada juga cara direct assign permission ke user (tanpa via role):

```php
// Assign permission langsung ke user (jarang dipakai)
$user->givePermissionTo('payment.verify');

// Atau
$user->givePermissionTo(['curricula.create', 'curricula.update']);

// Akan INSERT di table `model_has_permissions`
```

---

**Key Takeaway:**
- **Roles** = "Siapa Anda?" (identity group)
- **Permissions** = "Apa yang boleh Anda lakukan?" (actions/capabilities)
- **User** = Punya 1+ roles → mendapat semua permissions dari roles tersebut

Sekarang paham perbedaannya? Ada pertanyaan tentang implementasi di routes atau controller?
