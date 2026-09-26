import { type FallbackProps } from 'react-error-boundary';

import styles from './ErrorFallback.module.css';
import { NetworkError } from './fetch-utils';
import { buildMailto } from './utils';

interface Props extends FallbackProps {
  fileUrl: string;
}

function ResolutionErrorFallback(props: Props) {
  const { error, fileUrl } = props;
  const msg = error instanceof Error ? error.message : '未知错误';

  return (
    <div className={styles.root}>
      <div className={styles.error}>
        <p>{msg}</p>
        {error instanceof NetworkError && (
          <p>
            网络连接可能已中断，也可能遇到了
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
              target="_blank"
              rel="noreferrer"
            >
              跨源请求
            </a>{' '}
            错误。
          </p>
        )}
      </div>

      <a
        className={styles.btn}
        target="_blank"
        rel="noreferrer"
        href={buildMailto(
          '错误报告',
          `我在使用 myHDF5 时遇到了以下错误："${msg}"`,
          fileUrl,
        )}
      >
        报告错误
      </a>

      <details className={styles.debug}>
        <summary>调试信息</summary>
        <ul>
          <li>
            输入的网址：{' '}
            <a href={fileUrl} target="_blank" rel="noreferrer">
              {fileUrl}
            </a>
          </li>
        </ul>
        <p className={styles.hint}>错误报告中会自动包含这些信息。</p>
      </details>
    </div>
  );
}

export default ResolutionErrorFallback;
