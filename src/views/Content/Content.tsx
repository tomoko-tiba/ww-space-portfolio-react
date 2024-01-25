import styles from './Content.module.less'

const Content: React.FC = () => {
    const title: string = 'Shadows & Silhouettes';
    const userName: string = 'Biondic Vladimir';
    const userPhoto: string = 'https://cdn.dribbble.com/users/614348/avatars/normal/82403b2913580cf795f8823cf0ba8be5.png?1696330794';
    const userPage = 'https://dribbble.com/Biondic';
    const likes: number = 100;
    const time = new Date('2022-01-01T12:00:00');


    return (
        <div className={styles.main}>
            <div className={styles.contentContainer}>
                <div className={styles.title}>
                    <span className={styles.titleText}>{title}</span>
                </div>
                <div className={styles.infoBar}>
                    <div className={styles.info}>
                        <div className={styles.userPhoto}>
                            <a href={userPage}>
                                <img src={userPhoto} />
                            </a>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.userName}>{userName}</div>
                            <div className={styles.status}>
                                <span className={styles.like}>Likes:  {likes}</span>
                                <span className={styles.time}>{time.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.action}>
                        <div className={styles.likeAction}></div>
                        <div className={styles.getInTouch}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content;