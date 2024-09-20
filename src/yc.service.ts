"use server"

import { Document } from "@/model/document"
import { OpenAI } from "openai"
import { PineconeClient } from "pinecone-client"

let pineconeClient: PineconeClient<Document["metadata"]> | null = null
let openaiClient: OpenAI | null = null

const getPineconeClient = (): PineconeClient<Document["metadata"]> => {
  if (!pineconeClient) {
    pineconeClient = new PineconeClient<Document["metadata"]>({
      apiKey: process.env.PINECONE_API_KEY!,
      baseUrl: process.env.PINECONE_BASE_URL!,
      namespace: process.env.PINECONE_INDEX_NAME!,
    })
  }
  return pineconeClient
}

const getOpenAIClient = (): OpenAI => {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    })
  }
  return openaiClient
}

export async function queryPineconeForDocuments(
  query: string,
  topK: number = 5
): Promise<Document[]> {
  "use server"
  const client = getPineconeClient()

  const queryEmbedding = await getQueryEmbedding(query)

  try {
    const queryResponse = await client.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    })

    console.log(`Query: ${query}`)
    console.log(`Top ${topK} results:`)

    if (!queryResponse.matches || queryResponse.matches.length === 0) {
      console.log("No matches found.")
      return []
    }

    const results = queryResponse.matches.map((match) => {
      console.log(`Score: ${match.score?.toFixed(4)}`)
      if (match.metadata) {
        console.log(`Name: ${match.metadata["name"] || "N/A"}`)
      } else {
        console.log("Metadata not available for this match.")
      }
      console.log("---")

      return {
        id: match.id,
        values: [], // Add this line to include the 'values' property
        metadata: match.metadata as Document["metadata"],
        score: match.score || 0,
      }
    })

    return results as Document[]
  } catch (error) {
    console.error("Error querying Pinecone:", error)
    throw error
  }
}

async function getQueryEmbedding(query: string): Promise<number[]> {
  "use server"
  const openai = getOpenAIClient()
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  })
  return response.data[0].embedding
}
