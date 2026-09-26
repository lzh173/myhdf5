import { FiFileText, FiHelpCircle, FiPlusCircle } from 'react-icons/fi';
import { useRoute } from 'wouter';

import { useStore } from '../stores';
import Flyout from './Flyout';
import NavLink from './NavLink';
import OpenedFiles from './OpenedFiles';
import styles from './Sidebar.module.css';
import SidebarToggle from './SidebarToggle';

function Sidebar() {
  const [isViewingFile] = useRoute('/view');
  const mayCollapse = useStore((state) => state.sidebarMayCollapse);
  const isCollapsed = mayCollapse && isViewingFile;

  return (
    <div className={styles.sidebar} data-collapsed={isCollapsed || undefined}>
      <div className={styles.sidebarInner}>
        <h1 className={styles.logo} data-reveal>
          <NavLink className={styles.logoLink} to="/">
            myHDF<span className={styles.logo5}>5</span>
          </NavLink>
        </h1>
        <nav className={styles.nav} data-reveal>
          <NavLink
            className={styles.mainNavItem}
            to="/"
            aria-label="打开 HDF5"
            title="打开 HDF5"
            data-primary
          >
            <FiPlusCircle className={styles.icon} />
            <span className={styles.label}>打开 HDF5</span>
          </NavLink>

          <NavLink
            className={styles.mainNavItem}
            to="help"
            aria-label="帮助"
            title="帮助"
          >
            <FiHelpCircle className={styles.icon} />
            <span className={styles.label}>帮助</span>
          </NavLink>

          {isCollapsed ? (
            <div className={styles.flyoutWrapper}>
              <button
                type="button"
                className={styles.flyoutBtn}
                aria-label="已打开的文件"
                aria-current="true"
              >
                <FiFileText />
              </button>
              <Flyout>
                <OpenedFiles />
              </Flyout>
            </div>
          ) : (
            <OpenedFiles />
          )}
        </nav>

        <div className={styles.footer}>
          <SidebarToggle
            isCollapsed={isCollapsed}
            isDisabled={!isViewingFile}
          />
          <p className={styles.credits} data-reveal>
            由{' '}
            <a href="https://www.panosc.eu/" target="_blank" rel="noreferrer">
              PaNOSC
            </a>{' '}
            在&nbsp;
            <a href="https://www.esrf.fr/" target="_blank" rel="noreferrer">
              ESRF
            </a>
            &nbsp;开发
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
