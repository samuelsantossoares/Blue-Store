import clientPromise from '../../lib/mongo';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('posts-db');

  if (req.method === 'POST') {
    const post = {
      content: req.body.content,
      createdAt: new Date(),
    };
    await db.collection('posts').insertOne(post);
    return res.status(201).json(post);
  }

  if (req.method === 'GET') {
    const posts = await db.collection('posts').find().sort({ createdAt: -1 }).toArray();
    return res.json(posts);
  }

  res.status(405).end(); // Método não permitido
}
