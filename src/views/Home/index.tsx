import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Item from '@/views/Home/Item'
import styles from './index.module.less'
import userData from '@/assets/contentsData/userData.jsx'

function Home(){
    //const userDataContent: Data = userData[0];

    const listItems = userData.map(data => { 
        return(
            <Item data={data} key={data.id}/>
        )
    } )

    return(
        <>
            <Header />
            <div className={styles.main}>
                <ol className={styles.contentsList}>
                    {listItems}
                </ol>
            </div>
            <Footer />
        </>
    )
}


export default Home