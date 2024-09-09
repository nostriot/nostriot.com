import dotenv from 'dotenv';

dotenv.config();

import Header from './components/header';
import { Fragment } from 'react';

export default async function Home() {

  return (
    <Fragment>
      <Header />
        <div className="h-screen flex items-center justify-center" style={{backgroundColor: '#0F0F12'}}>
            <div>
                <h1 className="text-white text-center text-5xl">Nostriot.com</h1>
                <img src="/logo.jpg" alt="logo" className="w-128 h-128" />
            </div>
        </div>
    </Fragment>
  );
}
