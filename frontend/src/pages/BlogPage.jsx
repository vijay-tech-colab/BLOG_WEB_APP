import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Bell, CalendarDays, MessageCircle, User, Send } from "lucide-react";

const testimonials = [
  { name: "Alice", content: "Great blog! Learned a lot." },
  { name: "Bob", content: "Very informative and well written." },
  { name: "Charlie", content: "Awesome content and design." },
];

const blogPosts = [
  {
    title: "Exploring React 2025",
    author: "John Doe",
    createdAt: "Aug 7, 2025",
    image: "https://source.unsplash.com/600x300/?coding",
    comments: ["Excellent post!", "Loved the insights."]
  },
  {
    title: "Why Tailwind CSS is a Game Changer",
    author: "Jane Smith",
    createdAt: "Aug 5, 2025",
    image: "https://source.unsplash.com/600x300/?design",
    comments: ["Very helpful.", "Thanks for sharing!", "Awesome!"]
  },
];

export default function BlogApp() {
  const [newComments, setNewComments] = useState(blogPosts.map(() => ""));
  const [allComments, setAllComments] = useState(blogPosts.map(post => post.comments));

  const handleCommentSubmit = (index) => {
    if (!newComments[index].trim()) return;
    const updatedComments = [...allComments];
    updatedComments[index].push(newComments[index]);
    setAllComments(updatedComments);

    const updatedInputs = [...newComments];
    updatedInputs[index] = "";
    setNewComments(updatedInputs);
  };

  return (
    <div className="font-sans bg-white text-gray-800">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-gray-200 py-4 px-10 flex justify-between items-center shadow-sm sticky top-0 z-50">
       <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">InkSpire</h1>

        <Bell className="w-6 h-6 text-purple-500 cursor-pointer hover:text-purple-700" />
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-100 to-blue-100 text-center py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to My Pretty Blog</h2>
          <p className="text-lg text-gray-600">Insights, tutorials, and updates from the world of web development. Stay inspired and keep learning!</p>
        </div>
      </section>

      {/* Search Box */}
      <div className="flex justify-center py-6">
        <Input placeholder="Search blog posts..." className="w-full max-w-xl border border-gray-300 shadow-sm focus:border-blue-400" />
      </div>

      {/* Main Section */}
      <main className="px-4 py-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">📝 Latest Posts</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden max-w-md mx-auto">
              <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
              <CardContent className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-blue-600">{post.title}</h3>
                  <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" /> {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" /> {post.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" /> {allComments[index].length}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel metus scelerisque.
                  </p>
                </div>

                {/* Comment Section */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold mb-2">Comments</h4>
                  <ul className="space-y-2 mb-3 max-h-32 overflow-y-auto pr-1">
                    {allComments[index].map((comment, cIdx) => (
                      <li key={cIdx} className="text-sm text-gray-700">- {comment}</li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Write a comment..."
                      className="flex-1 text-sm"
                      value={newComments[index]}
                      onChange={(e) => {
                        const updated = [...newComments];
                        updated[index] = e.target.value;
                        setNewComments(updated);
                      }}
                    />
                    <button
                      onClick={() => handleCommentSubmit(index)}
                      className="bg-purple-500 text-white px-3 rounded hover:bg-purple-600 flex items-center"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* About Section */}
      <section className="bg-blue-50 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">🌟 About This Blog</h2>
          <p className="text-gray-700">
            Sharing insights and tutorials on web development, programming, and tech trends. Stay curious and keep learning.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">📬 Contact Us</h2>
          <form className="grid gap-4">
            <Input placeholder="Your Name" className="border border-gray-300" />
            <Input placeholder="Your Email" className="border border-gray-300" />
            <Input placeholder="Your Message" className="h-24 border border-gray-300" />
            <button className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition-colors duration-300">
              Send
            </button>
          </form>
        </div>
      </section>

      {/* Testimonial Section with Carousel */}
      <section className="bg-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6 text-purple-700">💬 What Our Readers Say</h2>
          <Carousel >
            <CarouselContent>
              {testimonials.map((t, index) => (
                <CarouselItem key={index} className="px-4">
                  <Card className="bg-white shadow-sm">
                    <CardContent className="p-6">
                      <p className="text-lg italic mb-4 text-gray-700">"{t.content}"</p>
                      <p className="font-bold text-purple-600">- {t.name}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </div>
  );
}
