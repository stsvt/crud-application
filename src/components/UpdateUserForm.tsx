import { useAppDispatch, useAppSelector } from "../hooks/redux";

import {
  clearError,
  resetUserToUpdate,
  setError,
  setUserToUpdate,
  updateUserAsync,
} from "../store/usersSlice";

import Error from "./Error";

function UpdateUserForm() {
  const dispatch = useAppDispatch();
  const { userToUpdate, error, isLoading } = useAppSelector(
    (state) => state.users
  );

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      setUserToUpdate({ ...userToUpdate, [e.target.name]: e.target.value })
    );
  };

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (userToUpdate.id === undefined) {
      dispatch(setError("User not found"));
      return;
    }

    if (!userToUpdate.username.trim() || !userToUpdate.city.trim()) {
      dispatch(setError("Please fill in both username and city"));
      return;
    }

    dispatch(clearError());

    const resultAction = dispatch(
      updateUserAsync([userToUpdate.id, userToUpdate])
    );

    if (updateUserAsync.fulfilled.match(resultAction)) {
      dispatch(resetUserToUpdate());
    }
  };

  return (
    <div className="form-section update-section">
      <form className="form-row" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="update-username">Update an username</label>
          <input
            id="update-username"
            name="username"
            value={userToUpdate.username}
            onChange={handleChange}
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="update-city">Update a city</label>
          <input
            id="update-city"
            name="city"
            value={userToUpdate.city}
            onChange={handleChange}
            type="text"
          />
        </div>

        {error && <Error>{error}</Error>}

        <button
          disabled={!userToUpdate.id}
          className="btn btn--save"
          type="submit"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default UpdateUserForm;
