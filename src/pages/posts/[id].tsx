import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import SEO from '../../components/SEO';

interface Comment {
  id: string;
  body: string;
}
interface CommentsProps {
  comments: Comment[];
}


export default function Post({ comments }: CommentsProps) {
  const router = useRouter();

  if(router.isFallback){
    return <p>Loading...</p>
  }

  return (
    <>
      <SEO title="Comments of Post" />
      <h1>Comments of Post {router.query.id}</h1>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  /*const res = await fetch('http://localhost:3333/posts');
  const posts = await res.json()

  const paths = posts.map(post => ({
    params: { id: String(post.id) },
  }))*/

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths: [], fallback: true, }
}


// A pagina é gerada no build já com todos os dados carregados
export const getStaticProps: GetStaticProps<CommentsProps> = async (context) => {

  const response = await fetch(`http://localhost:3333/comments?postId=${context.params?.id}`);
  const comments = await response.json();

  return {
    props: { comments }, // will be passed to the page component as props
    revalidate: 1, // In seconds -> gera a página novamento após esse períudo
  }
}

