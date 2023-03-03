import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

function Aboutme(props) {
  const { data, error, loading } = useFetch(`/daumcafe/popular/article`);
  const [url, setUrl] = useState("");
  const getData = async () => {
    try {
      const ranks = data.articles.find(
        (el, i) => el.cafeName === "＊여성시대＊ 차분한 20대들의 알흠다운 공간"
      );
      setUrl(ranks.readUrl);
    } catch (err) {
      console.log(err);
    }
  };
  const go = (getUrl) => {
    window.open(getUrl, "_blank");
  };
  useEffect(() => {
    if (!loading && !error && data) {
      getData();
    }
  }, [data, error, loading]);
  useEffect(() => {
    if (typeof window !== "undefined" && url !== "") {
      go(url);
    }
  }, [url]);

  return <div></div>;
}

export default Aboutme;
