import { ArrowRight } from "lucide-react";

const rooms = [
  {
    name: "Standard Room",
    price: "$80",
    image: "/images/room-standard.png",
    description:
      "A cozy retreat with warm wood tones and a garden view.",
  },
  {
    name: "Deluxe Room",
    price: "$120",
    image: "/images/room-deluxe.png",
    description:
      "Spacious comfort with a king bed and luxury interior.",
  },
  {
    name: "Suite",
    price: "$180",
    image: "/images/room-suite.png",
    description:
      "Premium accommodation with private terrace.",
  },
];

export function Rooms({ onBooking }) {
  return (
    <section id="rooms" className="bg-gray-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-700">
            Accommodation
          </p>

          <h2 className="text-5xl font-semibold">
            Rooms designed for rest
          </h2>

          <p className="mt-4 text-gray-500">
            Contemporary luxury with authentic Khmer comfort.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">

          {rooms.map((room) => (
            <article
              key={room.name}
              className="overflow-hidden rounded-xl bg-white shadow transition hover:shadow-xl"
            >

              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6">

                <div className="flex justify-between">

                  <h3 className="text-2xl font-semibold">
                    {room.name}
                  </h3>

                  <span className="font-bold text-yellow-700">
                    {room.price}
                  </span>

                </div>

                <p className="mt-3 text-gray-500">
                  {room.description}
                </p>

                <button
                  onClick={onBooking}
                  className="mt-6 flex items-center gap-2 text-yellow-700"
                >
                  Book Now
                  <ArrowRight size={16} />
                </button>

              </div>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
}