# 🚀 Panduan Lengkap Git & GitHub — INFONIC

> 🏠 **[← Kembali ke Pusat Link (Hub Materi INFONIC)](#file-00-link_materi_infonic-md)** | 📖 **[Tutorial Fork & PR](#file-03-tutorial_fork_pr-md)** | 🛠️ **[Bantuan & Utility](#file-04-materi_utility-md)**

Halo! Selamat datang di materi panduan **Git & GitHub** untuk rangkaian acara **INFONIC**.  
Modul ini akan memandu kamu memahami dasar *Version Control System*, cara instalasi Git, konfigurasi akun, sampai alur kerja lengkap dari mengambil (pull) repository yang ada hingga upload (push) hasil kerja kamu ke GitHub.

---

## 📌 Daftar Isi
- [1. 💡 Pengenalan Git vs GitHub](#1--pengenalan-git-vs-github)
- [2. 📥 Panduan Instalasi Git](#2--panduan-instalasi-git)
  - [Windows](#windows)
  - [macOS](#macos)
  - [Linux](#linux)
  - [Verifikasi Instalasi](#verifikasi-instalasi)
- [3. ⚙️ Konfigurasi Identitas Git (Lokal)](#3--konfigurasi-identitas-git-lokal)
- [4. 🌐 Membuat Akun & Repository di GitHub](#4--membuat-akun--repository-di-github)
- [5. 🔄 Workflow Utama Git & GitHub](#5--workflow-utama-git--github)
  - [🅰️ SKENARIO A: Mengambil Repo yang Sudah Ada (`git clone` & `git pull`)](#️-skenario-a-mengambil-repo-yang-sudah-ada-git-clone--git-pull)
  - [🅱️ SKENARIO B: Membuat Repo Baru dari Lokal (`git init` sampai `git push`)](#️-skenario-b-membuat-repository-baru-dari-lokal-git-init-sampai-git-push)
- [6. 🛠️ Perintah Git Lain yang Sering Digunakan](#6--perintah-git-lain-yang-sering-digunakan)
- [7. 🙈 Mengenal File `.gitignore`](#7--mengenal-file-gitignore)

---

## 1. 💡 Pengenalan Git vs GitHub

Sebelum kita mulai, penting banget buat kamu tahu bedanya **Git** dan **GitHub**:

| Fitur | 🌿 Git | 🌐 GitHub |
| :--- | :--- | :--- |
| **Definisi** | Perangkat lunak *Version Control System* (VCS) yang jalan di komputer lokal. | Platform online (cloud) buat nyimpen & kelola repo Git kamu. |
| **Fungsi Utama** | Mencatat riwayat perubahan kode di laptop kamu sendiri. | Tempat berbagi kode, kerja bareng tim, & publikasi project. |
| **Koneksi Internet** | **Nggak butuh** internet. | **Butuh** koneksi internet. |
| **Interface** | Lewat perintah teks / CLI (Git Bash atau Terminal). | Berbasis web (tampilan antarmuka / GUI). |

---

## 2. 📥 Panduan Instalasi Git

### Windows
1. Unduh installer resmi Git dari [https://git-scm.com/download/win](https://git-scm.com/download/win).
2. Buka dan jalankan installer `.exe` yang sudah kamu unduh.
3. Klik **Next** terus pada opsi *default* (disarankan memilih *Git Bash* dan *Use Visual Studio Code as Git's default editor*).
4. Klik **Install** dan tunggu sampai selesai.

### macOS
1. Buka Terminal macOS.
2. Ketik perintah berikut buat nginstal via Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
*(Atau kalau kamu pakai Homebrew, bisa juga: `brew install git`)*

### Linux (Ubuntu/Debian)
Buka Terminal dan jalankan:
```bash
sudo apt update
sudo apt install git -y
```

### Verifikasi Instalasi
Buka Terminal atau Git Bash, lalu ketik perintah berikut:
```bash
git --version
```
*Kalau muncul seperti `git version 2.x.x`, berarti Git sudah berhasil terpasang di komputer kamu.*
> ⚠️ **Error Git Not Recognized?** Kalau kamu pakai Windows dan malah error saat mengetik `git --version`, cek panduan [Mengatasi Error Git di materi Utility](#file-04-materi_utility-md#2--mengatasi-error-git-is-not-recognized).

---

## 3. ⚙️ Konfigurasi Identitas Git (Lokal)

Setiap kali kamu membuat riwayat perubahan (*commit*), Git butuh tahu siapa penulisnya. Jadi, langkah pertama setelah instalasi adalah menyetel **Nama** dan **Email** kamu.

Buka Terminal atau Git Bash, lalu ketik ini:

```bash
# 1. Masukkan Nama Lengkapmu
git config --global user.name "Nama Lengkap Kamu"

# 2. Masukkan Email (Pastikan emailnya sama dengan akun GitHub-mu!)
git config --global user.email "emailkamu@example.com"
```

### Mengecek Hasil Konfigurasi
Untuk memastikan pengaturan sudah tersimpan, ketik:
```bash
git config --list
```

---

## 4. 🌐 Membuat Akun & Repository di GitHub

### A. Membuat Akun GitHub
1. Buka [https://github.com/](https://github.com/).
2. Klik **Sign up** dan ikuti proses pendaftarannya.
3. Verifikasi email kamu.

### B. Membuat Repository Baru di GitHub
1. Login ke akun GitHub yang baru kamu buat.
2. Klik tombol **+** di pojok kanan atas ➔ pilih **New repository**.
<br>
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1xQaqgT_K9r66JgMcPw6veK2zNbTx9Fbu" width="600" alt="New Repository"><br>
  <i>Gambar 1: Membuat repository baru di GitHub</i>
</p>
<br>
3. Isi informasi project kamu:
   - **Repository name**: Masukkan nama project (contoh: `latihan-infonic`).
   - **Description** *(Opsional)*: Deskripsi singkat soal project ini.
   - **Public / Private**: Pilih **Public** kalau mau dilihat semua orang.
   - **Initialize this repository with**: Biarkan **kosong** ya (nggak usah centang Add a README file dulu kalau nanti mau dihubungkan ke project lokal).
<br>
   <p align="center">
     <img src="https://drive.google.com/uc?export=view&id=1HBRi8wuf6p181NsIr2J1zepShzMtD7xj" width="600" alt="Repository Settings"><br>
     <i>Gambar 2: Pengaturan awal repository</i>
   </p>
   <br>
4. Klik **Create repository**.
<br>
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1ZLVeJxWhD2lJ6LHH5UYFrD5OWMzEMEko" width="600" alt="Create Repository"><br>
  <i>Gambar 3: Menyelesaikan pembuatan repository</i>
</p>
<br>
5. Jangan tutup tab browser-nya dulu, karena kita bakal butuh URL repository-nya di langkah selanjutnya.

---

## 5. 🔄 Workflow Utama Git & GitHub

> 💡 **Penting Sebelum Mulai:** Kalau kamu kesulitan pas mau `cd` (pindah folder) di terminal, terutama kalau nama foldernya pakai spasi, yuk cek dulu [Tips Nama Folder & Spasi di materi Utility](#file-04-materi_utility-md#3--tips-nama-folder--spasi-di-terminal) biar nggak error *too many arguments*.

Biasanya ada 2 skenario umum saat kita kerja pakai Git & GitHub:

---

### 🅰️ SKENARIO A: Mengambil Repo yang Sudah Ada (`git clone` & `git pull`)

Skenario ini dipakai kalau panitia atau mentormu **sudah menyiapkan repository** di GitHub dan kamu tinggal mengunduh lalu mengerjakannya.

#### Langkah A.1: Menyalin Repository ke Lokal (`git clone`)
Buka terminal di folder yang kamu inginkan, lalu jalankan:

```bash
git clone https://github.com/username-panitia/nama-repo-infonic.git
```
*Perintah ini akan menyalin seluruh folder beserta histori Git dari GitHub ke laptopmu.*

Kemudian masuk ke folder hasil clone tersebut:
```bash
cd nama-repo-infonic
```

#### Langkah A.2: Mengambil & Memperbarui Kode Terbaru (`git pull`)
Misalnya teman setim kamu bikin perubahan dan mengunggahnya ke GitHub, kamu bisa ambil update terbarunya dengan:

```bash
git pull origin main
```
> 💡 **Tips:** Biasakan melakukan `git pull` setiap kali mau mulai ngoding, supaya kodemu selalu *up to date* dengan versi terbaru di GitHub.

---

### 🅱️ SKENARIO B: Membuat Repository Baru dari Lokal (`git init` sampai `git push`)

Skenario ini dipakai kalau kamu **membuat project dari nol** di laptopmu dan mau kamu unggah ke GitHub.

#### Langkah B.1: Inisialisasi Repository Lokal (`git init`)
Buka terminal VS Code di dalam folder projectmu, lalu ketik:

```bash
git init
```
*Ini bakal bikin folder rahasia `.git` yang kerjanya memantau segala perubahan kodemu.*
> ⚠️ **Error Fatal?** Pastikan kamu sudah baca [Error Umum Git di materi Utility](#file-04-materi_utility-md#4--error-umum-lainnya--solusinya) kalau ketemu *fatal: not a git repository* ya!

---

#### Langkah B.2: Menambahkan File ke Staging Area (`git add`)
Coba cek dulu status perubahanmu:
```bash
git status
```

Masukkan file yang kamu kerjakan ke *Staging Area* (keranjang persiapan):
```bash
# Tambah 1 file aja:
git add nama_file.ext

# Tambah SEMUA file sekaligus:
git add .
```

---

#### Langkah B.3: Menyimpan Snapshot (`git commit`)
Sekarang saatnya kamu simpan perubahan tersebut ke riwayat Git dengan pesan yang jelas:

```bash
git commit -m "feat: inisialisasi project dan menambah file awal"
```
> ⚠️ **Terjebak di Vim?** Kalau kamu lupa kasih `-m "pesan"` dan masuk ke editor aneh (Vim/Nano), tenang, baca cara keluarnya di [Terjebak di Terminal Editor](#file-04-materi_utility-md#3-terjebak-di-editor-terminal-vim--nano).

---

#### Langkah B.4: Mengatur Branch Utama (`git branch -M main`)
Biar nama branch utamamu cocok sama bawaan GitHub (`main`), jalankan:

```bash
git branch -M main
```

---

#### Langkah B.5: Menghubungkan ke GitHub (`git remote`)
Sekarang kita sambungkan folder lokal kamu sama repository yang udah dibuat di GitHub tadi.
*(Pastikan ganti URL-nya pakai URL repo GitHub kamu sendiri!)*

```bash
git remote add origin https://github.com/username-kamu/latihan-infonic.git
```

Cek lagi apakah sudah sukses tersambung:
```bash
git remote -v
```

---

#### Langkah B.6: Mengirim Kode ke GitHub (`git push`)
Tinggal satu langkah lagi! Kirim semua hasil kerjamu ke GitHub:

```bash
git push -u origin main
```
*Tanda `-u` biar nanti-nanti kamu cuma perlu ngetik `git push` aja.*

> **Catatan Login:**  
> Kalau ini baru pertama kali banget, mungkin bakal ada pop-up buat login GitHub atau minta *Personal Access Token*. Ikuti aja proses sign-in di browsernya ya.

---

## 6. 🛠️ Perintah Git Lain yang Sering Digunakan

### 1. `git log`
Buat ngecek riwayat *commit* apa aja yang udah kamu buat:
```bash
git log --oneline
```

### 2. `git status`
Ngecek status folder kamu (apa ada file baru, diedit, atau belum di-commit):
```bash
git status
```

### 3. `git branch` & `git checkout`
Kalau kamu butuh bikin cabang baru buat fitur khusus:
```bash
# Liat semua branch:
git branch

# Bikin branch baru dan pindah ke sana:
git checkout -b feature-baru
# atau:
git switch -c feature-baru
```

---

## 7. 🙈 Mengenal File `.gitignore`

File `.gitignore` penting banget supaya file rahasia (kayak password di `.env`) atau file sampah *cache* nggak ikut ke-upload ke GitHub.

### Contoh isi `.gitignore`:
```text
node_modules/
.env
*.log
.DS_Store
Thumbs.db
__pycache__/
```

---

### 💡 Rangkuman Perintah Cepat (Cheat Sheet)

#### 📥 Kalau Mengambil Repo dari GitHub:
```bash
git clone <URL_REPO_GITHUB>                  # Download dari GitHub ke lokal
cd <NAMA_FOLDER>                             # Pindah ke dalam foldernya
git pull origin main                         # Mengambil update terbaru
```

#### 📤 Kalau Bikin Repo Baru dari Awal:
```bash
git init                                     # Aktifkan pelacakan Git
git add .                                    # Masukkan ke keranjang
git commit -m "pesan singkat"                # Simpan perubahan
git branch -M main                           # Pastikan pakai branch 'main'
git remote add origin <URL_REPO_GITHUB>      # Sambungin ke GitHub
git push -u origin main                      # Upload ke GitHub
```

---

> 🏠 **[← Kembali ke Pusat Link (Hub Materi INFONIC)](#file-00-link_materi_infonic-md)** | ⬆️ **[Kembali ke Atas](#file-02-materi_git_github-md)**

*Materi disiapkan untuk **INFONIC**.* ❤️
