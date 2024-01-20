import logoSvg from '../assets/pics/logo.svg'
import searchIcon from '../assets/pics/searchIcon.svg'
import styles from './Header.module.less'

function Header(){
    return(
        <div className={styles.header}>
            <div className={styles.navbar}>
                <img className={styles.logo} src={logoSvg}/>
                <div className={styles.right}>
                    <form className={styles['search-bar']}> 
                        <img className={styles.search_icon} src={searchIcon} />
                        <input className={styles.search_input} placeholder='Search...' autoComplete='off'/>
                    </form>
                    <img className={styles.user} src='https://cdn.dribbble.com/users/18747275/avatars/normal/data?1705567610' width={45} height={45}/>
                </div>
            </div>
        </div>
    )
}

export default Header;