import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Could not load cabins data");
  }

  return cabins;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Could not delete cabin");
  }

  return data;
}

export async function createUpdateCabin(newCabin, id) {
  const imgName = `${Math.random()}-${newCabin.image?.name}`.replaceAll("/", "");
  const hasImgPath = newCabin.image?.startsWith?.(supabaseUrl);

  const imgPath = hasImgPath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;

  let query = supabase.from("cabins");

  //create cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imgPath }]);
  }

  //update cabin
  if (id) {
    query = query.update({ ...newCabin, image: imgPath }).eq("id", id);
  }

  console.log(query)

  const { data, error } = await query.select().single();

  console.log(data)

  if (error) {
    console.error(error);
    throw new Error(id ? "Could not update cabin" : "Could not add cabin");
  }

  if (hasImgPath) return data;

  //upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imgName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error(
      "Cabin image could not be uploaded and so cabin was not created"
    );
  }

  return data;
}
