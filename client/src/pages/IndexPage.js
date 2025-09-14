import React, { useEffect, useState } from "react";
import Post from "../Post";

const fetchUserPosts = (userId) => {
  return fetch(`http://localhost:4000/post?userId=${userId}`)
    .then((response) => response.json())
    .then((posts) => posts);
};

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  // Mock user ID for demonstration (this could be received after user authentication)
  const userId = 'userDoc._id'; // Replace this with your actual logged-in user ID

  useEffect(() => {
    fetchUserPosts(userId).then((userPosts) => {
      setPosts(userPosts);
    });
  }, [userId]);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
    </>
  );
}
