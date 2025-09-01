
"use client"

import * as React from "react"
import Image from "next/image"
import { Loader2, ImageOff, ChevronLeft, ChevronRight } from "lucide-react"
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

interface ImageLightboxProps {
  images: { src: string; alt: string; hint: string }[]
  startIndex: number
  onClose: () => void
  dictionary: {
    image_not_found: string
  }
}

export function ImageLightbox({ images, startIndex, onClose, dictionary }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = React.useState(startIndex);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  React.useEffect(() => {
    setLoading(true);
    setError(false);
    // Check if the image is already loaded (for example, from cache)
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth !== 0) {
      setLoading(false);
    }
  }, [currentIndex]);

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent 
        className="p-0 m-0 w-screen h-screen max-w-none rounded-none border-none bg-black/80 backdrop-blur-sm"
        onInteractOutside={onClose}
      >
        <DialogTitle className="sr-only">Lightbox</DialogTitle>
        <DialogDescription className="sr-only">Lightbox for viewing images</DialogDescription>
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden" onClick={onClose}>
          <div className="relative w-full h-full flex items-center justify-center">
            <Swiper
              initialSlide={startIndex}
              onSlideChange={(swiper) => {
                setCurrentIndex(swiper.activeIndex);
              }}
              className="w-full h-full"
              allowTouchMove={true}
            >
              {images.map((image, idx) => (
                <SwiperSlide key={image.src + idx}>
                  <div className="flex items-center justify-center w-full h-full">
                    {error && currentIndex === idx ? (
                      <div className="flex flex-col items-center justify-center text-white">
                        <ImageOff className="h-16 w-16 mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">{dictionary.image_not_found}</p>
                      </div>
                    ) : (
                      <Image
                        ref={currentIndex === idx ? imgRef : undefined}
                        src={image.src.startsWith('https://') ? `${image.src.split('?')[0]}?seed=${image.hint.replace(/\s+/g, '')}${idx}` : image.src}
                        alt={image.alt}
                        data-ai-hint={image.hint}
                        width={1920}
                        height={1080}
                        className={cn(
                          "max-w-[90vw] max-h-[90vh] object-contain transition-opacity duration-300 pointer-events-auto",
                          loading && currentIndex === idx ? 'opacity-0' : 'opacity-100',
                        )}
                        onLoad={() => setLoading(false)}
                        onError={() => {
                          setLoading(false);
                          setError(true);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        draggable="false"
                      />
                    )}
                    {loading && currentIndex === idx && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-12 w-12 animate-spin text-white" />
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              type="button"
              onClick={() => setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : images.length - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-white/10 h-12 w-12 z-20 flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex(currentIndex < images.length - 1 ? currentIndex + 1 : 0)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-white/10 h-12 w-12 z-20 flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-2 py-1 rounded-md z-20">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

    