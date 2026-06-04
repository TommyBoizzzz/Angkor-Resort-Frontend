function Hero({ search, setSearch }) {
  return (
    <div className="hero">
      <h1>Find Your Perfect Stay</h1>

      <input
        placeholder="Search room..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />
    </div>
  );
}

export default Hero;