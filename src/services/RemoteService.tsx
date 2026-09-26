import { useForm } from 'react-hook-form';
import { FiGlobe } from 'react-icons/fi';
import { Link, useLocation } from 'wouter';

import { getViewerLink } from '../utils';
import styles from './RemoteService.module.css';
import Service from './Service';
import { validateRequiredUrl } from './utils';

export const UNSTABLE_URL_REGEX = /\/(dev|main|master)\//u;

interface FormValues {
  url: string;
}

function RemoteService() {
  const {
    formState,
    register,
    handleSubmit: createSubmitHandler,
    watch,
  } = useForm<FormValues>({ defaultValues: { url: '' } });

  const { isSubmitted, errors } = formState;
  const [, navigate] = useLocation();

  function handleValidSubmit(data: FormValues) {
    navigate(getViewerLink(data.url.trim()));
  }

  const url = watch('url');
  const isUnstable = UNSTABLE_URL_REGEX.test(url);

  return (
    <Service icon={FiGlobe}>
      <h2 className={styles.heading}>从网址打开</h2>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={createSubmitHandler(handleValidSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            aria-label="HDF5 文件网址"
            placeholder="https://github.com/org/repo/blob/sha/path/to/file.h5"
            data-error={!!errors.url || undefined}
            {...register('url', { validate: validateRequiredUrl })}
          />
          <button className={styles.openBtn} type="submit">
            打开
          </button>
        </div>
        {errors.url?.message ? (
          <p className={styles.hint} data-error>
            {errors.url.message}
          </p>
        ) : isUnstable ? (
          <p className={styles.hint}>
            如果要<Link to="/help">分享此文件</Link>，建议使用{' '}
            <a
              href="https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files"
              target="_blank"
              rel="noreferrer"
            >
              永久链接
            </a>
            .
          </p>
        ) : (
          !isSubmitted && (
            <p className={styles.hint}>
              粘贴 Zenodo 记录或 GitHub 仓库中的文件网址。更多信息及高级用法请
              参阅<Link to="/help#remote">帮助页面</Link>。
            </p>
          )
        )}
      </form>
    </Service>
  );
}

export default RemoteService;
