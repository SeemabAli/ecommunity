import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SIGNOUT_API_URL = "/api/user/signout";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch(SIGNOUT_API_URL, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    navigate(`/search?${urlParams.toString()}`);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-lg text-primary-foreground font-bold text-2xl shadow-lg"
            >
              EB
            </motion.div>
            <span className="font-semibold text-xl hidden sm:inline-block">
              E-community
            </span>
          </Link>

          {/* Desktop Navigation (Hidden on Small Screens) */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-primary/10">
              {t("home")}
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-primary/10">
              {t("about")}
            </Link>
            <Link to="/projects" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-primary/10">
              {t("projects")}
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={currentUser.profilePicture} alt={currentUser.username} />
                      <AvatarFallback>{currentUser.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block">{currentUser.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard?tab=profile" className="w-full">{t("profile")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignout}>{t("signOut")}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default">
                <Link to="/sign-in">{t("signIn")}</Link>
              </Button>
            )}
          </nav>

          {/* Mobile Icons (Only Search & Hamburger on Small Screens) */}
          <div className="flex md:hidden items-center space-x-4">
            {/* Search Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* Hamburger Menu */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t"
          >
            <nav className="flex flex-col p-4 space-y-2">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-primary/10" onClick={() => setIsMenuOpen(false)}>
                {t("home")}
              </Link>
              <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-primary/10" onClick={() => setIsMenuOpen(false)}>
                {t("about")}
              </Link>
              <Link to="/projects" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-primary/10" onClick={() => setIsMenuOpen(false)}>
                {t("projects")}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}