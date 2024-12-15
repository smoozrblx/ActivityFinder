
function currencyToSymbol(currency) {
    switch(currency) {
        case 'USD': return '$'
        default: return '€'
    }

}

export default function Result({ name, description, location, delay, price, onSelect }) {

  // Shorten description if it's too long
  if (description.length > 100) {
      description = description.substring(0, 100) + "...";
  }

  let displayPrice = "", free = false;
  if (price) {
    if (price.free) {
        displayPrice = "GRATUIT"
        free = true;
    }
    else if (price.range) {
        displayPrice = price.range.min + " — " + price.range.max;
        if (price.currency) displayPrice += " " + currencyToSymbol(price.currency);
    }
  }

  return (
      <button
          className="relative w-full rounded-lg backdrop-blur-2xl my-2 bg-white/10 p-5 flex flex-col justify-center hover:bg-sky-200/20 transition-all opacity-0"
          style={{
              animation: `fadeInUp 0.8s ease-out ${delay}ms forwards`,
          }}
          onClick={()=>onSelect()}
      >
          <span className="text-base mb-1">{name}</span>
          <span className="text-xs mb-1 opacity-80">{description}</span>
          <span className="text-xs opacity-40">{location}</span>
          <span className={`text-sm font-medium ${free ? 'text-emerald-200' : ''} absolute right-0 bottom-0 m-4 opacity-60`}>{displayPrice}</span>
      </button>
  );
}
