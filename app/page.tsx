import TextToSpeechForm from "@/components/TextToSpeechForm";


const Home = () => {
  return (
    <section className="container py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">

      <div className="grid lg:grid-cols-2 gap-4">

        {/* speech genarator form */}
        <TextToSpeechForm />

        {/* output */}
        <div className="w-full border border-dashed border-border rounded-md p-4 lg:p-6">
          Output Goes Here
        </div>
      </div>
    </section>
  );
};

export default Home;