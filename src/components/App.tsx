import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchUsers } from "../store/usersSlice";

import Error from "./Error";
import Spinner from "./Spinner";
import Heading from "./Heading";
import Main from "./Main";
import CreateUserForm from "./CreateUserForm";
import UpdateUserForm from "./UpdateUserForm";
import Table from "./Table";

function App() {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <Main>
      <div className="form-container">
        <CreateUserForm />
        <UpdateUserForm />
      </div>

      {error ? (
        <Error>Error: {error}</Error>
      ) : users.length > 0 ? (
        <Table />
      ) : (
        <Heading>Add new user to start</Heading>
      )}
    </Main>
  );
}

export default App;
