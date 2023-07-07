import { supabase } from "../lib/supabaseClient";
import { uploadImage } from "../utils/uploadImage";
export const postsCacheKey = "/api/blogs";

export const getPosts = async () => {
  //Handle get all posts
  const { data, error, status } = await supabase.from("posts")
    .select();
  
  return { data, error, status };
};

export const getPost = async({ slug }) => {
  const { data, error, status } = await supabase
  .from("posts")
  .select("*")
  .single()
  .eq("slug", slug);
  
  return { data, error, status };
};

export const addPost = async (_, { arg: newPost }) => {
  //Handle add post here
  let image = "";

  if (newPost?.image) {
    const { publicUrl, error } = await uploadImage(newPost?.image);

    if (!error) {
      image = publicUrl;
    }
  }

  const { data, error, status } = await supabase
    .from("posts")
    .insert({ ...newPost, image })
    .select()
    .single();

  return { data, error, status };
};

export const removePost = async (_, { arg: deletedPost }) => {
  //Handle remove post here
  const { data, error, status } = await supabase
    .from("posts")
    .delete()
    .eq("id", deletedPost);

  return { error, status, data };
};

export const editPost = async (_, { arg: updatedPost }) => {
  //Handle remove post here
  let image = updatedPost?.image ?? "";

  const isNewImage = typeof image === "object" && image !== null;

  if (isNewImage) {
    const { publicUrl, error } = await uploadImage(updatedPost?.image);

    if (!error) {
      image = publicUrl;
    }
  }

  const { data, error, status } = await supabase
    .from("posts")
    .update({ ...updatedPost, image })
    .eq("id", updatedPost.id)
    .select()
    .single();

  return { data, error, status };
};