# Panduan Pengumpulan Tugas Melalui Fork & Pull Request

> 🏠 **[← Kembali ke Pusat Link (Hub Materi INFONIC)](#file-00-link_materi_infonic-md)** | 🚀 **[Materi Git & GitHub](#file-02-materi_git_github-md)** | 🛠️ **[Bantuan & Utility](#file-04-materi_utility-md)**

Tutorial ini akan memandu kamu untuk mengumpulkan tugas osjur menggunakan metode **Fork** dan **Pull Request (PR)** di GitHub. Pastikan kamu mengikuti langkah-langkah di bawah ini dengan teliti.

## Langkah-Langkah

### 1. Fork Repository Panitia
Langkah pertama adalah membuat salinan (fork) repository milik panitia ke akun GitHub kamu sendiri.

1. Buka browser dan pergi ke halaman repository GitHub tugas yang telah diberikan oleh panitia `https://github.com/ImamWahyudiz/INFONIC_2026`.
2. Di pojok kanan atas halaman repository, cari dan klik tombol **Fork**.
3. Jika muncul pilihan, pilih akun GitHub pribadimu sebagai tujuan fork.
4. Tunggu beberapa saat. Sekarang kamu memiliki salinan repository panitia di akun GitHub kamu sendiri (URL-nya akan menjadi `https://github.com/UsernameKamu/NamaRepo`).

### 2. Clone Repository ke Komputer (VS Code)
Sekarang kita akan mengunduh (clone) repository yang sudah kamu fork ke komputer kamu.

1. Di halaman repository hasil fork milikmu, klik tombol hijau **Code**.
2. Salin URL yang muncul (pastikan tab HTTPS terpilih).
3. Buka **Visual Studio Code (VS Code)** di laptop kamu.
4. Buka terminal di VS Code dengan cara klik menu `Terminal` > `New Terminal` (atau tekan `` Ctrl + ` ``).
5. Arahkan terminal ke folder tempat kamu ingin menyimpan tugas (misalnya: `cd Documents`).
6. Jalankan perintah berikut untuk meng-clone repository:
   ```bash
   git clone <URL_YANG_KAMU_SALIN_TADI>
   ```
   *Contoh: `git clone https://github.com/UsernameKamu/Tugas-Osjur-2026.git`*
7. Setelah selesai, buka folder hasil clone tersebut di VS Code (`File` > `Open Folder...`).

### 3. Kerjakan Tugas (Salin Template di Folder Kelompok)
Saatnya mengerjakan tugasmu sesuai instruksi panitia.

> [!CAUTION]
> **JANGAN MENGEDIT FILE TEMPLATE ASLI (`NIM-NAMA.md`) ATAU FILE MILIK TEMAN LAIN!**  
> Mengedit file asli atau milik orang lain akan menyebabkan konflik (*merge conflict*) dan Pull Request kamu akan ditolak.

1. Di dalam VS Code, cari dan buka folder kelompok/gugus kamu di panel Explorer sebelah kiri (misal di dalam folder `Tugas/<Nama_Kelompok>/`, contoh: `Tugas/Python/` atau `Tugas/PHP/`).
2. Di sana kamu akan menemukan file template bernama **`NIM-NAMA.md`**.
3. **Salin (Copy-Paste)** file `NIM-NAMA.md` tersebut di folder yang sama, lalu ganti nama file salinan tersebut menjadi format **`NIM_NamaLengkap.md`**.  
   *Contoh: `260001_WahyuPratama.md`*
4. Buka file `NIM_NamaLengkap.md` milikmu, lalu cantumkan seluruh link pengumpulan tugas Osjur INFONIC kamu (seperti link Google Drive, GitHub repository, Figma, dsb.) sesuai instruksi di dalam template.
5. Setelah selesai mengisi link tugasmu, jangan lupa simpan file dengan menekan **Save** (`Ctrl + S`).

### 4. Simpan dan Push Perubahan (Git CLI)
Setelah tugas selesai dikerjakan, kita harus menyimpan perubahan dan mengirimkannya kembali ke akun GitHub kamu.

1. Buka kembali terminal di VS Code (pastikan posisi terminal sudah berada di dalam folder repository tugas).
2. Tambahkan perubahan yang baru saja kamu buat ke dalam "keranjang" Git dengan perintah:
   ```bash
   git add .
   ```
3. Simpan perubahan tersebut secara permanen di riwayat Git beserta pesan singkat:
   ```bash
   git commit -m "Submit tugas osjur - [NIM KAMU]"
   ```
   *Ganti `[NIM KAMU]` dengan NIM aslimu, contoh: `git commit -m "Submit tugas osjur - 12345678"`*
4. Kirim (push) perubahan tersebut ke repository GitHub kamu secara online:
   ```bash
   git push origin main
   ```
   *(Catatan: Jika branch utamanya bukan `main`, sesuaikan dengan nama branch yang ada, misal `master`)*

### 5. Buat Pull Request (Kumpul Tugas)
Langkah terakhir adalah mengirimkan tugasmu ke repository utama milik panitia.

1. Buka kembali browser dan masuk ke halaman repository GitHub **milikmu** (hasil fork).
2. Di bagian atas, kamu akan melihat notifikasi bahwa repository kamu *1 commit ahead* dari repository panitia. Klik menu **Contribute**.
3. Lalu klik tombol **Open Pull Request**.
4. Kamu akan diarahkan ke halaman perbandingan. Pastikan kamu mengirimkan tugas dari repository kamu ke repository panitia.
5. Klik tombol hijau **Create pull request**.
6. Isi judul dan deskripsi (judul diisi Tugas osjur - [NIM KAMU], untuk deskripsi diisi nama gugus serta nama kabim) sesuai instruksi panitia, lalu klik **Create pull request** sekali lagi.

**Selamat!** Tugas kamu sudah berhasil dikumpulkan ke repository panitia. Panitia sekarang dapat melihat dan menilai tugasmu.

---

> 🏠 **[← Kembali ke Pusat Link (Hub Materi INFONIC)](#file-00-link_materi_infonic-md)** | ⬆️ **[Kembali ke Atas](#file-03-tutorial_fork_pr-md)**

