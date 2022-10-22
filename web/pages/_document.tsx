import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="favicon.ico" />
        </Head>
        <body className="dark:bg-darkPrimary">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
