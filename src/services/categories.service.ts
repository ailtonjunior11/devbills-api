import { StatusCodes } from 'http-status-codes';
import { CreateCategoryDTO } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';
import { AppError } from '../errors/app.error';
import { CategoriesRepository } from './../database/repositories/categories.repository';

export class CategoriesService {
  constructor(private CategoriesRepository: CategoriesRepository) {}

  async create({ title, color }: CreateCategoryDTO): Promise<Category> {
    const foundCategory = await this.CategoriesRepository.findByTitle(title);

    if (foundCategory) {
      throw new AppError('Category already exists.', StatusCodes.BAD_REQUEST);
    }

    const category = new Category({
      title,
      color,
    });

    const createdCategory = await this.CategoriesRepository.create(category);

    return createdCategory;
  }
}
