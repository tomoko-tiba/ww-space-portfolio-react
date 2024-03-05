import Item from '@/views/Home/Item';
import styles from './index.module.less';
import { useState, LegacyRef, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { GetWorkByPage, Work } from '@/api/works';
import { useParams } from 'react-router-dom';
import { Category, getAllCategories } from '@/api/category';

function Home() {
  const loadOnceAmount = 12;
  // 画面在加载
  const [isLoading, setIsLoading] = useState(false);

  // 用于逐次获取数据
  const [visibleData, setVisibleData] = useState<Work[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);

  // 所有数据加载完成
  const [isFinished, setIsFinished] = useState(false);
  const isAutoLoad = (currPage - 1) % 3 !== 0;

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | undefined>();
  // 首次获取分类数据
  useEffect(() => {
    let ignore = false;
    getAllCategories().then((res) => {
      if (ignore) return;
      setCategories(res.data);
    });
    return () => {
      ignore = true;
    };
  }, []);

  const categoryLi = categories.map((c, i) => {
    return (
      <li className={styles.category}>
        <a className={`${categoryId === i ? styles.active : ''}`} onClick={() => setCategoryId(i)}>
          {c.name}
        </a>
      </li>
    );
  });

  const params = useParams();

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setIsFinished(false);
    console.log('currPage :' + currPage);
    console.log('search and first fetch');
    // 这里没有办法直接使用fetchPageData()替代,因为无法使用ignore阻止两次运行fetch data
    GetWorkByPage({
      page: 1,
      pageSize: loadOnceAmount,
      searchText: params.text,
      categoryId: categoryId,
    }).then((res) => {
      if (ignore) return;
      const data = res.data;
      const pageData = data.data;
      const count = data.count;
      setVisibleData([...pageData]);
      setIsFinished(count / loadOnceAmount <= 1);
      setIsLoading(false);
      console.log(params.text + '  ' + typeof params.text);
      console.log('搜索数据成功！');
      setCurrPage(2);
    });
    return () => {
      ignore = true;
    };
  }, [params.text, categoryId]);

  const { ref } = useInView({
    threshold: 0,
    triggerOnce: true,
    onChange(inView) {
      if (inView) {
        console.log('inView');
        setIsLoading(true);
        if (currPage > 1 && isAutoLoad) fetchPageData(currPage);
      }
    },
  });

  // 逐次获取数据
  const fetchPageData = useCallback(
    (pageCount: number) => {
      if (isFinished && isLoading) {
        return;
      }
      console.log('Try to fetch');
      GetWorkByPage({
        page: pageCount,
        pageSize: loadOnceAmount,
        searchText: params.text,
      }).then((res) => {
        const data = res.data;
        const pageData = data.data;
        const count = data.count;
        if (currPage === 1) {
          setVisibleData([...pageData]);
        } else {
          setVisibleData([...visibleData, ...pageData]);
        }
        setIsFinished(currPage >= count / loadOnceAmount);
        setIsLoading(false);
        console.log('fetch成功！本次加载数据的页码是', currPage);
        setCurrPage(pageCount + 1);
      });
    },
    [currPage, isFinished, isLoading, params.text, visibleData],
  );

  return (
    <>
      <div className={styles.main}>
        <div className={styles.bar}>
          <ul className={styles.categoryBar}>
            <li className={styles.category}>
              <a
                className={`${categoryId === undefined ? styles.active : ''}`}
                onClick={() => setCategoryId(undefined)}
              >
                Discover
              </a>
            </li>
            {categoryLi}
          </ul>
        </div>
        <ol className={styles.contentsList}>
          {visibleData.map((data) => (
            <Item
              data={data}
              key={data.id}
              onLikeChange={(action) => {
                setVisibleData(
                  visibleData.map((item) => {
                    if (item.id != data.id) {
                      return item;
                    }
                    return {
                      ...item,
                      likes:
                        action === 'unlike'
                          ? item.likes > 0
                            ? item.likes - 1
                            : 0
                          : item.likes + 1,
                    };
                  }),
                );
              }}
            />
          ))}
        </ol>
      </div>
      <div className={styles.loadMoreButton}>
        {!isAutoLoad && (
          <button className={styles.button} onClick={() => fetchPageData(currPage)}>
            Load more work
          </button>
        )}
        {isLoading && !isFinished && isAutoLoad && 'Loading'}
        {!isLoading && !isFinished && <DetectLoadingArea detectRef={ref} />}
      </div>
    </>
  );
}
interface DetectLoadingAreaProps {
  detectRef: LegacyRef<HTMLDivElement>; // 将 detectRef 声明为可选属性
}

function DetectLoadingArea({ detectRef }: DetectLoadingAreaProps) {
  return (
    <div ref={detectRef} className={styles.detectArea}>
      <div>Detecting</div>
    </div>
  );
}

export default Home;
