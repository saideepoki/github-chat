import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { SupportedLanguage } from "../types/Language";
import { getSplitter } from "./getSplitter";

export async function processGithubRepo(repoUrl: string) {
  console.log(`Processing ${repoUrl}`);
  const loader = new GithubRepoLoader(
    repoUrl,
    {
      accessToken: process.env.GITHUB_ACCESS_TOKEN,
      branch: "main",
      recursive: true,
      processSubmodules: true,
      unknown: "warn",
      maxConcurrency: 10, // Defaults to 2
    }
  );
  const docs = []
  for await (const doc of loader.loadAsStream()) {
    docs.push(doc);
  }

  const splitDocsPromises = docs.map(async (doc) => {
    const fileExtension = doc.metadata.source.split('.').pop().toLowerCase();
    const splitter = getSplitter(fileExtension);
    return splitter.splitDocuments([doc]);
});

  // Wait for all splitting processes to finish
  const splitDocsArray = await Promise.all(splitDocsPromises);
  const splitDocs = splitDocsArray.flat();

  return splitDocs;
}