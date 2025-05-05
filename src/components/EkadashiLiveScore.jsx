import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EkadashiLiveScore = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const [scoreboard, setScoreboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRounds, setNewRounds] = useState("");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
          const { data } = await axios.get(`${baseURL}/user/get-user`, {
            withCredentials: true,
            headers: {
              Authorization: `${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
          });
          // console.log(data)
          setUserRole(data.data.role);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();

    const fetchData = async () => {
      try {
        // Then fetch scoreboard data
        const { data } = await axios.get(
          `${baseURL}/live/live-ekadashi-rounds`
        );
        if (data.message) {
          setScoreboard(data.data);
          setLoading(false);
        } else {
          toast.error(data?.message || "Error! Please try later");
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error! Please try later");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const submitRounds = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}/live/add-rounds`,
        {
          rounds: parseInt(newRounds),
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNewRounds("");
      toast.success("Rounds added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding rounds");
      console.error("Error submitting rounds:", error);
    }
  };

  const deleteAllRounds = async () => {
    if (window.confirm("Are you sure you want to delete ALL chanting rounds data? This cannot be undone.")) {
      try {
        const response = await axios.delete(
          `${baseURL}/live/delete-all-rounds`,
          {
            withCredentials: true,
            headers: {
              Authorization: `${localStorage.getItem("jwt")}`,
            },
          }
        );
        toast.success("All rounds data deleted successfully!");
        setScoreboard([]); // Clear the local state
      } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting rounds data");
        console.error("Error deleting rounds:", error);
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-600 tracking-tight animate-fade-in">
            Ekadashi Chanting Scorecard
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-purple-500 animate-fade-in delay-100">
            Track live chanting rounds with grace and devotion
          </p>
        </div>

        {/* Admin Controls */}
        {userRole === "admin" && (
          <div className="bg-red-50 rounded-2xl shadow-xl p-6 mb-8 border border-red-200">
            <h2 className="text-xl font-semibold text-red-800 mb-4">
              Admin Controls
            </h2>
            <button
              onClick={deleteAllRounds}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition duration-200 transform hover:scale-105"
            >
              Delete All Rounds Data
            </button>
            <p className="mt-3 text-sm text-red-600">
              Warning: This will permanently delete all chanting rounds data for all users.
            </p>
          </div>
        )}

        {/* Add Rounds Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-12 transform hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-2xl font-semibold text-purple-600 mb-6">
            Add Your Chanting Rounds
          </h2>
          <form onSubmit={submitRounds} className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              value={newRounds}
              onChange={(e) => setNewRounds(e.target.value)}
              className="flex-1 px-5 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/50 text-indigo-900 placeholder-indigo-400 transition duration-200"
              placeholder="Enter number of rounds"
              min="1"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition duration-200 transform hover:scale-105"
            >
              Add Rounds
            </button>
          </form>
        </div>

        {/* Scoreboard */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-700 text-white px-6 py-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Live Scoreboard</h2>
          </div>
          <div className="divide-y divide-indigo-100">
            {scoreboard.map((user, index) => (
              <div
                key={user._id}
                className="flex items-center p-4 sm:p-6 hover:bg-indigo-50/50 transition duration-200 animate-slide-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 sm:w-16 text-center font-medium text-indigo-500 text-lg">
                  {index + 1}
                </div>
                <div className="flex items-center flex-1 space-x-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-lg">
                    {user.firstName[0]}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-2">
                    <h3 className="font-medium text-indigo-900 text-lg">
                      {user.firstName}
                    </h3>
                    <h3 className="font-medium text-indigo-900 text-lg">
                      {user.lastName}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-bold text-indigo-600">
                    {user.rounds}
                  </span>
                  <span className="block text-sm text-indigo-500">Rounds</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-indigo-500 text-sm space-y-2">
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
          <p>Auto-refreshing every 10 seconds</p>
        </div>
      </div>
    </div>
  );
};

export default EkadashiLiveScore;