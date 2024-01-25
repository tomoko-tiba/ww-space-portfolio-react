import Item from '@/views/Home/Item'
import styles from './index.module.less'
import userData, { Data } from '@/assets/contentsData/userData'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

function Home(){
    const loadOnceAmount = 12;
    const [currDisplayCount, setCurrDisplayCount] = useState(loadOnceAmount);
    const visibleData: Data[] = userData.slice(0, currDisplayCount);
    const isFinishedLoading: boolean = currDisplayCount >= userData.length;

    const { ref, inView } = useInView({
        threshold: 1,
    });
    
    useEffect(() => {
        let ignore = false;
        console.log('useEffect');

        function handleLoading() {
            setTimeout(() => {
                if(!ignore){
                    const newCount = currDisplayCount + loadOnceAmount;
                    setCurrDisplayCount(newCount);
                    console.log('currCount  :'+newCount);
                }
            }, 3000);
        }

        if(inView && !isFinishedLoading ){
            handleLoading();
        }

        return () => {
            ignore = true;
            console.log('cancel');
        }
    }, [inView, isFinishedLoading, currDisplayCount]);

    return(
        <>
            <div className={styles.main}>
                <ol className={styles.contentsList}>
                    {visibleData.map(data => <Item data={data} key={data.id}/>)}
                </ol>
            </div>
            <div className={styles.loadMoreButton}>
                {!isFinishedLoading && <button className={styles.button} onClick={() => setCurrDisplayCount(c => c + loadOnceAmount)} ref={ref}>Load more</button>}
            </div>
        </>
    )
}

export default Home;