import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import { SplitterMap } from "@/app/types/SplitterMap";
import { SupportedLanguage } from "@/app/types/Language";
import { getSplitter } from "@/app/helper/getSplitter";
import { NextRequest } from "next/server";
import { processGithubRepo } from "@/app/helper/githubRepoLoader";

export async function POST(req: NextRequest) {
    const { url } = await req.json();
    try {
        const docs = await processGithubRepo(url);
        if(!docs) {
            return Response.json({
                success: false,
                message: "Error processing repo"
            })
        }
        return Response.json({
            success: true,
            message: docs.length
        })

    } catch (error) {
        return Response.json({
            success: false,
            message: "Repo not found"
        })
    }

}