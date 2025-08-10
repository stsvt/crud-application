import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  deleteUserAsync,
  setError,
  setUserToUpdate,
} from "../store/usersSlice";
import type { User } from "../types/user";

type UserItemProps = {
  user: User;
};

function UserItem({ user }: UserItemProps) {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);

  const handleDelete = async function (id: number) {
    if (!id) {
      dispatch(setError("Id not found. Try again!"));
      return;
    }

    if (!confirm("Are you sure you want to delete this user?")) return;

    await dispatch(deleteUserAsync(id));
  };

  const handleDisplayUser = (id: number) => {
    const user = users.find((u) => u.id === id);
    if (!user) {
      dispatch(setError("User not found"));
      alert("User not found");
      return;
    }
    dispatch(setUserToUpdate(user));
  };

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.city}</td>
      <td className="actions">
        <button className="btn" onClick={() => handleDelete(user.id!)}>
          Delete
        </button>
        <button
          className="btn btn--edit"
          onClick={() => handleDisplayUser(user.id!)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}
export default UserItem;
