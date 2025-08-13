
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import moment from "moment";

const blogs = [
  {
    id: 1,
    title: "Blog Post One",
    category: "Tech",
    desc: "Short description about blog post one.",
    img: "/images/blog1.jpg",
  },
  {
    id: 2,
    title: "Blog Post Two",
    category: "Design",
    desc: "Short description about blog post two.",
    img: "/images/blog2.jpg",
  },
  {
    id: 3,
    title: "Blog Post Three",
    category: "Marketing",
    desc: "Short description about blog post three.",
    img: "/images/blog3.jpg",
  },
  {
    id: 4,
    title: "Blog Post Four",
    category: "Lifestyle",
    desc: "Short description about blog post four.",
    img: "/images/blog4.jpg",
  },
  {
    id: 5,
    title: "Blog Post Five",
    category: "Business",
    desc: "Short description about blog post five.",
    img: "/images/blog5.jpg",
  },
];

const cardsPerPage = 3;

export default function FeaturedArticlesCarousel({ mostLikeBlog }) {
  const [current, setCurrent] = useState(0);

  // Total pages = total blogs / cards per page (round up)
  const totalPages = Math.ceil(blogs.length / cardsPerPage);

  const prevPage = () => {
    setCurrent(current === 0 ? totalPages - 1 : current - 1);
  };

  const nextPage = () => {
    setCurrent(current === totalPages - 1 ? 0 : current + 1);
  };


  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6 p-5">
        <h2 className="text-3xl font-bold">Latest Articles</h2>
        <div className="flex gap-2">
          <Button size="icon" onClick={prevPage} aria-label="Previous">
            &#8592;
          </Button>
          <Button size="icon" onClick={nextPage} aria-label="Next">
            &#8594;
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          key={current}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {mostLikeBlog.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-80 flex-shrink-0 m-3"
            >
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-sm text-primary font-medium">
                  {blog.category}
                </span>
                <h3 className="text-xl font-semibold mt-2">{blog.title}</h3>
                <p className="text-gray-600 mt-2">{blog.desc}</p>
                <p className="text-xs text-gray-400 mt-1">
                                    Published : {" "}
                                    {moment(blog.createdAt || blog.publishedAt).fromNow()}
                                  </p>
                <Link to={`/blog/${blog._id}`}>
                  <button className="text-primary mt-3 underline hover:no-underline">
                    Read More →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Responsive indicator */}
      <div className="flex justify-center mt-6 space-x-3">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Go to page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
