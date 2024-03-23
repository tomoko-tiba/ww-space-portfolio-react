import Item from '@/views/Home/Item';
import styles from './index.module.less';
import { useState, LegacyRef, useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { GetWorkByPage, Work } from '@/api/works';
import { useParams } from 'react-router-dom';
import { Category, getAllCategories } from '@/api/category';
import scrollIcon from '@/assets/pics/scrollIcon.svg';

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
      document.title = 'ww-space';
    });
    return () => {
      ignore = true;
    };
  }, []);

  const categoryLi = categories.map((c, i) => {
    return (
      <li className={styles.category} key={i + 1}>
        <a
          className={`${categoryId === c.id ? styles.active : ''}`}
          onClick={() => setCategoryId(c.id)}
        >
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

  // const [scroll, setScroll] = useState<number | null>(null);
  const [scrollL, setScrollL] = useState<boolean>(false);
  const [scrollR, setScrollR] = useState<boolean>(false);
  const scrollBarRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!scrollBarRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      // console.log('scrollBarWidth: ' + width);
      if (width > 570) {
        setScrollL(false);
        setScrollR(false);
      } else if (width <= 570) {
        setScrollR(true);
      }
    });
    observer.observe(scrollBarRef.current);
  }, [scrollBarRef]);

  const handleBackwardScroll = () => {
    const ref = scrollBarRef.current;
    if (!ref) return;
    ref.scrollTo({
      left: ref.scrollLeft - ref.offsetWidth - 20,
      behavior: 'smooth', // 使用平滑滚动效果
    });
    setTimeout(() => {
      if (ref.scrollLeft <= 1) {
        setScrollL(false);
      }
      setScrollR(true);
    }, 300);
  };

  const handleForwardScroll = () => {
    const ref = scrollBarRef.current;
    if (!ref) return;
    ref.scrollTo({
      left: ref.scrollLeft + ref.offsetWidth - 20, // 跳到左边的_值
      behavior: 'smooth', // 使用平滑滚动效果
    });

    setTimeout(() => {
      /*
      console.log(ref.scrollLeft);
      console.log(ref.offsetWidth);
      console.log(ref.scrollWidth);*/
      if (ref.scrollLeft + ref.offsetWidth >= ref.scrollWidth - 2) {
        setScrollR(false);
      }
      setScrollL(true);
    }, 300);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.bar}>
          {scrollL && (
            <span className={styles.scroll_backward}>
              <a onClick={handleBackwardScroll}>
                <img className={styles.search_icon} src={scrollIcon} />
              </a>
            </span>
          )}
          {scrollR && (
            <span className={styles.scroll_forward}>
              <a onClick={handleForwardScroll}>
                <img className={styles.search_icon} src={scrollIcon} />
              </a>
            </span>
          )}
          <ul className={styles.categoryBar} ref={scrollBarRef}>
            <li className={styles.category} key={0}>
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
