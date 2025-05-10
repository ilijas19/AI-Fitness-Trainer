export type CurrentUser = {
  userId: string;
  username: string;
  email: string;
  role: "admin" | "user";
};
