import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
    projectId: "qwoxusny",
    dataset: "production",
    useCdn: true, // cache
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

// sanity cors add http://localhot:19006

export default client;