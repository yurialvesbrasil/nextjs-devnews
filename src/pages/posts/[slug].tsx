import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import SEO from '../../components/SEO';
import styles from './Post.module.scss';
import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';

interface PostProps {
  post:{
    slug: string | undefined;
    title: string;
    content: any;
    updatedAt: string;
  }
}


export default function Post({ post }: PostProps) {
  const router = useRouter();

  if(router.isFallback){
    return <p className={styles.container} >Loading...</p>
  }

  return (
    <>
      <SEO title="Post"/>
      <main className={styles.container}>
        <article className={styles.posts}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content}} />
        </article>
      </main>
    </>
    )
}


//Aqui o esqueleto da página é criado a cada acesso para não
// ter que criar as páginas dos postes ná hora que está buildando a aplicação
export const getStaticPaths: GetStaticPaths = async () => {
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths: [], fallback: true, }
}


// A pagina é gerada no build já com todos os dados carregados
export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  //Recupera parametros enviados na url
  const slug  = context.params?.slug??'';

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {});

  //console.log(response);
  //Retorna objeto com conteudo já formatado
  const post = {
      slug: String(slug),
      title: RichText.asText(response.data.title),
      content: RichText.asHtml(response.data.content),
      updatedAt: response.last_publication_date ? new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }):'Undefined',
  };

  return {
    props: { post }, // will be passed to the page component as props
    revalidate: 60 * 60 * 12, // 12 horas
  }
}

