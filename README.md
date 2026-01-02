# RAPID API - Front

### Site : PT Vale Indonesia

Frontend Svelte ini dikembangkan sebagai bagian dari proyek RAPID Website, berfungsi sebagai interface reporting untuk dataset yang telah dikembangkan, serta mendukung proses analisis cepat secara efisien.

Pada dasarnya frontend ini dibuat berdasarkan kebutuhan masing-masing site agar dapat menjawab masalah dan case yang sering terjadi pada operasional.

Pada project frontend ini menggunakan framework dari [`Sveltekit`](https://svelte.dev/).

## 🚀 Main Feature

### Engine Detection

- Current and Shift Summary Report
  - Card summary of Loss Hour and Loss Fuel by Shift
  - Card Current Truck/Equipment who meet the condition
  - Table list general information Engine Detection by Shift
  - Table chart detail Engine Detection by Shift
  - Dokumentasi bisa di lihat pada [`http://ip:port`]
- Month Summary Historical
  - Under development progress

## 📁 Project Structure

```bash
api/
 ├── .svelte-kit/           # svelte config, `npm install` to create this
 ├── build/                 # builder file (ready to prod)
 ├── logs/
 │ ├── app-(year-month-date).log
 │ ├── error-(year-month-date).log
 │ ├── exception-(year-month-date).log
 │ └── rejection-(year-month-date).log
 ├── node_modules/
 ├── src/
 │ ├── lib/
 │ │ ├── api/
 │ │ │ ├── fuel-time-loss.js                # fetching data Engine Detection
 │ │ │ └── socket.js                        # connection with socket (backend)
 │ │ ├── components/
 │ │ │ ├── Header.svelte
 │ │ │ └── Sidebar.svelte
 │ │ ├── data/
 │ │ ├── services/
 │ │ │ ├── shift-fueltimeloss-download.js
 │ │ │ └── shift-fueltimeloss-shiftconvert.js
 │ │ └── services/
 │ │   └── loading.js
 │ ├── routes/
 │ │ ├── (user)/                # Routing for user/member only
 │ │ │ ├── engine-detection/
 │ │ │ │ ├── current/           # Current and Shiftly Report
 │ │ │ │ │ └── +page.svelte
 │ │ │ │ └── historical/        # Historical and Monthly Report
 │ │ │ │   └── +page.svelte
 │ │ │ └── +layout.svelte       # Layout Engine Detection
 │ │ ├── +layout.js             # Off the SSR
 │ │ ├── +layout.svelte         # Render loading state
 │ │ └── +page.svelte           # Title, and Home Page
 │ ├── app.css
 │ └── app.html
 ├── static/
 │ ├── fontawesome/
 │ ├── fonts/               # in use
 │ └── Komatsu_favicon_64.png
 ├── .env                   # database url (check notion or ask administrator)
 ├── .gitignore
 ├── .npmrc/
 ├── ecosystem.config.cjs   # configuration for pm2 with rapid-backend aplication name
 ├── jsconfig.json
 ├── package-lock.json
 ├── package.json
 ├── README.md
 ├── svelte.config.js
 └── vite.config.ts
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

# ⚙️ Deployment to Development Server

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- API Endpoint
- Socket backend Endpoint

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd folder

# Install dependencies
npm install

# Create .env file in root directory with following variables
VITE_URL_API='http://ipserver:port/api/v2'
VITE_URL_SOCKET = 'http://ipserver:port'
```

### Development Mode

```bash
# run apps
npm run dev
```

### Production Mode

```bash
# Build the project
npm run build

# Start production server
npm run preview
```

# ⚙️ Deployment to Production Server

## Development Server Side (Local)

1. Pastikan .env sudah disesuaikan dengan server nya

   - IP API Server menggunakan Server Production
   - IP Socket Server menggunakan Server Production
   - Port sudah sesuai dengan Production

2. Pastikan folder berikut sudah tersedia

   - build
   - node_modules
   - .env
   - ecosystem.config.cjs

   ```bash
   # to create build folder
   npm run build
   ```

3. Install pm2

   ```bash
   # install pm2
   npm install -g pm2
   ```

   Cek file dan folder berikut

   - Lokasi Program & Modul (Source Code)
     - C:\Users\[Username]\AppData\Roaming\npm\node_modules\pm2
     - C:\Users\[Username]\AppData\Roaming\npm\pm2.cmd
     ```bash
     # check pm2 folder
     npm root -g
     ```
   - Lokasi Data & Konfigurasi (.pm2)
     - C:\Users\[Username]\.pm2
     - /logs : Berisi file .log dari aplikasi Anda (sangat berguna untuk cek kenapa aplikasi auto-stop)
     - /pids : Berisi ID proses yang sedang berjalan.
     - dump.pm2 : File yang menyimpan daftar aplikasi Anda saat Anda menjalankan pm2
     - pm2.log : Log internal dari daemon PM2 itu sendiri.

4. Install pm2-installer

   Download pm2-installer [`here`]('https://github.com/jessety/pm2-installer?tab=readme-ov-file).
   Ini digunakan untuk membuat service pm2.exe (PM2) pada server windows, sehingga ketika user / user admin logout maka apps tetap berjalan dan apps bisa diakses oleh server manapun yang terhubung dengan server apps production.

5. pm2 ZIP file

   - Buat zip file pm2 dari node_modules

   ```bash
   # update terlebih dahulu jika menggunakan versi lama
   # karena pm2-installer membutuhkan pm2 terupdate
   npm install pm2@latest -g
   npm pm2 update

   # (opsional) memastikan skrip startup PM2 juga sesuai dengan versi terbaru.
   pm2 unstartup
   pm2 startup

   # membuat pm2 pack untuk di download atau diinstall di server site
   npm pack pm2
   ```

   - Siapkan zip file berikut
     - pm2
     - pm2-installer

## Production Server Side (Site)

1. Install node.js dan npm

   - Login dengan user `admin`
   - Download node.js [`here`](https://nodejs.org/en/download)
   - Install and cek node and npm

   ```bash
   # cek node version
   node -v

   # cek npm version
   npm -v
   ```

2. Install dan Configure pm2-installer

   Langkah ini universal, jadi bisa dilakukan pada step process Rapid API, Rapid Socket, ataupun Rapid Front. Karena pm2-installer ini adalah proses pembuatan service yang akan membungkus keseluruhan aplikasi.

   - Copy paste pm2-installer zip folder
   - Taruh folder pada directory berikut `C:\`
   - Masuk ke file pm2-installer dan buka powershell as administrator

   ```bash
   # mengubah lokasi instalasi global npm
   npm run configure
   ```

   Hal ini di lakukan agar directory file npm perlu diubah yang sebelumnya perlu masuk ke user terlebih dahulu (`C:\Users\DIGITALROOMPC04\AppData\Roaming\npm\node_modules\...`), lalu akan dipindahkan di `C:\ProgramData\npm`

3. Install pm2 global

   Sebelum melakukan installment pm2 secara global, perlu diketahui terlebih dahulu apakah server site tersebut online atau offline. Karena keduanya memiliki treatment proses yang berbeda. Terdapat 2 cara sesuai berdasarkan server nya apakah `offline` atau `online`.

   `PENTING! Masuk ke server menggunakan user admin!`

   #### `Online Server`

   Jika server site online, maka module javascript dapat di install melalui npm dari internet. Hal yang perlu dilakukan adalah sebagai berikut

   - Install pm2 secara global

   ```bash
   # install pm2 globally
   npm install -g pm2
   ```

   - Cek apakah betul module pm2 yang diinstall tersimpan di `C:\ProgramData\npm`
   - Jika sudah ada maka lanjut ke poin `nomor 4`

   #### `Offline Server`

   Jika server site offline, maka module javascript `tidak dapat di install melalui npm dari internet`. Hal yang perlu dilakukan adalah sebagai berikut

   - Copy paste pm2 zip folder yang sudah di pack pada poin `nomor 2`
   - Install pm2 secara global

   ```bash
   # install pm2 globally
   npm install -g ./pm2-5.x.x.tgz
   # ganti nama file sesuai dengan nama file yang di copy paste
   ```

   - Cek apakah betul module pm2 yang diinstall tersimpan di `C:\ProgramData\npm`
   - Jika sudah ada maka lanjut ke poin `nomor 4`

4. Start application

   - Start API Application `(powershell recommended)`

   ```bash
   # Masuk ke directory project API
   cd "C:\KMTSFile\Rapid-PTVI\front"

   # Run the apps
   pm2 start ecosystem.config.cjs --env production

   # save pm2
   pm2 save
   ```

   - Sebelum ke nomor selanjutnya, perlu dilanjutkan ke project `api` dan `socket`!
   - Hal yang perlu dilakukan adalah run apps lain menggunakan pm2

5. Setup pm2-installer

   ```bash
   # Agar PM2 menyala otomatis saat Windows booting tanpa perlu login user.
   npm run setup
   ```

# ⚙️ Update to Production Server

Jika ingin melakukan update pada aplikasi maka ada 2 section yang perlu dilakukan, yaitu pada development server (local pc / local server) dan production server (site server)

## Development Server Side (Local)

1. Pastikan .env sudah disesuaikan dengan server nya

   - IP Server menggunakan Server Production
   - IP Database menggunakan Database Production Server
   - Username Database menggunakan Read only user Database Production Server
   - Password Database menggunakan password dari user read only Database Production Server

2. Pastikan folder berikut sudah tersedia

   - build
   - node_modules
   - .env
   - ecosystem.config.cjs

   ```bash
   # to create build folder
   npm run build
   ```

3. Create ZIP Folder
   - Create zip folder build
   - (Opsional) Masukkan folder selain zip jika ada update

## Production Server Side (Site)

1. Matikan Service PM2 (Opsional)

   Ini diperlukan jika :

   - Melakukan update pada aplikasi PM2 itu sendiri (misal: update versi PM2).
   - Mengubah konfigurasi Windows Service (misal: mengubah user "Log On" atau mengubah lokasi PM2_HOME).
   - Terjadi error sistem yang membuat PM2 tidak responsif (hang).

   Untuk menonaktifkan atau stopped servive PM2 yang sedang berjalan ada beberapa cara yang dapat dilakukan.

   - Pergi ke `Services` lalu cari PM2, atau
   - Buka `command prompt`

   ```bash
   # Untuk melihat service PM2
   sc query pm2.exe

   # Untuk stop service PM2
   sc stop pm2.exe
   ```

2. Copy paste file zip
   Karena pada poin `nomor 3 di Development Server Side` sudah create zip file, maka copy paste file tersebut ke directory aplikasi

   Lalu extract dan reaplace file dan folder yang diperlukan untuk update proses

3. Restart Apps

   Diperlukan restart apps pada level pm2 (bukan pm2-installer). Adapun cara yang dapat dilakukan adalah sebagai berikut :

   - Lakukan reload aplikasi

   ```bash
   # reload
   pm2 reload rapid-api

   # cek status
   pm2 status

   # cek semua apps berjalan
   pm2 list
   ```
