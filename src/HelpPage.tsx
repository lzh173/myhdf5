import { useEffect } from 'react';
import { Link } from 'wouter';

import styles from './Help.module.css';
import { buildMailto, FEEDBACK_MESSAGE, getViewerLink } from './utils';

function HelpPage() {
  useEffect(() => {
    const { hash } = globalThis.location;
    const target = !!hash && document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className={styles.root}>
      <section>
        <h2>
          关于 myHDF<span>5</span>
        </h2>
        <p>
          <em>myHDF5</em> 是一项在线 <strong>HDF5 文件查看服务</strong>，由
          <a href="https://www.esrf.fr/" target="_blank" rel="noreferrer">
            欧洲同步辐射装置
          </a>
          （ESRF）作为欧洲{' '}
          <a href="https://www.panosc.eu/" target="_blank" rel="noreferrer">
            PaNOSC 项目
          </a>
          的一部分开发并维护。它基于用于浏览和可视化 HDF5 文件的 React/WebGL
          查看器
          <a
            href="https://github.com/silx-kit/h5web"
            target="_blank"
            rel="noreferrer"
          >
            <strong> H5Web</strong>
          </a>
          ，以及由{' '}
          <a href="https://www.nist.gov/" target="_blank" rel="noreferrer">
            NIST
          </a>{' '}
          开发的
          <a
            href="https://github.com/usnistgov/h5wasm"
            target="_blank"
            rel="noreferrer"
          >
            <strong> h5wasm</strong>
          </a>
          。后者是 HDF5 C 库的 WebAssembly 移植版本，可通过 JavaScript 读取 HDF5
          文件。
        </p>
      </section>
      <section>
        <h2>打开本地文件</h2>
        <p>
          myHDF5 支持打开<strong>任意大小</strong>的本地 HDF5 文件。你可以在
          <Link to="/">
            <em>打开 HDF5</em>
          </Link>
          页面中选择文件，也可以随时将文件拖放到界面中的任意位置；
          一次可选择或拖放多个文件。文件<strong>绝不会上传</strong>
          到远程服务器。借助
          <a
            href="https://github.com/usnistgov/h5wasm"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
            h5wasm
          </a>
          ， 所有处理均在浏览器本地完成。
        </p>
      </section>
      <section id="remote">
        <h2>打开远程文件</h2>
        <p>
          myHDF5 可以打开通过网络静态提供的 HDF5 文件。只需在
          <Link to="/">
            <em>打开 HDF5</em>
          </Link>
          页面粘贴文件网址即可。请注意，文件所在服务器必须允许
          <a
            href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CORS"
            target="_blank"
            rel="noreferrer"
          >
            跨源请求
          </a>
          。
        </p>
        <p>
          Zenodo、GitHub
          等托管服务允许下载原始文件，但正确的下载网址有时并不容易找到。myHDF5
          支持以下网址格式：
        </p>
        <ul className={styles.listSpaced}>
          <li>
            <strong>Zenodo</strong> 下载网址（在
            <a
              href="https://zenodo.org/record/6497438"
              target="_blank"
              rel="noreferrer"
            >
              记录页面
            </a>
            中右键单击文件，然后选择“复制链接”）
            <div className={styles.url}>
              示例：{' '}
              <Link
                to={getViewerLink(
                  'https://zenodo.org/record/6497438/files/xrr_dataset.h5?download=1',
                )}
              >
                https://zenodo.org/record/6497438/files/xrr_dataset.h5?download=1
              </Link>
            </div>
          </li>
          <li>
            <strong>
              GitHub{' '}
              <a
                href="https://docs.github.com/zh/repositories/working-with-files/using-files/getting-permanent-links-to-files"
                target="_blank"
                rel="noreferrer"
              >
                永久链接
              </a>
            </strong>
            （分享时推荐使用）
            <div className={styles.url}>
              示例：{' '}
              <Link
                to={getViewerLink(
                  'https://github.com/oasys-esrf-kit/dabam2d/blob/f3aed913976d5772a51e6bac3bf3c4e4e4c8b4e1/data/dabam2d-0001.h5',
                )}
              >
                https://github.com/oasys-esrf-kit/dabam2d/blob/f3aed913976d5772a51e6bac3bf3c4e4e4c8b4e1/data/dabam2d-0001.h5
              </Link>
            </div>
          </li>
          <li>
            包含标签、分支或提交 SHA 的 GitHub 网址
            <div className={styles.url}>
              示例：{' '}
              <Link
                to={getViewerLink(
                  'https://github.com/oasys-esrf-kit/dabam2d/blob/main/data/dabam2d-0001.h5',
                )}
              >
                https://github.com/oasys-esrf-kit/dabam2d/blob/main/data/dabam2d-0001.h5
              </Link>
            </div>
          </li>
        </ul>
        <p>
          请注意，<strong>GitLab</strong> 目前
          <a href="https://gitlab.com/gitlab-org/gitlab/-/issues/16732">
            不支持
          </a>
          跨源请求。 你仍可粘贴 GitLab 页面网址，但 myHDF5
          无法获取文件，并会显示错误。此时可手动下载文件，再将其作为本地文件打开。
          <span className={styles.url}>
            示例：{' '}
            <Link
              to={getViewerLink(
                'https://gitlab.com/utopia-project/utopia/-/blob/master/test/core/cell_manager_test.h5',
              )}
            >
              https://gitlab.com/utopia-project/utopia/-/blob/master/test/core/cell_manager_test.h5
            </Link>
          </span>
        </p>
      </section>
      <section>
        <h2>
          分享 myHDF<span>5</span> 链接
        </h2>
        <p>
          打开托管在 Zenodo、GitHub 等平台上的远程文件后，浏览器地址栏中的
          myHDF5 网址可以<strong>直接分享</strong>。
          <em>本地文件不支持此功能。</em>
        </p>
      </section>
      <section>
        <h2>支持的 HDF5 压缩插件</h2>
        <p>
          myHDF5 支持读取由{' '}
          <a
            href="https://github.com/h5wasm/h5wasm-plugins/tree/v0.0.3?tab=readme-ov-file#included-plugins"
            target="_blank"
            rel="noreferrer"
          >
            h5wasm-plugins@0.0.3
          </a>{' '}
          中任一插件压缩的数据集。
        </p>
      </section>
      <section>
        <h2>已知限制</h2>
        <ul>
          <li>
            不支持 HDF5
            文件中的外部链接和虚拟数据集。外部链接会显示明确错误；虚拟数据集则会显示为全零，或显示为数据集设置的
            <a
              href="https://docs.hdfgroup.org/hdf5/develop/group___d_c_p_l.html#title28"
              target="_blank"
              rel="noreferrer"
            >
              填充值
            </a>
            。
          </li>
          <li>
            本地文件不会持久保存。离开 myHDF5
            后再次访问，或仅刷新页面，已打开文件列表中的本地文件都会被移除。
          </li>
        </ul>
      </section>
      <section>
        <h2>获取支持</h2>
        <ul>
          <li>
            与 H5Web 查看器有关的问题或功能建议，请前往 GitHub 上的{' '}
            <a
              href="https://github.com/silx-kit/h5web/issues"
              target="_blank"
              rel="noreferrer"
            >
              H5Web 问题跟踪器
            </a>
          </li>
          <li>
            其他问题请前往 GitHub 上的{' '}
            <a
              href="https://github.com/silx-kit/myhdf5/issues"
              target="_blank"
              rel="noreferrer"
            >
              myHDF5 问题跟踪器
            </a>
          </li>
          <li>
            也可以通过 H5Web 支持与反馈邮件列表联系我们：
            <a href={buildMailto('支持请求', FEEDBACK_MESSAGE)}>
              h5web@esrf.fr
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h2>提供反馈</h2>
        <p>
          欢迎分享你对 myHDF5 和 H5Web 查看器的看法。可以通过以下方式联系我们：
        </p>
        <ul>
          <li>
            在 H5Web 的 GitHub 仓库中
            <a
              href="https://github.com/silx-kit/h5web/discussions"
              target="_blank"
              rel="noreferrer"
            >
              发起讨论
            </a>
          </li>
          <li>
            发送邮件至 <a href="mailto:h5web@esrf.fr">h5web@esrf.fr</a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default HelpPage;
