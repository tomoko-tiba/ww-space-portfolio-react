interface HtmlComp{
  htmlContent: string
}
function HtmlComp({htmlContent}: HtmlComp) {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default HtmlComp;