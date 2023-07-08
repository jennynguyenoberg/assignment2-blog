import { supabase } from "../lib/supabaseClient";
export const commentsCacheKey = "/api/blogs";

export const getComments = async ({ postId }) => {
  //Handle get all comments
  const { data, error, status } = await supabase
    .from("comments")
    .select("*") //fetch all comments
    .eq("post_id", postId);
  
  return { data, error, status };
};

export const addComment = async (_, { arg: newComment }) => {
  //Handle add comment here
  const { data, error, status } = await supabase
    .from("comments")
    .insert(newComment)
    .eq("post_id", newComment.postId)
    .single();
  
  return { data, error, status }; 
};

export const removeComment = async (_, { arg: id }) => {
  //Handle remove comment here
  const { data, error, status } = await supabase
    .from("comments")
    .delete()
    .eq("id", id);

  return { data, error, status }
};