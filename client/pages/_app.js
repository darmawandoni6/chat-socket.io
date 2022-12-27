/* eslint-disable react/jsx-no-constructed-context-values */
import Head from 'next/head';
import Router from 'next/router';

import '@assets/styles/main.scss';
import PopUpLoading from '@components/PopUpLoading';
import { useStore } from '@reducers/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import React from 'react';
import { Provider } from 'react-redux';

NProgress.configure({ showSpinner: true });

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Next Template</title>
      </Head>
      <Provider store={store}>
        <PopUpLoading>{getLayout(<Component {...pageProps} />)}</PopUpLoading>
      </Provider>
    </>
  );
}

export default MyApp;
