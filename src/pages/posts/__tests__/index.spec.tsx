import { render, screen } from '@testing-library/react';
import React from 'react';
import Posts, { getStaticProps } from '..';
import { getPrismicClient } from '../../../services/prismic';
import { mocked } from 'ts-jest/utils';

const posts = [
  {
    slug: 'test-new-post',
    title: 'Title for new post',
    excerpt: 'Post excerpt',
    updatedAt: '25 de dezembro de 2021'
  },
];

interface ResolvedPostMocked {
  uid: string,
  data: {
    title: [
      { type: string, text: string }
    ],
    content: [
      { type: string, text: string }
    ]
  },
  last_publication: string,
};

jest.mock('../../../services/prismic');

describe('Posts Page', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText } = render(
      <Posts posts={posts} />,
    );

    expect(getByText('Title for new post')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    //Cria a imitação do retorno do prismic
    getPrismicClientMocked.mockReturnValueOnce({

      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'test-new-post',
            data: {
              title: [{ type: 'heading', text: 'Title for new post' }],
              content: [{ type: 'paragraph', text: 'Post excerpt' }],
            },
            last_publication_date: '12-25-2021',
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({} as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: posts,
        },
      }),
    );

  });
});
