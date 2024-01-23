import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Item from '@/views/Home/Item'
import styles from './index.module.less'
import userData from '@/assets/contentsData/userData.jsx'
import { useState } from 'react'

function Home(){
    const loadOnceAmount = 9;
    const [currDisplayCount, setCurrDisplayCount] = useState(loadOnceAmount);

    const listItems = userData.map((data, i) => { 
        if(i < currDisplayCount){
            return <Item data={data} key={data.id}/>
        }
    })

    function handleOnclickLoad(){
        const newCount = currDisplayCount + loadOnceAmount;
        setCurrDisplayCount(newCount);
        console.log(newCount);
        console.log(currDisplayCount, loadOnceAmount);
    }

    return(
        <>
            <Header />
            <div className={styles.main}>
                <ol className={styles.contentsList}>
                    {listItems}
                </ol>
            </div>
            <div className={styles.loadMoreButton}>
                <button className={styles.button} onClick={handleOnclickLoad}>Load more</button>
            </div>
            <Footer />
        </>
    )
}


export default Home