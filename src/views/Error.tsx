import styles from './Error.module.less';

function Error(){
    return(
        <div className={styles.page}>
            <h1 className={styles.message}>Whoops, that page is gone.</h1>
            <h1 className={styles.text}>404</h1>
        </div>
    )
}

export default Error;