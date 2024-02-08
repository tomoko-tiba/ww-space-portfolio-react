import Item from '@/views/Home/Item'
import styles from './index.module.less'
import { useState, LegacyRef, useEffect, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { GetWorkByPage, Work } from '@/api/works'
import { useParams } from 'react-router-dom'

function Home(){
    const loadOnceAmount = 12;
    // 画面在加载
    const [isLoading, setIsLoading] = useState(false); 

    // 用于逐次获取数据
    const [visibleData, setVisibleData] = useState<Work[]>([]);
    const [currPage, setCurrPage] = useState(1);

    // 所有数据加载完成
    const [isFinished, setIsFinished] = useState(false);

    // const searchInputRef = useRef<HTMLInputElement>(null);
    // const [searchText, setSearchText] = useState<string>('');

    const params = useParams();

    useEffect(() => {
        console.log('reload')
        if(!params.text){
            setCurrPage(1);
        }
    },[])
    
    useEffect(() => {
        let ignore = false;
        setIsLoading(true);
        console.log('currPage :'+currPage);
        console.log('search and first fetch');
        GetWorkByPage({
            page: 1,
            pageSize: loadOnceAmount,
            searchText: params.text,
        }).then(res => {
            if(ignore) return
            const data = res.data;
            const pageData = data.data;
            const count = data.count;
            setVisibleData([...pageData]);
            setIsFinished(currPage >= count/loadOnceAmount - 1);
            setIsLoading(false);
            console.log(params.text + '  ' + typeof(params.text));
            console.log('搜索数据成功！');
            setCurrPage(2);
        })
        return() => {
            ignore = true;
        }
    }, [params.text])
/*
    useEffect(()=>{
        let ignore = false;
        if(isFinished && isLoading){
            return
        }
        console.log('Try to fetch');
        // const toLoadPage = currPage + 1;
        GetWorkByPage({
            page: currPage,
            pageSize: loadOnceAmount,
            searchText: params.text
        }).then(res => {
            if(ignore){
                console.log(`then ignore! page: ${currPage}, searchText: ${params.text}`);
                return
            }
            const data = res.data;
            const pageData = data.data;
            const count = data.count;

            if(currPage === 1 || params.text) {
                setVisibleData([...pageData]);
                console.log('first');
            }else {
                setVisibleData([...visibleData, ...pageData]);
                console.log('second');
            }
            setVisibleData([...visibleData, ...pageData]);
            // setCurrPage(toLoadPage);
            setIsFinished(currPage >= count/loadOnceAmount - 1);
            setIsLoading(false);
        }).finally(() => {
            if(ignore){
                return
            }
            console.log('加载数据及渲染成功！本次加载数据的页码是', currPage);
            // console.log('isLoading :', isLoading);
        })
        return()=> {
            ignore = true;
        }
    }, [currPage])*/

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
    function fetchPageData(){
        if(isFinished && isLoading){
            return
        }
        console.log('Try to fetch');
        // const toLoadPage = currPage + 1;
        GetWorkByPage({
            page: currPage,
            pageSize: loadOnceAmount,
            searchText: params.text
        }).then(res => {
            const data = res.data;
            const pageData = data.data;
            const count = data.count;
            if(currPage === 0) {
                setVisibleData([...pageData]);
            }else {
                setVisibleData([...visibleData, ...pageData]);
            }
            //setVisibleData([...visibleData, ...pageData]);
            // setCurrPage(toLoadPage);
            setIsFinished(currPage >= count/loadOnceAmount - 1);
            setIsLoading(false);
            console.log('fetch成功！本次加载数据的页码是', currPage);
            setCurrPage(c => c+1);
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
interface DetectLoadingAreaProps {
    detectRef: LegacyRef<HTMLDivElement>; // 将 detectRef 声明为可选属性
}

function DetectLoadingArea ({ detectRef }: DetectLoadingAreaProps ) {
    return(
        <div ref={detectRef} className={styles.detectArea}>
            <div>Detecting</div>
        </div>
    )
}

export default Home;