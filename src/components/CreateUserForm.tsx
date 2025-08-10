import {
  clearError,
  createUserAsync,
  resetCurrentUser,
  setCurrentUser,
  setError,
} from "../store/usersSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Error from "./Error";

function CreateUserForm() {
  const dispatch = useAppDispatch();

  const { currentUser, error, isLoading } = useAppSelector(
    (state) => state.users
  );

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      setCurrentUser({ ...currentUser, [e.target.name]: e.target.value })
    );
  };

  const handleSubmit = async function (e: React.FormEvent) {
    e.preventDefault();

    if (!currentUser.username.trim() || !currentUser.city.trim()) {
      dispatch(setError("Please fill in both username and city"));
      return;
    }

    dispatch(clearError());

    const resultAction = await dispatch(createUserAsync(currentUser));

    if (createUserAsync.fulfilled.match(resultAction)) {
      dispatch(resetCurrentUser());
    }
  };

  return (
    <div className="form-section create-section">
      <form className="form-row" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Enter a username</label>
          <input
            id="username"
            name="username"
            value={currentUser.username}
            onChange={handleChange}
            type="text"
            placeholder="Username.."
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">Enter a city</label>
          <input
            id="city"
            name="city"
            value={currentUser.city}
            onChange={handleChange}
            type="text"
            placeholder="City.."
          />
        </div>

        {error && <Error>{error}</Error>}

        <button className="btn" type="submit">
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}

export default CreateUserForm;
