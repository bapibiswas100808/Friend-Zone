import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Hooks/UserProvider/UserProvider";

const RecommendedFriends = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchUsersWithMutualFriends = async () => {
      try {
        const response = await axios.get(
          `https://friend-zone-server.vercel.app/all-users-with-mutual-friends?userId=${user.id}`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users with mutual friends:", error);
      }
    };

    fetchUsersWithMutualFriends();
  }, [user.id]);

  return (
    <div className="max-w-[1170px] mx-auto py-10 px-3 lg:px-0">
      <h2 className="text-2xl font-bold mb-4">User: {user.username}</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Mutual Friends</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {user.mutualFriendsDetails.length > 0 ? (
                  <ul>
                    {user.mutualFriendsDetails.map((friend) => (
                      <li key={friend._id}>{friend.name}</li>
                    ))}
                  </ul>
                ) : (
                  "No mutual friends"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendedFriends;
