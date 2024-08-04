import { User } from "../modals/user.modal.js";
import { apiError } from "../utils/apierror.js";
import { Apirsponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import { uploadOnCloudynery } from "../utils/cloudenery.js";

const registerUser = asynchandler(async (req, res) => {
  const { userName, email, password, fullName } = req.body;
  console.log(email);
  if (
    [userName, email, password, fullName].some(
      (element) => element?.trim() === ""
    )
  ) {
    throw new apiError(400, "All fields are required");
  }
  //findone find first one
  const existedUser = User.findOne({
    $or: [{ userName }, { email }],
  });
  if (existedUser) {
    throw new apiError(
      409,
      "User already exists with the username or the email"
    );
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.localImage[0]?.path;

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar is required");
  }
  const avatar = await uploadOnCloudynery(avatarLocalPath);
  const coverImage = await uploadOnCloudynery(coverImageLocalPath);

  if (!avatar) {
    throw new apiError(400, "Avatar is required");
  }
  const user= await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName: userName.toLowercase(),
  });

    const createdUser= await User.findById(user._id).select(  //select k k chaiyena syntax "" vitrw   - deyera k chaiyena   
           "-password -refreshToken"
    )
   if(!createdUser)
   {
    throw new apiError(500,"Something went wrong while creating user")
   }
   return  res.status(201).json(
   new Apirsponse(200,createdUser,"USer registered Successfully")
   )

});

export { registerUser };
