import styles from './HtmpComp.module.less'
interface HtmlComp{
  htmlContent: string
}
function HtmlComp({htmlContent}: HtmlComp) {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} className={styles.htmlComp}/>;
}

export default HtmlComp;