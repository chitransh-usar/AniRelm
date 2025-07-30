# Pinterest Anime App 🎌

A modern Pinterest-style anime image sharing application built with Node.js, Express, and MongoDB Atlas. Share your favorite anime artwork with friends!

## ✨ Features

- 🎨 **Anime-focused Design**: Beautiful anime-themed interface
- 👤 **User Authentication**: Secure registration and login system
- 📸 **Image Upload**: Share your anime artwork with captions
- 🏠 **Pinterest-style Layout**: Responsive masonry grid layout
- 💾 **Save/Unsave**: Save images you love to your profile
- 👥 **User Profiles**: Personal profiles with your posts
- 📱 **Responsive Design**: Works perfectly on all devices
- 🎭 **Animated Background**: Beautiful sliding anime images on homepage

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Cloud Database)
- **Authentication**: Passport.js with local strategy
- **Frontend**: EJS templates, Bootstrap, Tailwind CSS
- **File Upload**: Multer
- **Sessions**: Express-session with MongoDB store
- **Deployment**: Render (Cloud Hosting)

## 🚀 Quick Start

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd pinterest-anime-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   ```

   Edit `.env` with your MongoDB Atlas connection string:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   SESSION_SECRET=your-super-secret-key
   NODE_ENV=development
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Visit the application**
   - Open `http://localhost:3000`
   - Register a new account
   - Start sharing anime images!

### Production Deployment

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Quick deployment steps:**

1. Set up MongoDB Atlas cluster
2. Push code to GitHub
3. Deploy to Render
4. Configure environment variables
5. Your app is live! 🎉

## 📁 Project Structure

```
├── app.js                 # Main application file
├── routes/                # Route handlers
│   ├── index.js           # Main routes (auth, upload, feed)
│   ├── users.js           # User model and authentication
│   ├── post.js            # Post model
│   └── multer.js          # File upload configuration
├── views/                 # EJS templates
│   ├── index.ejs          # Homepage with animation
│   ├── feed.ejs           # Main feed page
│   ├── profile.ejs        # User profile page
│   └── login.ejs          # Login/register page
├── public/                # Static files
│   ├── images/            # Image assets
│   │   ├── 1.jpeg-18.jpeg # Animation images
│   │   ├── feed/          # Feed images (50+ anime images)
│   │   └── uploads/       # User uploaded images
│   ├── stylesheets/       # CSS files
│   └── javascripts/       # Client-side JavaScript
├── bin/                   # Server startup
├── render.yaml            # Render deployment config
├── env.example            # Environment variables template
└── DEPLOYMENT_GUIDE.md    # Detailed deployment guide
```

## 🎯 Key Features Explained

### 🎨 **Anime Animation Background**

- Beautiful sliding anime images on the homepage
- Smooth GSAP animations
- Responsive design for all screen sizes

### 📸 **Image Management**

- Upload images with custom captions
- Pinterest-style masonry layout
- Click to view in full-screen modal
- Save/unsave functionality

### 👤 **User System**

- Secure authentication with Passport.js
- Profile picture upload
- Personal post management
- Saved images collection

### 🗄️ **Database (MongoDB Atlas)**

- Cloud-hosted MongoDB database
- Automatic backups and scaling
- Secure connection with environment variables
- Session storage in database

## 🔧 Configuration

### Environment Variables

| Variable         | Description                     | Example                                          |
| ---------------- | ------------------------------- | ------------------------------------------------ |
| `MONGODB_URI`    | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `SESSION_SECRET` | Secret key for sessions         | `your-super-secret-key-here`                     |
| `NODE_ENV`       | Environment mode                | `development` or `production`                    |
| `PORT`           | Server port                     | `3000`                                           |

### Database Setup

1. **MongoDB Atlas** (Recommended for production)

   - Free tier available
   - Automatic backups
   - Global distribution
   - Built-in security

2. **Local MongoDB** (For development)
   - Install MongoDB locally
   - Use connection string: `mongodb://127.0.0.1:27017/pinterest-anime`

## 🚀 Deployment

### Render (Recommended)

- Free tier available
- Automatic deployments from GitHub
- Built-in SSL certificates
- Global CDN

### Other Options

- Heroku
- Vercel
- Railway
- DigitalOcean

## 🛠️ Development

### Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
node setup-deployment.js  # Check deployment configuration
```

### Testing Deployment Setup

```bash
node setup-deployment.js
```

This script will:

- ✅ Check for required files
- ✅ Verify dependencies
- ✅ Test MongoDB connection
- ✅ Validate configuration

## 📊 Monitoring

### Render Dashboard

- Real-time logs
- Performance metrics
- Deployment history
- Health checks

### MongoDB Atlas

- Query performance
- Database metrics
- Connection monitoring
- Automatic alerts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own anime sharing platform!

## 🎌 Anime Community

This app is designed for anime enthusiasts to:

- Share beautiful anime artwork
- Discover new anime content
- Connect with fellow anime fans
- Build a community around anime art

---

**Happy Anime Sharing! 🎌✨**
