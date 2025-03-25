import React from "react";
import img4 from '../Assets/img_4.webp';
import img5 from '../Assets/img_5.webp';
import OptimizedCarousel from './OptimisedCarousel';

import '../MainPage/MainPage.css';

export default function CarouselSlidesOnly() {

  function subscribeMail() {
    console.log('under construction...')
  }


  return (
    <>
      <OptimizedCarousel />

      <section className="flex md:w-[50vw]">
        <div className="mx-auto my-5 py-10 px-4 text-title">
          <h1 className="text-3xl tracking-wider text-center font-medium mb-6">Where Elegance Meets History: Crafting Timeless Narratives Through Antique Treasures</h1>
          <p className="text-[1.05rem] text-gray-600 pt-5 text-justify mb-8">At Antique Story, our passion lies in the art of storytelling through the lens of timeless artifacts. Each piece in our collection holds a unique narrative, a glimpse into a bygone era waiting to be rediscovered. From exquisite home décor to handpicked collectibles, we take pride in curating the most profound stories from the past. We believe that every artifact has a tale to tell, and by preserving these treasures, we offer them a new life. Our mission is to share the beauty of history and allow these stories to transcend time. As you explore our collection, immerse yourself in the rich narratives woven into each piece.</p>
        </div>
      </section>

      <section >
        <div className="flex flex-col mx-auto">
          <div className="md:flex">
            <img src={img4} alt="img 4" className="self-center md:w-1/2 md:h-1/2" />
            <div className="p-6 md:w-1/2 flex flex-col align-center justify-center">
              <h5 className="text-2xl tracking-wider font-small mb-4">EMBRACING OUR PAST, SHAPING OUR TOMORROW</h5>
              <p className="text-md text-gray-500 mb-4">At Antique Story, we cherish India's timeless legacy, preserving artifacts that echo centuries of artistry. Our mission is a bridge between past and future, as we unveil treasures untold. Each piece carries the weight of history, a storyteller of bygone eras. Join us on this journey through time, where the spirit of India lives in every curated artifact. Antique Story: Conserving the past, inspiring the future.</p>
            </div>
          </div>
          <div className="md:flex">
            <div className="p-6 md:w-1/2 flex flex-col align-center justify-center">
              <h5 className="text-2xl tracking-wider font-small mb-4">THE ESSENCE OF ART LIES IN ITS HEART</h5>
              <p className="text-md text-gray-500 mb-4">At Antique Story, our selections are a labor of love, carefully chosen for their profound significance. From rare folk art to intricately carved wooden panels, each object holds deep inspiration, meaning, and joy. Beyond mere decoration, these pieces are life lessons embodied in art. At Antique Story, we redefine art as a reflection of life's essence.</p>
            </div>
            <img src={img5} alt="img 5" className="self-center md:w-1/2 md:h-1/2" />
          </div>

        </div>
      </section>

      <section className="w-full mt-5 py-5 sm:py-5 md:py-5 xl:py-10 ">

        <div className="m-2 flex justify-center md:justify-center">
          <div >
            <h5 className="text-4xl font-light mb-4 text-center">SIGN UP FOR OUR NEWS LETTER AND<br /> NEVER MISS A THING.</h5>
          </div>
        </div>
        <div className="flex mt-10 mb-3 justify-center align-center md:justify-center">
          <div className="md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12">
            <form className="flex justify-center " onSubmit={subscribeMail}>
              <div className="md:w-6/12 ">
                <label htmlFor="email-newsletter-component" className="sr-only">Email Address</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-stone-500 focus:ring-stone-500" id="email-newsletter-component" placeholder="Email Address" aria-label="Email Address" aria-describedby="email-newsletter-help" required />
              </div>
              <div className="md:w-3/12 ml-3 text-center lg:text-left">
                <button type="submit" className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </section>


    </>
  );
}