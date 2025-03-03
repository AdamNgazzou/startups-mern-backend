import dbConnect from '@/lib/dbConnect';
import { getAuthors, getAuthor, getAuthorgithub, createAuthor, updateAuthor, deleteAuthor } from '../backend/controllers/';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        return getAuthor(req, res);
      } else if (req.query.github_id) {
        return getAuthorgithub(req, res);
      } else {
        return getAuthors(req, res);
      }
    case 'POST':
      return createAuthor(req, res);
    case 'PUT':
      return updateAuthor(req, res);
    case 'DELETE':
      return deleteAuthor(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}