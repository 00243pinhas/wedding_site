interface VenueMapProps {
  venueName: string;
  address: string;
}

// No embedded map, no iframe, no Maps JavaScript, no API key, no
// third-party script — see CLAUDE.md non-negotiables. Guests get the
// address as selectable text plus a link out to their own map app.
export function VenueMap({ venueName, address }: VenueMapProps) {
  const directionsHref = `https://maps.google.com/?q=${encodeURIComponent(`${venueName} ${address}`)}`;

  return (
    <div className="border border-blue">
      <div className="space-y-1 p-6 sm:p-8">
        <p className="font-display text-xl text-navy sm:text-2xl">
          {venueName}
        </p>
        <p className="text-ink">{address}</p>
      </div>
      <div className="border-t border-blue p-6 sm:p-8">
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-navy px-8 py-3 text-sm tracking-[0.2em] text-navy uppercase transition-colors duration-[400ms] md:hover:bg-navy md:hover:text-ivory"
        >
          Get directions
        </a>
      </div>
    </div>
  );
}
