"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

/* ------------- mini inline SVG icons (unchanged) ------------- */
/* FaFacebook, FaInstagram, FaTwitter, FaYoutube definitions … */
/* ------------------------------------------------------------- */

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Products", href: "/products" },
      { name: "Franchise", href: "/franchise" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { name: "Chai Masala", href: "/#products" },
      { name: "Jaggery Premix", href: "/#products" },
      { name: "Tea Cups", href: "/#products" },
      // { name: "Gift Hampers", href: "/#products" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Shipping Policy", href: "/shipping" },
      { name: "Refund Policy", href: "/refund" },
    ],
  },
];

const socialLinks = [
  { icon: <FaFacebook />, href: "#" },
  {
    icon: <FaInstagram />,
    href: "https://www.instagram.com/nilesh_graduatechaiwala/",
  },
  { icon: <FaTwitter />, href: "#" },
  { icon: <FaYoutube />, href: "https://www.youtube.com/@graduate_chai_" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-14 sm:pt-20 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ---------- top grid ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* logo + blurb */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/logo.png"
              alt="Graduate Chai"
              width={200}
              height={48}
              className="h-10 lg:h-12 w-auto mb-6"
            />

            <div className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
              <p className="font-semibold text-gray-200 mb-2">
                GRADUATE GULACHA CHAHA ANI LASSI PRIVATE LIMITED
              </p>
              <p className="mb-2">
                SARVE NO 327/A/41, NEAR GHOGARE HOSPITAL, LOKRUCHI NAGAR, NEAR GHOGARE HOSPITAL, RAHATA,
                Ahilyanagar, Maharashtra 423107
              </p>
              <p className="mb-1">
                contact: <a className="hover:text-white" href="tel:9730636550">9730636550</a>
              </p>
              <p>
                email: <a className="hover:text-white" href="mailto:support@graduate.in">support@graduate.in</a>
              </p>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map(({ icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* link sections */}
          {footerLinks.map((section, sIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (sIdx + 1) }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-5">
                {section.title}
              </h3>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-base md:text-lg transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-gray-500 text-sm"
        >
          <p>© {year} Graduate Chai & Products. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ in India</p>
        </motion.div>
      </div>
    </footer>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// // Using direct SVG icons as fallback since react-icons/fa is not available
// interface IconProps {
//   className?: string;
// }

// const FaFacebook = ({ className = "" }: IconProps) => (
//   <svg
//     className={`w-5 h-5 ${className}`}
//     fill="currentColor"
//     viewBox="0 0 24 24"
//     aria-hidden="true"
//   >
//     <path
//       fillRule="evenodd"
//       d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// const FaInstagram = ({ className = "" }: IconProps) => (
//   <svg
//     className={`w-5 h-5 ${className}`}
//     fill="currentColor"
//     viewBox="0 0 24 24"
//     aria-hidden="true"
//   >
//     <path
//       fillRule="evenodd"
//       d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// const FaTwitter = ({ className = "" }: IconProps) => (
//   <svg
//     className={`w-5 h-5 ${className}`}
//     fill="currentColor"
//     viewBox="0 0 24 24"
//     aria-hidden="true"
//   >
//     <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//   </svg>
// );

// const FaYoutube = ({ className = "" }: IconProps) => (
//   <svg
//     className={`w-5 h-5 ${className}`}
//     fill="currentColor"
//     viewBox="0 0 24 24"
//     aria-hidden="true"
//   >
//     <path
//       fillRule="evenodd"
//       d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// const footerLinks = [
//   {
//     title: "Navigation",
//     links: [
//       { name: "Home", href: "/" },
//       { name: "About Us", href: "/about" },
//       { name: "Products", href: "/#products" },
//       { name: "Franchise", href: "/franchise" },
//       { name: "Contact Us", href: "/#contact" },
//     ],
//   },
//   {
//     title: "Products",
//     links: [
//       { name: "Chai Masala", href: "/#products" },
//       { name: "Jaggery Premix", href: "/#products" },
//       { name: "Tea Cups", href: "/#products" },
//       { name: "Gift Hampers", href: "/#products" },
//     ],
//   },
//   {
//     title: "Legal",
//     links: [
//       { name: "Privacy Policy", href: "/privacy" },
//       { name: "Terms of Service", href: "/terms" },
//       { name: "Shipping Policy", href: "/shipping" },
//       { name: "Refund Policy", href: "/refund" },
//     ],
//   },
// ];

// const socialLinks = [
//   { icon: <FaFacebook className="w-5 h-5" />, href: "#" },
//   { icon: <FaInstagram className="w-5 h-5" />, href: "#" },
//   { icon: <FaTwitter className="w-5 h-5" />, href: "#" },
//   { icon: <FaYoutube className="w-5 h-5" />, href: "#" },
// ];

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gray-900 text-white pt-12 sm:pt-16 pb-6 sm:pb-8">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
//           {/* Logo and description */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="col-span-1"
//           >
//             <div className="mb-4 sm:mb-6">
//               <img
//                 src="/images/logo.png"
//                 alt="Graduate Chai"
//                 className="h-8 sm:h-10 lg:h-12 w-auto"
//               />
//             </div>
//             <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
//               Engage with the sweetest cup of tea in India. The Educated Taste!
//             </p>
//             <div className="flex space-x-3 sm:space-x-4">
//               {socialLinks.map((social, index) => (
//                 <motion.a
//                   key={index}
//                   href={social.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-400 hover:text-white transition-colors duration-300"
//                   whileHover={{ y: -3 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   {social.icon}
//                 </motion.a>
//               ))}
//             </div>
//           </motion.div>

//           {/* Footer links */}
//           {footerLinks.map((section, sectionIndex) => (
//             <motion.div
//               key={section.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.1 * (sectionIndex + 1) }}
//               className="col-span-1"
//             >
//               <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
//                 {section.title}
//               </h3>
//               <ul className="space-y-1.5 sm:space-y-2">
//                 {section.links.map((link, linkIndex) => (
//                   <li key={linkIndex}>
//                     <Link
//                       href={link.href}
//                       className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base"
//                     >
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>

//         {/* Divider */}
//         <div className="border-t border-gray-800 my-6 sm:my-8"></div>

//         {/* Copyright */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="text-center text-gray-500 text-xs sm:text-sm"
//         >
//           <p>© {currentYear} Graduate Chai & Products. All rights reserved.</p>
//           <p className="mt-1 sm:mt-2">Made with ❤️ in India</p>
//         </motion.div>
//       </div>
//     </footer>
//   );
// }
