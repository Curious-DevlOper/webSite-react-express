import express from 'express';
import passport from 'passport';
import pkg from 'passport';
const { session } = pkg;
// import router from 'Router';
import User from '../../models/User.js';
import Profile from '../../models/Profile.js';

import validateProfileInput from '../../validation/profile.js';
import validateExperienceInput from '../../validation/experience.js';
import validateEducationInput from '../../validation/education.js';





// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
const router = express.Router();
router.get('/test', (req, res)=> res.json({msg: "profile works"}));

 
// @route   GET api/profile
// @desc    GET Current users profile
// @access  Private. it will e a protected route so we use passport
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    //fetch the current users' profile, it is protected so we get token
    //the token puts the user in the req.user
    const errors = {}
    Profile.findOne({user: req.user.id}) //we get the ie id of thar user 
        //we get the profle it gives us, and check is it exists
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


// @route   GET api/profile/all
// @desc    GET all profiles
// @access  Public

router.get('/all', (req, res) => {
  Profile.find()
  .populate('user', ['user', 'avatar'])
  .then(profiles => {
    if(!profiles) {
      errors.nonprofile =  'There are no profiles'; 
      return res.status(404).json(errors);3
    }
    res.json(profiles);
    })
    .catch(err => res.status(404).json({profile: 'There are no profiles'})
  );
    }); 

// @route   GET api/profile/handle/:handle, this is a backend api, to be used in froneend write the user name
// @desc    GET profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['user', 'avatar'])
    .then (profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user'; 
        res.status(404).json (errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
    
});

// @route   GET api/profile/user/:user_id   , this is a backend api, to be used in froneend write the user name
// @desc    GET profile by id
// @access  Public

router.get('/user/:user_id', (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['user', 'avatar'])
    .then (profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user'; 
        res.status(404).json (errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json({profile: 'There is no profile for this user'}));
    
});


// @route   Post api/profile
// @desc    create or edit user profile
// @access  Private. it will e a protected route so we use passport
router.post('/', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body); 
    //check validation
    
    if(!isValid) {
        //return any error with 400 status
        return res.status(400).json(errors);
    }
    //Get Fields
    const profileFields ={};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.handle) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //skils- split into array- gives us an array of skills
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }


  Profile.findOne({user: req.user.id})
      
    .then(profile => {
      if(profile) {
        //update
        Profile.findOneAndUpdate({user: req.user.id},
          { $set: profileFields },
          { new: true }
          ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if(profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }
    
          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);
          
// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
          
router.post(
'/experience',
passport.authenticate('jwt', { session: false }),
(req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // Add to exp array
    profile.experience.unshift(newExp);

    profile.save().then(profile => res.json(profile));
  });
}
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
            
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);


          
// @route   DELETE api/profile/exp:id
// @desc    delet experience from profile
// @access  Private
          
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
    Profile.findOne({ user: req.user.id }).then(profile => {
      //get remove index
      const removeIndex = profile.experience
      .map(item => item.id) 
      .indexOf(req.params.exp_id);
  
      // splice out of array
      profile.experience.splice(removeIndex);
  
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
  }
  );

  // @route   DELETE api/profile/edu:id
// @desc    delete education from profile
// @access  Private
          
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
    Profile.findOne({ user: req.user.id }).then(profile => {
      //get remove index
      const removeIndex = profile.education
      .map(item => item.id) 
      .indexOf(req.params.exp_id);
  
      // splice out of array
      profile.education.splice(removeIndex);
  
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
  }
  );

// @route   DELETE api/profile
// @desc    delete api and profile
// @access  Private
          
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
    Profile.findOne({ user: req.user.id }).then(profile => {
      //get remove index
      const removeIndex = profile.education
      .map(item => item.id) 
      .indexOf(req.params.exp_id);
  
      // splice out of array
      profile.education.splice(removeIndex);
  
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
  }
  );

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);



export default router;

