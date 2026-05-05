import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://bodyrecompositioncalculator.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const pagesDirectory = path.join(process.cwd(), "/app/(site)");
  const paths: string[] = [];

  function readPagesDirectory(directory: string) {
    fs.readdirSync(directory).forEach((file) => {
      const absolutePath = path.join(directory, file);
      const stat = fs.statSync(absolutePath);
      if (stat.isDirectory()) {
        readPagesDirectory(absolutePath);
      } else {
        if (
          absolutePath.endsWith("page.tsx") &&
          !absolutePath.includes("/api/") &&
          !absolutePath.includes("/layout/") &&
          !absolutePath.includes("[...not-found]")
        ) {
          const route = absolutePath
            .replace(pagesDirectory, "")
            .replace(/\\/g, "/")
            .replace(/\/index\.tsx$/, "")
            .replace(/\/page.tsx$/, "");
          paths.push(`${BASE_URL}${route}`);
        }
      }
    });
  }

  readPagesDirectory(pagesDirectory);

  return paths.map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }));
}
