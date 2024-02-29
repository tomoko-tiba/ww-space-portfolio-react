import { like } from '@/api/works';
import { useLikeMap } from '@/store/useLikeMap';
import styles from './LikeIcon.module.less'
import classNames from 'classnames';

interface likeIconProps {
    type: string;
    workId: number;
    onChange?: (action: string) => void
}

const LikeIcon: React.FC<likeIconProps> = (props) => {
    const { type, workId, onChange } = props
    const { likeMap, handleLike, handleUnlike } = useLikeMap();
    const isLike = !!likeMap[workId];

    return(
        <div className={classNames(type === "small" ? styles.smallLike : styles.bigLike, { [styles.active]: isLike })} 
            onClick={e =>{ 
                e.stopPropagation();
                const action = isLike ? 'unlike' : 'like'
                like(workId, action).then(() => {
                    isLike ? handleUnlike(workId) : handleLike(workId)
                    onChange && onChange(action)
                    console.log('点赞成功')
                })
                }}>
            <svg className={styles.likeIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="img">
                <path strokeWidth={1.5} d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z" stroke="currentColor" ></path>
            </svg>
        </div>
    )
}

export default LikeIcon