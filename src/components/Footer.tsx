import logoSvg from '@/assets/pics/logo.svg';
import logoSvg2 from '@/assets/pics/logo2.svg';
import styles from './Footer.module.less';
import email from '@/assets/pics/email.svg';

const Footer: React.FC = () => {
  return (
    <div className={styles.footerContainer}>
      <FooterUpper />
      <FooterLower />
    </div>
  );
};

function FooterUpper() {
  return (
    <div className={styles.upperContainer}>
      <img className={styles.logo} src={logoSvg2} />
      <div className={styles.right}>
        <img className={styles.logo} src={logoSvg} />
        <ul className={styles.links}>
          <li>Yenny Wang</li>
        </ul>
      </div>
    </div>
  );
}

function FooterLower() {
  return (
    <div className={styles.lowerContainer}>
      <ul className={styles.lowerList}>
        <li>© 2024 Yenny Wang</li>
        <li>Portfolio</li>
      </ul>

      <ul className={styles.lowerList}>
        <li>
          <a href="https://github.com/tomoko-tiba">Github</a>
        </li>
        <li>
          <a href="https://github.com/tomoko-tiba" className={styles.icon}>
            <svg className={styles.icon}>
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
          </a>
        </li>
        <li>
          <a href="mailto:yenny00001@163.com" className={styles.icon}>
            Email
          </a>
        </li>
        <li>
          <a href="mailto:yenny00001@163.com" className={styles.icon}>
            <svg
              className={styles.icon}
              fill="#000000"
              height="800px"
              width="800px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 493.497 493.497"
            >
              <path
                d="M444.556,85.218H48.942C21.954,85.218,0,107.171,0,134.16v225.177c0,26.988,21.954,48.942,48.942,48.942h395.613
	c26.988,0,48.941-21.954,48.941-48.942V134.16C493.497,107.171,471.544,85.218,444.556,85.218z M460.87,134.16v225.177
	c0,2.574-0.725,4.924-1.793,7.09L343.74,251.081l117.097-117.097C460.837,134.049,460.87,134.096,460.87,134.16z M32.628,359.336
	V134.16c0-0.064,0.033-0.11,0.033-0.175l117.097,117.097L34.413,366.426C33.353,364.26,32.628,361.911,32.628,359.336z
	 M251.784,296.902c-2.692,2.691-7.378,2.691-10.07,0L62.667,117.846h368.172L251.784,296.902z M172.827,274.152l45.818,45.819
	c7.512,7.511,17.493,11.645,28.104,11.645c10.61,0,20.592-4.134,28.104-11.645l45.82-45.819l101.49,101.499H71.327L172.827,274.152z
	"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
