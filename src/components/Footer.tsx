import logoSvg from '@/assets/pics/logo.svg'
import facebookLogo from '@/assets/pics/facebookLogo.svg'
import insLogo from '@/assets/pics/insLogo.svg'
import pinterestLogo from '@/assets/pics/pinterestLogo.svg'
import twitterLogo from '@/assets/pics/twitterLogo.svg'

import styles from './Footer.module.less'

const Footer: React.FC = () => {
    return(
        <div className={styles.footerContainer}>
            <FooterUpper />
            <FooterLower />
        </div>
    )
}

function FooterUpper(){
    return(
        <div className={styles.upperContainer}>
            <img className={styles.logo} src={logoSvg}/>
            <ul className={styles.links}>
                <li>
                    <a className={styles.link} href='https://dribbble.com/for-designers'>For designers</a>
                </li>
                <li>
                    <a className={styles.link} href='https://dribbble.com/for-designers'>Hire talent</a>
                </li>
                <li>
                    <a className={styles.link} href='https://dribbble.com/for-designers'>Inspiration</a>
                </li>
                <li>
                    <a className={styles.link} href='https://dribbble.com/for-designers'>Advertising</a>
                </li>                <li>
                    <a className={styles.link} href='https://dribbble.com/for-designers'>Blog</a>
                </li>
                <li>
                    <a className={styles.link} href='https://dribbble.com/for-designers'>About</a>
                </li>
                <li>
                    <a className={styles.link} href='https://dribbble.com/for-designers'>Careers</a>
                </li>
                <li>
                    <a className={styles.link} href='https://dribbble.com/for-designers'>Support</a>
                </li>
            </ul>
            <div className={styles.socialLinks}>
                <a href="http://twitter.com/dribbble" className={styles.socialLink}>
                    <img src={twitterLogo}/>      
                </a>
                <a href="https://www.facebook.com/dribbble" className={styles.socialLink}>
                    <img src={facebookLogo}/>      
                </a>
                <a href="https://www.facebook.com/dribbble" className={styles.socialLink}>
                    <img src={insLogo}/>      
                </a>
                <a href="http://www.pinterest.com/dribbble/" className={styles.socialLink}>
                    <img src={pinterestLogo}/>      
                </a>
            </div>
        </div>
    )
}

function FooterLower(){
    return(
        <div className={styles.lowerContainer}>
            <ul className={styles.lowerList}>
                <li>© 2024 Dribbble</li>
                <li><a href="/terms">Terms</a></li>
                <li><a href="/privacy">Privacy</a></li>
                <li><a href="/cookie-policy">Cookies</a></li>
            </ul>

            <ul className={styles.lowerList}>
                <li><a href="/directories/jobs">Jobs</a></li>
                <li><a href="/directories/designers">Designers</a></li>
                <li><a href="/directories/freelance-designers">Freelancers</a></li>
                <li><a href="/tags">Tags</a></li>
                <li><a href="/places">Places</a></li>
                <li><a href="/resources">Resources</a></li>
            </ul>
        </div>
    )
}

export default Footer;