import Item from '@/views/Home/Item'
import styles from './index.module.less'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { GetWorkByPage, Work } from '@/api/works'

function Home(){
    const loadOnceAmount = 12;

    const [isLoading, setIsLoading] = useState(false); 
    /*
    // 用于一次获取所有数据
    const [userData, setUserData] = useState<Work[]>([])
    const visibleData: Work[] = userData.slice(0, currDisplayCount);
    const isFinished: boolean = currDisplayCount >= userData.length;
    */

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
                fetchPageData();
            }
        },
    });

    
    /*
    // 一次获得所有数据
    useEffect(() => {
        let ignore = false;
        setIsLoading(true);

        getWorks().then(res => {
            if(!ignore){
                const data = res.data;
                setUserData(data);
                setIsLoading(false);
            }
        })

        GetWorkByPage()


        return () => {
            ignore = true;
        }
    }, [])
    */
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
            setIsFinished(currPage*loadOnceAmount >= count);
            setIsLoading(false);
        }).finally(() => {
            console.log('加载数据及渲染成功！本次加载数据的页码是', toLoadPage);
            console.log('isLoading :', isLoading);
        })
    }

    /* 
    // 废弃useEffect方法
    useEffect(() => {
        let ignore = false;

        setIsLoading(true);

        const toLoadPage = currPage + 1;
        GetWorkByPage({
            page: toLoadPage,
            pageSize: loadOnceAmount
        }).then(res => {
            if(ignore){
                return
            }
            const data = res.data;
            const pageData = data.data;
            const count = data.count;
            setVisibleData([...visibleData, ...pageData]);
            setCurrPage(toLoadPage);
            setIsFinished(currPage*loadOnceAmount >= count);
            setIsLoading(false);
        })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        /* // 当只使用模拟数据时
        function handleLoading() {
            setTimeout(() => {
                if(!ignore){
                    const newCount = currPage + loadOnceAmount;
                    setCurrDisplayCount(newCount);
                    console.log('currCount  :'+newCount);
                }
            }, 3000);
        }
        if(inView && !isLoading ){
            handleLoading();
        }
        return () => {
            ignore = true;
            console.log('cancel');
        }
    }, [inView, isLoading]);
    */   

    return(
        <>
            <div className={styles.main}>
                <ol className={styles.contentsList}>
                    {visibleData.map(data => <Item data={data} key={data.id}/>)}
                </ol>
            </div>
            <div className={styles.loadMoreButton}>
                {isLoading ? '加载中...' : <DetectLoadingArea detectRef={ref} key={currPage}/>}
            </div>   
        </>
    )
}

function DetectLoadingArea ({detectRef}) {
    return(
        <div ref={detectRef} className={styles.detectArea}><div>Detecting</div></div>
    )
}

export default Home;