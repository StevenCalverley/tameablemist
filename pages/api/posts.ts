import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function postController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error fetching posts' });
      }
      break;
    case 'POST':
      try {
        const { title, content, excerpt } = req.body;

        const newPost = await prisma.post.create({
          data: {
            title,
            content,
            excerpt
          }
        });
        res.status(201).json({ ...newPost });
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error creating post' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
