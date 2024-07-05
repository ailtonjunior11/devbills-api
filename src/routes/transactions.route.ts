import { Router } from 'express';

import { ParamsType, validator } from '../middleware/validator.middleware';
import { createTransactionSchema } from '../dtos/transactions.dto';
import { TransactionsController } from '../controllers/transactions.controller';
import { TransactionsFactory } from '../factories/transactions.factory';

export const transactionsRoutes = Router();

const controller = new TransactionsController(
  TransactionsFactory.getServiceInstance(),
);

transactionsRoutes.post(
  '/',
  validator({
    schema: createTransactionSchema,
    type: ParamsType.BODY,
  }),
  controller.create,
);

transactionsRoutes.get('/', controller.index);
