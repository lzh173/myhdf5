import { FiMonitor } from 'react-icons/fi';

import { useDropzoneContext } from '../Dropzone';
import styles from './LocalService.module.css';
import Service from './Service';

function LocalService() {
  const { openFilePicker } = useDropzoneContext();

  return (
    <Service icon={FiMonitor}>
      <button
        className={styles.selectBtn}
        type="button"
        onClick={() => openFilePicker()}
      >
        选择 HDF5 文件
      </button>
      <p className={styles.hint}>
        也可以随时将文件拖放到页面中的任意位置。文件不会上传到远程服务器； 借助{' '}
        <a
          href="https://github.com/usnistgov/h5wasm"
          target="_blank"
          rel="noreferrer"
        >
          h5wasm
        </a>
        ，所有处理均在浏览器本地完成。
      </p>
    </Service>
  );
}

export default LocalService;
