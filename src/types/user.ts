export type User = {
  id?: number;
  username: string;
  city: string;
};

export type UsersState = {
  users: User[];
  currentUser: User;
  userToUpdate: User;
  isLoading: boolean;
  error: string | null;
};
