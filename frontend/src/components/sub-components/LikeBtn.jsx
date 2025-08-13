import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThumbsUp } from "lucide-react"
import axios from "axios"

export default function LikeButton({ postId, initialLiked = false, initialCount = 0 }) {
  const [isLike, setIsLike] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(initialCount)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchLikes = async () => {
        const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/blogs/${postId}/totalLikes`,
        { withCredentials: true }
      )
      setLikeCount(res.data.likeCount);
    }
    fetchLikes();
  },[likeCount])
  const handleLike = async () => {
    try {
      setLoading(true)
      setIsLike(prev => !prev)
      setLikeCount(prev => (isLike ? prev - 1 : prev + 1))

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/blogs/${postId}/like`,
        {},
        { withCredentials: true }
      )

      setIsLike(res.data.likes?.includes(/* your logged in user id */))
      setLikeCount(res.data.likeCount)
    } catch (error) {
      // console.error(error)
      setIsLike(prev => !prev)
      setLikeCount(prev => (isLike ? prev + 1 : prev - 1))
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.button
      className="ml-auto flex items-center gap-2 transition relative"
      onClick={handleLike}
      disabled={loading}
      whileTap={{ scale: 0.85 }}
    >
      {/* Icon with smooth color change */}
      <motion.div
        animate={{
          scale: isLike ? [1, 1.4, 1] : 1,
          rotate: isLike ? [0, -10, 10, 0] : 0,
          color: isLike ? "#ef4444" : "#9ca3af", // red-500 : gray-400
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative"
      >
        <ThumbsUp
          className="w-6 h-6"
          style={{
            transition: "color 0.3s ease", // smooth color fade
            color: isLike ? "#f31313ff" : "#9ca3af",
          }}
        />

        {/* Burst animation */}
        <AnimatePresence>
          {isLike && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-full border-2 border-red-400"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Text with smooth color change */}
      <motion.span
        animate={{
          color: isLike ? "#ef4444" : "#6b7280",
        }}
        transition={{ duration: 0.3 }}
        className="font-medium"
      >
        {isLike ? "Liked" : "Like"}
      </motion.span>

      {/* Count animation */}
      <motion.span
        key={likeCount}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-sm text-gray-500"
      >
        {likeCount > 0 && `(${likeCount})`}
      </motion.span>
    </motion.button>
  )
}
