import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  PenTool,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

import axios from "axios";
import FeaturedArticlesCarousel from "./FeaturedArticlesCarousel";
import AuthorSpotlightCarousel from "./AuthorSpotlightCarousel";
import Footer from "@/components/sub-components/Footer";
import PopularTagsCloud from "./Populertags";
const tags = [
  "React",
  "JavaScript",
  "CSS",
  "NodeJS",
  "TailwindCSS",
  "WebDev",
  "Frontend",
  "Backend",
  "API",
];

export default function BlogLanding() {
  const [mostLikeBlog, setMostLikeBlog] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/blogs/most-liked`,
        { withCredentials: true }
      );
      setMostLikeBlog(res.data.posts);
      // console.log(res.data)
    };
    fetchLikes();
  }, []);
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* ===== HEADER ===== */}

      {/* ===== HERO ===== */}
      <section
        className="relative py-28 px-6 text-center overflow-hidden"
      
      >
        {/* Gradient overlay */}
        <div className="absolute  bg-gradient-to-b from-white/80 via-white/60 to-white/90 pointer-events-none"></div>

        {/* Content wrapper with relative z-index to stay above overlay */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-primary/20 p-5 rounded-full shadow-md">
              <PenTool className="w-10 h-10 text-primary" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl font-extrabold sm:text-6xl tracking-tight text-gray-900 drop-shadow-sm"
          >
            Welcome to <span className="text-yellow-600">MindMosaic</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-700 drop-shadow-sm"
          >
            Your daily dose of inspiration, ideas, and insights.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex justify-center max-w-lg mx-auto gap-2"
          >
            <Input
              placeholder="Search articles..."
              className="bg-white bg-opacity-90 border border-gray-300 shadow-sm rounded-md"
            />
            <Button className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-md shadow-md">
              <Search className="w-4 h-4" /> Search
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED BLOGS ===== */}
      <FeaturedArticlesCarousel mostLikeBlog={mostLikeBlog} />

      <div>
        <AuthorSpotlightCarousel/>
      </div>

      {/* ===== SUBSCRIBE ===== */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 px-6 text-center bg-primary text-white"
      >
        <Mail className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-4xl font-bold">Stay Updated</h2>
        <p className="mt-2 max-w-xl mx-auto text-primary-foreground/90">
          Subscribe to our newsletter and never miss the latest articles.
        </p>
        <div className="mt-6 flex max-w-md mx-auto gap-2">
          <Input
            placeholder="Enter your email"
            className="bg-white text-gray-900"
          />
          <Button variant="secondary">Subscribe</Button>
        </div>
      </motion.section>
      <PopularTagsCloud tags={tags}/>

      {/* ===== FOOTER ===== */}
      <Footer/>
    </div>
  );
}
