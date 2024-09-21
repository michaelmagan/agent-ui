// This is an example of a service that can be called as
// tool in a a component.

"use server"

// Redefine the Document type to match our data
type Document = {
  id: string;
  values: never[];
  metadata: {
    name: string;
    "one-liner": string;
    batch: string;
    location: string;
    type: string;
    categories: string;
    status: string;
  };
  score: number;
}

// Fake company data
const fakeCompanyData: Document[] = [
  {
    id: "1",
    values: [],
    metadata: {
      name: "TechNova",
      "one-liner": "AI-powered software development tools",
      batch: "W2024",
      location: "San Francisco, CA",
      type: "B2B",
      categories: "Developer Tools",
      status: "Active",
    },
    score: 0.95,
  },
  {
    id: "2",
    values: [],
    metadata: {
      name: "GreenLeaf",
      "one-liner": "Sustainable agriculture solutions",
      batch: "S2023",
      location: "Austin, TX",
      type: "B2B",
      categories: "AgTech",
      status: "Active",
    },
    score: 0.88,
  },
  {
    id: "3",
    values: [],
    metadata: {
      name: "HealthPulse",
      "one-liner": "Remote patient monitoring platform",
      batch: "W2023",
      location: "Boston, MA",
      type: "B2B, B2C",
      categories: "HealthTech",
      status: "Active",
    },
    score: 0.82,
  },
  {
    id: "4",
    values: [],
    metadata: {
      name: "QuantumLeap",
      "one-liner": "Quantum computing research and development",
      batch: "S2022",
      location: "Palo Alto, CA",
      type: "B2B",
      categories: "Deep Tech",
      status: "Active",
    },
    score: 0.79,
  },
  {
    id: "5",
    values: [],
    metadata: {
      name: "EcoCharge",
      "one-liner": "Fast-charging solutions for electric vehicles",
      batch: "W2024",
      location: "Detroit, MI",
      type: "B2B, B2C",
      categories: "CleanTech",
      status: "Active",
    },
    score: 0.75,
  },
]

export async function queryPineconeForDocuments(
  query: string,
  topK: number = 5
): Promise<Document[]> {
  "use server"
  
  console.log(`Query: ${query}`)
  console.log(`Top ${topK} results:`)

  // Simulate a delay to mimic a real API call
  await new Promise(resolve => setTimeout(resolve, 500))

  // Return the fake data, limited to topK
  const results = fakeCompanyData.slice(0, topK)

  results.forEach((result, index) => {
    console.log(`Score: ${result.score.toFixed(4)}`)
    console.log(`Name: ${result.metadata.name || "N/A"}`)
    console.log("---")
  })

  return results
}
