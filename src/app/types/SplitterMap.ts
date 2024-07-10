import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export interface SplitterMap {
    [key: string]: RecursiveCharacterTextSplitter
}