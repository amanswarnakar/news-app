import { useRouter } from "next/router";
import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

interface NewsItemProps {
  data?: any;
  onClick?: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ data, onClick }) => {
  const router = useRouter();
  const databaseRef = collection(db, "CRUD Data");

  const [isFavorite, setIsFavorite] = useState(false);

  const addData = () => {
    addDoc(databaseRef, data)
      .then(() => {
        alert("Data Sent");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div
      onClick={onClick}
      className="bg-blue-50 h-fit cursor-pointer m-4 rounded-md"
    >
      <div className="bg-[#1f2937] flex items-center text-white py-2 px-4 rounded-t-md">
        <div className="mr-4">{data?.title}</div>
        <div
          onClick={() => {
            setIsFavorite(true);
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </div>
      </div>
      <div className="flex min-h-full">
        <div className="md:w-2/4 min-h-full px-3 py-2">
          <div className="flex flex-col">
            {data?.content?.substring(0, 120) + "..."}
            <span className="underline text-sky-600">Read more</span>
            {data?.author !== null && (
              <div className="text-right">{`- ${data?.author}`}</div>
            )}
          </div>
        </div>
        <div className="hidden md:block w-2/4 min-h-full">
          <img
            className="h-full object-cover object-center"
            src={data?.urlToImage}
            alt="News Image"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsItem;

/*
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
*/
