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
      <Html data-theme="omni">
        <Head></Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
