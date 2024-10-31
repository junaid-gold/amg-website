import "server-only";
import { createClient, QueryParams } from '@sanity/client'


const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    useCdn: false,
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
    token: process.env.NEXT_PUBLIC_SANITY_ACCESS_TOKEN!
})


export default client;


export async function sanityFetch<QueryResponse>({
    query,
    qParams = {},
    tags,
}: {
    query: string;
    qParams?: QueryParams;
    tags: string[];
}): Promise<QueryResponse> {
    return client.fetch<QueryResponse>(query, qParams, {
        cache: "force-cache",
        next: { tags },
    });
}