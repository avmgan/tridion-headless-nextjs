// types/navigation-types.ts
export interface NavigationData {
    items?: Array<{
      title: string;
      url: string;
      visible?: boolean;
      alternateText?: string;
      // Add other fields from your API response as needed
    }>;
  }