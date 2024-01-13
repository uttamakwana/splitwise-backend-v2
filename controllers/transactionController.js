//* import
import { User } from "../models/User.js";
import { response } from "../utils/response.js";

//* controllers

//? Description: Make a transaction
//? Route: POST /transactions/make
//? Public
export const makeTransaction = async (req, res) => {
  const { id, amount, description, isPersonalExpense, paidFor } = req.body;

  let user = await User.findById(id);
  if (!user) return response(res, 404, { message: "User not found!" });

  console.log(isPersonalExpense);
  if (isPersonalExpense) {
    user.transactions.push({
      amount,
      description,
      isPersonalExpense,
      paidFor,
      paidBy: id,
    });

    user.personalTotalExpense += Number(amount);

    await user.save();
    return response(res, 200, {
      user,
      message: "Transaction created successfully!",
    });
  }

  user.transactions.push({
    amount,
    description,
    isPersonalExpense,
    paidFor,
    paidBy: id,
  });

  user.personalTotalExpense += Number(amount);
  // await Promise.all(
  //   paidFor.map(async (friend) => {
  //     user.personalTotalExpense -= friend.share;
  //     user.friends = user.friends.forEach((f) => {
  //       if (f.id.toString() === friend.id) {
  //         f.amount += friend.share;
  //         f.transactions.push({
  //           share: friend.share,
  //           description: friend.description,
  //         });
  //       }
  //     });

  //     const findEachFriendInUsers = await User.findById(friend.id);
  //     findEachFriendInUsers.friends = findEachFriendInUsers.friends.forEach(
  //       (ourself) => {
  //         if (ourself.id.toString() === id) {
  //           ourself.amount -= friend.share;
  //           ourself.transactions.push({
  //             share: friend.share,
  //             description: friend.description,
  //           });
  //         }
  //       }
  //     );
  //     findEachFriendInUsers.balance -= friend.share;
  //     await findEachFriendInUsers.save();
  //   })
  // );

  await Promise.all(
    paidFor.map(async (friend) => {
      const friendIndex = user.friends.findIndex(
        (f) => f.id.toString() === friend.id
      );

      if (friendIndex !== -1) {
        user.personalTotalExpense -= Number(friend.share);
        user.friends[friendIndex].amount += Number(friend.share);
        user.friends[friendIndex].transactions.push({
          share: friend.share,
          description: friend.description,
        });

        const findEachFriendInUsers = await User.findById(friend.id);

        findEachFriendInUsers.personalTotalExpense += Number(friend.share);
        const ourselfIndex = findEachFriendInUsers.friends.findIndex(
          (ourself) => ourself.id.toString() === id
        );
        if (ourselfIndex !== -1) {
          findEachFriendInUsers.friends[ourselfIndex].amount -= Number(
            friend.share
          );
          findEachFriendInUsers.friends[ourselfIndex].transactions.push({
            share: friend.share,
            description: friend.description,
          });
        }

        await findEachFriendInUsers.save();
      }
    })
  );

  await user.save();

  return response(res, 200, { message: "Transaction added successfully!" });
};
