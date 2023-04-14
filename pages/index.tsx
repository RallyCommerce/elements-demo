import dynamic from 'next/dynamic';
const RallyProvider = dynamic(() => import('../lib/rally/RallyProvider'), {
  ssr: false,
})
import Head from "next/head"
import ProductDetails from "@/components/ProductDetails"
import { useRef } from "react"
import Loader from '../components/common/Loader';
import CheckoutFlow from '../components/CheckoutFlow';

export default function Home() {
  const checkoutFlowContainer = useRef<HTMLDivElement>(null);

  const scrollToCheckout = () => {
    if (checkoutFlowContainer.current) {
      checkoutFlowContainer.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <title>Rally elements</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://develop.js.onrally.dev/elements/styles.css" rel="stylesheet" type="text/css"></link>
      </Head>
      <Loader></Loader>
      <RallyProvider>
        <div className="container">
          <div className="left-column">
            <div className="content">
              <div className="logo">
                <rally-logo config='{"src": "https://img.onrally.dev/media/org_lDa/baab518f-711c-45b6-a497-f40dc5e810a6.png"}'></rally-logo>
                <span className="rally-ml-2">rally.shop</span>
              </div>
              <ProductDetails scrollToCheckout={scrollToCheckout}></ProductDetails>
            </div>
          </div>
          <div className="right-column">
            <div className="content" ref={checkoutFlowContainer}>
              <CheckoutFlow></CheckoutFlow>
            </div>
          </div>
        </div>
      </RallyProvider>
    </>
  )
}