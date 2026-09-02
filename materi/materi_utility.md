# 🛠️ Utility & Info Penting (Troubleshooting & Tips Dasar)

> 🏠 **[← Kembali ke Pusat Link (Hub Materi INFONIC)](#file-00-link_materi_infonic-md)** | 💻 **[VS Code](#file-01-materi_vscode-md)** | 🚀 **[Git & GitHub](#file-02-materi_git_github-md)**

Halo! Selamat datang di halaman **Utility & Info Penting**. Dokumen ini dirangkum khusus untuk membantu kamu mengatasi kendala-kendala dasar yang sering dialami, terutama saat berurusan dengan **Terminal, Command Prompt (CMD), Git Bash**, dan **Konfigurasi Path**.

---

## 📌 Daftar Isi
- [1. 🧭 Panduan Navigasi Terminal (Path)](#1--panduan-navigasi-terminal-path)
- [2. ⚠️ Mengatasi Error: "git is not recognized..."](#2--mengatasi-error-git-is-not-recognized)
- [3. 📁 Tips Nama Folder & Spasi](#3--tips-nama-folder--spasi-di-terminal)
- [4. ❌ Error Umum Lainnya & Solusinya](#4--error-umum-lainnya--solusinya)

---

## 1. 🧭 Panduan Navigasi Terminal (Path)

Bagi kamu yang belum terbiasa, layar hitam terminal mungkin terlihat membingungkan. Berikut adalah perintah dasar yang wajib kamu ketahui untuk berpindah folder:

### A. Melihat Posisi Saat Ini (`pwd` / `cd`)
Sebelum menjalankan perintah apapun (seperti `git init` atau menjalankan program), pastikan kamu tahu sedang berada di folder mana.
- **Di Git Bash / macOS / Linux**: Ketik `pwd` (*Print Working Directory*).
- **Di Command Prompt Windows**: Ketik `cd` tanpa tambahan apapun.

### B. Melihat Isi Folder (`ls` / `dir`)
- **Di Git Bash / macOS / Linux**: Ketik `ls` (atau `ls -l` untuk lebih detail).
- **Di Windows CMD**: Ketik `dir`.

### C. Berpindah Folder (`cd`)
`cd` adalah singkatan dari *Change Directory*.
- **Masuk ke sub-folder**: `cd nama_folder` (contoh: `cd Documents`).
- **Mundur / naik satu tingkat**: `cd ..`
- **Pindah ke drive lain (Khusus Windows CMD)**: Cukup ketik huruf drive diikuti titik dua, contoh `D:` lalu tekan Enter.

> 💡 **Tips Cepat (Wajib Dicoba):** Gunakan tombol **Tab** di keyboard saat mengetik nama folder untuk *Auto-complete*. Misalnya ketik `cd Docu` lalu tekan `Tab`, terminal akan otomatis melengkapinya menjadi `cd Documents/`. Ini membantu banget biar nggak salah ketik (*typo*)!

---

## 2. ⚠️ Mengatasi Error: "git is not recognized..."

Kalau saat kamu mengetik `git --version` di terminal terintegrasi VS Code atau CMD malah muncul pesan error:
> *"git is not recognized as an internal or external command, operable program or batch file."*

Artinya, sistem operasi Windows kamu belum tahu di mana letak aplikasi Git terinstal (*Path* belum terdaftar secara global).

### Solusi A: Gunakan Git Bash (Paling Cepat & Direkomendasikan)
Daripada menggunakan CMD biasa, mending kita gunakan **Git Bash**. Aplikasi ini otomatis terinstal saat kamu menginstal Git. 
1. Di VS Code, buka terminal.
2. Di pojok kanan atas panel terminal, klik tanda panah bawah (di sebelah ikon tambah `+`).
<br>
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1rpfI5Fo7jg2lOfwyb5toE_5UPfsIp952" width="600" alt="Pilih Git Bash"><br>
  <i>Gambar 1: Memilih Git Bash sebagai default profile</i>
</p>
<br>

3. Pilih **Git Bash** sebagai *default profile*.

### Solusi B: Daftarkan Git ke System PATH Windows (Manual)
Kalau kamu tetap ingin Git bisa berjalan di terminal jenis apa saja (termasuk CMD bawaan):
1. Buka **Start Menu** Windows.
2. Ketik `Environment Variables` dan pilih **Edit the system environment variables**.
3. Klik tombol **Environment Variables...** di pojok kanan bawah.
<br>
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1HmX2PJHrvmR8ZholWEd4bgCI1IiV4RSU" width="600" alt="Environment Variables"><br>
  <i>Gambar 2: Membuka menu Environment Variables</i>
</p>
<br>

4. Pada bagian *System variables* (kotak yang bawah), gulir dan cari variabel bernama **Path**, lalu klik **Edit**.
<br>
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=10C_boXdRtZIX35fcpyzU14Wyj7CIyYvW" width="600" alt="Edit Path Variable"><br>
  <i>Gambar 3: Mencari dan mengedit variabel Path</i>
</p>
<br>

5. Klik **New**, lalu tambahkan direktori folder bin/cmd dari Git (biasanya: `C:\Program Files\Git\cmd` atau `C:\Program Files\Git\bin`).
<br>
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1-b0n_uvYoTILa_1KLTdNtQykkodBLp2a" width="600" alt="Add Git Path"><br>
  <i>Gambar 4: Menambahkan direktori instalasi Git ke Path</i>
</p>
<br>

6. Klik **OK** pada semua jendela untuk menyimpan pengaturan.
7. **SANGAT PENTING:** Kamu harus me-*restart* (menutup dan membuka ulang) terminal atau VS Code kamu agar perubahan konfigurasi ini terbaca.

---

## 3. 📁 Tips Nama Folder & Spasi di Terminal

Kesalahan yang paling sering terjadi adalah kesulitan saat masuk ke folder yang namanya pakai **spasi** (contoh: `Belajar Coding`).

Kalau kamu mengetik:
```bash
cd Belajar Coding
```
Terminal akan error (*too many arguments*), karena dia menganggap kamu memasukkan dua perintah yang berbeda ("Belajar" dan "Coding").

### Solusinya:
Gunakan tanda kutip ganda ( `" "` ) atau tunggal ( `' '` ) untuk membungkus nama folder berspasi tersebut.
```bash
cd "Belajar Coding"
```
*(Atau seperti tips sebelumnya, cukup ketik `cd Bel`, lalu tekan tombol **Tab** di keyboard. Terminal akan otomatis menambahkan format pelolosan (*escaping*) karakter atau tanda kutip yang benar).*

---

## 4. ❌ Error Umum Lainnya & Solusinya

### 1. `fatal: not a git repository (or any of the parent directories)`
- **Penyebab**: Kamu menjalankan perintah khusus Git (seperti `git status` atau `git commit`) di dalam folder biasa yang belum diinisialisasi sebagai repositori Git.
- **Solusi**: Pastikan kamu sudah menjalankan perintah `git init` di folder tersebut, **ATAU** pastikan kamu sudah melakukan `cd` (masuk) ke dalam folder hasil unduhan/`git clone`.

### 2. File tidak bisa dihapus / Error "Permission Denied"
- **Penyebab**: File yang ingin diedit, ditimpa, atau dihapus sedang aktif digunakan/dibuka oleh aplikasi lain atau *local server* sedang berjalan.
- **Solusi**: Matikan sementara *local server* kamu (tekan `Ctrl + C` di terminal) atau pastikan kamu sudah menutup file tersebut di program yang lain.

### 3. Terjebak di Editor Terminal (Vim / Nano)
Saat melakukan `git commit` tanpa menambahkan pesan (`-m "pesan"`), terkadang terminal akan memunculkan teks editor bawaan (Vim) yang membingungkan.
- **Solusi (Keluar dari Vim)**: Tekan tombol `Esc`, kemudian ketik `:q!` (titik dua, huruf q, dan tanda seru), lalu tekan `Enter`. Hal ini akan membatalkan commit dan keluar dari Vim.

---

> 🏠 **[← Kembali ke Pusat Link (Hub Materi INFONIC)](#file-00-link_materi_infonic-md)** | ⬆️ **[Kembali ke Atas](#file-04-materi_utility-md)**

*Dokumen ini merupakan bagian dari Hub Materi INFONIC.*
