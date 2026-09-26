import { type ValidateResult } from 'react-hook-form';

import { safeFetch } from '../fetch-utils';

interface ZenodoApiResponse {
  files: {
    key: string;
    links: { self: string }; // URL
  }[];
}

export function toRawGithubUrl(githubUrl: string): string {
  return githubUrl
    .replace('github.com', 'raw.githubusercontent.com')
    .replace('/blob/', '/')
    .replace('?raw=true', '');
}

export function toRawGitlabHref(gitlabUrl: URL): string {
  const rawUrl = new URL(gitlabUrl);
  rawUrl.pathname = gitlabUrl.pathname.replace('/blob/', '/raw/');
  rawUrl.search = '?inline=false';
  return rawUrl.href;
}

export async function fetchZenodoFileUrl(downloadUrl: string): Promise<string> {
  const match = /\/records?\/(\d+)\/files\/([^?]+)/u.exec(downloadUrl);
  if (!match) {
    throw new Error('无法识别 Zenodo 记录网址');
  }

  const [, record, filename] = match;
  const response = await safeFetch(`https://zenodo.org/api/records/${record}`);

  const { files } = (await response.json()) as ZenodoApiResponse;

  const file = files.find((f) => f.key === filename);
  if (!file) {
    throw new Error('在 Zenodo 记录中找不到该文件');
  }

  if (!file.links.self) {
    throw new Error(`在 Zenodo 记录中找不到文件下载网址`);
  }

  return file.links.self;
}

export function validateRequiredUrl(fileUrl: string): ValidateResult {
  if (!fileUrl) {
    return '请输入网址';
  }

  let url;
  try {
    url = new URL(fileUrl);
  } catch {
    return '请输入以 https:// 开头的有效网址';
  }

  if (url.protocol !== 'https:') {
    return '网址必须以 https:// 开头';
  }

  return true;
}
