import Image from "next/image";
import banner from "../../public/pexels-pixabay-247823.jpg";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="relative h-[90vh] w-full">
      {/* Background Image */}
      <Image
        src={banner}
        alt="Banner"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900/70 z-10" />

      {/* Content - Centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-24 z-20 text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
          CampusConnect
        </h2>
        <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center max-w-3xl">
          Achieve Your Dreams. <br /> Book your Course.
        </h1>

        {/* Search Bar */}
        <div className="w-full max-w-2xl bg-white rounded-full shadow-lg overflow-hidden flex mt-4">
          <input
            type="text"
            placeholder="Search courses, programs, or categories..."
            className="flex-grow py-4 px-6 text-gray-700 focus:outline-none"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 transition-colors">
            Search
          </button>
        </div>

        {/* Buttons below search bar */}
        <div className="flex gap-4 mt-8">
          <Link
            href={"/colleges"}
            className="border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-full transition-colors"
          >
            All Colleges
          </Link>
        </div>
      </div>
    </div>
  );
}
