import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Home, Info, BookOpen, Mail, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/slices/userSlice";

export default function Header() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {message} = useSelector(state => state.user);


  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/subscriber/check-subscription`,
          { withCredentials: true }
        );
        setIsSubscribed(res.data.isSubscribe);
      } catch (error) {
        // console.log(error);
      }
    })();
  }, []);

  const handleSubscription = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/subscriber/post-subscribe`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsSubscribed(true);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleLogout = async () => {
   dispatch(logoutUser()).unwrap();
  };

  console.log(message);

  const navLinks = [
    { to: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { to: "/blog/about", label: "About", icon: <Info className="w-5 h-5" /> },
    { to: "/blogs", label: "Blog", icon: <BookOpen className="w-5 h-5" /> },
    {
      to: "/blog/contact",
      label: "Contact",
      icon: <Mail className="w-5 h-5" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-xl font-bold text-gray-900">MindMosaic</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6 text-gray-600 font-medium">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-primary"
          >
            <Sun className="w-5 h-5" />
          </Button>

          {/* Subscribe (Desktop) */}
          <Button
            disabled={isSubscribed}
            className="hidden sm:inline-flex"
            onClick={handleSubscription}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>

          {/* Logout (Desktop) */}
          <Button
            variant="outline"
            className="hidden sm:inline-flex"
            onClick={handleLogout}
          >
            Logout
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white flex flex-col justify-center items-center h-full"
            >
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 text-xl text-gray-700 font-medium"
              >
                {navLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 hover:text-primary transition-colors"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}

                <Button
                  disabled={isSubscribed}
                  size="lg"
                  className="mt-4 w-40"
                  onClick={handleSubscription}
                >
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>

                {/* Logout (Mobile) */}
                <Button
                  variant="outline"
                  size="lg"
                  className="mt-4 w-40 flex items-center justify-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </Button>
              </motion.nav>
            </SheetContent>
          </Sheet>
        </motion.div>
      </div>
    </header>
  );
}
