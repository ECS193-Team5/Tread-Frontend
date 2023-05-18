const CLOUDINARY_NAME = process.env.REACT_APP_CLOUDINARY_NAME;

export const createProfilePictureURL = (username) => {
    return "https://res.cloudinary.com/"+CLOUDINARY_NAME+"/image/upload/profilePictures/"+username.replace("#", "_") + ".png";
}


export const createLeaguePictureURL = (id) => {
    return "https://res.cloudinary.com/"+CLOUDINARY_NAME+"/image/upload/leaguePicture/"+id + ".png";
}
