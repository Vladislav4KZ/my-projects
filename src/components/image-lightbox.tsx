
"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Loader2, ImageOff, X } from "lucide-react"
import { DialogTitle, DialogDescription, DialogClose } from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ImageLightboxProps {
  images: { src: string; alt: string; hint: string }[]
  startIndex: number
  onClose: () => void
  dictionary: {
    image_not_found: string
  }
}

export function ImageLightbox({ images, startIndex, onClose, dictionary }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = React.useState(startIndex)
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const [slideDirection, setSlideDirection] = React.useState<"left" | "right" | "none">("none");
  const [dragOffset, setDragOffset] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const imageRef = React.useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50 

  const goToPrevious = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation()
    setSlideDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
  }

  const goToNext = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation()
    setSlideDirection("left");
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsDragging(true);
    setSlideDirection("none");
  }

  const handleTouchMove = (e: React.TouchEvent) => {
      if (touchStart === null) return;
      const currentTouch = e.targetTouches[0].clientX;
      setTouchEnd(currentTouch);
      setDragOffset(currentTouch - touchStart);
  }

  const handleTouchEnd = () => {
      setIsDragging(false);
      if (!touchStart || !touchEnd) {
          setDragOffset(0);
          return;
      }
      const distance = touchStart - touchEnd
      const isLeftSwipe = distance > minSwipeDistance
      const isRightSwipe = distance < -minSwipeDistance

      if (isLeftSwipe) {
          goToNext()
      } else if (isRightSwipe) {
          goToPrevious()
      }
      
      setDragOffset(0);
      setTouchStart(null);
      setTouchEnd(null);
  }
  
  React.useEffect(() => {
    setLoading(true);
    setError(false);
    setSlideDirection("none");
  }, [currentIndex]);


  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goToNext(event as any);
      } else if (event.key === 'ArrowLeft') {
        goToPrevious(event as any);
      } else if (event.key === 'Escape') {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    const imageElement = imageRef.current;
    if (imageElement) {
      const handleAnimationEnd = () => setSlideDirection("none");
      imageElement.addEventListener("animationend", handleAnimationEnd);
    
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        if (imageElement) {
          imageElement.removeEventListener("animationend", handleAnimationEnd);
        }
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [images.length, onClose]);

  const image = images[currentIndex];

  const imageContainerStyle: React.CSSProperties = {
    transform: `translateX(${dragOffset}px)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
  };


  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent 
        className="p-0 m-0 w-screen h-screen max-w-none rounded-none border-none bg-black/80 backdrop-blur-sm"
        onInteractOutside={onClose}
      >
        <DialogTitle className="sr-only">{image.alt}</DialogTitle>
        <DialogDescription className="sr-only">Lightbox for viewing {image.alt}</DialogDescription>
        
        <div 
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
            
          <div
            ref={imageRef}
            style={imageContainerStyle}
            className={cn(
              "relative w-full h-full flex items-center justify-center",
              !loading && slideDirection === 'left' && 'animate-slide-in-from-right',
              !loading && slideDirection === 'right' && 'animate-slide-in-from-left'
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                {loading && (
                    <div 
                        className={cn(
                            "absolute inset-0 flex items-center justify-center",
                            slideDirection === 'left' && 'animate-slide-in-from-right',
                            slideDirection === 'right' && 'animate-slide-in-from-left'
                        )}
                    >
                        <Loader2 className="h-12 w-12 animate-spin text-white" />
                    </div>
                )}
            </div>

            {error && !loading && (
              <div className="flex flex-col items-center justify-center text-white">
                <ImageOff className="h-16 w-16 mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">{dictionary.image_not_found}</p>
              </div>
            )}

            {!error && (
              <Image
                key={image.src + currentIndex}
                src={image.src.startsWith('https://') ? `${image.src.split('?')[0]}?seed=${image.hint.replace(/\s+/g, '')}${currentIndex}` : image.src}
                alt={image.alt}
                data-ai-hint={image.hint}
                width={1920}
                height={1080}
                className={cn(
                  "max-w-[90vw] max-h-[90vh] object-contain transition-opacity duration-300 pointer-events-auto",
                  loading ? 'opacity-0' : 'opacity-100',
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
          </div>


          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-white/10 h-12 w-12 z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-10 w-10" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-white/10 h-12 w-12 z-20"
            aria-label="Next image"
          >
            <ChevronRight className="h-10 w-10" />
          </Button>

          <div className="absolute bottom-4 text-white text-sm bg-black/50 px-2 py-1 rounded-md z-20">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

    