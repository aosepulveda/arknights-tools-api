import { Router } from 'express';
import isEmpty from 'lodash/isEmpty';
import {
  findAllOperators,
  findOperator,
  findBuffsByOperator,
} from '../controllers/operator.controller';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { locale = 'en', showBuffs = false } = req.query;
    const operators = await findAllOperators(locale, showBuffs);
    return res.status(200).send(operators);
  } catch (error) {
    return res.status(500).json({
      message: 'something really bad happens',
      error: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { locale = 'en' } = req.query;
    const operator = await findOperator(id, locale);
    if (isEmpty(operator)) {
      return res.status(404).json({
        message: `operator ${id} not found`,
      });
    }
    return res.status(200).send(operator);
  } catch (error) {
    return res.status(500).json({
      message: 'something really bad happens',
      error: error.message,
    });
  }
});

router.get('/:id/buffs', async (req, res) => {
  try {
    const { id } = req.params;
    const { locale = 'en' } = req.query;
    const operator = await findBuffsByOperator(id, locale);
    if (isEmpty(operator)) {
      return res.status(404).json({
        message: `operator ${id} buffs not found`,
      });
    }
    return res.send(operator);
  } catch (error) {
    return res.status(500).json({
      message: 'something really bad happens',
      error: error.message,
    });
  }
});

export default router;
