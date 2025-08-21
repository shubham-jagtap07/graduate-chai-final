"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */
interface NewsEvent {
  id: string;
  title: string;
  description: string;
  type: "news" | "event";
  category: string;
  date: string;
  time?: string;
  location?: string;
  attendees?: number;
  image?: string;
  featured?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Data (Clean)                                                      */
/* ------------------------------------------------------------------ */
const newsEvents: NewsEvent[] = [
  {
    id: "1",
    title: "Graduate Chai Opens 50th Franchise Location in Bangalore",
    description: "",
    type: "news",
    category: "expansion",
    date: "2025-08-10",
    image: "/images/nae/1.webp",
    featured: true,
  },
  {
    id: "6",
    title: "Graduate Chai Expands into Tier-2 Cities",
    description: "",
    type: "news",
    category: "expansion",
    date: "2025-08-12",
    image: "/images/nae/6.webp",
    featured: true,
  },
  {
    id: "8",
    title: "Graduate Chai Wins Sustainability Excellence Award",
    description: "",
    type: "news",
    category: "awards",
    date: "2025-08-07",
    image: "/images/nae/8.webp",
  },
  {
    id: "9",
    title: "Chai Brewing Masterclass",
    description: "",
    type: "event",
    category: "workshop",
    date: "2025-08-28",
    location: "Graduate Chai Training Center, Pune",
    attendees: 40,
    image: "/images/nae/9.webp",
  },
  {
    id: "11",
    title: "Graduate Chai Opens 50th Franchise Location in Bangalore",
    description: "",
    type: "news",
    category: "expansion",
    date: "2025-08-10",
    image: "/images/nae/11.webp",
    featured: true,
  },
  {
    id: "12",
    title: "Annual Franchise Owner Conference 2025",
    description: "",
    type: "event",
    category: "conference",
    date: "2025-09-15",
    location: "Mumbai Convention Center",
    attendees: 250,
    image: "/images/nae/12.webp",
    featured: true,
  },
  {
    id: "13",
    title: "Graduate Chai Wins 'Best Tea Franchise of the Year' Award",
    description: "",
    type: "news",
    category: "awards",
    date: "2025-08-05",
    image: "/images/nae/13.webp",
  },
  {
    id: "15",
    title: "Sustainability Initiative: Eco-Friendly Packaging Rollout",
    description: "",
    type: "news",
    category: "sustainability",
    date: "2025-07-28",
    image: "/images/nae/15.webp",
  },
  {
    id: "18",
    title: "Graduate Chai Wins Sustainability Excellence Award",
    description: "",
    type: "news",
    category: "awards",
    date: "2025-08-07",
    image: "/images/nae/18.webp",
  },
  {
    id: "19",
    title: "Chai Brewing Masterclass",
    description: "",
    type: "event",
    category: "workshop",
    date: "2025-08-28",
    location: "Graduate Chai Training Center, Pune",
    attendees: 40,
    image: "/images/nae/19.webp",
  },
  {
    id: "21",
    title: "Graduate Chai Launches Eco-Store",
    description: "",
    type: "news",
    category: "sustainability",
    date: "2025-08-01",
    image: "/images/nae/21.webp",
  },
  {
    id: "23",
    title: "Graduate Chai Launches Eco-Store",
    description: "",
    type: "news",
    category: "sustainability",
    date: "2025-08-01",
    image: "/images/nae/23.webp",
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonial Bites                                                 */
/* ------------------------------------------------------------------ */
const testimonialBites = [
  "Graduate Chai फ्रँचायझी घेतल्यावर माझ्या व्यवसायाला नवा वेग मिळाला. ब्रँड सपोर्ट आणि चहा क्वालिटी अप्रतिम आहे.",
  "काही महिन्यांतच Graduate Chai मुळे मला चांगला नफा मिळू लागला. ग्राहकांचा प्रतिसाद खूपच सकारात्मक आहे.",
  "Graduate Chai म्हणजे ग्राहकांचा विश्वास. आमच्या शहरात हा ब्रँड खूपच लोकप्रिय होत आहे.",
  "Graduate Chai फ्रँचायझीमुळे मला स्वतःचा व्यवसाय उभा करण्याची संधी मिळाली. ब्रँड सपोर्ट नेहमीच उत्कृष्ट असतो.",
  "ग्राहक दररोज Graduate Chai साठी परत येतात. त्यामुळे विक्री स्थिर आणि नफा सातत्याने वाढतो आहे.",
  "Graduate Chai कडून मिळणारं ट्रेनिंग आणि मार्केटिंग सपोर्टमुळे माझं काम खूप सोपं झालं.",
  "फक्त काही महिन्यांतच Graduate Chai ने माझं स्वप्न सत्यात उतरवलं. हा ब्रँड खरंच विश्वासार्ह आहे.",
  "Graduate Chai फ्रँचायझी घेतल्यावर मी नोकरी सोडून उद्योजक झालो. व्यवसाय छान चालतो आहे.",
  "Graduate Chai मुळे माझ्या उद्योजकतेला नवीन दिशा मिळाली. महिला उद्योजकांसाठी ही एक उत्तम संधी आहे.",
  "Graduate Chai म्हणजे प्रॉफिट आणि प्रगती. ब्रँड सपोर्टमुळे व्यवसाय वाढवणं सोपं झालं.",
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function NewsEventsSection() {
  const featured = newsEvents.filter((item) => item.featured);
  const others = newsEvents.filter((item) => !item.featured);

  // Function to get testimonial for each card
  const getTestimonialBite = (index: number) => {
    return testimonialBites[index % testimonialBites.length];
  };

  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-amber-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          News & Events
        </motion.h2>

        {/* Featured Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl shadow-md border border-amber-100 hover:shadow-xl transition-all"
              whileHover={{ y: -5 }}
            >
              {/* Image */}
              <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden rounded-t-2xl">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-amber-100">
                    <Coffee className="h-16 w-16 text-amber-600" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
                  {item.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold mt-2 mb-4 text-amber-900">
                  {item.title}
                </h3>

                {/* Only Testimonial Bite - No Description */}
                <div className="bg-amber-50 rounded-lg p-4 mb-4 border-l-4 border-amber-400">
                  <p className="text-sm sm:text-base text-amber-800 italic leading-relaxed font-medium">
                    "{getTestimonialBite(index)}"
                  </p>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>{item.date}</p>
                  {item.time && <p>{item.time}</p>}
                  {item.location && <p>{item.location}</p>}
                  {item.attendees && <p>{item.attendees} attendees expected</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other News & Events */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {others.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl shadow border border-amber-100 hover:shadow-lg transition-all"
              whileHover={{ y: -4 }}
            >
              {/* Image */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-xl">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-amber-100">
                    <Coffee className="h-12 w-12 text-amber-600" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                  {item.category}
                </span>
                <h4 className="text-base sm:text-lg font-semibold mt-2 mb-3 text-amber-900">
                  {item.title}
                </h4>

                {/* Only Testimonial Bite - No Description */}
                <div className="bg-amber-50 rounded-lg p-3 mb-3 border-l-4 border-amber-400">
                  <p className="text-xs sm:text-sm text-amber-800 italic leading-relaxed font-medium line-clamp-3">
                    "{getTestimonialBite(index + featured.length)}"
                  </p>
                </div>

                <div className="text-xs text-gray-600 space-y-1">
                  <p>{item.date}</p>
                  {item.time && <p>{item.time}</p>}
                  {item.location && <p>{item.location}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
