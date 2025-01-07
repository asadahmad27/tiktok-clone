import axiosInstance from "./AxiosConfig";
import qs from "qs"; // Import qs for URL-encoded string conversion

// import { v2 as cloudinary } from 'cloudinary';

export const getAllVideos = async (creator_id) => {
  try {
    const response = await axiosInstance.get(
      `/videos/creator/${creator_id}?skip=0&limit=50`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const getAllCreators = async () => {
  try {
    const response = await axiosInstance.get(`/users/`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response?.data?.filter((user) => user.is_creator);
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const deleteCreator = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const deleteVideoAPI = async (video_id) => {
  try {
    const response = await axiosInstance.delete(`/videos/${video_id}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getVideoComments = async (video_id) => {
  try {
    const response = await axiosInstance.get(`/videos/${video_id}/comments/`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const addVideoComment = async (video_id, commentText, user_id) => {
  try {
    // Prepare the URL-encoded request body
    const requestBody = qs.stringify({
      video_id: video_id,
      content: commentText,
      user_id: user_id,
    });

    // Send the POST request
    const response = await axiosInstance.post(
      `/video/${1}/comment/`,
      requestBody, // Pass the URL-encoded body
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Ensure correct content type
        },
      }
    );
    return response;
  } catch (e) {
    console.error(`Error adding comment to video ${video_id}:`, e);
    return null;
  }
};
export const getVideosForFeed = async () => {
  try {
    const response = await axiosInstance.get(`/videos/`, {
      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      // },
    });
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const searchVideosByQuery = async (searchTerm) => {
  try {
    const response = await axiosInstance.get(
      `/videos/search?query=${searchTerm}`
    );
    return response;
  } catch (e) {
    return null;
  }
};

const uploadVideo = async (formData) => {
  try {
    const response = await axiosInstance.post("/upload/video", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response;
  } catch (e) {
    return null;
  }
};
// cloudinary.config({
//   cloud_name: "dkxxtchzo",
//   api_key: "518245411736889",
//   api_secret: "bwAb5UzSsLboOX1zAymMO8HyFlE",
// });
export const uploadVideoToCloudinary = async (formData) => {
  //   try {
  //     const formData = await request.formData();
  //     const file = formData.get('file') as File;
  //     const bytes = await file.arrayBuffer();
  //     const buffer = Buffer.from(bytes);
  //     const result = await new Promise((resolve, reject) => {
  //       cloudinary.uploader.upload_stream(
  //         { resource_type: 'auto' },
  //         (error, result) => {
  //           if (error) reject(error);
  //           else resolve(result);
  //         }
  //       ).end(buffer);
  //     });
  //     return Response.json(result);
  //   } catch (error) {
  //     console.error('Upload error:', error);
  //     return Response.json({ error: 'Upload failed' }, { status: 500 });
  //   }
};
