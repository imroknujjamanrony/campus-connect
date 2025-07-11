"use client";

import {
  FaFilePdf,
  FaUniversity,
  FaCalendarAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function ResearchSection() {
  const researchPapers = [
    {
      id: 1,
      title: "The Role of AI in Modern Education",
      college: "BD Demo College",
      date: "2023-06-15",
      link: "https://arxiv.org/pdf/1706.03762.pdf",
    },
    {
      id: 2,
      title: "Green Energy Solutions by Students",
      college: "Tech Scholars Institute",
      date: "2023-04-22",
      link: "https://arxiv.org/pdf/1706.03762.pdf",
    },
    {
      id: 3,
      title: "Mental Health and Academic Pressure",
      college: "Rajshahi College",
      date: "2022-11-12",
      link: "https://arxiv.org/pdf/1706.03762.pdf",
    },
    {
      id: 4,
      title: "Sustainable Tech for Smart Cities",
      college: "Dhaka Engineering Institute",
      date: "2023-08-01",
      link: "https://arxiv.org/pdf/1706.03762.pdf",
    },
    {
      id: 5,
      title: "Cybersecurity Awareness in Students",
      college: "BD Secure Academy",
      date: "2023-01-18",
      link: "https://arxiv.org/pdf/1706.03762.pdf",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        📄 Recommended Research Papers
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {researchPapers.map((paper, index) => (
          <motion.div
            key={paper.id}
            className="border rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 bg-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-blue-700">
              <FaFilePdf /> {paper.title}
            </h3>
            <p className="text-gray-600 flex items-center gap-2 mb-1">
              <FaUniversity /> {paper.college}
            </p>
            <p className="text-gray-500 flex items-center gap-2 mb-4 text-sm">
              <FaCalendarAlt /> {paper.date}
            </p>
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 text-sm"
            >
              View Research <FaExternalLinkAlt />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
