import dotenv from 'dotenv';

dotenv.config();

import Header from './components/header';
import {Fragment} from 'react';

export default async function Home() {

    return (
        <Fragment>
            <Header/>
            <div className="container mx-auto columns-1 px-4">
                <div className="h-screen  flex justify-center">
                    <div className="mt-10">
                        <h1 className="text-white text-5xl">Nostriot.com</h1>
                        <div className="text-white mt-4">
                            <h2 className="text-xl mb-4 text-white">Bringing IoT to Nostr</h2>
                        </div>
                        <div className="text-white">
                            <p className="text-2xl mb-4">Why?</p>
                            <p>Using the Nostr protocol for the Internet of Things could eliminate common
                                problems like vendor lock-in and privacy concerns that plague centralised systems and
                                platforms.</p>

                            <p>Nostr provides a open, permissionless approach allowing for greater interoperability and
                                innovation without reliance on a centralised authority.</p>
                            <p>Devices can communicate directly and securely, enhancing user control and data privacy.
                                By moving away from centralized models, IoT on Nostr not only improves security but also
                                gives users and developers the freedom to build and expand their systems on their own
                                terms.</p>
                        </div>
                        <img src="/logo.jpg" alt="logo" className="w-128 mt-10"/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
