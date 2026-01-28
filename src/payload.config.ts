import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { config as dotenvConfig } from "dotenv";

// Load environment variables
dotenvConfig({ path: path.resolve(process.cwd(), ".env.local") });

// Collections
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Homepage } from "./collections/Homepage";
import { ClubInfo } from "./collections/ClubInfo";
import { Instructors } from "./collections/Instructors";
import { TrainingPrograms } from "./collections/TrainingPrograms";
import { TrainingPage } from "./collections/TrainingPage";
import { News } from "./collections/News";
import { Facility } from "./collections/Facility";
import { Background } from "./collections/Background";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Homepage,
    ClubInfo,
    Instructors,
    TrainingPrograms,
    TrainingPage,
    News,
    Facility,
    Background,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "",
  }),
  sharp,
});
