import styles from './404.module.less';

function NotFound404(){
    return(
        <div className={styles.page}>
            <h1 className={styles.message}>Whoops, that page is gone.</h1>
            <h1 className={styles.text}>404</h1>
        </div>
    )
}

export default NotFound404;