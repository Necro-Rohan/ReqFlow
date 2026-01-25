import { useState } from "react";
import ProfileInfoForm from "../components/profile/ProfileInfoForm.jsx";
import EmailUpdateForm from "../components/profile/EmailUpdateForm.jsx";
import PasswordUpdateForm from "../components/profile/PasswordUpdateForm.jsx";
import { logout } from "../services/authService.js";
import { deleteAccount } from "../services/profileService.js";
import { useAuth } from "../context/useAuth.js";
import ConfirmModal from "../components/common/ConfirmModal.jsx";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isAccountDeleteOpen, setIsAccountDeleteOpen] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      setIsAccountDeleteOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsLogoutOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8 border-b border-gray-200  pb-4">
        <h1 className="text-2xl font-bold text-gray-900  tracking-tight mb-2">
          My Profile
        </h1>
        <p className="text-gray-500  text-sm">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <div className="bg-white  shadow-sm rounded-lg border border-gray-200  p-6"> 
            <h3 className="text-sm font-bold text-gray-900  uppercase tracking-wider mb-4"> 
              Profile
            </h3>
            <div className="flex justify-center mb-6">
              <img
                src={user.avatarUrl}
                alt="Current Avatar"
                className="w-24 h-24 rounded-full border-3 border-gray-200 shadow-md"/> 
            </div>
            <div className="text-center">
              <p className="text-gray-900  font-bold"> 
                {user.name}
              </p>
              <p className="text-gray-500 ">{user.email}</p> 
              <p className="text-gray-500 font-medium font-serif text-sm mt-2">{user.bio}</p>
            </div>
          </div>
        </div>

        {/* Forms Section */}
        <div className="lg:col-span-2 space-y-6">
          <ProfileInfoForm />
          <EmailUpdateForm />
          <PasswordUpdateForm />
          <div className="lg:col-span-1 flex justify-center space-x-4 mt-4">
            <button
              onClick={() => setIsLogoutOpen(true)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            >
              Logout
            </button>
            <button
              onClick={() => setIsAccountDeleteOpen(true)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            >
              Delete Account
            </button>
          </div>
        </div>
        <ConfirmModal
          isOpen={isLogoutOpen}
          onClose={() => setIsLogoutOpen(false)}
          onConfirm={handleLogout}
          title="Logout"
          message="Are you sure you want to logout?"
        />
        <ConfirmModal
          isOpen={isAccountDeleteOpen}
          onClose={() => setIsAccountDeleteOpen(false)}
          onConfirm={handleDeleteAccount}
          title="Delete Account"
          message="Are you sure you want to delete your account? This action cannot be undone."
        />
      </div>
    </div>
  );
};

export default Profile;
