const Profile = require("./profile.model");

const User = require("../user/user.model");
const asyncHandle = require("../../helper/asyncHandler");
const ErrorResponse = require("../../helper/errorResponse");
const httpStatus = require("http-status");

// @router GET api/profile/me
// @decs get current user
// @access private
module.exports.me = asyncHandle(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user._id }).populate(
    "user"
  );
  return res.status(httpStatus.OK).json(profile);
});

// @router POST api/profile
// @decs create profile user
// @access private
module.exports.createProfile = asyncHandle(async (req, res, next) => {
  //console.log(req.body);
  const {
    company,
    website,
    location,
    bio,
    status,
    githubUsername,
    skill,
    youtube,
    facebook,
    twitter,
    instagram,
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user._id;
  profileFields.company = company ? company : null;

  profileFields.website = website ? website : null;
  profileFields.location = location ? location : null;
  profileFields.bio = bio ? bio : null;
  profileFields.status = status ? status : null;
  profileFields.githubUsername = githubUsername ? githubUsername : null;
  if (!skill) {
    profileFields.skill = null;
  }
  if (skill && skill.length !== 0) {
    profileFields.skill = skill.split(",").map((val) => val.trim());
  }
  profileFields.social = {};
  profileFields.social.youtube = youtube ? youtube : null;
  profileFields.social.facebook = facebook ? facebook : null;
  profileFields.social.twitter = twitter ? twitter : null;
  profileFields.social.instagram = instagram ? instagram : null;
  console.log(profileFields);
  let profile = await Profile.findOne({ user: req.user._id });
  if (profile) {
    profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profileFields },
      { new: true }
    );
    return res.status(httpStatus.OK).json(profile);
  } else {
    profile = await Profile.create(profileFields);
    return res.status(httpStatus.OK).json(profile);
  }
});
// @router GET api/profile
// @decs get all profile user
// @access public
module.exports.getAllProfile = asyncHandle(async (req, res, next) => {
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);
  if (!profiles) {
    throw new ErrorResponse("somethong wrong", 404);
  }
  res.status(httpStatus.OK).json(profiles);
});

// @router GET api/profile/user/:user_id
// @decs get profile by userID
// @access public
module.exports.getProfile = asyncHandle(async (req, res, next) => {
  const profile = await Profile.findOne({
    user: req.params.id,
  }).populate("user", ["name", "avatar"]);
  if (!profile) {
    throw new ErrorResponse("doesn`t existed profile", 404);
  }
  res.status(httpStatus.OK).json(profile);
});
// @router GET api/profile/github/:username
// @decs GET profile GitHub
// @access public
module.exports.getGitHubRepos = async (req, res, next) => {
  try {
    const option = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&&client_id=${process.env.githubClientID}&client_secret=${process.env.githubSecret}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(option, (err, response, body) => {
      if (err) {
        throw new Error(err.message);
      } else if (response.statusCode !== 200) {
        res.status(400).send({ msg: "not found" });
      } else {
        res.status(200).send(JSON.parse(body));
      }
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// @router DELETE api/profile/user/:user_id
// @decs delete profile by userID
// @access private
module.exports.deleteProfile = async (req, res, next) => {
  try {
    //remove Profile
    await Profile.findOneAndRemove({
      user: req.params.user_id,
    });
    //remove User
    await User.findOneAndRemove({
      _id: req.params.user_id,
    });

    if (!profile) {
      res.status(400).send("sai cmm");
    }
    res.json(profile);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "profile not found" });
    }
    res.send(error.message);
  }
};
// @router PUT api/profile/experience
// @decs add profile experience
// @access private
module.exports.addExperience = asyncHandle(async (req, res, next) => {
  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title: title ? title : null,
    company: company ? company : null,
    location: location ? location : null,
    from: from ? from : null,
    to: to ? to : null,
    current,
    description: description ? description : null,
  };

  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) {
    throw new ErrorResponse("doesn`t existed profile", 404);
  }
  profile.experience.push(newExp);
  await profile.save();
  res.status(httpStatus.OK).json(profile);
});

// @router DELETE api/profile/experience/:exp_id
// @decs delete profile experience
// @access private
module.exports.deleleExperience = asyncHandle(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) {
    throw new ErrorResponse("doesn`t existed profile");
  }
  const indexProfile = profile.experience
    .map((item) => {
      return item._id.toString();
    })
    .indexOf(req.params.exp_id);
  profile.experience.splice(indexProfile, 1);
  await profile.save();
  res.status(httpStatus.OK).json(profile);
});

// @router PUT api/profile/education
// @decs add profile education
// @access private
module.exports.addEducation = asyncHandle(async (req, res, next) => {
  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body;
  const newEdu = {
    school,
    degree,
    fieldofstudy: fieldofstudy ? fieldofstudy : null,
    from,
    to,
    current,
    description: description ? description : null,
  };

  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) {
    throw new ErrorResponse("doesn`t existed profile");
  }
  profile.education.push(newEdu);
  await profile.save();
  res.status(httpStatus.OK).json(profile);
});

// @router DELETE api/profile/education/:edu_id
// @decs delete profile education
// @access private
module.exports.deleteEducation = asyncHandle(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) {
    throw new ErrorResponse("doesn`t existed profile");
  }
  const indexProfile = profile.education
    .map((item) => {
      return item._id.toString();
    })
    .indexOf(req.params.edu_id);
  profile.education.splice(indexProfile, 1);
  await profile.save();
  res.status(httpStatus.OK).json(profile);
});
