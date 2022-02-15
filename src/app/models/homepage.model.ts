export interface HomepageRes {
  success: boolean;
  data: Homepage[];
  message: string;
}

export interface Homepage {
  id: number;
  sectionType: string;
  sectionTitle: string;
  sectionIcon: string;
  bgColor: string;
  order: number;
  isActive: number;
  created_at: string;
  updated_at: string;
  sectioncontent: SectionContent[];
}

export interface SectionContent {
  id: number;
  homepageSectionId: string;
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
  width: number;
  height: number;
  content: string;
  created_at: string;
  updated_at: string;
}
