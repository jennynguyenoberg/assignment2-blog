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

export const addPost = async (_, { arg: newPost }) => {
  //Handle add post here
  const { data, error, status } = await supabase
    .from("posts")
    .insert(newPost)
    .select()
    .single();

  return { data, error, status };
};

export const removePost = async (_, { arg: deletedPost }) => {
  //Handle remove post here
  const { data, error, status } = await supabase
    .from("posts")
    .delete(deletedPost)
    .eq("id", deletedPost.id)
    .select()
    .single();

  return { data, error, status };
};

export const editPost = async (_, { arg: updatedPost }) => {
    //Handle edit post here
  const { data, error, status } = await supabase
    .from("posts")
    .update(updatedPost)
    .eq("id", updatedPost.id)
    .select()
    .single();

  return { data, error, status };
};