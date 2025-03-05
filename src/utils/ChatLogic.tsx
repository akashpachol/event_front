import { message, userDataTypes } from "./types";

export const getSender = (
  loggedUser: string | null | undefined,
  users: userDataTypes[]
) => {
  const result = users[0]?._id == loggedUser ? users[1] : users[0];

  return result;
};

export const chatSeen = (
  loggedUser: string | null | undefined,
  users: string[]|userDataTypes[],
  readUser: string[]
) => {
  if (users.length !== readUser.length) {
    console.log(false);

    return false;
  }
  for (let i = 0; i < users.length; i++) {
    if (!readUser.includes(users[i])) {
      return false;
    }
  }

  return true;
};

export const getUnreadmessage = (
  loggedUser: string | null | undefined,
  message: message[]
) => {
  if (!loggedUser && !message) return;
  console.log(message, "lll");

  const result = message.filter(
    (message: message) => !message.readBy.includes(loggedUser)
  ).length;
  console.log(result, "gggggggggggggg");

  return result;
};
