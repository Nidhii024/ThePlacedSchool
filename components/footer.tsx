"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <motion.h3
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              The PlacedSchool
            </motion.h3>
            <p className="text-gray-400 mb-6">Elevate your career with in-demand skills and expert mentorship.</p>
            <div className="flex space-x-4">
              {["twitter", "facebook", "instagram", "linkedin"].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {social === "twitter" && (
                      <>
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </>
                    )}
                    {social === "facebook" && (
                      <>
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </>
                    )}
                    {social === "instagram" && (
                      <>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </>
                    )}
                    {social === "linkedin" && (
                      <>
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </>
                    )}
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Courses",
              links: [
                "AI & Machine Learning",
                "Web Development",
                "Data Science",
                "UX/UI Design",
                "Digital Marketing",
                "Product Management",
              ],
            },
            {
              title: "Resources",
              links: ["Blog", "Tutorials", "Webinars", "Podcast", "Community", "Success Stories"],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Press", "Partners", "Contact", "Privacy Policy"],
            },
          ].map((column, columnIndex) => (
            <div key={columnIndex}>
              <h4 className="text-lg font-bold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <motion.li key={linkIndex} whileHover={{ x: 5 }}>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Placed. All rights reserved.
          </p>

          <div className="flex space-x-6">
            {["Terms", "Privacy", "Cookies"].map((item, index) => (
              <a key={index} href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
                {item}
              </a>
            ))}
          </div>

          <motion.button
            className="mt-6 md:mt-0 flex items-center text-gray-400 hover:text-blue-400 transition-colors"
            whileHover={{ y: -5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="mr-2">Back to top</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
