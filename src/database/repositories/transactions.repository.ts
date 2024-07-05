import {
  CreateTransactionDTO,
  indexTransactionsDTO,
} from '../../dtos/transactions.dto';
import { Transaction } from '../../entities/transactions.entity';
import { TransactionModel } from '../schemas/transactions.schema';

export class TransactionsRepository {
  constructor(private model: typeof TransactionModel) {}

  async create({
    title,
    date,
    amount,
    type,
    category,
  }: Transaction): Promise<Transaction> {
    const ceratedTransaction = await this.model.create({
      title,
      date,
      amount,
      type,
      category,
    });

    return ceratedTransaction.toObject<Transaction>();
  }

  async index({
    title,
    categoryId,
    beginDate,
    endDate,
  }: indexTransactionsDTO): Promise<Transaction[]> {
    const whereParams: Record<string, unknown> = {
      ...(title && { title: { $regex: title, $options: 'i' } }),
      ...(categoryId && { 'category._id': categoryId }),
    };

    if (beginDate || endDate) {
      whereParams.date = {
        ...(beginDate && { $gte: beginDate }),
        ...(endDate && { $lte: endDate }),
      };
    }

    const transactions = await this.model.find(whereParams);

    const transactionMap = transactions.map((item) =>
      item.toObject<Transaction>(),
    );

    return transactionMap;
  }
}
