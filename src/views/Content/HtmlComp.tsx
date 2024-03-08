import styles from './HtmpComp.module.less';
import Viewer from 'viewerjs';
import { useRef, useEffect } from 'react';
import 'viewerjs/dist/viewer.css';
interface HtmlComp {
  htmlContent: string;
}
function HtmlComp({ htmlContent }: HtmlComp) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const viewer = ref.current ? new Viewer(ref.current, {}) : null;
    return () => {
      viewer && viewer.destroy();
    };
  }, [ref]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} className={styles.htmlComp} ref={ref} />
  );
}

export default HtmlComp;
