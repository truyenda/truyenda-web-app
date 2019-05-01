import axios from "axios";

export default {
  async upload(file, onUploadProgress = null) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "qeslpjtw");
      var res = await axios.post(
        "https://api.cloudinary.com/v1_1/bk-da-nang/image/upload",
        formData,
        {
          crossdomain: true,
          withCredentials: false,
          onUploadProgress: function(progressEvent) {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if (onUploadProgress) {
              onUploadProgress(percentCompleted);
              console.log(percentCompleted);
            }
          }
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
};
