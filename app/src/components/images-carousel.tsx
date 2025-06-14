import { useEffect, useState } from "react";

type ImageObject = {
    src: string
}

export default function ImagesCarousel() {
    const delayMs = 5000
    const [ idx, setIdx ] = useState(0);
    // Guarda le immagini in public/login-images
    const images: ImageObject[] = [...Array(6).keys()].map(idx => ({
        src: import.meta.env.BASE_URL
            .concat("login-images/")
            .concat(idx + 1 < 10 ? `0${idx + 1}`: (idx + 1).toString())
            .concat(".avif")
    }))

    useEffect(() => {
        const interval = setInterval(() => {
            setIdx(prev => (prev + 1) % images.length);
        }, delayMs);
        return () => clearInterval(interval);
    }, []);

    return <img
        src={images[idx].src}
        alt="Image"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
    />
}