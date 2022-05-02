import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
} from "next/document";

export default class AppDocument extends Document<DocumentProps> {
  render() {
    return (
      // fallback theme if the context for any reason doesn't work
      <Html>
        <Head>
          <script
            type="module"
            src="https://unpkg.com/pipeline-operator/index.js"
          ></script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
