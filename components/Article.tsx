import React from "react";

interface ArticleProps {
  data: any;
}

const Article: React.FC<ArticleProps> = ({ data }) => {
  return (
    <div className="mt-6 rounded-md">
      <div className="flex flex-col">
        <div className="bg-[#34455d] text-white px-12 py-8 rounded-md mb-8">
          <h1 className="font-bold text-2xl text-justify">{data.title}</h1>
          {data.author !== null && (
            <h2 className="text-right">- {data.author}</h2>
          )}
        </div>
        <div className="flex min-h-[280px] h-fit">
          <div className="left w-[50%] min-h-[300px] text-justify pr-12">
            <div>
              {data.content.substring(0, 200)}{" "}
              <span>
                {" "}
                <a className="text-sky-600 underline" href={data.url}>
                  Read more
                </a>
              </span>
            </div>
            <div className="text-left mt-4">
              Link to full article:{" "}
              <a className="text-sky-600 underline" href={data.url}>
                {data.url}
              </a>
            </div>
            <div className="mt-4">
              Published at: {new Date(data.publishedAt).toDateString()}
            </div>
          </div>
          <div className="right w-[50%] h-fit min-h-[280px]">
            <img
              className="min-h-[280px] h-fit rounded-md object-cover"
              src={data.urlToImage}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
