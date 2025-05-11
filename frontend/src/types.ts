export type MessageRes = {
  msg: string;
};

// AUTH
export type CurrentUser = {
  userId: string;
  username: string;
  email: string;
  role: "admin" | "user";
};

export type RegisterArgs = {
  username: string;
  email: string;
  password: string;
};

export type LoginRes = {
  msg: string;
  currentUser: CurrentUser;
};

export type LoginArgs = {
  email: string;
  password: string;
};
