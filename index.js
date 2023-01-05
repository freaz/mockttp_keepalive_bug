const { getLocal } = require('mockttp');
const fetch = require('node-fetch');
const http = require('http');

async function main() {
  const server = getLocal();
  await server.start();

  const path1 = '/first';
  const path2 = '/second';

  // it works if thenReply is used

  await server.forGet(path1).thenJson(200, { result: 'first' });
  await server.forGet(path2).thenJson(200, { result: 'second' });

  const agent = new http.Agent({ keepAlive: true });

  const response1 = await fetch(`${server.url}${path1}`, { agent });
  const response2 = await fetch(`${server.url}${path2}`, { agent });

  console.log({ result1: await response1.json(), result2: await response2.json() });

  await server.stop();
}

main();
