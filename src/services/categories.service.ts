import { CreateCategoryDTO } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';
import { CategoriesRepository } from './../database/repositories/categories.repository';

export class CategoriesService {
  constructor(private CategoriesRepository: CategoriesRepository) {}

  async create({ title, color }: CreateCategoryDTO): Promise<Category> {
    const category = new Category({
      title,
      color,
    });

    const createdCategory = await this.CategoriesRepository.create(category);

    return createdCategory;
  }
}
