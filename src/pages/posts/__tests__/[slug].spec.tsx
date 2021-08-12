import { render, screen } from '@testing-library/react';
import React from 'react';
import Post, { getStaticProps } from '../[slug]';
import { getPrismicClient } from '../../../services/prismic';
import { mocked } from 'ts-jest/utils';

const post = {
  slug: 'test-new-post',
  title: 'Title for new post',
  content: '<p> Post content </p>',
  updatedAt: '25 de dezembro de 2021'
};

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        isFallback: false,
      };
    },
  };
});

jest.mock('../../../services/prismic');

describe('Post Page', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Post post={post} />,
    );

    expect(getByText('Title for new post')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    //Cria a imitação do retorno do prismic
    getPrismicClientMocked.mockReturnValueOnce({

      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'Title for new post' }],
          content: [{ type: 'paragraph', text: '<p> Post content </p>' }],
        },
        last_publication_date: '12-25-2021',
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: 'test-new-post' }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: post,
        },
        revalidate: 43200
      }),
    );

  });
});
