import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ email, password, fullName }) {
  const { data: currentSession } = await supabase.auth.getSession();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (currentSession) await supabase.auth.setSession(currentSession.session);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { error, data } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar, { upsert: true });

  if (uploadError) throw new Error(uploadError.message);

  const { data: updatedUser, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (avatarError) throw new Error(avatarError.message);

  return updatedUser;
}
