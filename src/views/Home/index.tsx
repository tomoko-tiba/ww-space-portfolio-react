import Item from '@/views/Home/Item'
import styles from './index.module.less'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { GetWorkByPage, Work } from '@/api/works'

function Home(){
    const loadOnceAmount = 12;
    // 画面在加载
    const [isLoading, setIsLoading] = useState(false); 
    // 数据在请求
    const [isFetchingData, setIsFetchingData] = useState(false)

    // 用于逐次获取数据
    const [visibleData, setVisibleData] = useState<Work[]>([]);
    const [currPage, setCurrPage] = useState(0);

    // 所有数据加载完成
    const [isFinished, setIsFinished] = useState(false);

    const { ref } = useInView({
        threshold: 1,
        triggerOnce: true,
        onChange(inView) {
            if(inView){
                console.log('inView');
                setIsLoading(true);
                fetchPageData();
            }
        },
    });

    // 逐次获取数据
    function fetchPageData() {
        console.log('Try to fetch');
        if(isFinished && isLoading){
            return
        }
        const toLoadPage = currPage + 1;
        GetWorkByPage({
            page: toLoadPage,
            pageSize: loadOnceAmount
        }).then(res => {
            const data = res.data;
            const pageData = data.data;
            const count = data.count;
            setVisibleData([...visibleData, ...pageData]);
            setCurrPage(toLoadPage);
            setIsFinished(currPage >= count/loadOnceAmount - 1);
            setIsLoading(false);
        }).finally(() => {
            console.log('加载数据及渲染成功！本次加载数据的页码是', toLoadPage);
            //console.log('isLoading :', isLoading);
        })
    } 

    return(
        <>
            <div className={styles.main}>
                <ol className={styles.contentsList}>
                    {visibleData.map(data => <Item data={data} key={data.id}/>)}
                </ol>
            </div>
            <div className={styles.loadMoreButton}>
            { isLoading && !isFinished && 'Loading' }
            { !isLoading && !isFinished && <DetectLoadingArea detectRef={ref} key={currPage}/>}
            </div>   
        </>
    )
}

function DetectLoadingArea ({detectRef}) {
    return(
        <div ref={detectRef} className={styles.detectArea}>
            <div>Detecting</div>
        </div>
    )
}

export default Home;