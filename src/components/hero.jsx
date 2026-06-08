export function Hero({ onBooking }) {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <img
        src="/images/hero-resort.png"
        alt="Angkor Resort infinity pool at golden hour in Siem Reap"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 lg:px-10">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-white/80">
          Siem Reap · Cambodia
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
          A luxury stay in the heart of Angkor
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
          Experience comfort, serenity, and timeless Khmer hospitality at our
          exclusive resort, just moments from the ancient temples.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={onBooking}
            className="rounded-lg bg-white px-8 py-3 text-base font-medium text-black"
          >
            Book Your Stay
          </button>

          <a
            href="#rooms"
            className="rounded-lg border border-white/40 bg-white/10 px-8 py-3 text-base text-white backdrop-blur-sm hover:bg-white/20"
          >
            Explore Rooms
          </a>
        </div>
      </div>
    </section>
  );
}