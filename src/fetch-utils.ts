/* eslint-disable max-classes-per-file */

export async function safeFetch(url: string): Promise<Response> {
  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new NetworkError();
  }

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText);
  }

  return response;
}

export async function fetchBuffer(url: string): Promise<ArrayBuffer> {
  const response = await safeFetch(url);
  return response.arrayBuffer();
}

export class NetworkError extends Error {
  public constructor() {
    super('网络错误');
    this.name = 'NetworkError';
  }
}

export class FetchError extends Error {
  public constructor(
    public readonly status: number,
    public readonly statusText: string,
  ) {
    super(`请求失败：${status} ${statusText}`);
    this.name = 'FetchError';
  }
}
