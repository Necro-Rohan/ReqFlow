import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/useAuth.js";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const avatarUrl =
    user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=necro`;

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            to="/test"
            className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2"
          >
            ReqFlow
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/test"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              API Tester
            </Link>
            <Link
              to="/history"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              History
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border border-gray-200"
                />
                <span className="hidden sm:inline">{`Hello, ${user.name || "Guest"}`}</span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-4 shadow-lg">
          <div className="flex flex-col gap-4">
            <Link
              to="/test"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors block"
              onClick={() => setIsMenuOpen(false)}
            >
              API Tester
            </Link>
            <Link
              to="/history"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors block"
              onClick={() => setIsMenuOpen(false)}
            >
              History
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
