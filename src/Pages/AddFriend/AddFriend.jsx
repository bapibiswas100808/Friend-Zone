import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../Hooks/UserProvider/UserProvider";

const AddFriend = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);
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
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/friend-requests?userId=${userId}`
        );
        setFriendRequests(response.data);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    fetchFriendRequests();
  }, [userId]);

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

  const handleAcceptRequest = async (requestId) => {
    try {
      await axios.post(`http://localhost:5000/accept-friend-request`, {
        requestId,
        userId,
      });
      Swal.fire("Friend request accepted!", "", "success");
      // Refresh friend requests after accepting
      setFriendRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      Swal.fire("Error accepting friend request", "", "error");
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.post(`http://localhost:5000/reject-friend-request`, {
        requestId,
        userId,
      });
      Swal.fire("Friend request rejected!", "", "success");
      // Refresh friend requests after rejecting
      setFriendRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      Swal.fire("Error rejecting friend request", "", "error");
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

      <div>
        {/* Friend Requests List */}
        <h2 className="text-xl font-bold mb-2">Friend Requests</h2>
        <ul className="list-disc pl-5">
          {friendRequests.map((request) => (
            <li
              key={request._id}
              className="flex justify-between items-center mb-2"
            >
              {request.senderName}{" "}
              {/* Assuming senderName is part of the friend request data */}
              <div>
                <button
                  onClick={() => handleAcceptRequest(request._id)}
                  className="btn btn-success ml-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectRequest(request._id)}
                  className="btn btn-error ml-2"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddFriend;
