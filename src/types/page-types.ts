export interface ComponentTemplate {
  id: string | null;
  title: string | null;
  view: string;
}

export interface Component {
  id: string;
  itemId: string;
  title: string;
  path: string;
  schemaId: string;
  publicationId: number;
  componentTemplate: ComponentTemplate;
  content: any;
  [key: string]: any;
}

export interface PageResponse {
  id: string;
  itemId: string;
  locale: string;
  path: string;
  publicationId: number;
  url: string;
  title: string;
  pageTemplate: {
    id: string;
    title: string | null;
    view: string;
  };
  regions: {
    title: string;
    components: Component[];
  }[];
  components: Component[];
  headerRegions: {
    title: string;
    components: Component[];
  }[];
  footerRegions: {
    title: string;
    components: Component[];
  }[];
  [key: string]: any;
}