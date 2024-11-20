import express from 'express';
import passport from 'passport';

import Post from '../../models/Post.js';
import Profile from '../../models/Profile.js';

import validatePostInput from '../../validation/post.js';
import pkg from 'passport';
const { session } = pkg;


// @route   GET api/posts/test
// @desc    Tests profile route
// @access  Public

const router = express.Router();
router.get('/test', (req, res)=> res.json({msg: 'posts works'}));

// @route   Get api/posts
// @desc    Get posts
// @access  Public

router.get('/', (req, res) => {
  Post.find()
    .sort({date: -1}) //.sort({ date: -1 }): This sorts the fetched posts by the date field in descending order  
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound : 'No posts found'}));
});

// @route   Get api/posts/:id
// @desc    Get post by id
// @access  Public

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostfound : 'No post found with that id'}));
});




// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

        // Additional validation for user
    if (!req.user || !req.user.id) {
      return res.status(400).json({ user: 'User ID is required' });
    }


    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);


// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}) //the currently logged-in user
    .then(profile => {
      // Find the post by ID
      Post.findById(req.params.id)
        .then(post => {
          // Check if the logged-in user is the owner of the post
          if(post.user.toString() !== req.user.id) {
            return res.status(401).json({noauthorised: 'User not authorised'});

          }
          //Delete 
          Post.findByIdAndDelete(req.params.id).then(()=> res.json({success: true}));
        })
        .catch(err => res.status(404).json({ postnotfound: 'no post found'}))

    });
});



// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private

router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    Post.findById(req.params.id)
    .then(post => {
      if(post.likes.filter(like => like.user.toString() === req.user.id).length> 0){
        return res.status(400).json({alreadyliked: 'user alreay liked this post'}); 
    }
    //add user id to likes array
    post.likes.unshift({user: req.user.id});
    post.save().then(post => res.json(post));
    })

    .catch(err => res.status(404).json({nopostfound : 'No post found'}));

  })
  
  
});

// @route   POST api/posts/unlike/:id
// @desc    unLike post
// @access  Private

router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    Post.findById(req.params.id)
    .then(post => {
      if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
        return res.status(400).json({alreadyliked: 'user uniked this post'}); 
    }
    //Get remove index
    const removeIndex = post.likes
    .map(item => item.user.toString())
    .indexOf(req.user.id);  //et the id of current user that disliked

    //splice out of array
    post.likes.splice(removeIndex, 1);
    post.save().then(post => res.json(post));
      })

    .catch(err => res.status(404).json({nopostfound : 'No post found'}));

  });
  }
  
  
  
);


export default router;