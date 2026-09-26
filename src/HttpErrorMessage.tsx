import { Link } from 'wouter';

import { UNSTABLE_URL_REGEX } from './services/RemoteService';
import { getViewerLink } from './utils';

interface Props {
  status: number;
  fileUrl: string;
}

function HttpErrorMessage(props: Props) {
  const { status, fileUrl } = props;

  if (status === 400) {
    return <p>文件网址可能有误或不完整。</p>;
  }

  if (status === 401) {
    return <p>访问此文件需要身份验证。myHDF5 只能打开可公开访问的文件。</p>;
  }

  if (status === 404) {
    return UNSTABLE_URL_REGEX.test(fileUrl) ? (
      <p>
        你提供的仓库网址似乎指向开发分支。文件可能已经移动，请尝试改用永久链接。
      </p>
    ) : (
      <p>文件网址可能有误，或者该网址下的文件已不存在。</p>
    );
  }

  if (status === 418) {
    return (
      <p>
        不妨改为打开
        <Link to={getViewerLink('https://www.silx.org/pub/h5web/teabag.h5')}>
          这个文件
        </Link>{' '}
        。
      </p>
    );
  }

  return null;
}

export default HttpErrorMessage;
