import { useState, useEffect } from "react";
import axios from "axios";

const backendURL = "http://207.154.253.97:8000"; // Update with your backend URL

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRole = localStorage.getItem("user_role");
        const token = localStorage.getItem("accessToken");

        if (!token) {
          setError("Unauthorized. Please log in.");
          setLoading(false);
          return;
        }

        const endpoint =
          userRole === "staff"
            ? `${backendURL}/api/profiles/staff/profile/`
            : `${backendURL}/api/profiles/farmer/profile/`;

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile. Please try again.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "profile") {
        setProfileImage(file);
      } else if (type === "banner") {
        setBannerImage(file);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const userRole = localStorage.getItem("user_type");
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("Unauthorized. Please log in.");
        return;
      }

      const endpoint =
        userRole === "staff"
          ? `${backendURL}/api/profiles/staff/profile/`
          : `${backendURL}/api/profiles/farmer/profile/`;

      const updateData = new FormData();
      updateData.append("first_name", formData.first_name);
      updateData.append("second_name", formData.second_name);
      updateData.append("phone_number", formData.phone_number);
      updateData.append("farm_location", formData.farm_location);

      if (profileImage) {
        updateData.append("image", profileImage);
      }
      if (bannerImage) {
        updateData.append("banner", bannerImage);
      }

      await axios.put(endpoint, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setEditing(false);
      window.location.reload(); // Refresh to show updated images
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
  };

  if (loading)
    return (
      <p className="text-center text-orange-500 font-semibold">
        Loading profile...
      </p>
    );
  if (error)
    return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">
        Profile
      </h2>

      {/* Banner & Profile Picture Section */}
      <div className="relative w-full">
        {/* Banner Image */}
        <div className="relative w-full h-40 md:h-56 bg-gray-200 rounded-md overflow-hidden">
          {bannerImage ? (
            <img
              src={URL.createObjectURL(bannerImage)}
              alt="New Banner"
              className="w-full h-full object-cover"
            />
          ) : profile.banner ? (
            <img
              src={`${backendURL}${profile.banner}`}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-300">
              <span className="text-gray-500">No Banner Image</span>
            </div>
          )}
        </div>

        {/* Profile Picture - Below Banner at Bottom Left */}
        <div className="flex justify-start mt-14 ml-6">
          <div className="w-24 h-24 md:w-28 md:h-28 border-4 border-white rounded-full overflow-hidden shadow-lg">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="New Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : profile.image ? (
              <img
                src={`${backendURL}${profile.image}`}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <img
                src="/default-avatar.png"
                alt="Default"
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="flex flex-col items-center text-center mt-6">
        {editing ? (
          <>
            {/* Text Inputs */}
            <input
              type="text"
              name="first_name"
              value={formData.first_name || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-2"
            />
            <input
              type="text"
              name="second_name"
              value={formData.second_name || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-2"
            />
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-2"
            />
            <input
              type="text"
              name="farm_location"
              value={formData.farm_location || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-2"
            />

            {/* File Inputs */}
            <div className="mt-4">
              <label className="block font-semibold">
                Update Profile Picture:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "profile")}
                className="mt-2"
              />
            </div>
            <div className="mt-4">
              <label className="block font-semibold">
                Update Banner Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "banner")}
                className="mt-2"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleUpdate}
              className="bg-orange-500 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              {profile.first_name} {profile.second_name}
            </h3>
            <p className="text-gray-600 text-lg">
              <strong>Phone:</strong> {profile.phone_number}
            </p>
            <p className="text-gray-600 text-lg">
              <strong>Location:</strong> {profile.farm_location || "N/A"}
            </p>

            <button
              onClick={() => setEditing(true)}
              className="bg-orange-500 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
