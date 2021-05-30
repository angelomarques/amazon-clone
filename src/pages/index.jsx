import Cookies from "js-cookie";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { selectItems } from "../slices/basketSlice";
import { setBasket } from "../slices/basketSlice";

export default function Home({ cookies, products }) {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();

  // saving or retrieving data from the cookies
  useEffect(() => {
    if (items.length === 0 && cookies) {
      if (JSON.parse(cookies.basket).length !=0) {
        dispatch(setBasket(JSON.parse(cookies.basket)));
      }
      return;
    }
    Cookies.set("basket", JSON.stringify(items), { expires: 1 });
  }, [items]);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />

        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  const session = await getSession(context);
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  return {
    props: {
      cookies,
      products,
      session,
    },
  };
}

// GET >> https://fakestoreapi.com/products
