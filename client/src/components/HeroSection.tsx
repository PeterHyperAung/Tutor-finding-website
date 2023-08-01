import Link from "next/link";
import HeroImage from "../assets/svg/teaching.svg";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div>
      <main className="max-w-[1300px] mx-auto lg:h-[912px] h-[920px] px-5">
        <div className="flex lg:justify-between justify-center items-center h-[100%] lg:gap-10 gap-20 lg:flex-row flex-col">
          <div className="lg:w-[600px] lg:px-0 md:w-[620px] w-[100%] px-2 lg:text-left text-center">
            <h1 className="text-4xl mb-3">Find the right tutor for you</h1>
            <p className="mb-4 md:text-base text-sm">
              Tutor hub is the place where students can find the right tutor and
              tutor can find the right student. For the past few years, we did a
              lot of researches about the difficulties for both students and
              tutors and we found out that most students have a hard time
              finding the tutor who is compatible with their learning style and
              vice versa for the tutors. Therefore, we created this platform in
              order to solve this common occuring problems around the world.
            </p>
            <Link href="/signup">Learn more</Link>
          </div>
          <div className="lg:px-0 px-10">
            <Image src={HeroImage} alt="Hero Image" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;
