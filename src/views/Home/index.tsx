import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Item, {Data} from '@/views/Home/Item'
import styles from './index.module.less'

function Home(){
    const userData: Data = {
        imgSrc : 'https://cdn.dribbble.com/userupload/12437036/file/original-7b4ffb7f12fd2ced3f958f0c36a7b82d.jpg?crop=0x0-1920x1440&amp;resize=320x240&amp;vertical=center',
        itemLink : 'https://dribbble.com/shots/23428893-Intruck-Welcome-Icon-Two-Clay',
        userSrc : 'https://dribbble.com/purrwebui',
        userPhoto: 'https://cdn.dribbble.com/users/5031392/avatars/small/944b08efb66577ba400d5838490ea5b9.png?1597658879',
        userName : 'Purrweb UI/UX Agency'
    }

    return(
        <>
            <Header />
            <div className={styles.main}>
                <ol className={styles.contentsList}>
                    <Item data={userData} />
                    <Item data={userData} />
                    <Item data={userData} />
                    <Item data={userData} />
                    <Item data={userData} />
                    <Item data={userData} />
                    <Item data={userData} />
                    <Item data={userData} />
                </ol>
            </div>
            <Footer />
        </>
    )
}


export default Home