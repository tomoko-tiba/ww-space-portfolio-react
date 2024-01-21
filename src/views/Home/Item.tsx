import styles from './Item.module.less'

export interface Data {
    itemLink: string;
    imgSrc: string;
    userSrc: string 
    userPhoto: string;
    userName: string;
}
//imgSrc, itemLink, userSrc, userPhoto, userName

const Item: React.FC< {data: Data} >= ({ data }) => {
    return(
        <li className={styles.contentContainer}>
            <div className={styles.shotContainer}>
                <a className={styles.link} href={data.itemLink} >
                    <img className={styles.shotImg} src={data.imgSrc} />
                </a>
            </div>

            <div className={styles.detailsContainer}>
                <div className={styles.userInfo}>
                    <a className={styles.hoverableUrl} href={data.userSrc}>
                        <img className={styles.userPhoto} src={data.userPhoto}/>
                        <span className={styles.userName}>{data.userName}</span>
                    </a>

                </div>
                <div className={styles.statistics}>
                    <span>like</span>
                </div>
            </div>
        </li>
    )
}

export default Item;