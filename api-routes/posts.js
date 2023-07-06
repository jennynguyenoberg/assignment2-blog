import { supabase } from "../lib/supabaseClient";
export const postsCacheKey = "/api/blogs";

export const getPosts = async () => {
  //Handle get all posts
  const { data, error, status } = await supabase.from("posts")
    .select();
  return { data, error, status };
};

export const getPost = async({ slug }) => {
  //Handle add post here
  const { data, error, status } = await supabase
    .from("posts")
    .select("*")
    .single()
    .eq("slug", slug);
  
  return { data, error, status };
};

export const addPost = async (_, { arg: post }) => {
  //Handle add post here
  const { error, status } = await supabase.from("posts").insert({ post });

  return { error, status };
};

export const removePost = async (_, { arg: id }) => {
  //Handle remove post here
  const { error, status } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  return { error, status };
};

export const editPost = async (_, { arg }) => {
  //Handle edit post here
  const { id, name } = arg;

  const { error, status } = await supabase
    .from("posts")
    .update({ id, name })
    .eq("id", id);

  return { error, status };
};
