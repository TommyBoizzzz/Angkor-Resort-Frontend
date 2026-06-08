import {
  Waves,
  UtensilsCrossed,
  Flower2,
  Wifi,
  PlaneTakeoff,
  Dumbbell,
} from "lucide-react";

const facilities = [
  {
    icon: Waves,
    title: "Swimming Pool",
    description:
      "An infinity pool overlooking lush tropical gardens.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant",
    description:
      "Authentic Khmer cuisine and international favorites.",
  },
  {
    icon: Flower2,
    title: "Spa & Wellness",
    description:
      "Traditional Cambodian treatments to soothe and restore.",
  },
  {
    icon: Wifi,
    title: "Free High-Speed WiFi",
    description:
      "Stay connected throughout the resort.",
  },
  {
    icon: PlaneTakeoff,
    title: "Airport Pickup",
    description:
      "Complimentary airport transfer.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description:
      "Fully equipped gym open 24 hours.",
  },
];

export function Facilities() {
  return (
    <section id="facilities" className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="max-w-2xl">

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-700">
            Amenities
          </p>

          <h2 className="text-5xl font-semibold">
            Everything you need, and more
          </h2>

        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {facilities.map((facility) => {
            const Icon = facility.icon;

            return (
              <div
                key={facility.title}
                className="rounded-xl border bg-white p-8 shadow-sm hover:shadow-lg"
              >
                <Icon size={34} className="text-yellow-700" />

                <h3 className="mt-5 text-2xl font-semibold">
                  {facility.title}
                </h3>

                <p className="mt-3 text-gray-500">
                  {facility.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}