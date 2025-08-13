
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export default function AboutSection() {
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800",
      title: "Our Mission",
      desc: "MindMosaic is dedicated to inspiring minds through meaningful stories and creative ideas."
    },
    {
      img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800",
      title: "Our Vision",
      desc: "We aim to build a platform where ideas connect people globally, breaking barriers of language and culture."
    },
    {
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
      title: "Our Team",
      desc: "A passionate group of writers, designers, and developers working together to craft something amazing."
    }
  ]

  const [current, setCurrent] = useState(0)

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1)
  }

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100" id="about">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-900 mb-12"
        >
          About <span className="text-primary">MindMosaic</span>
        </motion.h2>

        {/* Carousel */}
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <motion.img
            key={current}
            src={slides[current].img}
            alt={slides[current].title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-4"
            >
              {slides[current].title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-200 max-w-2xl"
            >
              {slides[current].desc}
            </motion.p>
          </div>

          {/* Controls */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </Button>
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <Quote className="w-10 h-10 mx-auto text-primary mb-4" />
          <p className="text-xl italic text-gray-700">
            “At MindMosaic, we believe every idea is a thread in the vast tapestry of human creativity. We’re here to weave them together.”
          </p>
        </motion.div>
      </div>
    </section>
  )
}
