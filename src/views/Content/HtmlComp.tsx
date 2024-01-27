function HtmlComp() {
  const htmlContent = `
    <h1>Familiar. Fully-featured. Mobile optimized.</h1>
    <p>With an open source Core, uncomplicated low-code plug-in structure and additional Premium add-ons, TinyMCE scales with your app as you grow. That&rsquo;s why it&rsquo;s the WYSIWYG editor-of-choice for 1.5M+ developers when they need to build and ship products faster.</p>
    <p><img style="float: right;" role="presentation" src="static/illustration-spot-tiny-images-6993781ec61319effc6b31956dce2120.png" alt="TinyMCE demo image" width="316">Use TinyMCE as:</p>
    <ul>
      <li>A <strong>basic</strong> editor</li>
      <li>An advanced 📝 editor</li>
      <li>An AI-powered 🪄✨ editor</li>
      <li>A {{template-based}} editor</li>
      <li>A totally <span class="highlight"><code>&lt;customized&gt;</code></span> editor</li>
    </ul>
    <h2>Play with this demo to see how it works</h2>
  `;

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default HtmlComp;