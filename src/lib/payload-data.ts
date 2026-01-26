import { getPayload } from "payload";
import configPromise from "@payload-config";
import type {
  Homepage,
  ClubInfo,
  Instructor,
  TrainingProgram,
  NewsArticle,
  Facility,
  Background,
} from "@/lib/data";

let cachedPayload: any = null;

async function getPayloadClient() {
  if (cachedPayload) return cachedPayload;
  cachedPayload = await getPayload({ config: configPromise });
  return cachedPayload;
}

// Helper to convert Payload docs to expected format
function convertInstructor(doc: any): Instructor {
  return {
    _id: String(doc.id),
    name: doc.name,
    slug: { current: String(doc.id) },
    title: doc.title,
    beltLevel: doc.beltLevel,
    profileImage: doc.profileImage
      ? {
          url:
            typeof doc.profileImage === "object"
              ? doc.profileImage.url
              : doc.profileImage,
          alt:
            typeof doc.profileImage === "object"
              ? doc.profileImage.alt
              : doc.name,
        }
      : undefined,
    bio: doc.bio ? [doc.bio] : [],
    email: doc.email,
    phone: doc.phone,
    order: doc.order,
  };
}

export async function getHomepage(): Promise<Homepage | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "homepage",
      limit: 1,
    });

    if (result.docs.length === 0) return null;

    const doc = result.docs[0];
    return {
      _id: String(doc.id),
      title: doc.title,
      heroSection: doc.heroSection,
      whyTrainWithUs: doc.whyTrainWithUs,
      whatIsGrappling: {
        ...doc.whatIsGrappling,
        content: [doc.whatIsGrappling.content],
      },
      newsSection: doc.newsSection,
    };
  } catch (error) {
    console.error("Error fetching homepage:", error);
    return null;
  }
}

export async function getClubInfo(): Promise<ClubInfo | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "club-info",
      limit: 1,
    });

    if (result.docs.length === 0) return null;

    const doc = result.docs[0];
    return {
      _id: String(doc.id),
      title: doc.title,
      story: [doc.story],
      mission: doc.mission,
      values: doc.values,
      contactInfo: doc.contactInfo,
      location: doc.location,
    };
  } catch (error) {
    console.error("Error fetching club info:", error);
    return null;
  }
}

export async function getInstructors(): Promise<Instructor[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "instructors",
      sort: "order",
      limit: 100,
    });

    return result.docs.map(convertInstructor);
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return [];
  }
}

export async function getInstructor(slug: string): Promise<Instructor | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "instructors",
      where: {
        id: {
          equals: slug,
        },
      },
      limit: 1,
    });

    if (result.docs.length === 0) return null;
    return convertInstructor(result.docs[0]);
  } catch (error) {
    console.error("Error fetching instructor:", error);
    return null;
  }
}

export async function getTrainingPrograms(): Promise<TrainingProgram[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "training-programs",
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: "order",
      limit: 100,
    });

    return result.docs.map((doc: any) => ({
      _id: String(doc.id),
      name: doc.name,
      slug: { current: String(doc.id) },
      description: [doc.description],
      level: doc.level,
      ageGroup: doc.ageGroup,
      schedule: doc.schedule.map((s: any) => ({
        day: s.day,
        startTime: s.startTime,
        endTime: s.endTime,
        instructor: s.instructor
          ? {
              name:
                typeof s.instructor === "object"
                  ? s.instructor.name
                  : "Unknown",
              slug: {
                current:
                  typeof s.instructor === "object"
                    ? s.instructor.id
                    : s.instructor,
              },
            }
          : undefined,
      })),
      isActive: doc.isActive,
      order: doc.order,
    }));
  } catch (error) {
    console.error("Error fetching training programs:", error);
    return [];
  }
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "news",
      where: {
        status: {
          equals: "published",
        },
      },
      sort: "-publishedAt",
      limit: 100,
    });

    return result.docs.map((doc: any) => ({
      _id: String(doc.id),
      title: doc.title,
      slug: { current: doc.slug },
      author: {
        name: typeof doc.author === "object" ? doc.author.name : "Unknown",
        slug: {
          current: typeof doc.author === "object" ? doc.author.id : doc.author,
        },
      },
      publishedAt: doc.publishedAt,
      featuredImage: doc.featuredImage
        ? {
            url:
              typeof doc.featuredImage === "object"
                ? doc.featuredImage.url
                : doc.featuredImage,
            alt:
              typeof doc.featuredImage === "object"
                ? doc.featuredImage.alt
                : doc.title,
          }
        : undefined,
      summary: doc.summary,
      content: [doc.content],
      status: doc.status,
    }));
  } catch (error) {
    console.error("Error fetching news articles:", error);
    return [];
  }
}

export async function getNewsArticle(
  slug: string,
): Promise<NewsArticle | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "news",
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: "published",
        },
      },
      limit: 1,
    });

    if (result.docs.length === 0) return null;

    const doc = result.docs[0];
    return {
      _id: String(doc.id),
      title: doc.title,
      slug: { current: doc.slug },
      author: {
        name: typeof doc.author === "object" ? doc.author.name : "Unknown",
        slug: {
          current: typeof doc.author === "object" ? doc.author.id : doc.author,
        },
      },
      publishedAt: doc.publishedAt,
      featuredImage: doc.featuredImage
        ? {
            url:
              typeof doc.featuredImage === "object"
                ? doc.featuredImage.url
                : doc.featuredImage,
            alt:
              typeof doc.featuredImage === "object"
                ? doc.featuredImage.alt
                : doc.title,
          }
        : undefined,
      summary: doc.summary,
      content: [doc.content],
      status: doc.status,
    };
  } catch (error) {
    console.error("Error fetching news article:", error);
    return null;
  }
}

export async function getFacility(): Promise<Facility | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "facility",
      limit: 1,
    });

    if (result.docs.length === 0) return null;

    const doc = result.docs[0];
    return {
      _id: String(doc.id),
      title: doc.title,
      trainingArea: {
        title: doc.trainingArea.title,
        subtitle: doc.trainingArea.subtitle,
        image: doc.trainingArea.image
          ? {
              url:
                typeof doc.trainingArea.image === "object"
                  ? doc.trainingArea.image.url
                  : doc.trainingArea.image,
              alt:
                typeof doc.trainingArea.image === "object"
                  ? doc.trainingArea.image.alt
                  : doc.trainingArea.title,
            }
          : undefined,
      },
      opportunities: {
        title: doc.opportunities.title,
        description: [doc.opportunities.description],
      },
    };
  } catch (error) {
    console.error("Error fetching facility:", error);
    return null;
  }
}

export async function getBackground(): Promise<Background | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "background",
      limit: 1,
    });

    if (result.docs.length === 0) return null;

    const doc = result.docs[0];
    return {
      _id: String(doc.id),
      title: doc.title,
      backgroundImage: doc.backgroundImage
        ? {
            url:
              typeof doc.backgroundImage === "object"
                ? doc.backgroundImage.url
                : doc.backgroundImage,
            alt:
              typeof doc.backgroundImage === "object"
                ? doc.backgroundImage.alt
                : "Background",
          }
        : undefined,
      overlayOpacity: doc.overlayOpacity,
      overlayColor: doc.overlayColor,
    };
  } catch (error) {
    console.error("Error fetching background:", error);
    return null;
  }
}

// Export types
export type {
  Homepage,
  ClubInfo,
  Instructor,
  TrainingProgram,
  NewsArticle,
  Facility,
  Background,
};
