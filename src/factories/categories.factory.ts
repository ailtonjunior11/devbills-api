import { CategoryModel } from '../database/schemas/category.schema';
import { CategoriesService } from '../services/categories.service';
import { CategoriesRepository } from './../database/repositories/categories.repository';

export class CategoriesFactory {
  private static CategoriesService: CategoriesService;

  static getServiceInstance() {
    if (this.CategoriesService) {
      return this.CategoriesService;
    }

    const repository = new CategoriesRepository(CategoryModel);
    const service = new CategoriesService(repository);

    this.CategoriesService = service;

    return service;
  }
}
