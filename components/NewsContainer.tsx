import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";
import { useRouter } from "next/router";
import Article from "./Article";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const NewsContainer = () => {
  const router = useRouter();
  const [showingAll, setShowingAll] = useState(true);
  const [currentSelected, setCurrentSelected] = useState({});
  const [favorited, setFavorited] = useState({});

  const [fireData, setFireData] = useState([]);
  const databaseRef = collection(db, "CRUD Data");

  const [data, setData] = useState([
    {
      source: {
        id: null,
        name: "Space.com",
      },
      author: "Mike Wall",
      title:
        "India's Chandrayaan-3 snaps close-up photos of moon ahead of landing try (video) - Space.com",
      description:
        "Chandrayaan-3 is gearing up for a touchdown attempt on Aug. 23 or Aug. 24.",
      url: "https://www.space.com/india-chandrayaan-3-moon-photos-august-2023",
      urlToImage:
        "https://cdn.mos.cms.futurecdn.net/bSfB52kSeSs8zSxnXgnYn6-1200-80.jpg",
      publishedAt: "2023-08-18T16:01:44Z",
      content:
        "India's Chandrayaan-3 probe has captured more amazing imagery of the moon ahead of its historic touchdown try, which is just a few days away.\r\nChandrayaan-3 launched on July 14, on a mission to pull … [+2364 chars]",
    },
  ]);

  const fetchNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=55b6a825a3b642caae7c764b519ebfc1`;

    try {
      const response = await axios.get(url);
      setData(response?.data?.articles);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div
      className={
        showingAll
          ? `container grid md:grid-cols-2 lg:grid-cols-3 mx-auto`
          : "w-full"
      }
    >
      {showingAll &&
        data?.map((item) => (
          <NewsItem
            onClick={() => {
              setShowingAll(false);
              setCurrentSelected(item);
            }}
            data={item}
          />
        ))}
      {!showingAll && (
        <div className="min-w-[100%]">
          <div
            className="cursor-pointer min-w-full"
            onClick={() => setShowingAll(true)}
          >
            <ArrowBackIcon /> Back
          </div>
          <Article data={currentSelected} />
        </div>
      )}
    </div>
  );
};

export default NewsContainer;

/* 
{
    "status": "ok",
    "totalResults": 38,
    "articles": [
        {
            "source": {
                "id": null,
                "name": "Space.com"
            },
            "author": "Mike Wall",
            "title": "India's Chandrayaan-3 snaps close-up photos of moon ahead of landing try (video) - Space.com",
            "description": "Chandrayaan-3 is gearing up for a touchdown attempt on Aug. 23 or Aug. 24.",
            "url": "https://www.space.com/india-chandrayaan-3-moon-photos-august-2023",
            "urlToImage": "https://cdn.mos.cms.futurecdn.net/bSfB52kSeSs8zSxnXgnYn6-1200-80.jpg",
            "publishedAt": "2023-08-18T16:01:44Z",
            "content": "India's Chandrayaan-3 probe has captured more amazing imagery of the moon ahead of its historic touchdown try, which is just a few days away.\r\nChandrayaan-3 launched on July 14, on a mission to pull … [+2364 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "NDTV News"
            },
            "author": null,
            "title": "\"I Am Evil...\": British Nurse Guilty Of Killing 7 Newborns In A Year - NDTV",
            "description": "A British nurse was on Friday found guilty of murdering seven newborn babies and trying to murder six others at the hospital neonatal unit where she worked with sick and premature infants.",
            "url": "https://www.ndtv.com/world-news/british-nurse-33-found-guilty-of-killing-seven-babies-4309643",
            "urlToImage": "https://c.ndtvimg.com/2023-08/h7cvgqmo_lucy-letby_625x300_18_August_23.jpg",
            "publishedAt": "2023-08-18T15:49:00Z",
            "content": "The jury at Manchester Crown Court reached its verdicts after deliberating for 22 days.\r\nLondon: A British nurse was found guilty Friday of murdering seven newborn babies and trying to murder six oth… [+3869 chars]"
        },
    ]
}
*/
