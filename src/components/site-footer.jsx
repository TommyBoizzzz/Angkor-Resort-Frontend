import { MapPin, Phone, Mail } from "lucide-react";
import logo from "../asset/logo.png";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-[#17110B] text-white">

      {/* CTA */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="mb-3 uppercase tracking-[0.3em] text-[#C7A46A]">
              Angkor Resort
            </p>

            <h2 className="max-w-2xl text-4xl font-bold leading-tight lg:text-5xl">
              Ready for your Angkor escape?
            </h2>

            <p className="mt-5 max-w-xl text-white/60">
              Reserve your stay today and experience luxury,
              comfort, and authentic Khmer hospitality.
            </p>

          </div>

          <button className="rounded-xl bg-[#C7A46A] px-10 py-4 font-semibold text-black transition hover:scale-105">
            Book Your Stay
          </button>

        </div>
      </div>

      {/* Main Footer */}

      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-4">

        {/* Logo */}

        <div>

          <img
            src={logo}
            alt="Angkor Resort"
            className="h-24 w-auto"
          />

          <p className="mt-6 text-white/60 leading-7">
            Luxury stay in Siem Reap, Cambodia.
            Experience timeless Khmer elegance and comfort.
          </p>

        </div>

        {/* Explore */}

        <div>

          <h3 className="mb-6 text-lg font-semibold">
            Explore
          </h3>

          <ul className="space-y-4 text-white/60">

            <li>
              <a href="#rooms" className="hover:text-[#C7A46A]">
                Rooms
              </a>
            </li>

            <li>
              <a href="#facilities" className="hover:text-[#C7A46A]">
                Facilities
              </a>
            </li>

            <li>
              <a href="#about" className="hover:text-[#C7A46A]">
                About
              </a>
            </li>

            <li>
              <a href="#home" className="hover:text-[#C7A46A]">
                Gallery
              </a>
            </li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="mb-6 text-lg font-semibold">
            Contact
          </h3>

          <div className="space-y-5 text-white/60">

            <div className="flex gap-3">
              <MapPin size={18} />
              <span>Siem Reap, Cambodia</span>
            </div>

            <div className="flex gap-3">
              <Phone size={18} />
              <span>+855 97 709 8080</span>
            </div>

            <div className="flex gap-3">
              <Mail size={18} />
              <span>stay@angkorresort.com</span>
            </div>

          </div>

        </div>

        {/* Hours */}

        <div>

          <h3 className="mb-6 text-lg font-semibold">
            Hours
          </h3>

          <ul className="space-y-4 text-white/60">

            <li>Reception · 24 Hours</li>

            <li>Check-in · 2:00 PM</li>

            <li>Check-out · 12:00 PM</li>

          </ul>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl justify-between px-6 py-6 text-sm text-white/40">

          <span>
            © {new Date().getFullYear()} Angkor Resort
          </span>

          <span>
            Siem Reap · Cambodia
          </span>

        </div>

      </div>

    </footer>
  );
}