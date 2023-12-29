import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { User } from "../models/user.model.js";

const registerUserController = asyncHandler(async (req, res) => {
  const { fullName, email, password, username } = req.body;
  console.log({ email, password, username });

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  console.log({ existedUser });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  console.log("req.files: ", req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  console.log({ avatarLocalPath, coverImageLocalPath });

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  const user = await User.create({
    email,
    password,
    fullName,
    username: username.toLowerCase(),
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(_id).select(
    "-password -refreshToken"
  );

  console.log({ user, createdUser });

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registerd successully"));
});

export { registerUserController };

// get user details from FE
// validation
// check if use already exists
// check avatar and coverImages
// upload them to cloudinary
// create user object and entry in DB
// remove password, refreshToken from response
// check for user creation
// return response
