import Document, { Head, Html, Main, NextScript } from 'next/document';
import { createGetInitialProps } from '@mantine/next';

const getInitialProps = createGetInitialProps();

class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=Merienda&family=Mulish:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default _Document;

// import Document, { Head, Html, Main, NextScript, DocumentContext } from 'next/document';
// import { ServerStyles, createStylesServer } from '@mantine/next';
// import { getSession } from 'next-auth/react';

// const stylesServer = createStylesServer();

// class _Document extends Document {
//   static async getInitialProps(ctx: DocumentContext) {
//     const initialProps = await Document.getInitialProps(ctx);

//     return {
//       ...initialProps,
//       props: { session: await getSession(ctx) },
//       styles: (
//         <>
//           {initialProps.styles}
//           <ServerStyles html={initialProps.html} server={stylesServer} />
//         </>
//       ),
//     };
//   }

//   render() {
//     return (
//       <Html>
//         <Head>
//           <link
//             href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=Merienda&family=Mulish:wght@300;400;500;600;700;800&display=swap"
//             rel="stylesheet"
//           />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }
// export default _Document;
