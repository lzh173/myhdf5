import { type FallbackProps } from 'react-error-boundary';

import styles from './ErrorFallback.module.css';
import { FetchError, NetworkError } from './fetch-utils';
import HttpErrorMessage from './HttpErrorMessage';
import { type H5File } from './stores';
import { buildMailto } from './utils';

interface Props extends FallbackProps {
  file: H5File;
}

function FileErrorFallback(props: Props) {
  const { error, file, resetErrorBoundary } = props;

  const msg = error instanceof Error ? error.message : '未知错误';
  const cause = error instanceof Error ? error.cause : undefined;

  const causeMsg =
    cause && cause instanceof Error && cause.message !== msg
      ? cause.message
      : undefined;

  return (
    <div className={styles.root} data-error-fallback>
      {causeMsg ? (
        <details className={styles.detailedError} open>
          <summary>{msg}</summary>
          <pre>{causeMsg}</pre>
        </details>
      ) : error instanceof NetworkError ? (
        <div className={styles.error}>
          <p>无法获取文件。</p>
          <p>
            网络连接可能已中断，也可能遇到了
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
              target="_blank"
              rel="noreferrer"
            >
              跨源请求
            </a>{' '}
            错误。若是后者，请尝试下载文件，然后将其作为本地文件打开。
          </p>
        </div>
      ) : (
        <div className={styles.error}>
          <p>{msg}</p>
          {error instanceof FetchError && (
            <HttpErrorMessage status={error.status} fileUrl={file.url} />
          )}
        </div>
      )}

      {error instanceof NetworkError && (
        <a
          className={styles.btn}
          href={file.resolvedUrl}
          download="file.h5"
          target="_blank"
          rel="noreferrer"
        >
          下载文件
        </a>
      )}
      <a
        className={styles.btn}
        target="_blank"
        rel="noreferrer"
        href={buildMailto(
          '错误报告',
          `我在使用 myHDF5 时遇到了以下错误："${msg}"${causeMsg ? ` - ${causeMsg}` : ''}`,
          file,
        )}
      >
        报告错误
      </a>

      <button
        className={styles.btn}
        type="button"
        onClick={() => resetErrorBoundary()}
      >
        重试
      </button>

      <details className={styles.debug}>
        <summary>调试信息</summary>
        <ul>
          <li>检测到的服务：{file.service}</li>
          <li>
            文件网址：{' '}
            <a href={file.url} target="_blank" rel="noreferrer">
              {file.url}
            </a>
          </li>
          {file.resolvedUrl !== file.url && (
            <li>
              解析后的网址：{' '}
              <a href={file.resolvedUrl} target="_blank" rel="noreferrer">
                {file.resolvedUrl}
              </a>
            </li>
          )}
        </ul>
        <p className={styles.hint}>错误报告中会自动包含这些信息。</p>
      </details>
    </div>
  );
}

export default FileErrorFallback;
