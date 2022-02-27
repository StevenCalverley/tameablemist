import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function postController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case 'POST':
      try {
        const view = await prisma.post.update({
          where: {
            id: parseInt(id as string)
          },
          data: {
            likes: {
              increment: 1
            }
          }
        });

        if (view) {
          return res.status(200).json(view);
        }
        return res.status(404).json({ message: 'Post not found' });
      } catch (e) {
        console.error('Request error', e);
        return res.status(500).json({ error: 'Error fetching posts' });
      }
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
