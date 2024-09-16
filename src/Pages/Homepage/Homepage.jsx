import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../Hooks/UserProvider/UserProvider";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState([]);
  const { user } = useContext(UserContext);
  const [userId, setUserId] = useState(user?.id);

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

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/friends?userId=${userId}`
        );
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [userId]);

  const handleUnfriend = async (friendId) => {
    try {
      await axios.post(`http://localhost:5000/unfriend`, {
        userId,
        friendId,
      });
      Swal.fire("Unfriended successfully!", "", "success");
      // Remove the unfriended user from the list
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend._id !== friendId)
      );
    } catch (error) {
      Swal.fire("Error unfriending user", "", "error");
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

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          {/* Users List */}
          <h2 className="text-xl font-bold mb-2">All Users</h2>
          <ul className="list-disc pl-5">
            {users.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center mb-2"
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          {/* Friends List */}
          <h2 className="text-xl font-bold mb-2">Your Friends</h2>
          <ul className="list-disc pl-5">
            {friends.map((friend) => (
              <li
                key={friend._id}
                className="flex justify-between items-center mb-2"
              >
                {friend.name}
                <button
                  onClick={() => handleUnfriend(friend._id)}
                  className="btn btn-error ml-2"
                >
                  Unfriend
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
