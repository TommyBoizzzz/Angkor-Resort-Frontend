export function About() {
  return (
    <section id="about" className="bg-white py-24">

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">

        <div>
          <img
            src="/images/about-resort.png"
            alt="Angkor Resort"
            className="aspect-[4/5] w-full rounded-xl object-cover shadow-lg"
          />
        </div>

        <div>

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-700">
            Welcome
          </p>

          <h2 className="text-5xl font-semibold leading-tight">
            Where Khmer heritage meets modern comfort
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Nestled near the legendary temples of Angkor, our resort is a
            sanctuary of calm. Every detail is designed to make your stay
            unforgettable.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Wake to lush gardens, dine on authentic Cambodian cuisine,
            and unwind beneath the tropical sky.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t pt-8">

            {[
              {
                value: "48",
                label: "Elegant Rooms",
              },
              {
                value: "5★",
                label: "Guest Rating",
              },
              {
                value: "24/7",
                label: "Concierge",
              },
            ].map((stat) => (
              <div key={stat.label}>

                <p className="text-3xl font-bold">
                  {stat.value}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {stat.label}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}