export interface Category {
  categoryId: number;
  categoryName: string;
  parentId: number;
  slug: string;
  leaf: number;
  var: number;
  image: string;
  child: Category[];
}
