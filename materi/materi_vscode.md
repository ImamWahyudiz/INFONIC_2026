# 💻 Panduan Instalasi, Penggunaan, & Ekstensi VS Code — INFONIC

> 🏠 **[← Kembali ke Pusat Link (Hub Materi INFONIC)](#file-00-link_materi_infonic-md)** | 🛠️ **[Bantuan & Utility](#file-04-materi_utility-md)**

Halo! Selamat datang di materi panduan **Visual Studio Code (VS Code)** untuk rangkaian acara **INFONIC**.  
Modul ini bakal ngebantu kamu buat tahu langkah-langkah instalasi, pengenalan antarmuka, cara penggunaan dasar, serta daftar ekstensi rekomendasi buat bahasa pemrograman **Python**, **C**, **C++**, dan **PHP**.

---

## 📌 Daftar Isi
- [1. 🚀 Apa itu Visual Studio Code?](#1--apa-itu-visual-studio-code)
- [2. 📥 Panduan Instalasi](#2--panduan-instalasi)
  - [Windows](#windows)
  - [macOS](#macos)
  - [Linux](#linux)
- [3. 🖥️ Pengenalan Antarmuka & Fitur Utama](#3--pengenalan-antarmuka--fitur-utama)
- [4. 📖 Panduan Penggunaan Singkat](#4--panduan-penggunaan-singkat)
  - [Membuka Folder / Project](#1-membuka-folder--project)
  - [Membuat & Menyimpan File](#2-membuat--menyimpan-file)
  - [Menggunakan Terminal Terintegrasi](#3-menggunakan-terminal-terintegrasi)
  - [Command Palette](#4-command-palette)
- [5. ⚡ Shortcut Penting (Wajib Tahu)](#5--shortcut-penting-wajib-tahu)
- [6. 🔌 Rekomendasi Ekstensi Berdasarkan Bahasa](#6--rekomendasi-ekstensi-berdasarkan-bahasa)
- [7. 🛠️ Cara Menginstal Ekstensi di VS Code](#7--cara-menginstal-ekstensi-di-vs-code)

---

## 1. 🚀 Apa itu Visual Studio Code?

**Visual Studio Code (VS Code)** adalah *code editor* buatan Microsoft yang sangat populer, ringan, gratis, dan *open-source*. VS Code mendukung berbagai bahasa pemrograman dan punya banyak banget ekstensi untuk mempermudah proses koding kita.

---

## 2. 📥 Panduan Instalasi

### Windows
1. Kunjungi situs resmi: [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Klik tombol **Download for Windows**.
3. Buka file `.exe` yang sudah kamu unduh.
4. Ikuti instruksi installer:
   - Centang *"I accept the agreement"*.
   - Pada halaman *Select Additional Tasks*, centang:
     - ✅ **Add "Open with Code" action to Windows Explorer file context menu**
     - ✅ **Add "Open with Code" action to Windows Explorer directory context menu**
     - ✅ **Add to PATH**
5. Klik **Next** ➔ **Install** ➔ **Finish**.

### macOS
1. Unduh installer untuk macOS dari [situs resmi VS Code](https://code.visualstudio.com/).
2. Ekstrak file `.zip` yang sudah diunduh.
3. Seret (drag) file **Visual Studio Code.app** ke dalam folder **Applications**.
4. Buka VS Code dari Launchpad / Applications.

### Linux (Ubuntu/Debian)
1. Unduh file paket `.deb` dari situs resmi VS Code.
2. Buka terminal lalu jalankan perintah:
   ```bash
   sudo dpkg -i <nama-file>.deb
   sudo apt-get install -f
   ```
*(Atau bisa juga diinstal via Snap Store: `sudo snap install --classic code`)*

---

## 3. 🖥️ Pengenalan Antarmuka & Fitur Utama

VS Code punya 5 area utama pada antarmukanya:

1. **Activity Bar** *(Panel Kiri Paling Luar)*:
   - 📁 **Explorer**: Melihat daftar file & folder project.
   - 🔍 **Search**: Mencari teks di seluruh file.
   - 🌿 **Source Control**: Integrasi Git & GitHub.
   - 🐞 **Run & Debug**: Menjalankan & membedah program.
   - 🧩 **Extensions**: Tempat mencari & menginstal plugin/ekstensi.
2. **Side Bar**: Menampilkan rincian dari item yang dipilih pada Activity Bar.
3. **Editor Group**: Area utama tempat kita mengetik kode program.
4. **Panel (Bawah)**: Tempat melihat Terminal, Output, Debug Console, dan Problems.
5. **Status Bar (Bawah)**: Menampilkan informasi baris/kolom, bahasa file, enkoding, dan status Git.
<br>
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1F-9jpo4tA_tbvL23x_KId9Q2EP7r_A4A" width="600" alt="Interface"><br>
  <i>Gambar 1: Tampilan antarmuka utama Visual Studio Code</i>
</p>
<br>

---

## 4. 📖 Panduan Penggunaan Singkat

### 1. Membuka Folder / Project
- Klik menu **File** ➔ **Open Folder...** (atau tekan `Ctrl + K`, lalu `Ctrl + O`).
- Pilih folder project yang ingin kamu kerjakan.

### 2. Membuat & Menyimpan File
- Di panel **Explorer**, klik ikon **New File** 📄.
- Beri nama file beserta ekstensi bahasanya (contoh: `main.py`, `index.php`, `app.cpp`).
- Simpan perubahan dengan menekan `Ctrl + S`.

### 3. Menggunakan Terminal Terintegrasi
- Buka terminal internal dengan menekan shortcut ``Ctrl + ` `` (tombol backtick di atas Tab).
- Kamu bisa langsung menjalankan perintah CLI seperti `python main.py`, `gcc main.c`, `php index.php`, atau perintah Git di sini.
> 💡 **Info Terminal:** Kalau kamu bingung saat mencoba navigasi di terminal (seperti *path* atau masuk folder pakai `cd`), pastikan kamu baca [Panduan Navigasi Terminal (Path) di materi Utility](#file-04-materi_utility-md#1--panduan-navigasi-terminal-path).

### 4. Command Palette
- Fitur serbaguna untuk mengakses semua perintah VS Code.
- Buka dengan menekan `Ctrl + Shift + P` (Windows/Linux) atau `Cmd + Shift + P` (macOS).
- Contoh penggunaan: Ketik `Format Document`, `Change Language Mode`, atau `Reload Window`.

---

## 5. ⚡ Shortcut Penting (Wajib Tahu)

| Perintah / Aksi | Windows / Linux | macOS |
| :--- | :--- | :--- |
| **Command Palette** | `Ctrl + Shift + P` | `Cmd + Shift + P` |
| **Quick Open File** | `Ctrl + P` | `Cmd + P` |
| **Buka/Tutup Terminal** | `Ctrl + ` ` | `Cmd + ` ` |
| **Simpan File** | `Ctrl + S` | `Cmd + S` |
| **Format Code** | `Shift + Alt + F` | `Shift + Option + F` |
| **Toggle Sidebar** | `Ctrl + B` | `Cmd + B` |
| **Duplicate Line** | `Shift + Alt + ⬇ / ⬆` | `Shift + Option + ⬇ / ⬆` |
| **Comment Line** | `Ctrl + /` | `Cmd + /` |
| **Find & Replace** | `Ctrl + F` / `Ctrl + H` | `Cmd + F` / `Cmd + H` |

---

## 6. 🔌 Rekomendasi Ekstensi Berdasarkan Bahasa

Berikut adalah daftar ekstensi terbaik yang bisa kamu instal langsung dari menu **Extensions** (`Ctrl + Shift + X`).

---

### ⚙️ Ekstensi Umum & Produktivitas
*Sangat direkomendasikan untuk semua developer.*

1. **Material Icon Theme** (`pkief.material-icon-theme`)
   - Bikin ikon folder & file kamu jadi lebih menarik dan gampang dikenali.
2. **Prettier - Code formatter** (`esbenp.prettier-vscode`)
   - Merapikan struktur dan format kode secara otomatis saat di-save.
3. **Code Runner** (`formulahendry.code-runner`)
   - Menjalankan berbagai kode bahasa pemrograman (Python, C, C++, PHP, JS, dll) hanya dengan 1 tombol Play ▶️.
4. **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
   - Otomatis mengubah tag penutup saat tag pembuka diubah (Sangat berguna buat HTML/PHP).
5. **GitLens — Git supercharged** (`eamodio.gitlens`)
   - Memudahkan kamu melihat histori commit, siapa yang menulis baris kode tertentu, dan komparasi cabang Git.

---

### 🐍 Ekstensi untuk Python

1. **Python** *(Official by Microsoft)* (`ms-python.python`)
   - Ekstensi utama yang menyediakan fitur Rich IntelliSense (autocompletion), debugging, linting, dan manajemen virtual environment.
2. **Pylance** (`ms-python.vscode-pylance`)
   - Bahasa server berkinerja tinggi untuk Python. Memberikan saran kode (*auto-complete*) yang sangat cepat dan akurat.
3. **Jupyter** (`ms-toolsai.jupyter`)
   - Memungkinkan kamu membuka dan menjalankan file `.ipynb` (Jupyter Notebook) langsung di dalam VS Code.
4. **Black Formatter** (`ms-python.black-formatter`)
   - Formatter standar industri Python untuk menjaga konsistensi gaya penulisan kode (PEP 8).

---

### ⚡ Ekstensi untuk C & C++

1. **C/C++** *(Official by Microsoft)* (`ms-vscode.cpptools`)
   - Mendukung IntelliSense, auto-completion, sintaks highlighting, dan debugging untuk C dan C++.
2. **C/C++ Compile Run** (`danielpinto85c.c-cpp-compile-run`)
   - Menjalankan file `.c` atau `.cpp` secara instan hanya dengan menekan tombol `F6` tanpa perlu mengetik perintah `gcc` / `g++` manual.
3. **CMake Tools** (`ms-vscode.cmake-tools`)
   - Mempermudah kompilasi dan manajemen project C/C++ berukuran besar yang menggunakan CMake.
4. **C/C++ Extension Pack** (`ms-vscode.cpptools-extension-pack`)
   - Paket lengkap buatan Microsoft yang sudah mencakup C/C++, CMake, dan dokumentasi terkait.

---

### 🐘 Ekstensi untuk PHP

1. **PHP Intelephense** (`bmewburn.vscode-intelephense-client`)
   - Extension terbaik dan paling cepat untuk PHP. Menyediakan *auto-complete*, navigasi fungsi (*go-to definition*), dan type checking.
2. **PHP Server** (`bware.phpserver`)
   - Menjalankan project PHP di *local server* internal langsung dari VS Code dengan klik kanan ➔ *Serve project*.
3. **PHP Debug** (`xdebug.php-debug`)
   - Integrasi Xdebug untuk melacak error dan *debugging* variabel saat eksekusi kode PHP.
4. **PHP Awesome Snippets** (`HuuNguyen.php-awesome-snippets`)
   - Kumpulan snippet/template kode PHP siap pakai buat mempercepat proses koding.

---

## 7. 🛠️ Cara Menginstal Ekstensi di VS Code

1. Buka VS Code.
2. Klik ikon **Extensions** pada Activity Bar di sebelah kiri (atau tekan `Ctrl + Shift + X`).
3. Ketik nama ekstensi di kolom pencarian (misal: `Python` atau `PHP Intelephense`).
4. Klik tombol **Install** pada ekstensi yang kamu inginkan.
5. Tunggu proses instalasi selesai (ekstensi biasanya langsung aktif tanpa perlu *restart* VS Code).

---

> 🏠 **[← Kembali ke Pusat Link (Hub Materi INFONIC)](#file-00-link_materi_infonic-md)** | ⬆️ **[Kembali ke Atas](#file-01-materi_vscode-md)**

*Materi disiapkan untuk Pelatihan **INFONIC**.* ❤️
