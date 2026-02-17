import { config as dotenvConfig } from "dotenv";
import path from "path";

// Load environment variables FIRST
dotenvConfig({ path: path.resolve(process.cwd(), ".env.local") });

import { getPayload } from "payload";
import configPromise from "@payload-config";

// Helper function to create a richText object with proper Lexical format
function createRichText(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      children: paragraphs.map((text) => ({
        type: "paragraph",
        version: 1,
        children: [
          {
            type: "text",
            version: 1,
            text,
          },
        ],
      })),
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
    },
  };
}

async function seed() {
  // Ensure environment variables are loaded
  if (!process.env.PAYLOAD_SECRET) {
    console.error(
      "❌ Error: PAYLOAD_SECRET not found in environment variables",
    );
    console.log("Make sure .env.local exists with PAYLOAD_SECRET set");
    process.exit(1);
  }

  if (!process.env.MONGODB_URI) {
    console.error("❌ Error: MONGODB_URI not found in environment variables");
    console.log("Make sure .env.local exists with MONGODB_URI set");
    process.exit(1);
  }

  console.log("✅ Environment variables loaded successfully");
  console.log("⏳ Connecting to MongoDB (this may take a moment)...");

  // Add retry logic for MongoDB connection
  let payload;
  let retries = 3;

  while (retries > 0) {
    try {
      payload = await getPayload({ config: configPromise });
      console.log("✅ Connected to MongoDB successfully");
      break;
    } catch (error) {
      retries--;
      if (retries === 0) throw error;
      console.log(
        `⚠️  Connection attempt failed, retrying... (${retries} attempts left)`,
      );
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
    }
  }

  if (!payload) {
    console.error("❌ Failed to connect to MongoDB after multiple attempts");
    process.exit(1);
  }

  console.log("🌱 Starting database seed...");

  try {
    // Create admin user
    console.log("Creating admin user...");
    const adminUser = await payload.create({
      collection: "users",
      data: {
        email: "test@test.no",
        password: "test123!",
        name: "test bruker",
        role: "admin",
      },
    });

    // Create Homepage
    console.log("Creating homepage content...");
    await payload.create({
      collection: "homepage",
      draft: false,
      data: {
        title: "Homepage",
        heroSection: {
          title: "Velkommen til Farsund Grappling",
          scheduleButtonText: "Se Timeplanen",
          memberButtonText: "Bli Medlem",
        },
        whyTrainWithUs: {
          title: "Hvorfor Trene Med Oss?",
          features: [
            {
              icon: "🥋",
              title: "Erfaren Instruktør",
              description:
                "Lær fra en erfaren instruktør, som vil veilede deg gjennom teknikker og konsepter.",
            },
            {
              icon: "👨‍👩‍👧‍👦",
              title: "Støttende Fellesskap",
              description:
                "Bli med i et vennlig og inkluderende miljø hvor alle hjelper hverandre med å bli bedre.",
            },
            {
              icon: "🏆",
              title: "Alle Ferdighetsnivåer",
              description:
                "Uansett om du er helt nybegynner eller en erfaren utøver, har vi klasser for deg.",
            },
          ],
        },
        whatIsGrappling: {
          title: "🤼‍♂️ Hva er Grappling?",
          content: createRichText([
            "Grappling er en fellesnevner for kampsporter som er grepsbaserte (BJJ / judo / bryting / submission wrestling), i motsetning til de som benytter slag og spark. I stedet brukes teknikker som kast, posisjonering og bakkekontroll – med mål om å avslutte kampen ved hjelp av leddlåser eller kvelinger.",
            'Disse avslutningene kalles submissions, fordi motstanderen må gi seg ("tappe ut") for å unngå skade når teknikken utføres korrekt. (obs: man skader ikke hverandre på trening med vilje)',
          ]),
          ctaButtonText: "Start i Dag",
        },
        newsSection: {
          title: "Siste Nytt",
          viewAllText: "Se Alle",
          readMoreText: "Les Mer",
        },
      },
    });

    // Create Club Info
    console.log("Creating club info...");
    await payload.create({
      collection: "club-info",
      draft: false,
      data: {
        title: "Farsund Grappling",
        story: createRichText([
          "Farsund grappling holder til på Løft gym i Vanse, Farsund. Foreløpig er Farsund Grappling ikke en klubb eller idrettslag, men heller et lokalt tilbud for å trene en kampsport.",
          "Klubben driver ut av Løft Gym i Vanse, hvor vi har tilgang til en dedikert treningsarena for grappling.",
        ]),
        mission: "Submission Wrestling for alle i Farsund",
        contactInfo: {
          email: "kontakt@farsundgrappling.no",
          phone: "+47 123 45 678",
          address: "Løft Gym, Vanse, Farsund",
          socialMedia: {
            facebook: "https://facebook.com/farsundgrappling",
            instagram: "https://instagram.com/farsundgrappling",
          },
        },
        location: {
          title: "Finn Oss",
          mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2108.5045980047676!2d6.68523461338731!3d58.0977731088761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4637670e48fd5c5f%3A0x6a0f1ae6adc229b4!2zTMOYRlQgR3lt!5e0!3m2!1sno!2sno!4v1769436828046!5m2!1sno!2sno",
          directionsUrl: "https://maps.google.com/?q=Løft+Gym+Vanse",
          findUsTitle: "Hvor vi trener",
          description: "Vi holder til på Løft Gym i Vanse.",
          directionsText: "Få veibeskrivelse",
        },
      },
    });

    // Create Instructor
    console.log("Creating instructor...");
    const instructor = await payload.create({
      collection: "instructors",
      draft: false,
      data: {
        name: "Instruktør Navn",
        title: "Hovedinstruktør",
        beltLevel: "Lilla Belte",
        bio: createRichText([
          "Med over 10 års erfaring innen grappling og Brazilian Jiu-Jitsu, brenner jeg for å dele kunnskapen min med andre. Jeg tror på å skape et trygt og støttende miljø hvor alle kan utvikle seg i sitt eget tempo.",
        ]),
        email: "instruktor@farsundgrappling.no",
        phone: "+47 987 65 432",
        order: 1,
      },
    });

    // Create Training Programs
    console.log("Creating training programs...");
    await payload.create({
      collection: "training-programs",
      draft: false,
      data: {
        name: "Voksne Nybegynner",
        description: createRichText([
          "Perfekt for deg som er helt ny til grappling. Vi starter med grunnleggende teknikker og posisjonering.",
        ]),
        level: "beginner",
        ageGroup: "adults",
        schedule: [
          {
            day: "Mandag",
            startTime: "18:00",
            endTime: "19:30",
            instructor: instructor.id,
          },
          {
            day: "Onsdag",
            startTime: "18:00",
            endTime: "19:30",
            instructor: instructor.id,
          },
        ],
        isActive: true,
        order: 1,
      },
    });

    await payload.create({
      collection: "training-programs",
      draft: false,
      data: {
        name: "Alle Nivåer",
        description: createRichText([
          "Åpen trening for alle ferdighetsnivåer. Her kan du trene teknikk og sparring i ditt eget tempo.",
        ]),
        level: "all",
        ageGroup: "adults",
        schedule: [
          {
            day: "Fredag",
            startTime: "18:00",
            endTime: "19:30",
            instructor: instructor.id,
          },
        ],
        isActive: true,
        order: 2,
      },
    });

    await payload.create({
      collection: "training-programs",
      draft: false,
      data: {
        name: "Open Mat",
        description: createRichText([
          "Fri trening hvor medlemmer kan trene sammen uten strukturert undervisning. Perfekt for sparring og å jobbe på egne teknikker.",
        ]),
        level: "all",
        ageGroup: "adults",
        schedule: [
          {
            day: "Lørdag",
            startTime: "11:00",
            endTime: "13:00",
          },
        ],
        isActive: true,
        order: 3,
      },
    });

    // Create News Articles
    console.log("Creating news articles...");
    await payload.create({
      collection: "news",
      draft: false,
      data: {
        title: "Velkommen til Farsund Grappling!",
        slug: "velkommen-til-farsund-grappling",
        author: adminUser.id,
        publishedAt: "2024-01-15T10:00:00Z",
        summary:
          "Vi er glade for å kunngjøre starten av Farsund Grappling - din nye treningsarena for grappling i Farsund!",
        content: createRichText([
          "Vi er stolte av å presentere Farsund Grappling, klubben som vil tilby kvalitetstrening i grappling for alle i Farsund-området.",
        ]),
        status: "published",
      },
    });

    await payload.create({
      collection: "news",
      draft: false,
      data: {
        title: "Nye Begynnerkurs Starter Snart",
        slug: "nye-begynnerkurs-starter-snart",
        author: adminUser.id,
        publishedAt: "2024-02-01T12:00:00Z",
        summary:
          "Perfekt timing for å komme i gang med grappling! Våre begynnerkurs starter i mars.",
        content: createRichText([
          "Er du nybegynner og lurer på hvordan du kommer i gang? Våre spesialdesignede begynnerkurs starter i mars og er perfekte for deg som aldri har prøvd grappling før.",
        ]),
        status: "published",
      },
    });

    await payload.create({
      collection: "news",
      draft: false,
      data: {
        title: "Treningsutstyr og Anbefalinger",
        slug: "treningsutstyr-og-anbefalinger",
        author: adminUser.id,
        publishedAt: "2024-03-10T14:00:00Z",
        summary:
          "Hva trenger du for å komme i gang med grappling? Her er våre anbefalinger for treningsutstyr.",
        content: createRichText([
          "For å komme i gang trenger du bare komfortable klær. Etter hvert vil du kanskje investere i en gi (kimono) eller rashguard, men det er ingen krav når du starter.",
        ]),
        status: "published",
      },
    });

    // Create Background
    console.log("Creating background settings...");
    await payload.create({
      collection: "background",
      data: {
        title: "Background Settings",
      },
    });

    console.log("✅ Seed completed successfully!");
    console.log("\n📧 Admin Login:");
    console.log("Email: test@test.no");
    console.log("Password: test123!");
    console.log("\n🌐 Access the CMS at: http://localhost:3000/admin");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
