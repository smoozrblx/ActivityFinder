'use client';

import { XMarkIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

function currencyToSymbol(currency) {
    switch(currency) {
        case 'USD': return '$'
        default: return '€'
    }
}

export default function ResultDisplayed({ name, description, location, price, onClose, hours }) {
    
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

    return <div className='z-2 w-full h-full absolute backdrop-blur-xl flex justify-center items-center opacity-0 fade-in'>
        <div className='relative w-96 sm:w-3/5 bg-white/20 rounded-lg h-4/5 p-10 relative flex flex-col justify-between opacity-0 fade-in-scale'>
            <div className="relative h-1/2 w-full">
                <div className="flex flex-col w-full w-full text-justify">
                <span className="text-2xl mb-1">{name}</span>
                <span className="text-base mb-5 opacity-80">{location} — <a
                    href={`https://www.google.com/maps/search/?q=${encodeURIComponent(location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                >
                    View on Google Maps
                </a></span>
                <span className="text-sm my-5 opacity-80">{description}</span>
                {hours && hours.map((hour, index) => {
                    const [day, open, close] = hour;
                    return <div key={index} className="w-1/5 text-xs flex justify-between">
                        <span className="opacity-80">{day}</span>
                        <span className="opacity-50">{open} — {close}</span>
                    </div>
                })}
                </div>
                
                <span className="absolute right-0 bottom-0 text-3xl m-5 opacity-80">{displayPrice}</span>
            </div>
            <XMarkIcon className="absolute right-0 top-0 m-10 cursor-pointer w-6 h-6"
                onClick={() => onClose()}
            />
            <Map location={location}/>
        </div>
        
    </div>
    
}