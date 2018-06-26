export class Pagination {
  constructor(
    public total: number,
    public count: number,
    public per_page: number,
    public current_page: number,
    public total_pages: number
  ) { }
}
