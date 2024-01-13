//* import
import { response } from "../utils/response.js";
import { User } from "../models/User.js";

//? Description: Send a friend request
//? Route: POST /friends/send-request
//? Public
export const sendFriendRequest = async (req, res) => {
  const { id, friend_id } = req.body;

  if (id === friend_id)
    return response(res, 400, { message: "Both ID can't be same" });
  const friend = await User.findById(friend_id);
  const user = await User.findById(id);
  if (!friend || !user)
    return response(res, 404, { message: "User not found!" });

  let requestExits = friend.friendRequests.some(
    (req) => req.id.toString() === id
  );
  if (requestExits)
    return response(res, 400, { message: "Request already exists!" });

  requestExits = user.friendRequests.some(
    (req) => req.id.toString() === friend_id
  );

  if (requestExits)
    return response(res, 400, { message: "Request already exists!" });

  friend.friendRequests.push({ id, name: user.name, email: user.email });
  await friend.save();

  return response(res, 200, {
    friend,
    message: "Friend request sent successfully!",
  });
};

//? Description: Accept a friend request
//? Route: POST /friends/accept-request
//? Public
export const acceptFriendRequest = async (req, res) => {
  const { id, friend_id } = req.body;

  if (id === friend_id)
    return response(res, 400, { message: "Both ID can't be same" });
  const friend = await User.findById(friend_id);
  const user = await User.findById(id);
  if (!friend || !user)
    return response(res, 404, { message: "User not found!" });

  let friendExists = user.friends.some(
    (friend) => friend.id.toString() === friend_id
  );

  if (friendExists)
    return response(res, 400, {
      message: `Friend '${friend.name}' already exists!`,
    });

  friendExists = friend.friends.some((friend) => friend.id.toString() === id);

  if (friendExists)
    return response(res, 400, { message: "Friend already exists!" });

  user.friends.push({ id: friend_id, name: friend.name, email: friend.email });
  user.friendRequests = user.friendRequests.filter(
    (req) => req.id.toString() !== friend_id
  );
  friend.friends.push({ id: id, name: user.name, email: user.email });

  await user.save();
  await friend.save();
  return response(res, 200, {
    user: user,
    friend: friend,
    message: "Friend added successfully in both account!",
  });
};

//? Description: Denies a friend request
//? Route: POST /friends/accept-request
//? Public
export const denyFriendRequest = async (req, res) => {
  const { id, friend_id } = req.body;
  const user = await User.findById(id);
  const friend = await User.findById(friend_id);

  if (!user || !friend) {
    response(res, 404, { message: "User not found!" });
  }

  user.friendRequests = user.friendRequests.filter(
    (friendRequest) => friendRequest.id.toString() !== friend_id
  );

  await user.save();
  return response(res, 200, {
    user,
    message: "Friend request denied successfully!",
  });
};

//? Description: Remove a friend
//? Route: POST /friends/remove-friend
//? Public
export const removeFriend = async (req, res) => {
  const { id, friend_id } = req.body;

  if (id === friend_id)
    return response(res, 400, { message: "Both ID can't be same" });
  const user = await User.findById(id);
  const friend = await User.findById(friend_id);
  if (!user || !friend)
    return response(res, 404, { message: "User not found!" });

  const friendExists = user.friends.some(
    (friend) => friend.id.toString() === friend_id
  );

  if (!friendExists) return response(res, 404, { message: "Friend not found" });
  user.friends = user.friends.filter(
    (friend) => friend.id.toString() !== friend_id
  );
  friend.friends = friend.friends.filter(
    (friend) => friend.id.toString() !== id
  );

  await user.save();
  await friend.save();

  return response(res, 200, { user, message: "Friend removed successfully!" });
};
