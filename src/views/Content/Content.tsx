import styles from './Content.module.less'
import { useEffect, useState } from 'react';
import HtmlComp from './HtmlComp';
import GetInTouchIcon from '@/components/GetInTouchIcon';
import { useParams } from 'react-router-dom';
import { Work, GetWorkById } from '@/api/works';
import { useNavigate } from 'react-router-dom';

const Content: React.FC = () => {
    /*
    const title: string = 'Shadows & Silhouettes';
    const userName: string = 'Biondic Vladimir';
    const userIntro: string ='Ready for teamwork';
    const userPhoto: string = 'https://cdn.dribbble.com/users/614348/avatars/normal/82403b2913580cf795f8823cf0ba8be5.png?1696330794';
    const userPage = 'https://dribbble.com/Biondic';
    const likes: number = 100;
    const time = new Date('2022-01-01T12:00:00');
    */
    const [isMuted, setIsMuted] = useState(false);
    const params = useParams();
    const [data, setData] = useState<Work | null>(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        let ignore = false;

        GetWorkById(String(params.id)).then(res => {
            if(ignore){
                return;
            }
            setData(res.data); 
            console.log('content 请求成功')

        }).catch( err => {
            if(ignore){
                return;
            }
            const res = err.response;
            if(res?.status === 404){
                console.log(404);
                navigate('/404');
            }
        })

        return ()=> {
            ignore = true;
        }
    }, [params.id, navigate])

    return (
        <>
        {!data ? 'Loading...' : 
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
                                <span className={styles.like}>Likes:  {data.likes}</span>
                                <span className={styles.time}>{data.time}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.infoRight}>
                        <LikeIcon />
                        <GetInTouchIcon/>
                    </div>
                </div>
                {/* 头图 */}
                <div className={styles.mediaHeader}>
                    <div className={styles.videoPlayer}>
                        <video className={styles.video} preload="auto" src="https://cdn.dribbble.com/userupload/12617184/file/original-ec1cf0981b84ce8e15c20f2422737ae4.mp4"  draggable="false" ></video>
                        <div className={styles.progressBar}></div>
                        <div className={styles.toggleMuteButton} onClick={()=>{ setIsMuted(!isMuted) }}>
                            { isMuted ? <MuteButton/> : <UnmuteButton/> }
                        </div>
                    </div>
                </div>
                {/* 正文 */}
                <div className={styles.contentContainer}>
                    <HtmlComp />
                </div>
                {/* 介绍 */}
                <div className={styles.userDetails}>
                    <div className={styles.photo_detail}>
                        <span className={styles.userLine}></span>
                        <img src={data.userPhoto}></img>
                        <span className={styles.userLine}></span>
                    </div>
                    <div className={styles.name_detail}>{data.userName}</div>
                    <div className={styles.intro_detail}>{data.userIntro}</div>
                    <GetInTouchIcon />
                </div>
                
            </div>
        </div>
        }
        </>
    )
}

function LikeIcon () {
    return(
        <div className={styles.likeAction}>
            <svg className={styles.likeIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="img">
                <path strokeWidth="1.5"  d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z" stroke="currentColor" ></path>
            </svg>
        </div>
    )
}

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



export default Content;