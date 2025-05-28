"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Post } from "@/app/page";

const PostDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  //! Sayfa yüklendiğinde local'deki postları çekerim. useParams ile aldığım id'ye sahip postu bulurum. Postun bilgilerini componentimdeki state'lere yerleştiririm. Eğer post bulamazsa anasayfaya yönlendiririm.
  useEffect(() => {
    const localPosts = localStorage.getItem("robosmePosts");
    if (localPosts) {
      const allPosts: Post[] = JSON.parse(localPosts);
      const foundPost = allPosts.find((post) => post.id === Number(id));
      if (foundPost) {
        setPost(foundPost);
        setTitle(foundPost?.title);
        setBody(foundPost?.body);
      } else {
        router.replace("/");
      }
    }
  }, [id, router]);


  //! Girdiğim verilerle yeni bir post oluşturdum. Local'deki postlardan ilgili postu bulup yeni oluşturduğum post ile güncelledim. Postları tekrardan locale'e kaydettim ve kullanıcıyı bir önceki sayfaya gönderdim.
  const handleSave = () => {
    if (!post) return;
    const updatedPost = { ...post, title, body };
    const localPosts = localStorage.getItem("robosmePosts");
    if (localPosts) {
      const allPosts: Post[] = JSON.parse(localPosts);
      const updatedPosts = allPosts.map((item) =>
        item.id === post.id ? updatedPost : item
      );
      localStorage.setItem("robosmePosts", JSON.stringify(updatedPosts));
      router.push('/')
    }
  };

  if (!post) return <p>Yükleniyor...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 flex flex-col items-center gap-12">
      <h1 className="text-2xl font-medium mb-12">Post Detail</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="py-2 px-3 w-full shadow-md rounded-md border border-white"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={8}
        className="py-2 px-3 w-full shadow-md rounded-md border border-white"
      />

      <button
        onClick={handleSave}
        className="py-3 px-12 w-fit mx-auto bg-[#21267f] text-white text-lg font-medium rounded-md mt-12 cursor-pointer border border-[#21267f] hover:bg-white hover:text-[#21267f] animated"
      >
        KAYDET
      </button>
    </div>
  );
};

export default PostDetailPage;
