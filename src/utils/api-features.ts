import { QueryObjectDto } from 'src/common/dto/query.dto';

export class ApiFeatures<T> {
  page: number;
  limit: number;
  order: any;
  fields: any;
  filter: any;
  populate: any;
  // order: FindOptionsOrder<T>;
  // fields: FindOptionsSelect<T> = {};
  // filter: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  // populate: FindOptionsRelations<T> = {};
  loadRelationIds: boolean = true;

  constructor(
    private repo: any,
    private query: QueryObjectDto,
  ) {
    this.#normalizeQuery();
  }

  async #normalizeQuery() {
    const { fields, populate, filter, limit, order, page } = this.query;

    if (fields) {
      this.fields = (fields as string[]).reduce(
        (acc: Record<string, boolean>, field: string) => {
          acc[field] = true;
          return acc;
        },
        {},
      );
      // ) as FindOptionsSelect<T>;
    }

    if (populate) {
      this.loadRelationIds = false;
      for (const [key, val] of Object.entries(populate)) {
        if (val === true) {
          this.populate[key] = true;
          continue;
        }

        this.fields[key] = (val as string[]).reduce(
          (acc: Record<string, boolean>, field: string) => {
            acc[field] = true;
            return acc;
          },
          {},
        );
        this.populate[key] = true;
      }
    }

    if (filter) {
      this.filter = this.query?.filter;
      //  as
      // | FindOptionsWhere<T>
      // | FindOptionsWhere<T>[];
    }

    if (limit) {
      this.limit = this.query?.limit;
    }

    if (page) {
      this.page = (this.query?.page - 1) * this.query?.limit;
    }

    if (order) {
      this.order = this.query?.order;
      // this.order = this.query?.order as FindOptionsOrder<T>;
    }
  }

  async findAll() {
    const [data, totalCount] = await this.repo.findAndCount({
      take: this?.limit,
      skip: this?.page,
      order: this?.order,
      where: this?.filter,
      select: this.fields,
      relations: this?.populate,
      loadRelationIds: this.loadRelationIds,
    });

    return {
      data,
      totalCount,
      page: this.query?.page,
    };
  }
}
