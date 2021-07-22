import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
}

interface PostProps {
  posts: Post[];
}

export default function Posts({ posts }: PostProps) {
  //export default function Posts() {
  //CSR
  // Os dados são montados no cliente através do jsvascript
  /*const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch('http://localhost:3333/posts').then(response => {
      response.json().then(data => {
        setPosts(data);
      });
    });
  }, []);*/

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

//SSR
// Os dados são montados no servidor através do jsvascript
//O node executa esse componente por primeiro
/*export const getServerSideProps: GetServerSideProps<PostProps> = async () => {
  const response = await fetch('http://localhost:3333/posts');
  const posts = await response.json();

  return {
    props: { posts }, // will be passed to the page component as props
  }
}*/

// A pagina é gerada no build já com todos os dados carregados
export const getStaticProps: GetServerSideProps<PostProps> = async () => {
  const response = await fetch('http://localhost:3333/posts');
  const posts = await response.json();

  return {
    props: { posts }, // will be passed to the page component as props
  }
}