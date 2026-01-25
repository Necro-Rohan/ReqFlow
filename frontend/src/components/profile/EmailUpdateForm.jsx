import { useState, useEffect } from "react";
import { updateEmail } from "../../services/profileService.js";
import { useAuth } from "../../context/useAuth.js";

const EmailUpdateForm = () => {
  const { user, updateUser } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await updateEmail(email);
      // console.log(response);
      updateUser(response.user); // Sync with context
      setMessage({ type: "success", text: "Email updated." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Failed to update email.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Update Email</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
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
            {loading ? "Update Email" : "Update Email"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailUpdateForm;
