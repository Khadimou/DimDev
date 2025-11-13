export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  stack: string[];
  deliveryTime?: string;
  client?: string;
  results?: string[];
  url?: string;
  github?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export interface ServiceRequest {
  name: string;
  email: string;
  company: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  projectGoals: string;
  mainFeatures: string;
  timeline: string;
  budget: string;
  referralSource: string;
  additionalInfo: string;
}

export interface NotionProject {
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: {
    Name: { title: Array<{ plain_text: string }> };
    Description: { rich_text: Array<{ plain_text: string }> };
    Tags: { multi_select: Array<{ name: string }> };
    Stack: { multi_select: Array<{ name: string }> };
    Image: { files: Array<{ file?: { url: string }; external?: { url: string } }> };
    Featured: { checkbox: boolean };
    Slug: { rich_text: Array<{ plain_text: string }> };
    Duration: { rich_text: Array<{ plain_text: string }> };
    DeliveryBadge: { rich_text: Array<{ plain_text: string }> };
    Role: { rich_text: Array<{ plain_text: string }> };
    Client: { rich_text: Array<{ plain_text: string }> };
    Results: { rich_text: Array<{ plain_text: string }> };
    LiveURL: { url: string };
    GithubURL: { url: string };
    Status: { select: { name: string } };
  };
}
