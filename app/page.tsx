"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  //! API'dan aldığım verileri localStorage'a kaydettim. Çünkü değişiklikleri client side'da yapıcaz. Eğer local'de post varsa da tekrar istek atmıyorum API'a.
  useEffect(() => {
    const stored = localStorage.getItem("robosmePosts");
    if (stored) {
      setPosts(JSON.parse(stored));
    } else {
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
        .then((res) => {
          setPosts(res.data);
          localStorage.setItem("robosmePosts", JSON.stringify(res.data));
        })
        .catch((error) => {
          console.error("Something went wrong:", error);
        });
    }
  }, []);

  //! Ekranda filtrelenmiş postları gösteriyoruz. Burda postlarda ve search değerinde güncelleme oldukça filtrelenmiş blogları güncelliyoruz.
  useEffect(() => {
    const normalizedSearch = search.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.body.toLowerCase().includes(normalizedSearch)
    );
    setFilteredPosts(filtered);
  }, [search, posts]);

  return (
    <div className="w-full p-14 flex justify-center">
      <div className="w-full max-w-[1240px] flex flex-col gap-24 shadow-md rounded-md">
        <div className="w-full p-4 flex items-center justify-between gap-16">
          <p className="text-2xl font-medium">POSTS</p>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[285px] shadow-md rounded-md p-2"
          />
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 p-4">
          {filteredPosts.map((post, index) => {
            return (
              <Link
                href={"/post/" + post?.id}
                key={index}
                className="post-item flex flex-col items-center gap-6 shadow-md rounded-md p-6 hover:-translate-y-1 animated"
              >
                <p className="text-lg text-center font-medium line-clamp-1">
                  {post?.title}
                </p>
                <p className="line-clamp-3 text-center">{post?.body}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
