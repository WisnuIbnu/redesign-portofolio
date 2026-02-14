# 📚 PANDUAN MEMBUAT FITUR BARU - EduGrow Backend

**Tanggal:** 14 Februari 2026  
**Project:** EduGrow Backend (Laravel)  
**Architecture:** MVC + Service Layer + Repository Pattern

---

## 🎯 Ringkasan

Panduan ini menjelaskan **urutan langkah yang benar** untuk membuat fitur REST API baru di project EduGrow Backend. Ikuti langkah-langkah ini untuk memastikan kode yang clean, maintainable, dan sesuai dengan architecture project.

---

## 📋 Daftar Isi

1. [Overview Architecture](#overview-architecture)
2. [Langkah-Langkah Implementasi](#langkah-langkah-implementasi)
3. [Contoh Lengkap: Fitur Payment](#contoh-lengkap-fitur-payment)
4. [Panduan Singkat Per Langkah](#panduan-singkat-per-langkah)
5. [Checklist](#checklist)

---

## 🏗️ Overview Architecture

```
CLIENT REQUEST
    ↓
ROUTES (routes/api.php) → Mengarahkan ke controller yang tepat
    ↓
CONTROLLER (Http/Controllers/API/*) → Menerima request, validasi
    ↓
SERVICE (Services/*) → Handle business logic
    ↓
REPOSITORY (Repositories/*) → Query database
    ↓
MODEL (Models/*) → Interact dengan database
    ↓
DATABASE
    ↓
RESPONSE (JSON via ApiResponse trait)
    ↓
CLIENT RESPONSE
```

---

## 📝 Langkah-Langkah Implementasi

### **TAHAP 1: DATABASE & MODEL**

#### **Langkah 1 - Buat / Update Model**

**File:** `app/Models/NamaModel.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\HasUuid;

class NamaModel extends Model
{
    use HasFactory, HasUuid;
    
    // Define table name
    protected $table = 'nama_tables';
    
    // Mass assignable attributes
    protected $fillable = [
        'uuid',
        'name',
        'description',
        'status',
        'school_id',
    ];
    
    // Attributes yang disembunyikan dari response
    protected $hidden = [
        'password', // jika ada
    ];
    
    // Type casting
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
    
    // Relationships
    public function school()
    {
        return $this->belongsTo(School::class, 'school_id');
    }
    
    // Scopes (optional)
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
```

**Tips:**
- Gunakan trait `HasUuid` jika ingin ID berupa UUID (tidak auto-increment)
- Selalu define `$fillable` untuk mass assignment protection
- Tambahkan `$hidden` untuk attribute yang tidak boleh di-expose

---

#### **Langkah 2 - Buat Migration**

**File:** `database/migrations/YYYY_MM_DD_HHMMSS_create_nama_tables_table.php`

**Cara generate:**
```bash
php artisan make:migration create_nama_tables_table
```

**Contoh:**

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nama_tables', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->foreignId('school_id')->constrained('schools')->onDelete('cascade');
            $table->timestamps();
            
            // Indexes
            $table->index('school_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nama_tables');
    }
};
```

**Tips:**
- Define foreign keys untuk relasi dengan table lain
- Tambahkan `nullable()` untuk field yang boleh kosong
- Gunakan `index()` untuk field yang sering di-query
- Selalu tambahkan `timestamps()` untuk created_at & updated_at

**Jalankan Migration:**
```bash
php artisan migrate
```

---

### **TAHAP 2: DATA ACCESS LAYER**

#### **Langkah 3 - Buat Repository**

**File:** `app/Repositories/NamaModelRepository.php`

```php
<?php

namespace App\Repositories;

use App\Models\NamaModel;

class NamaModelRepository
{
    /**
     * Get semua data
     */
    public function getAll()
    {
        return NamaModel::all();
    }
    
    /**
     * Get dengan pagination
     */
    public function getPaginated($perPage = 15)
    {
        return NamaModel::paginate($perPage);
    }
    
    /**
     * Find by ID
     */
    public function findById($id): ?NamaModel
    {
        return NamaModel::find($id);
    }
    
    /**
     * Find by UUID
     */
    public function findByUuid($uuid): ?NamaModel
    {
        return NamaModel::where('uuid', $uuid)->first();
    }
    
    /**
     * Create new record
     */
    public function create(array $data): NamaModel
    {
        return NamaModel::create($data);
    }
    
    /**
     * Update record
     */
    public function update($id, array $data): NamaModel
    {
        $model = $this->findById($id);
        $model->update($data);
        return $model->fresh();
    }
    
    /**
     * Delete record
     */
    public function delete($id): bool
    {
        return NamaModel::destroy($id) > 0;
    }
    
    /**
     * Find dengan condition
     */
    public function findWhere($column, $value)
    {
        return NamaModel::where($column, $value)->get();
    }
}
```

**Tips:**
- Repository handle SEMUA query ke database
- Method dibuat generic & reusable
- Jangan ada business logic di repository, hanya query
- Return type hint untuk type safety

---

### **TAHAP 3: BUSINESS LOGIC LAYER**

#### **Langkah 4 - Buat Service**

**File:** `app/Services/NamaModelService.php`

```php
<?php

namespace App\Services;

use App\Models\NamaModel;
use App\Repositories\NamaModelRepository;
use Illuminate\Validation\ValidationException;

class NamaModelService
{
    public function __construct(
        protected NamaModelRepository $repository
    ) {}
    
    /**
     * Get semua data
     */
    public function getAllNamaModel()
    {
        return $this->repository->getAll();
    }
    
    /**
     * Get by ID dengan error handling
     */
    public function getNamaModelById($id): NamaModel
    {
        $model = $this->repository->findById($id);
        
        if (!$model) {
            throw new \Exception('NamaModel dengan ID ' . $id . ' tidak ditemukan', 404);
        }
        
        return $model;
    }
    
    /**
     * Get by UUID
     */
    public function getNamaModelByUuid($uuid): NamaModel
    {
        $model = $this->repository->findByUuid($uuid);
        
        if (!$model) {
            throw new \Exception('NamaModel tidak ditemukan', 404);
        }
        
        return $model;
    }
    
    /**
     * Create new NamaModel dengan business logic
     */
    public function createNamaModel(array $data): NamaModel
    {
        // Business logic - validasi
        if (isset($data['end_date']) && isset($data['start_date'])) {
            if ($data['end_date'] <= $data['start_date']) {
                throw new \Exception('End date harus lebih besar dari start date', 422);
            }
        }
        
        // Check duplicate jika diperlukan
        if (isset($data['name'])) {
            $exists = $this->repository->findWhere('name', $data['name']);
            if ($exists->isNotEmpty()) {
                throw new \Exception('NamaModel dengan nama ini sudah ada', 422);
            }
        }
        
        // Create
        return $this->repository->create($data);
    }
    
    /**
     * Update NamaModel
     */
    public function updateNamaModel($id, array $data): NamaModel
    {
        $model = $this->getNamaModelById($id);
        
        // Business logic - validasi
        if (isset($data['status']) && !in_array($data['status'], ['active', 'inactive'])) {
            throw new \Exception('Status tidak valid', 422);
        }
        
        return $this->repository->update($id, $data);
    }
    
    /**
     * Delete NamaModel
     */
    public function deleteNamaModel($id): bool
    {
        $this->getNamaModelById($id); // Cek exist dulu
        return $this->repository->delete($id);
    }
}
```

**Tips:**
- Service handle semua business logic, validasi, error handling
- Inject Repository via constructor (Dependency Injection)
- Throw exception dengan HTTP status code yang tepat
- Reuse method existing (contoh: `getNamaModelById()` di update & delete)

---

### **TAHAP 4: API LAYER**

#### **Langkah 5 - Buat Form Request (Validation)**

**File:** `app/Http/Requests/NamaModelRequest.php`

**Cara generate:**
```bash
php artisan make:request NamaModelRequest
```

**Contoh:**

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NamaModelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'name'       => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'status'     => 'nullable|in:active,inactive',
            'school_id'  => 'required|exists:schools,id',
        ];
        
        // Rules untuk update
        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['name'] = 'sometimes|string|max:255';
            $rules['school_id'] = 'sometimes|exists:schools,id';
        }
        
        return $rules;
    }
    
    public function messages(): array
    {
        return [
            'name.required'    => 'Nama harus diisi',
            'school_id.required' => 'Sekolah harus dipilih',
            'school_id.exists' => 'Sekolah tidak valid',
        ];
    }
}
```

**Tips:**
- Gunakan method `isMethod()` untuk rule yang berbeda antara store & update
- Selalu sertakan custom messages untuk user-friendly errors
- Reference table lain dengan `exists:table_name,column`

---

#### **Langkah 6 - Buat Controller**

**File:** `app/Http/Controllers/API/NamaModelController.php`

**Cara generate:**
```bash
php artisan make:controller API/NamaModelController
```

**Contoh:**

```php
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\NamaModelRequest;
use App\Services\NamaModelService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class NamaModelController extends Controller
{
    use ApiResponse;
    
    public function __construct(
        protected NamaModelService $service
    ) {}
    
    /**
     * GET /api/v1/nama-models
     * Get semua data
     */
    public function index(Request $request)
    {
        try {
            $models = $this->service->getAllNamaModel();
            
            return $this->success(
                $models,
                'Fetch nama models success'
            );
        } catch (\Throwable $e) {
            return $this->serverError('Gagal mengambil data: ' . $e->getMessage());
        }
    }
    
    /**
     * GET /api/v1/nama-models/{uuid}
     * Get berdasarkan UUID
     */
    public function show($uuid)
    {
        try {
            $model = $this->service->getNamaModelByUuid($uuid);
            
            return $this->success(
                $model,
                'Fetch nama model success'
            );
        } catch (\Exception $e) {
            if ($e->getCode() === 404) {
                return $this->notFound($e->getMessage());
            }
            return $this->serverError($e->getMessage());
        }
    }
    
    /**
     * POST /api/v1/nama-models
     * Create new data
     */
    public function store(NamaModelRequest $request)
    {
        try {
            $model = $this->service->createNamaModel($request->validated());
            
            return $this->success(
                $model,
                'Create nama model success',
                201
            );
        } catch (\Exception $e) {
            if ($e->getCode() === 422) {
                return $this->badRequest($e->getMessage());
            }
            return $this->serverError($e->getMessage());
        }
    }
    
    /**
     * PUT /api/v1/nama-models/{uuid}
     * Update data
     */
    public function update($uuid, NamaModelRequest $request)
    {
        try {
            // Get by UUID terlebih dahulu
            $model = $this->service->getNamaModelByUuid($uuid);
            
            // Update
            $updated = $this->service->updateNamaModel($model->id, $request->validated());
            
            return $this->success(
                $updated,
                'Update nama model success'
            );
        } catch (\Exception $e) {
            if ($e->getCode() === 404) {
                return $this->notFound($e->getMessage());
            }
            if ($e->getCode() === 422) {
                return $this->badRequest($e->getMessage());
            }
            return $this->serverError($e->getMessage());
        }
    }
    
    /**
     * DELETE /api/v1/nama-models/{uuid}
     * Delete data
     */
    public function destroy($uuid)
    {
        try {
            $model = $this->service->getNamaModelByUuid($uuid);
            $this->service->deleteNamaModel($model->id);
            
            return $this->success(
                null,
                'Delete nama model success'
            );
        } catch (\Exception $e) {
            if ($e->getCode() === 404) {
                return $this->notFound($e->getMessage());
            }
            return $this->serverError($e->getMessage());
        }
    }
}
```

**Tips:**
- Gunakan `ApiResponse` trait untuk response yang konsisten
- Selalu wrap di try-catch untuk error handling
- Inject Service via constructor
- Return HTTP status code yang tepat (200, 201, 400, 404, 500)

---

#### **Langkah 7 - Update Routes**

**File:** `routes/api.php`

```php
<?php

// Tambahkan di bagian import
use App\Http\Controllers\API\NamaModelController;

Route::prefix('v1')->group(function () {
    
    // Public routes (tanpa auth)
    // ... existing routes ...
    
    // Protected routes (perlu auth + permission)
    Route::middleware(['auth:sanctum'])->group(function () {
        
        // API Resource untuk NamaModel
        Route::apiResource('nama-models', NamaModelController::class)
            ->parameters(['nama-models' => 'uuid']);
        
        // Jika ada custom method
        // Route::post('nama-models/{uuid}/custom-action', [NamaModelController::class, 'customAction']);
    });
});
```

**Tips:**
- Gunakan `apiResource` untuk CRUD otomatis
- Parameter gunakan `uuid` jika model pakai UUID
- Wrap dengan `middleware(['auth:sanctum'])` untuk protected routes
- Jika ingin RBAC (role-based), tambahkan middleware permission

**Dengan RBAC:**
```php
Route::middleware(['auth:sanctum', 'permission:nama_model.view'])->group(function () {
    Route::get('nama-models', [NamaModelController::class, 'index']);
    Route::get('nama-models/{uuid}', [NamaModelController::class, 'show']);
});

Route::middleware(['auth:sanctum', 'permission:nama_model.create'])->group(function () {
    Route::post('nama-models', [NamaModelController::class, 'store']);
});

Route::middleware(['auth:sanctum', 'permission:nama_model.update'])->group(function () {
    Route::put('nama-models/{uuid}', [NamaModelController::class, 'update']);
});

Route::middleware(['auth:sanctum', 'permission:nama_model.delete'])->group(function () {
    Route::delete('nama-models/{uuid}', [NamaModelController::class, 'destroy']);
});
```

---

### **TAHAP 5: TESTING & SEEDING (OPTIONAL)**

#### **Langkah 8 - Buat Factory (Optional)**

**File:** `database/factories/NamaModelFactory.php`

**Cara generate:**
```bash
php artisan make:factory NamaModelFactory
```

```php
<?php

namespace Database\Factories;

use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;

class NamaModelFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'        => fake()->word(),
            'description' => fake()->paragraph(),
            'status'      => fake()->randomElement(['active', 'inactive']),
            'school_id'   => School::factory(),
        ];
    }
}
```

---

#### **Langkah 9 - Buat Seeder (Optional)**

**File:** `database/seeders/NamaModelSeeder.php`

**Cara generate:**
```bash
php artisan make:seeder NamaModelSeeder
```

```php
<?php

namespace Database\Seeders;

use App\Models\NamaModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NamaModelSeeder extends Seeder
{
    public function run(): void
    {
        NamaModel::factory(10)->create();
    }
}
```

**Daftarkan di DatabaseSeeder:**
```php
public function run(): void
{
    $this->call([
        // ... existing seeders ...
        NamaModelSeeder::class,
    ]);
}
```

**Jalankan seeder:**
```bash
php artisan db:seed --class=NamaModelSeeder
```

---

#### **Langkah 10 - Buat Unit Test (Optional)**

**File:** `tests/Feature/NamaModelTest.php`

**Cara generate:**
```bash
php artisan make:test NamaModelTest
```

```php
<?php

namespace Tests\Feature;

use App\Models\NamaModel;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NamaModelTest extends TestCase
{
    use RefreshDatabase;
    
    protected $user;
    
    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }
    
    public function test_get_all_nama_models()
    {
        NamaModel::factory(5)->create();
        
        $response = $this->actingAs($this->user)
            ->getJson('/api/v1/nama-models');
        
        $response->assertStatus(200)
            ->assertJsonStructure([
                'code', 'message', 'results'
            ]);
    }
    
    public function test_create_nama_model()
    {
        $data = [
            'name'        => 'Test Model',
            'description' => 'Test Description',
            'status'      => 'active',
            'school_id'   => 1,
        ];
        
        $response = $this->actingAs($this->user)
            ->postJson('/api/v1/nama-models', $data);
        
        $response->assertStatus(201)
            ->assertJsonPath('message', 'Create nama model success');
    }
}
```

**Jalankan test:**
```bash
php artisan test
```

---

## 🎯 Contoh Lengkap: Fitur Payment

**Skenario:** Membuat REST API untuk manage payments

### **1. Model**

```php
// app/Models/Payment.php
class Payment extends Model {
    use HasFactory, HasUuid;
    
    protected $table = 'payments';
    protected $fillable = ['uuid', 'student_id', 'amount', 'status', 'method', 'description'];
    
    public function student() {
        return $this->belongsTo(Student::class);
    }
}
```

### **2. Migration**

```bash
php artisan make:migration create_payments_table
```

```php
Schema::create('payments', function (Blueprint $table) {
    $table->id();
    $table->uuid()->unique();
    $table->foreignId('student_id')->constrained('students');
    $table->decimal('amount', 10, 2);
    $table->enum('status', ['pending', 'verified', 'rejected'])->default('pending');
    $table->enum('method', ['transfer', 'cash', 'check'])->default('transfer');
    $table->text('description')->nullable();
    $table->timestamps();
});
```

### **3. Repository**

```php
// app/Repositories/PaymentRepository.php
class PaymentRepository {
    public function create(array $data): Payment {
        return Payment::create($data);
    }
    
    public function findByUuid($uuid): ?Payment {
        return Payment::where('uuid', $uuid)->first();
    }
    
    public function getPending() {
        return Payment::where('status', 'pending')->get();
    }
    
    public function verify($id) {
        return Payment::find($id)->update(['status' => 'verified']);
    }
}
```

### **4. Service**

```php
// app/Services/PaymentService.php
class PaymentService {
    public function __construct(
        protected PaymentRepository $repository
    ) {}
    
    public function createPayment(array $data): Payment {
        if ($data['amount'] <= 0) {
            throw new \Exception('Jumlah pembayaran harus lebih dari 0', 422);
        }
        
        return $this->repository->create($data);
    }
    
    public function verifyPayment($uuid): Payment {
        $payment = $this->repository->findByUuid($uuid);
        
        if (!$payment) {
            throw new \Exception('Payment tidak ditemukan', 404);
        }
        
        // Business logic: cek apakah boleh di-verify
        if ($payment->status !== 'pending') {
            throw new \Exception('Hanya payment dengan status pending yang bisa di-verify', 422);
        }
        
        $this->repository->verify($payment->id);
        return $payment->fresh();
    }
}
```

### **5. Form Request**

```php
// app/Http/Requests/PaymentRequest.php
class PaymentRequest extends FormRequest {
    public function rules(): array {
        return [
            'student_id'  => 'required|exists:students,id',
            'amount'      => 'required|numeric|min:0.01',
            'method'      => 'required|in:transfer,cash,check',
            'description' => 'nullable|string',
        ];
    }
}
```

### **6. Controller**

```php
// app/Http/Controllers/API/PaymentController.php
class PaymentController extends Controller {
    use ApiResponse;
    
    public function __construct(
        protected PaymentService $service
    ) {}
    
    public function store(PaymentRequest $request) {
        try {
            $payment = $this->service->createPayment($request->validated());
            return $this->success($payment, 'Payment created', 201);
        } catch (\Exception $e) {
            return $this->badRequest($e->getMessage());
        }
    }
    
    public function verify($uuid) {
        try {
            $payment = $this->service->verifyPayment($uuid);
            return $this->success($payment, 'Payment verified');
        } catch (\Exception $e) {
            if ($e->getCode() === 404) {
                return $this->notFound($e->getMessage());
            }
            return $this->badRequest($e->getMessage());
        }
    }
}
```

### **7. Routes**

```php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/payments', [PaymentController::class, 'store'])
        ->middleware('permission:payment.create');
    
    Route::post('/payments/{uuid}/verify', [PaymentController::class, 'verify'])
        ->middleware('permission:payment.verify');
});
```

---

## 🧾 Panduan Singkat Per Langkah

### **1️⃣ Model**
- File: `app/Models/FileName.php`
- Define table, fillable, relationships
- Include traits: HasUuid, HasFactory

### **2️⃣ Migration**
- File: `database/migrations/`
- Define table structure
- Run: `php artisan migrate`

### **3️⃣ Repository**
- File: `app/Repositories/FileNameRepository.php`
- Create CRUD methods
- Handle semua query logic

### **4️⃣ Service**
- File: `app/Services/FileNameService.php`
- Inject Repository
- Handle business logic & validation

### **5️⃣ Form Request**
- File: `app/Http/Requests/FileNameRequest.php`
- Define validation rules
- Custom messages (optional)

### **6️⃣ Controller**
- File: `app/Http/Controllers/API/FileNameController.php`
- Inject Service
- Handle API endpoints (index, show, store, update, destroy)
- Use ApiResponse trait

### **7️⃣ Routes**
- File: `routes/api.php`
- Define endpoints dengan apiResource
- Add middleware auth & permission

### **8️⃣ Factory** (Optional)
- File: `database/factories/FileNameFactory.php`
- Generate dummy data

### **9️⃣ Seeder** (Optional)
- File: `database/seeders/FileNameSeeder.php`
- Seed data ke database

### **🔟 Test** (Optional)
- File: `tests/Feature/FileNameTest.php`
- Test endpoints

---

## ✅ Checklist Membuat Fitur Baru

- [ ] **Model** dibuat dengan proper attributes, relationships, dan traits
- [ ] **Migration** dibuat dengan structure & indexes yang tepat
- [ ] **Repository** dibuat dengan method reusable (getAll, findById, create, update, delete)
- [ ] **Service** dibuat dengan business logic & error handling
- [ ] **Form Request** dibuat dengan validation rules & custom messages
- [ ] **Controller** dibuat dengan proper try-catch dan ApiResponse
- [ ] **Routes** di-register di `routes/api.php`
- [ ] **Migration** sudah di-run (`php artisan migrate`)
- [ ] **Endpoints** sudah di-test dengan postman/insomnia
- [ ] **Seeder** dibuat (optional tapi recommended)
- [ ] **Unit Test** dibuat (optional tapi recommended)
- [ ] **Permissions** di-add di `RolePermissionSeeder` jika ada RBAC
- [ ] **Comments/Documentation** ditambahkan untuk clarity

---

## 🚀 Command Shortcuts

```bash
# Generate Model with migration
php artisan make:model NamaModel -m

# Generate Factory
php artisan make:factory NamaModelFactory

# Generate Seeder
php artisan make:seeder NamaModelSeeder

# Generate Request
php artisan make:request NamaModelRequest

# Generate Controller
php artisan make:controller API/NamaModelController

# Run migration
php artisan migrate

# Seed database
php artisan db:seed

# Rollback migration
php artisan migrate:rollback

# Run specific seeder
php artisan db:seed --class=NamaModelSeeder

# Run tests
php artisan test
```

---

## 📌 Best Practices

1. **Always use type hints** untuk parameter dan return type
2. **Throw exceptions** di service, catch di controller
3. **Use migration** untuk semua database changes
4. **Use validation** di Form Request, jangan di controller
5. **Use repository** untuk semua database queries
6. **Use service** untuk business logic, jangan di controller
7. **Use traits** untuk reusable code (ApiResponse, HasUuid, dll)
8. **Add comments** di method yang kompleks
9. **Write tests** untuk critical functionality
10. **Use meaningful names** untuk variable, method, dan file

---

## 📞 Jika Ada Pertanyaan / Error

1. **Cek error message** secara teliti
2. **Cek file path** dan namespace
3. **Cek migration** sudah di-run
4. **Cek validation rules** di Form Request
5. **Cek relationship** di Model
6. **Debug dengan dd()** atau tinggalkan breakpoint
7. **Test dengan Postman/Insomnia**

---

**Selamat membuat fitur baru! 🎉**

Ikuti panduan ini step-by-step dan kode Anda akan clean, maintainable, dan sesuai dengan architecture project.
