// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Curso = {
  id: number,
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Curso[]>
) {
  const courses: Curso[] = [
    { id: 1, name: "Curos 1 de next.js"},
    { id: 2, name: "Curos 2 de next.js"},
    { id: 3, name: "Curos 3 de next.js"},
    { id: 4, name: "Curos 4 de next.js"},
    { id: 5, name: "Curos 5 de next.js"},
  ]

  res.status(200).json(courses)
}
