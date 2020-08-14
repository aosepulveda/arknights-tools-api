import { Router } from 'express';
import { findAllBuffs, findAllRooms } from '../controllers/building.controller';

const router = Router();

router.get('/buffs', async (req, res) => {
  try {
    const { locale = 'en' } = req.query;
    const buffs = await findAllBuffs(locale);
    return res.send(buffs);
  } catch (error) {
    return res.status(500).json({
      message: 'something really bad happens',
      error: error.message,
    });
  }
});

router.get('/rooms', async (req, res) => {
  try {
    const { locale = 'en' } = req.query;
    const buffs = await findAllRooms(locale);
    return res.send(buffs);
  } catch (error) {
    return res.status(500).json({
      message: 'something really bad happens',
      error: error.message,
    });
  }
});

export default router;
