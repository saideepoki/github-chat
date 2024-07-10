import { RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import { SupportedLanguage } from "../types/Language";


export function getSplitter(fileExtension: string) {
    const supportedExtensions: Record<string, SupportedLanguage> = {
        cpp: "cpp",
        go: "go",
        rs: "rust",
        java: "java",
        js: "js",
        ts: "js",
        php: "php",
        proto: "proto",
        py: "python",
        rst: "rst",
        rb: "ruby",
        scala: "scala",
        swift: "swift",
        md: "markdown",
        tex: "latex",
        html: "html",
        htm: "html",
        sol: "sol",
    };

    const language = supportedExtensions[fileExtension];

    if (language) {
        return RecursiveCharacterTextSplitter.fromLanguage(language, {
            chunkSize: 2000,
            chunkOverlap: 200,
        });
    } else {
        // For unsupported languages, use a default splitter
        return new RecursiveCharacterTextSplitter({
            chunkSize: 2000,
            chunkOverlap: 200,
        });
    }
}