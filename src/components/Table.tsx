import { useAppSelector } from "../hooks/redux";
import type { User } from "../types/user";
import UserItem from "./UserItem";

function Table() {
  const { users } = useAppSelector((state) => state.users);

  return (
    <table>
      <caption>Users Data</caption>
      <thead>
        <tr>
          <th>Id</th>
          <th>Username</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: User) => (
          <UserItem user={user} key={user.id} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
