import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Button, Input, Textarea } from "@nextui-org/react";
import axiosInstance from "../../utils/AxiosConfig";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VideoUploadForm() {
  const { user } = useAuth(); // Extract user information (e.g., creator_id)
  console.log(user);

  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState([]); // Array to store hashtags
  const [currentHashtag, setCurrentHashtag] = useState(""); // Input for new hashtag
  const [videoPreview, setVideoPreview] = useState(""); // For video preview
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate()

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedFile = e.dataTransfer.files[0];
      setFile(uploadedFile);
      setVideoPreview(URL.createObjectURL(uploadedFile)); // Create preview URL
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
      setVideoPreview(URL.createObjectURL(uploadedFile)); // Create preview URL
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const addHashtag = () => {
    if (currentHashtag.trim() && !hashtags.includes(currentHashtag.trim())) {
      setHashtags([...hashtags, currentHashtag.trim()]);
      setCurrentHashtag(""); // Clear input field
    }
  };

  const removeHashtag = (hashtag) => {
    setHashtags(hashtags.filter((tag) => tag !== hashtag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!file || !title || !description || hashtags.length === 0) {
      return alert("Please fill all fields and add at least one hashtag!");
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("creator_id", user?.id); // Append creator_id
      // formData.append("creator_id", 7); // Append creator_id

      // Append hashtags as a JSON string
      const hashtagsString = hashtags.join("#");
      formData.append("hashtags", hashtagsString);

      const response = await axiosInstance.post("/upload/video/", formData);

      if (response.status === 200 || response.status === 201) {
        alert("Video uploaded successfully!");
        // Reset form
        setFile(null);
        setTitle("");
        setDescription("");
        setHashtags([]);
        setVideoPreview("");
        navigate("/dashboard");
      } else {
        alert("Failed to upload video!");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Error uploading video!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onDragEnter={handleDrag}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="flex p-8 pb-2">
        <div className="w-full mx-auto">
          <div
            className={`mb-6 max-w-[90%]  flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300"
              }`}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
          >
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              onChange={handleChange}
              className="hidden"
            />
            {file ? (
              <div className="text-center">
                <p className="text-sm text-gray-600">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                {videoPreview && (
                  <video
                    src={videoPreview}
                    controls
                    className="mt-2 w-full max-h-32 rounded-lg"
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  MP4, WebM, or OGG (MAX. 100MB)
                </p>
              </div>
            )}
          </div>
          <div className="w-full">
            <div className="max-w-[70%] mx-auto">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-white"
                >
                  Title
                </label>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="hashtags"
                  className="block text-sm font-medium text-white"
                >
                  Hashtags
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    id="hashtags"
                    value={currentHashtag}
                    onChange={(e) => setCurrentHashtag(e.target.value)}
                    placeholder="e.g., #fun"
                  />
                  <Button type="button" onClick={addHashtag}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-sm cursor-pointer"
                      onClick={() => removeHashtag(tag)}
                    >
                      {tag} ✕
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-white"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="w-[70%] mx-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          loading={loading}
        >
          Upload Video
        </Button>
      </div>
    </form>
  );
}
