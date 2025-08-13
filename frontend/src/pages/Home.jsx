import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, PenTool } from "lucide-react"
import { motion } from "framer-motion"

export default function BlogHero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 px-6 text-center">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-4"
      >
        <div className="bg-primary/10 p-4 rounded-full">
          <PenTool className="w-8 h-8 text-primary" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-4xl font-bold text-gray-900 sm:text-5xl"
      >
        Welcome to MindMosaic Blog
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-4 max-w-2xl mx-auto text-lg text-gray-600"
      >
        Discover articles, tips, and stories to inspire your next big idea.
      </motion.p>

      {/* Search bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-8 flex justify-center"
      >
        <div className="flex w-full max-w-md items-center space-x-2">
          <Input
            type="text"
            placeholder="Search articles..."
            className="bg-white border border-gray-200"
          />
          <Button variant="default" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </motion.div>
    </section>
  )
}


