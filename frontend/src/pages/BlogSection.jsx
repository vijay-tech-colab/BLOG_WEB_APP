
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment"; // <-- moment import

export default function BlogSection() {
  const { allBlogs } = useSelector((state) => state.blog);


  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = allBlogs.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 ">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-10"
      >
        Explore Our Blogs and Know about this .
      </motion.h2>

      {/* Search and Categories */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10 sticky top-10 bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10">
        {/* Search */}
        <div className="flex items-center gap-2 w-full sm:w-1/2">
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white border shadow-sm"
          />
          <Button>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {["All", "Development", "Design", "Lifestyle"].map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActiveCategory(cat)}
            >
              <Tag className="w-4 h-4 mr-1" />
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Blog Cards */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-52 object-cover hover:scale-105 transition-transform"
                />
                <CardContent className="p-6">
                  <span className="text-sm text-primary font-medium">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2">{post.title}</h3>

                  {/* Formatted publish date */}
                  <p className="text-xs text-gray-400 mt-1">
                    Published : {" "}
                    {moment(post.createdAt || post.publishedAt).fromNow()}
                  </p>

                  <p className="text-gray-600 mt-2">{post.desc}</p>
                  <Button variant="link" className="mt-3 p-0">
                    <Link to={`/blog/${post._id}`}>Read More →</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No blog posts found.
          </p>
        )}
      </div>
    </section>
  );
}
