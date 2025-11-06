import { Client } from "@notionhq/client";
import { NotionProject, Project } from "./types";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID!;

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        status: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Featured",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page: any) => {
      const props = page.properties as NotionProject["properties"];
      
      return {
        slug: props.Slug?.rich_text[0]?.plain_text || "",
        title: props.Name?.title[0]?.plain_text || "",
        description: props.Description?.rich_text[0]?.plain_text || "",
        image: props.Image?.files[0]?.file?.url || props.Image?.files[0]?.external?.url || "",
        tags: props.Tags?.multi_select?.map((tag: any) => tag.name) || [],
        stack: props.Stack?.multi_select?.map((s: any) => s.name) || [],
        featured: props.Featured?.checkbox || false,
        deliveryTime: props.DeliveryBadge?.rich_text[0]?.plain_text || props.Duration?.rich_text[0]?.plain_text || "",
        client: props.Client?.rich_text[0]?.plain_text || "",
        results: props.Results?.rich_text?.map((r: any) => r.plain_text) || [],
        url: props.LiveURL?.url || "",
        github: props.GithubURL?.url || "",
      };
    });
  } catch (error) {
    console.error("Error fetching projects from Notion:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Status",
            status: {
              equals: "Published",
            },
          },
        ],
      },
    });

    if (response.results.length === 0) return null;

    const page: any = response.results[0];
    const props = page.properties as NotionProject["properties"];

    return {
      slug: props.Slug?.rich_text[0]?.plain_text || "",
      title: props.Name?.title[0]?.plain_text || "",
      description: props.Description?.rich_text[0]?.plain_text || "",
      image: props.Image?.files[0]?.file?.url || props.Image?.files[0]?.external?.url || "",
      tags: props.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      stack: props.Stack?.multi_select?.map((s: any) => s.name) || [],
      featured: props.Featured?.checkbox || false,
      deliveryTime: props.DeliveryBadge?.rich_text[0]?.plain_text || props.Duration?.rich_text[0]?.plain_text || "",
      client: props.Client?.rich_text[0]?.plain_text || "",
      results: props.Results?.rich_text?.map((r: any) => r.plain_text) || [],
      url: props.LiveURL?.url || "",
      github: props.GithubURL?.url || "",
    };
  } catch (error) {
    console.error("Error fetching project from Notion:", error);
    return null;
  }
}
