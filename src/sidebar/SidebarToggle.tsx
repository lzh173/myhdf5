import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

import { useStore } from '../stores';
import sidebarStyles from './Sidebar.module.css';

interface Props {
  isCollapsed: boolean;
  isDisabled: boolean;
}

function SidebarToggle(props: Props) {
  const { isCollapsed, isDisabled } = props;
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  return (
    <button
      className={sidebarStyles.navBtn}
      type="button"
      aria-label={isCollapsed ? '展开侧边栏' : '收起侧边栏'}
      disabled={isDisabled}
      onClick={() => toggleSidebar()}
    >
      {isCollapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
    </button>
  );
}

export default SidebarToggle;
