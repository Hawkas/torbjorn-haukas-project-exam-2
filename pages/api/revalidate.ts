import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Chcek for the POST request
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Invalid HTTP method. Only POST requests are allowed' });
  }
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  // Check that the body is not empty
  const { body } = req;
  if (!body) {
    return res.status(400).send('Bad request (no body)');
  }
  // Get the slug to revalidate from body
  const { itemToRevalidate } = body;
  if (itemToRevalidate) {
    await res.unstable_revalidate(`/accommodations/${itemToRevalidate}`);
    return res.json({ revalidated: true });
  }
  try {
    await res.unstable_revalidate('/path-to-revalidate');
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
