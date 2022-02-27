import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function postController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case 'GET':
      try {
        const post = await prisma.post.findUnique({
          where: {
            id: parseInt(id as string)
          }
        });
        if (post) {
          return res.status(200).json(post);
        }
        return res.status(404).json({ message: 'Post not found' });
      } catch (e) {
        console.error('Request error', e);
        return res.status(500).json({ error: 'Error fetching posts' });
      }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
