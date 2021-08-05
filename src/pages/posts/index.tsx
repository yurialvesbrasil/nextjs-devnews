import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import SEO from '../../components/SEO';
import { getPrismicClient } from '../../services/prismic';
import styles from './Post.module.scss';
import Post from './[id]';

interface Post {
  slug: string | undefined;
  title: string;
  excerpt: any;
  updateAt: string;
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
    <>
      <SEO title="Posts List"/>
      <main className={styles.container}>
        <div className={styles.posts}>
         {posts.map(post => (
            <Link key={post.slug} href="#">
            <a>
              <time>{post.updateAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          </Link>
         ))}
        </div>
      </main>
    </>
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
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.predicates.at('document.type' , 'post')],
    {
      fetch: ['post.title', 'post.content'],
    }
  );

  //console.log(response);
  //Retorna objeto com conteudo já formatado
  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updateAt: post.last_publication_date ? new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }):'Undefined',
    }
  });

  return {
    props: { posts }, // will be passed to the page component as props
    revalidate: 60 * 60 * 12, // 12 horas
  }
}
