import {
  fetchZenodoFileUrl,
  toRawGithubUrl,
  toRawGitlabHref,
} from './services/utils';
import { FileService, type H5File, type RemoteFile } from './stores';

export function getViewerLink(href: string): string {
  const urlParam = new URLSearchParams({ url: href });
  return `/view?${urlParam.toString()}`;
}

function parseFilename(url: URL): string {
  const { pathname, hostname } = url;

  // Remove trailing slash if any, and take last path segment (or hostname if empty)
  const noTrail = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return noTrail === ''
    ? hostname
    : noTrail.slice(noTrail.lastIndexOf('/') + 1);
}

async function parseService(
  url: URL,
): Promise<Pick<RemoteFile, 'service' | 'resolvedUrl'>> {
  const { href, hostname, pathname } = url;

  if (hostname === 'raw.githubusercontent.com') {
    return { service: FileService.GitHub, resolvedUrl: href };
  }

  if (hostname === 'github.com') {
    return { service: FileService.GitHub, resolvedUrl: toRawGithubUrl(href) };
  }

  // Self-hosted GitLab repos generally have a subdomain containing the word `gitlab`
  if (hostname.includes('gitlab')) {
    return { service: FileService.GitLab, resolvedUrl: toRawGitlabHref(url) };
  }

  if (hostname === 'zenodo.org') {
    return {
      service: FileService.Zenodo,
      resolvedUrl: pathname.startsWith('/record')
        ? await fetchZenodoFileUrl(href)
        : href,
    };
  }

  return { service: FileService.Url, resolvedUrl: href };
}

export async function resolveFileUrl(
  fileUrl: string,
): Promise<RemoteFile | undefined> {
  let url;
  try {
    url = new URL(fileUrl);
  } catch {
    return undefined; // silence invalid URLs
  }

  // Filter out URLs with `blob:` protocol (i.e. local files) since we can't re-open them
  // Also ignore non-HTTPS protocols
  if (!url.protocol.startsWith('https')) {
    return undefined;
  }

  return {
    url: fileUrl,
    name: parseFilename(url),
    ...(await parseService(url)),
  };
}

const INTRO = '请简单介绍一下自己（姓名、单位、研究领域等）';

function getReportIntro(fileOrUrl?: H5File | string) {
  if (
    fileOrUrl &&
    typeof fileOrUrl !== 'string' &&
    fileOrUrl.service === FileService.Local
  ) {
    return `<<<
  1. ${INTRO}
  2. 为帮助我们了解问题，请发送你的 HDF5 文件（最好通过文件共享服务发送）。
>>>`;
  }

  return `<<< ${INTRO} >>>`;
}

export function buildMailto(
  subject: string,
  message: string,
  fileOrUrl?: H5File | string,
  entityPath?: string,
): string {
  const body = `你好：

${getReportIntro(fileOrUrl)}

${message}

以下是自动附加的上下文信息：

  - 用户代理：${navigator.userAgent}
  - 当前页面：${globalThis.location.href}${
    typeof fileOrUrl === 'string'
      ? `
  - 文件网址：${fileOrUrl}`
      : fileOrUrl
        ? `
  - 文件名：${fileOrUrl.name}
  - 文件网址：${fileOrUrl.url}
  - 检测到的服务：${fileOrUrl.service}
  - 解析后的网址：${fileOrUrl.resolvedUrl}`
        : ''
  }${
    entityPath
      ? `
  - 对象路径：${entityPath}`
      : ''
  }`;

  const params = new URLSearchParams({ subject: `[myHDF5] ${subject}`, body });
  const paramsStr = params.toString().replaceAll('+', '%20'); // use percent encoding for spaces to avoid issues with some email clients

  return `mailto:h5web@esrf.fr?${paramsStr}`;
}

export const FEEDBACK_MESSAGE = `<<
  请将此段替换为你的反馈；如有必要，请附上 HDF5 文件。
  => 报告问题时，请附上截图、复现步骤等信息。
  => 建议新功能时，请说明该功能要满足的需求。
>>`;
