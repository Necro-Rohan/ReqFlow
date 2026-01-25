import { useState, useEffect } from "react";
import { updateProfile } from "../../services/profileService.js";
import { useAuth } from "../../context/useAuth.js";

const ProfileInfoForm = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const AVATARS = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=necro",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=mridul",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=kundan",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=yash",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=jyoti",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=ruchi",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=om",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=krish",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=ayush",
  ];

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
      setAvatar(
        user.avatarUrl ||
          "https://api.dicebear.com/7.x/avataaars/svg?seed=necro",
      );
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      console.log(name, bio, avatar);
      const response = await updateProfile({ name, bio, avatarUrl: avatar });
      console.log(response);
      updateUser(response.user); // Sync with auth context
      setMessage({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      // console.log(err.response.data);
      setMessage({
        type: "error",
        text:
          err.response?.data?.errors ||
          "Failed to update profile, Please fill required fields appropriately.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Profile Information
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="lg:col-span-1 mb-4">
          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-gray-700"
          >
            Avatar
          </label>
          <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <div className="flex justify-center mb-6">
              <img
                src={avatar}
                alt="Current Avatar"
                className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {AVATARS.map((avtr, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setAvatar(avtr)}
                  className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${avatar === avtr ? "border-blue-300 scale-110" : "border-transparent hover:border-gray-300 "}`}
                >
                  <img
                    src={avtr}
                    alt="Chosen Avatar"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {message && (
          <div
            className={`mt-4 text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {message.text}
          </div>
        )}

        <div className="mt-5">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoForm;
