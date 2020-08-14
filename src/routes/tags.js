import { Router } from 'express';
import {
  findAllTags,
  findOperatorsByGroupOfTags,
} from '../controllers/tag.controller';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { locale = 'en' } = req.query;
    const tags = await findAllTags(locale);
    return res.send(tags);
  } catch (error) {
    return res.status(500).json({
      message: 'something really bad happens',
      error: error.message,
    });
  }
});

router.post('/recruitment', async (req, res) => {
  try {
    const { locale = 'en' } = req.query;
    const { tags } = req.body;
    const recruitment = await findOperatorsByGroupOfTags(locale, tags);
    return res.status(200).send(recruitment);
  } catch (error) {
    return res.status(500).json({
      message: 'something really bad happens',
      error: error.message,
    });
  }
});

export default router;
