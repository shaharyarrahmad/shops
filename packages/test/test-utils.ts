import fetch from 'node-fetch';
import { Response } from 'node-fetch';

export async function doPost(
  path: string,
  body: any,
  headers: { [key: string]: string }
): Promise<Response> {
  return fetch(`http://localhost:3050/${path}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
