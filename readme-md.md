# 🎄 Hallmark Christmas Movie Evaluator

Track and rate your 2025 Hallmark Christmas movie marathon! A fun web app to organize, evaluate, and remember all the festive movies you watch during the holiday season.

## Features

- 📝 **Add Movies**: Manually enter movies or quick-add from the 2025 Hallmark lineup
- ⭐ **Rate & Review**: Give overall star ratings and detailed category scores
- 🎯 **Detailed Categories**: Rate predictability, chemistry, festivity, storyline, and more
- 🎉 **Fun Highlights**: Track special moments like shirtless scenes and early kisses
- 🍷 **Drinking Game Tracker**: Monitor beverage consumption levels in each movie
- 🔍 **Search & Filter**: Find movies by title, rating, or watch status
- 📊 **Statistics**: View your season stats and average ratings
- 💾 **Auto-Save**: All data saved locally in your browser
- 📥 **Export**: Download your evaluations as CSV

## Deployment Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- GitHub account
- Cloudflare account

### Step 1: Set Up Your Local Project

1. Create a new directory and navigate to it:
```bash
mkdir hallmark-movie-evaluator
cd hallmark-movie-evaluator
```

2. Copy all the provided files into this directory:
   - `package.json`
   - `vite.config.js`
   - `index.html`
   - `src/main.jsx`
   - `src/App.jsx`
   - `README.md`
   - `.gitignore`

3. Install dependencies:
```bash
npm install
```

4. Test locally:
```bash
npm run dev
```
Visit `http://localhost:5173` to see your app running.

### Step 2: Push to GitHub

1. Initialize git repository:
```bash
git init
git add .
git commit -m "Initial commit: Hallmark Movie Evaluator"
```

2. Create a new repository on GitHub (https://github.com/new)
   - Name it `hallmark-movie-evaluator`
   - Keep it public or private
   - Don't initialize with README (we already have one)

3. Push to GitHub:
```bash
git remote add origin https://github.com/YOUR-USERNAME/hallmark-movie-evaluator.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Cloudflare Pages

#### Option A: Via Cloudflare Dashboard (Recommended)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** → **Create Application** → **Pages**
3. Click **Connect to Git**
4. Authorize Cloudflare to access your GitHub account
5. Select your `hallmark-movie-evaluator` repository
6. Configure build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
7. Click **Save and Deploy**

Your app will be live at: `https://hallmark-movie-evaluator.pages.dev`

#### Option B: Via Wrangler CLI

1. Install Wrangler:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Build your project:
```bash
npm run build
```

4. Deploy:
```bash
wrangler pages deploy dist --project-name=hallmark-movie-evaluator
```

### Step 4: Set Up Custom Domain (Optional)

1. In Cloudflare Pages dashboard, go to your project
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain and follow the instructions

### Automatic Deployments

Once connected to GitHub, Cloudflare Pages will automatically:
- Deploy whenever you push to the main branch
- Create preview deployments for pull requests
- Show build logs and deployment status

## Making Updates

1. Make your changes locally
2. Test with `npm run dev`
3. Commit and push:
```bash
git add .
git commit -m "Your update message"
git push
```
4. Cloudflare will automatically rebuild and deploy!

## Tech Stack

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling via CDN
- **Lucide React**: Icons
- **localStorage**: Data persistence
- **Cloudflare Pages**: Hosting

## Local Storage

All data is stored in your browser's localStorage. To backup your data:
1. Use the Download CSV button
2. Or export from browser DevTools: `localStorage.getItem('hallmark-movies-2025')`

## Contributing

Feel free to fork and submit pull requests!

## License

MIT License - feel free to use and modify as you wish!

---

Made with ❤️ for Hallmark Christmas movie fans everywhere! 🎅🎄