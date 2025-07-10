import Image from "next/image";
import banner from "../../public/pexels-pixabay-247823.jpg";

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

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-10 md:px-24 z-20 text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">DreamsCLG</h2>
        <h1 className="text-2xl md:text-4xl font-bold mb-8">
          Achieve Your Dreams. <br /> Book your Course.
        </h1>

        <div className="flex gap-4">
          <button className="btn bg-red-600 text-white hover:bg-red-700 px-6 rounded-full">
            Get Started
          </button>
          <button className="btn border border-white text-white hover:bg-white hover:text-black px-6 rounded-full">
            All Courses
          </button>
        </div>
      </div>
    </div>
  );
}
