import Prismic from '@prismicio/client';

var apiEndpoint = String(process.env.PRIMSIC_ENDPOINT);
var apiToken = String(process.env.PRIMSIC_ACCESS_TOKEN);;

export function getPrismicClient(req?: unknown){
    return Prismic.client(apiEndpoint, {
      accessToken: apiToken,
      req: req
    });
  }
