import dbConnect from '@/lib/dbConnect';
import { getStartups, getStartup, getStartupsbyAuthor, createStartup, updateStartup, deleteStartup } from '@/app/controllers/startup.controller';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        return getStartup(req, res);
      } else if (req.query.github_id) {
        return getStartupsbyAuthor(req, res);
      } else {
        return getStartups(req, res);
      }
    case 'POST':
      return createStartup(req, res);
    case 'PUT':
      return updateStartup(req, res);
    case 'DELETE':
      return deleteStartup(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}