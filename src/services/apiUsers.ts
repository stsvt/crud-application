import type { User } from "../types/user.ts";
import supabase from "./supabase.ts";

export async function getUsers() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    throw new Error("Something went wrong with fetching users");
  }

  return data;
}

export async function createUser(user: User): Promise<User> {
  const { username, city } = user;

  const { data, error } = await supabase
    .from("users")
    .insert([{ username, city }])
    .select();

  if (error) {
    throw new Error("Something went wrong with creating user");
  }

  return data[0];
}

export async function deleteUser(id: number): Promise<void> {
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) {
    throw new Error("Something went wrong with deleting user");
  }
}

export async function updateUser(id: number, user: User) {
  const { username, city } = user;

  const { data, error } = await supabase
    .from("users")
    .update({ username, city })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Something went wrong with updating user");
  }

  console.log(data);
  return data[0];
}
