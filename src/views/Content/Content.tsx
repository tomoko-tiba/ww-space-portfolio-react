import styles from './Content.module.less';
import { useEffect, useState } from 'react';
import HtmlComp from './HtmlComp';
import GetInTouchIcon from '@/components/GetInTouchIcon';
import { Work, GetWorkById } from '@/api/works';
import { useNavigate, useParams } from 'react-router-dom';
import LikeIcon from '@/components/LikeIcon';

const Content: React.FC = () => {
  // const [isMuted, setIsMuted] = useState(false);
  const [data, setData] = useState<Work | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    GetWorkById(String(params.id))
      .then((res) => {
        if (ignore) {
          return;
        }
        setData(res.data);
        console.log('content 请求成功');
      })
      .catch((err) => {
        if (ignore) {
          return;
        }
        const res = err.response;
        if (res?.status === 404) {
          console.log(404);
          navigate('/404');
        }
      });
    document.title = `${data?.title}-ww-space`;

    return () => {
      ignore = true;
    };
  }, [params.id, navigate]);

  return (
    <>
      {!data ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className={styles.main}>
          <div className={styles.contentContainer}>
            {/* 标题 */}
            <div className={styles.title}>
              <span className={styles.titleText}>{data.title}</span>
            </div>
            {/* 信息栏  */}
            <div className={styles.infoBar}>
              <div className={styles.info}>
                <div className={styles.userPhoto}>
                  <a href={data.userSrc}>
                    <img src={data.userPhoto} />
                  </a>
                </div>
                <div className={styles.details}>
                  <div className={styles.userName}>{data.userName}</div>
                  <div className={styles.status}>
                    <span className={styles.like}>Likes: {data.likes}</span>
                    <span className={styles.time}>项目时间: {data.time}</span>
                  </div>
                </div>
              </div>
              <div className={styles.infoRight}>
                <div className={styles.likeAction}>
                  <LikeIcon type={'big'} workId={data.id} outlined={true} />
                </div>
                <GetInTouchIcon mediaQuery={true} />
              </div>
            </div>
            {/* 头图 */}
            {/**  视频版
                <div className={styles.mediaHeader}>
                    <div className={styles.videoPlayer}>
                        <video className={styles.video} preload="auto" src="https://cdn.dribbble.com/userupload/12617184/file/original-ec1cf0981b84ce8e15c20f2422737ae4.mp4"  draggable="false" ></video>
                        <div className={styles.progressBar}></div>
                        <div className={styles.toggleMuteButton} onClick={()=>{ setIsMuted(!isMuted) }}>
                            { isMuted ? <MuteButton/> : <UnmuteButton/> }
                        </div>
                    </div>
                </div> */}
            <div className={styles.mediaHeader}>
              <div className={styles.imgHeader}>
                <img src={data.imgSrc}></img>
              </div>
            </div>
            {/* 正文 */}
            <div className={styles.richtextContainer}>
              <HtmlComp htmlContent={data.content} />
            </div>
            {/* 介绍 */}
            <div className={styles.userDetails}>
              <div className={styles.photo_detail}>
                <span className={styles.userLine}></span>
                <div className={styles.userPhotoBelow}>
                  <img src={data.userPhoto}></img>
                </div>
                <span className={styles.userLine}></span>
              </div>
              <div className={styles.name_detail}>{data.userName}</div>
              <div className={styles.intro_detail}>{data.userIntro}</div>
              <GetInTouchIcon />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/*
function MuteButton (){
    return(
        <svg height="24" fill="currentColor" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false">
            <path d="M3 6a3 3 0 00-3 3v6a3 3 0 003 3h2.649L12 23V1L5.649 6zm17 6a8.251 8.251 0 00-2.271-5.686 1 1 0 00-1.454 1.374 6.253 6.253 0 010 8.626 1 1 0 101.453 1.374A8.25 8.25 0 0020 12zM18.6 1.2a1 1 0 10-1.2 1.6 11.5 11.5 0 010 18.4 1 1 0 101.2 1.6 13.5 13.5 0 000-21.6z"></path>
        </svg>
    )

}

function UnmuteButton (){
    return(
        <svg height="24" fill="currentColor" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" >
            <path d="M21.414 12l2.293-2.293a1 1 0 00-1.414-1.414L20 10.586l-2.293-2.293a1 1 0 00-1.414 1.414L18.586 12l-2.293 2.293a1 1 0 101.414 1.414L20 13.414l2.293 2.293a1 1 0 001.414-1.414zM3 6a3 3 0 00-3 3v6a3 3 0 003 3h2.649L12 23V1L5.649 6z"></path>
        </svg>
    )
}

*/

export default Content;
