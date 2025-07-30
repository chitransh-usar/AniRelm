const express = require('express');
const router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require('passport');
const upload = require("./multer");

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));


router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login', error: req.flash('error')});
});

router.get('/feed', isLoggedIn, async function(req, res) {
  try {
    const user = req.user;
    const allPosts = await postModel.find().populate('user', 'username fullname');
    res.render('feed', { title: 'Feed', user: user, posts: allPosts });
  } catch (error) {
    console.error('Feed error:', error);
    res.render('feed', { title: 'Feed', user: user, posts: [] });
  }
});

router.post('/upload',isLoggedIn, upload.single('file'), async function(req, res) {
  try {
    if(!req.file){
      return res.status(400).send('No files were uploaded.');
    }
    
    const user = await userModel.findOne({username:req.session.passport.user});
    if (!user) {
      return res.status(404).send('User not found');
    }

    const postdata = await postModel.create({
      image: req.file.filename,
      imageText: req.body.filecaption,
      user: user._id
    });
    
    user.posts.push(postdata._id);
    await user.save();
    
    res.redirect("/profile?upload=success");
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).send('Upload failed');
  }
});

router.post('/upload-profile-pic', isLoggedIn, upload.single('profilePic'), async function(req, res) {
  try {
    if(!req.file){
      return res.status(400).json({success: false, message: 'No file uploaded. Please select an image file.'});
    }
    
    // Check if file is an image
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({success: false, message: 'Only image files are allowed (JPEG, PNG, GIF, etc.)'});
    }
    
    // Check file size (5MB limit)
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({success: false, message: 'File size too large. Maximum size is 5MB.'});
    }
    
    const user = await userModel.findOne({username: req.session.passport.user});
    if (!user) {
      return res.status(404).json({success: false, message: 'User not found'});
    }
    
    user.dp = req.file.filename;
    await user.save();
    
    res.json({success: true, filename: req.file.filename});
  } catch (error) {
    console.error('Profile picture upload error:', error);
    res.status(500).json({success: false, message: 'Upload failed'});
  }
});

router.get('/profile', isLoggedIn, async function(req, res) {
  try {
    const user = await userModel.findOne({
      username: req.session.passport.user
    })
    .populate("posts");
    
    if (!user) {
      return res.redirect('/login');
    }
    
    res.render("profile",{user});
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).send('Profile loading failed');
  }
});



router.post('/register',function(req,res){
  const { username, email, fullname } = req.body;

  const userData = new userModel({username,email,fullname});
  userModel.register(userData, req.body.password)
    .then(function(){
      passport.authenticate("local")(req,res,function(){
        res.redirect('/profile');
      })
    })
    .catch(function(err){
      console.error('Registration error:', err);
      req.flash('error', 'Registration failed: ' + err.message);
      res.redirect('/login');
    });
});

router.post("/login",passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect:"/login",
  failureFlash: true
}),function(req,res){ 
});

router.get("/logout",function(req,res){
  req.logout(function(err){
    if (err) { return next(err); }
    res.redirect('/');
  });
})

// Route to save image from feed
router.post('/save-image', isLoggedIn, async function(req, res) {
  try {
    const { imageUrl, caption } = req.body;
    const user = await userModel.findOne({username: req.session.passport.user});
    
    // Check if image is already saved
    const alreadySaved = user.savedImages.find(img => img.imageUrl === imageUrl);
    if (alreadySaved) {
      return res.json({ success: false, message: 'Image already saved' });
    }
    
    // Add image to saved images
    user.savedImages.push({
      imageUrl: imageUrl,
      caption: caption
    });
    
    await user.save();
    res.json({ success: true, message: 'Image saved successfully' });
  } catch (error) {
    console.error('Save image error:', error);
    res.status(500).json({ success: false, message: 'Failed to save image' });
  }
});

// Route to delete a post
router.post('/delete-post', isLoggedIn, async function(req, res) {
  try {
    const { postId } = req.body;
    const user = await userModel.findOne({username: req.session.passport.user});
    
    // Find the post
    const post = await postModel.findById(postId);
    if (!post) {
      return res.json({ success: false, message: 'Post not found' });
    }
    
    // Check if the post belongs to the current user
    if (post.user.toString() !== user._id.toString()) {
      return res.json({ success: false, message: 'You can only delete your own posts' });
    }
    
    // Remove post from user's posts array
    user.posts = user.posts.filter(post => post.toString() !== postId);
    await user.save();
    
    // Delete the post
    await postModel.findByIdAndDelete(postId);
    
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete post' });
  }
});

// Route to unsave an image
router.post('/unsave-image', isLoggedIn, async function(req, res) {
  try {
    const { imageIndex } = req.body;
    const user = await userModel.findOne({username: req.session.passport.user});
    
    // Check if the index is valid
    if (imageIndex < 0 || imageIndex >= user.savedImages.length) {
      return res.json({ success: false, message: 'Invalid image index' });
    }
    
    // Remove the image from saved images array
    user.savedImages.splice(imageIndex, 1);
    await user.save();
    
    res.json({ success: true, message: 'Image unsaved successfully' });
  } catch (error) {
    console.error('Unsave image error:', error);
    res.status(500).json({ success: false, message: 'Failed to unsave image' });
  }
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
}
module.exports = router;
