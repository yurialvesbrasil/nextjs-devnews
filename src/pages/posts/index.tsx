import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
}

export default function Posts() {
 
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/posts').then(response => {
      response.json().then(data => {
        setPosts(data);
      });
    });
  }, []);

  return (
    <div>
      <h1>Posts List</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>      
    </div>
  )
}
