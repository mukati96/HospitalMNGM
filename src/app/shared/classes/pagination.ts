export class Pagination {
  private currentPage: number = 1;
  private pageSize: number = 10;
  private count!: number;

  constructor() {
  }

  set totalRecords(value: number) {
    this.count = value;
  }

  set page(page: number) {
    this.currentPage = page;
  }

  set limit(size: number) {
    this.pageSize = size;
  }

  get size() {
    return this.pageSize;
  }

  get totalRecords() {
    return this.count;
  }

  get page() {
    return this.currentPage;
  }

  incrementPage() {
    this.currentPage += 1;
  }

  resetPagination() {
    this.currentPage = 1;
    this.pageSize = 10;
  }

  getPaginationData() {
    return {
      page: this.currentPage,
      size: this.pageSize
    }
  }
}
