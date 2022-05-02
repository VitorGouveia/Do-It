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
        <Head></Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
