import logoSvg from '../assets/pics/logo.svg';
import searchIcon from '../assets/pics/searchIcon.svg';
import styles from './Header.module.less';
import { useNavigate } from 'react-router-dom';
import { KeyboardEvent } from 'react';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchValue, onSearchChange }) => {
  const navigate = useNavigate();

  const handleSearchSubmit = (e: KeyboardEvent) => {
    // 处理搜索提交逻辑
    // console.log('Search submitted:', searchTerm);
    e.preventDefault(); //不加的话就会重新加载整个app 即无法储存当前searchValue
    if (searchValue) {
      const navPath = '/Search/' + searchValue;
      navigate(navPath);
    } else {
      navigate('/');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.header}>
      <div className={styles.navbar}>
        <img className={styles.logo} src={logoSvg} onClick={handleBackToHome} />
        <div className={styles.right}>
          <form className={styles['search-bar']}>
            <img className={styles.search_icon} src={searchIcon} />
            <input
              className={styles.search_input}
              value={searchValue}
              placeholder="Search..."
              autoComplete="off"
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
