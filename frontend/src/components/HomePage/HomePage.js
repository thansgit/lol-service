import React from "react";
import poster from '../img/poster.png'
import NeedsModal from "../General/NeedsModal";
import FeelingsModal from '../General/FeelingsModal'
import Footer from "../General/Footer";

const HomePage = () => {
  return (
    <>
      <section className="pb-10 bg-custom-gray h-screen">
        <div className="relative container px-4   mx-auto">
          <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0 mt-5">
              <span className="text-lg font-bold text-custom-green">
                Create posts to educate
              </span>
              <h2 className="max-w-2xl mt-12 mb-12 text-6xl 2xl:text-8xl text-white font-bold font-heading">
                Pen down your ideas{" "}
                <span className="text-custom-yellow">By creating a post</span>
              </h2>
              <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-white">
                Try to keep your post free from life alienating words
              </p>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <img className="w-full rounded-full" src={poster} alt={poster} />
            </div>
            <NeedsModal />
            <FeelingsModal />
          </div>
        </div>

      </section>
      <Footer />
    </>
  );
};

export default HomePage;
