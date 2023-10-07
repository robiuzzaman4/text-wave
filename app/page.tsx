import TextToSpeech from "@/components/TextToSpeech";


const Home = () => {
  return (
    <section className="container py-32 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      {/* hero text */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold tracking-tight pb-10">
        Generate Text to Speech in Second!
      </h1>

      {/* speech genarator form */}
      <TextToSpeech />
    </section>
  );
};

export default Home;