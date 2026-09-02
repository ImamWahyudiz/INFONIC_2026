# 📖 BACA AKU & PANDUAN PENGUMPULAN TUGAS INFONIC 2026

Selamat datang di direktori pengumpulan tugas resmi **INFONIC 2026**!  
Sistem pengumpulan tugas menggunakan mekanisme kolaborasi standar industri: **Fork & Pull Request di GitHub**.

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
   - ❌ Jangan mengedit atau menghapus `Tugas/NIM-NAMA.md`.
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
   - ❌ Semua link tugas (Google Drive, Figma, Canva, GitHub) **wajib disetel ke PUBLIC** (*Anyone with the link can view*). Tautan private = Nilai tidak dapat diinput.

---

## 📝 FORMAT PENAMAAN FILE TUGAS

File tugasmu wajib dinamai dengan format:
```bash
Tugas/<NamaGugus>/<NIM>_<NamaLengkap>.md
```
*(Gunakan **underscore `_`**, tanpa spasi, kapitalisasi jelas)*

### ✅ Contoh yang BENAR:
- `Tugas/JavaScript/26106050001_MuhammadAdzka.md`
- `Tugas/Python/26106050012_SitiFatimah.md`
- `Tugas/C++/26106050045_ImamWahyudi.md`

### ❌ Contoh yang SALAH:
- `Tugas/NIM-NAMA.md` *(Mengedit template)*
- `Tugas/Python/26106050012 Siti Fatimah.md` *(Ada spasi)*
- `Tugas/26106050012_SitiFatimah.md` *(Di luar folder gugus)*
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
- Buat file baru bernama `NIM_NamaLengkap.md` (atau salin isi template dari `Tugas/NIM-NAMA.md`).
- Isi data diri lengkap dan tautkan seluruh link tugas (Week 1 s.d. Week 4) sesuai instruksi.
- Simpan file (`Ctrl + S`).

### 4. Commit & Push
- Jalankan perintah berikut di terminal:
  ```bash
  git add .
  git commit -m "Submit tugas osjur - <NIM>"
  git push origin main
  ```
  *(Contoh: `git commit -m "Submit tugas osjur - 26106050045"`)*

### 5. Buat Pull Request (PR)
- Buka repository hasil fork di akun GitHub-mu melalui browser.
- Klik tombol **Contribute** ➔ **Open Pull Request**.
- Pastikan tujuannya adalah repository Kabim gugusmu.
- Judul PR: `Submit tugas osjur - <NIM>`
- Deskripsi PR: Tuliskan Gugus & Nama Lengkapmu.
- Klik **Create Pull Request**.

---

### 💬 Butuh Bantuan?
Hubungi Kakak Pembimbing (Kabim) gugusmu jika mengalami kendala saat melakukan Fork atau Git Push. Semangat berproses di **INFONIC 2026**! 🚀
