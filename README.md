# RAPID Website - Engine Detection | Fronend Svelte

### Site : PT Kaltim Prima Coal

Frontend Svelte ini dikembangkan sebagai bagian dari proyek RAPID Website, berfungsi sebagai interface reporting untuk dataset yang telah dikembangkan, serta mendukung proses analisis cepat secara efisien.

Pada dasarnya frontend ini dibuat berdasarkan kebutuhan masing-masing site agar dapat menjawab masalah dan case yang sering terjadi pada operasional.

## 🚀 Main Feature

### Engine Detection

- Current and Shift Summary Report

  - Filter by Department
  - Card summary of Loss Hour and Loss Fuel by Shift
  - Card Current Truck/Equipment who meet the condition
  - Table list general information Engine Detection by Shift
  - Table chart detail Engine Detection by Shift

- Month Summary Historical
  - Under development progress

# 📁 Project Structure

<pre>
front/ 
 ├── src/                    
 │ ├── lib/                
 │ │ ├── api/               
 │ │ │ └── fuel-time-loss.js    # GET api for Engine Detection
 │ │ ├── components/            # Component UI building blocks
 │ │ │ ├── Header.svelte        
 │ │ │ └── Sidebar.svelte       
 │ │ ├── data/                  # reusable data
 │ │ │ └── departments.json
 │ │ └── stores/                # State management 
 │ │   └── loading.js           # Loading animation 
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
 │ └── app.html                 # Body HTML Configuration
 ├── static/                    # Public file
 ├── .env                       # database url (check notion or ask administrator)
 ├── .gitignore             
 ├── .npmrc
 ├── jsonconfig.json
 ├── package-lock.json      
 ├── package.json 
 ├── README.md
 ├── svelte.config.js          
 └── vite.config.js
</pre>

# ⚙️ Deployment

```bash
# install dependencies
npm install

# create .env file
VITE_URL_API='http://ip:port/routing'
```

## Developing

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# run or start the server from IP
npm run dev -- --host

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

# ⚙️ Deployment to LAN SERVER

> ## Local Side

#### 1. Pastikan adapter-node sudah terinstall

```bash
# check di package.json, if there's not avail so run this
npm install -D @sveltejs/adapter-node
```

#### 2. Hapus folder build dan cache lama

```bash
# clear cache, only use for any major changes
rm -rf .svelte-kit build

# if using powershel
rmdir /s /q .svelte-kit
rmdir /s /q build
```

#### 3. Regenerate ulang .svelte-kit dan build

Setelah itu .svelte-kit/tsconfig.json akan otomatis dibuat ulang.

```bash
# build static
npm install
npm run build
```

> ## Server Site Side

#### 1. Install node.js dan npm

Download node.js langsung dari website resmi https://nodejs.org/en/download/

```bash
# check node version
node -v

# check npm version
npm -v
```

#### 2. Copy paste the files

- Bisa copy seluruh folder project, atau hanya

  - build/
  - .env
  - package-lock.json
  - package.json

- Taruh dalam folder

```bash
# go into the folder
cd /folder
```

#### 3. Install Dependencies

Running pada direktori /folder

```bash
npm install --production
```

#### 4. Run the Projects

```bash
node build

# change port
set PORT=3001
node build
```
