import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../Hooks/UserProvider/UserProvider";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(UserContext);

  // Use the actual logged-in user's ID
  const [userId, setUserId] = useState(user?.id);

  // Fetch users and exclude the logged-in user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users?search=${searchTerm}&excludeUserId=${userId}`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [searchTerm, userId]);

  const handleSendFriendRequest = async (friendId) => {
    try {
      await axios.post(`http://localhost:5000/friend-request`, {
        senderId: userId,
        recipientId: friendId,
      });
      Swal.fire("Friend request sent!", "", "success");
    } catch (error) {
      Swal.fire("Friend request Already sent", "", "error");
    }
  };

  return (
    <div className="max-w-[1170px] mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">
        Logged in User: {user?.username}
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full mb-4"
      />

      <div>
        {/* Users List */}
        <h2 className="text-xl font-bold mb-2">All Users</h2>
        <ul className="list-disc pl-5">
          {users.map((user) => (
            <li
              key={user._id}
              className="flex justify-between items-center mb-2"
            >
              {user.name}
              <button
                onClick={() => handleSendFriendRequest(user._id)}
                className="btn btn-primary ml-2"
              >
                Add Friend
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
