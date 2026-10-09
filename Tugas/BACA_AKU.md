# 📖 BACA AKU & PANDUAN PENGUMPULAN TUGAS INFONIC 2026

Selamat datang di direktori pengumpulan tugas resmi **INFONIC 2026**!  
Sistem pengumpulan tugas menggunakan mekanisme kolaborasi standar industri: **Fork & Pull Request di GitHub**.

> [!IMPORTANT]
> ⏰ **DEADLINE PENGUMPULAN TUGAS FORK & PR**: **Jumat, 9 Oktober 2026 pukul 20.00 WIB**  
> Pastikan narasi pengalaman serta pesan dan kesan sudah ditulis dan Pull Request (PR) ke repository Kabim gugusmu masing-masing telah diajukan sebelum batas waktu.

---

## 🌳 Alur Pengumpulan Tugas (Tingkat / Hierarki)

```text
[ Mahasiswa Baru (Maba) ] 
        │  (1. Fork repo Kabim masing-masing)
        │  (2. Tambah file tugas di Tugas/<NamaGugus>/)
        ▼  (3. Pull Request ke repo Kabim)
[ Kakak Pembimbing (Kabim) ]
        │  (Kabim memeriksa, memvalidasi & merge PR maba)
        │  (Kabim fork / sync & PR ke repo utama)
        ▼
[ Repository Pusat INFONIC 2026 (Ketua/Panitia) ]
```

---

## 🚫 ATURAN MUTLAK (DILARANG KERAS)

> [!CAUTION]
> **Pull Request kamu akan LANGSUNG DITOLAK jika melanggar salah satu poin di bawah ini:**

1. **DILARANG MENGUBAH FILE TEMPLATE ASLI**:
   - ❌ Jangan mengedit atau menghapus `Tugas/NAMA.md`.
   - File template ini wajib tetap bersih sebagai acuan mahasiswa lainnya.
2. **DILARANG MENGUBAH / MENGHAPUS FILE ORANG LAIN**:
   - ❌ Jangan menyentuh, mengubah, atau menghapus file tugas teman satu gugus atau gugus lain.
3. **DILARANG MENGUBAH STRUKTUR UTAMA REPOSITORY**:
   - ❌ Dilarang mengubah file `index.html`, `README.md`, `vercel.json`, folder `src/`, maupun folder root lainnya.
4. **DILARANG MENARUH FILE DI LUAR FOLDER GUGUS**:
   - ❌ Semua file tugas wajib ditaruh di dalam subfolder gugus masing-masing: `Tugas/<NamaGugus>/`.
5. **DILARANG FORMAT PENAMAAN SALAH**:
   - ❌ Jangan pakai spasi, huruf aneh, atau tanpa ekstensi `.md`.
6. **DILARANG TAUTAN BERSIFAT PRIVATE**:
   - ❌ Semua link tugas/profil (GitHub, Instagram, LinkedIn) disarankan dapat diakses publik.
7. **DILARANG MENCANTUMKAN DATA SENSITIF**:
   - ❌ Jangan pernah menulis password akun, PIN, token rahasia, atau data pribadi sensitif di dalam file tugas.

---

## 📝 FORMAT PENAMAAN FILE TUGAS

File tugasmu wajib dinamai dengan format nama lengkapmu:
```bash
Tugas/<NamaGugus>/<NamaLengkap>.md
```
*(Gunakan kapitalisasi jelas di awal kata, tanpa spasi)*

### ✅ Contoh yang BENAR:
- `Tugas/JavaScript/MuhammadAdzka.md`
- `Tugas/Python/SitiFatimah.md`
- `Tugas/C++/ImamWahyudi.md`

### ❌ Contoh yang SALAH:
- `Tugas/NAMA.md` *(Mengedit template langsung)*
- `Tugas/Python/Siti Fatimah.md` *(Ada spasi)*
- `Tugas/SitiFatimah.md` *(Di luar folder gugus)*
- `Tugas/Python/tugas1.docx` *(Bukan format markdown)*

---

## ⚡ TUTORIAL SINGKAT PENGUMPULAN TUGAS (5 LANGKAH)

### 1. Fork Repository
- Buka link repository GitHub dari **Kakak Pembimbing (Kabim)** gugusmu.
- Klik tombol **Fork** di pojok kanan atas untuk menyalin repo ke akun GitHub pribadimu.

### 2. Clone ke Laptop & Buka di VS Code
- Buka terminal / Git Bash di laptopmu:
  ```bash
  git clone https://github.com/USERNAME-KAMU/INFONIC_2026.git
  ```
- Buka folder tersebut di Visual Studio Code (`File -> Open Folder...`).

### 3. Buat File Tugasmu
- Buka folder `Tugas/<NamaGugusMu>/`.
- Buat file baru bernama `NamaLengkap.md` (atau salin isi template dari `Tugas/NAMA.md`).
- Isi data diri, ceritakan narasi pengalaman selama mengikuti INFONIC, dan tuliskan pesan serta kesanmu.
- Simpan file (`Ctrl + S`).

### 4. Cek Status, Commit & Push
- Buka terminal VS Code (`Ctrl + ~` / `Ctrl + ` `):
  ```bash
  # 1. Cek perubahan (Pastikan HANYA file tugasmu yang terdaftar!)
  git status

  # 2. Stage file tugasmu
  git add Tugas/<NamaGugusMu>/<NamaLengkap>.md

  # 3. Simpan perubahan dengan pesan commit
  git commit -m "Submit tugas osjur - <NamaLengkap>"

  # 4. Upload ke repo GitHub pribadimu
  git push origin main
  ```
  *(Contoh: `git commit -m "Submit tugas osjur - Muhammad Adzka"`)*

### 5. Buat Pull Request (PR)
- Buka repository hasil fork di akun GitHub-mu melalui browser.
- Klik tombol **Contribute** ➔ **Open Pull Request**.
- Pastikan tujuannya (*base repository*) adalah repository Kabim gugusmu.
- Judul PR: `Submit tugas osjur - <NamaLengkap>`
- Deskripsi PR: Tuliskan Gugus & Nama Lengkapmu.
- Klik **Create Pull Request**.

> [!TIP]
> **💡 Kalau Kabim meminta revisi, JANGAN buat PR baru!**  
> Cukup edit file tugasmu kembali di VS Code laptopmu, lalu jalankan `git status` ➔ `git add .` ➔ `git commit -m "revisi tugas"` ➔ `git push origin main`.  
> Halaman Pull Request kamu di GitHub **otomatis ter-update sendiri**! Tidak perlu menutup atau membuat PR baru.

---

## 🛠️ PANDUAN DARURAT: CARA MEMBATALKAN FILE YANG SALAH EDIT

Jika kamu tidak sengaja mengedit file template `NAMA.md` atau file teman:

1. **Jika belum di-commit**:
   ```bash
   git restore Tugas/NAMA.md
   ```
2. **Jika sudah di-commit (tapi belum di-push)**:
   ```bash
   git reset --soft HEAD~1
   git restore Tugas/NAMA.md
   ```
3. **Jika sudah di-push atau mengalami Merge Conflict**:
   - Baca panduan lengkap solusinya di web: [Panduan Troubleshooting & Rollback INFONIC 2026](https://infonic-2026.vercel.app/materi/utility.html#salah-edit-file)

---

### 💬 Butuh Bantuan?
Hubungi Kakak Pembimbing (Kabim) gugusmu jika mengalami kendala saat melakukan Fork atau Git Push. Semangat berproses di **INFONIC 2026**! 🚀
