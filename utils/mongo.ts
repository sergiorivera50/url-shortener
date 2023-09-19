import { Collection, MongoClient, ServerApiVersion } from 'mongodb';

export async function getClient(): Promise<MongoClient> {
  const USERNAME = process.env.MONGODB_USERNAME;
  const PASSWORD = process.env.MONGODB_PASSWORD;
  const HOST = process.env.MONGODB_HOST;

  const client = new MongoClient(
    `mongodb+srv://${USERNAME}:${PASSWORD}@${HOST}/?retryWrites=true&w=majority`,
    {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    },
  );

  await client.connect();
  await client.db('admin').command({ ping: 1 });
  return client;
}

export async function getCollection(database = 'url-shortener', collection = 'urls'): Promise<[MongoClient, Collection]> {
  const client = await getClient();
  return [client, client.db(database).collection(collection)];
}

export async function getAllURLs() {
  const [client, collection] = await getCollection();
  const data = await collection.find({}).toArray();
  await client.close();
  return data;
}

export async function fetchLongURL(shortURL: string): Promise<(string | undefined)> {
  const [client, collection] = await getCollection();
  try {
    const result = await collection.findOne({ hash: shortURL });
    return result['url'];
  } catch {
    return undefined;
  } finally {
    await client.close();
  }
}

export async function createURLBinding(longURL: string, shortURL: string): Promise<void> {
  const [client, collection] = await getCollection();
  await collection.insertOne({
    url: longURL,
    hash: shortURL,
  });
  await client.close();
}
