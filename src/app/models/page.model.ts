export interface PageRes{
  success: boolean;
  data: Page;
  message: string;
}

export interface Page {
  id: number;
  pageTitle: string;
  pageDescription: string;
  pageImage: string;
  slug: string;
  content: string;
  isActive: number;
  created_at: string;
  updated_at: string;
}
