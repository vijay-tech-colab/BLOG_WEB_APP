
import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, User, MessageSquare, Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { clearMessagesState, createMessage } from "@/store/slices/messageSlice"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    sender: "",
    email: "",
    subject: "",
    body: ""
  })

  const dispatch = useDispatch()
  const { loading, successMessage } = useSelector(state => state.message)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    // Message create hone ka wait
    const result = await dispatch(createMessage(formData)).unwrap()

    // State clear
    dispatch(clearMessagesState())
    setFormData({
      sender: "",
      email: "",
      subject: "",
      body: ""
    })

    // Success alert (API ka response message ya default text)
    toast.success(result?.message || "Message sent successfully!")

  } catch (error) {
    // console.error("Message send failed:", error)
   toast.error(error?.message || "Failed to send message!")
  }
}


  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.1),transparent_60%)] pointer-events-none"></div>
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-extrabold text-center mb-4"
        >
          Get in <span className="text-primary">Touch</span>
        </motion.h2>
        <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
          Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you shortly.
        </p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 space-y-6 backdrop-blur-sm"
        >
          <div className="space-y-2">
            <label className="font-semibold flex items-center gap-2 text-gray-700">
              <User size={18} /> Name
            </label>
            <Input
              name="sender"
              placeholder="Your full name"
              value={formData.sender}
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold flex items-center gap-2 text-gray-700">
              <Mail size={18} /> Email
            </label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold flex items-center gap-2 text-gray-700">
              <MessageSquare size={18} /> Subject
            </label>
            <Input
              name="subject"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-gray-700">Message</label>
            <Textarea
              name="body"
              placeholder="Write your message here..."
              value={formData.body}
              onChange={handleChange}
              required
              rows={5}
              className="focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
          </div>

          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-full text-lg py-6 bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  )
}
