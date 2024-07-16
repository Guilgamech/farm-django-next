"use client"

import { cn } from "@/lib/utils";
import { Download, Fullscreen, Printer, Shrink, ZoomIn, ZoomOut } from "lucide-react";
import { useRef, useState } from "react"
import { useReactToPrint } from 'react-to-print';

export const ImageViewer = ({ src }: { src: string }) => {
  const [completeScreen, setCompleteScreen] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [width, setWidth] = useState<number>(0)
  const zoomIncrement = 0.1;
  const disableZoomOut = zoom < 0.2;
  const disableZoomIn = zoom > 2.9;
  const handleZoomIn = () => {
    if (!disableZoomIn && refImage.current) {
      setZoom(zoom + zoomIncrement);
      refImage.current.style.width = `${width * (zoom + zoomIncrement)}px`
    }
  };
  const handleZoomOut = () => {
    if (!disableZoomOut && refImage.current) {
      setZoom(zoom - zoomIncrement);
      refImage.current.style.width = `${width * (zoom - zoomIncrement)}px`
    }
  };
  const printImage = () => {
    const printWindow = window.open('', '_blank');
    printWindow?.document.write('<html><body><img src="' + src + '" onload="window.print();window.close()" /></body></html>');
    printWindow?.document.close();
  }
  const handleDownload = async () => {
    const type = src.split('.').pop()
    const response = await fetch(src);
    const blob = await response.blob();    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Result.${type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handlePrint = useReactToPrint({
    documentTitle: "Print Result",
    removeAfterPrint: true,
  });
  const refImage = useRef<HTMLImageElement | null>(null)
  const findParentDialog = (element:HTMLElement|null) =>{
    while (element) {
      if (element.getAttribute('role') === 'dialog') {
        return element;
      }
      element = element?.parentElement;
    }
    return null;
  }
  return <div className={cn(
    "w-full min-h-[300px] max-h-[340px] flex flex-col border border-gray-500",
    completeScreen ? "fixed bg-white top-0 left-0 right-0 bottom-0 w-[100vw] max-w-[100vw] h-[100dvh] z-[200] max-h-[100dvh]" : ""
  )}>
    <div className="w-full h-[40px] flex justify-between items-center bg-[#eeeeee] px-2">      
      <div className="flex gap-2 items-center">
        <button className={cn(
          "p-1 text-black bg-[#eeeeee] rounded-sm border-none",
          "hover:bg-primary hover:text-white",
          "disabled:opacity-50 disabled:hover:bg-slate-500 disabled:hover:text-black"
          
        )}
          onClick={() => handleZoomOut()}
          disabled={disableZoomOut}>
          <ZoomOut className="w-6 h-6" />
          <span className="sr-only">Zoom out</span>
        </button>
        <span className="p-1 text-md font-medium">{(zoom * 100).toFixed()}%</span>
        <button className={cn(
          "p-1 text-black bg-[#eeeeee] rounded-sm border-none",
          "hover:bg-primary hover:text-white",
          "disabled:opacity-50 disabled:hover:bg-slate-500 disabled:hover:text-black"
        )}
          onClick={() => handleZoomIn()}
          disabled={disableZoomIn}>
          <ZoomIn className="w-6 h-6" />
          <span className="sr-only">Zoom out</span>
        </button>
      </div>
      <div className="flex gap-2">
        <button className={cn(
          "p-1 text-black bg-[#eeeeee] rounded-sm border-none",
          "hover:bg-primary hover:text-white",
          "disabled:opacity-50 disabled:hover:bg-slate-500 disabled:hover:text-black"
        )}
          onClick={(event) => {
            setCompleteScreen(!completeScreen)
            if(event.currentTarget instanceof HTMLButtonElement){
              const dialog = findParentDialog(event.currentTarget.parentElement)
              if(dialog instanceof HTMLDivElement){
                if(!completeScreen){
                  dialog.style.borderRadius = "none";
                  dialog.style.top = "0"
                  dialog.style.right = "0"
                  dialog.style.bottom = "0"
                  dialog.style.left = "0"
                  dialog.style.transform = "unset"
                }else{
                  dialog.removeAttribute("style")
                  dialog.style.pointerEvents = "auto";
                }
              }
            }
          }}
          >            
          {completeScreen ? <Shrink className="w-6 h-6" /> : <Fullscreen className="w-6 h-6" />}
          {completeScreen ? <span className="sr-only">Cancel FullScreen</span> : <span className="sr-only">FullScreen</span>}
          
        </button>
        <button className={cn(
          "p-1 text-black bg-[#eeeeee] rounded-sm border-none",
          "hover:bg-primary hover:text-white",
          "disabled:opacity-50 disabled:hover:bg-slate-500 disabled:hover:text-black"
        )}
          onClick={() => handleDownload()}
          >
          <Download className="w-6 h-6" />
          <span className="sr-only">Download</span>
        </button>
        <button className={cn(
          "p-1 text-black bg-[#eeeeee] rounded-sm border-none",
          "hover:bg-primary hover:text-white",
          "disabled:opacity-50 disabled:hover:bg-slate-500 disabled:hover:text-black"
        )}
          onClick={() => handlePrint(null, () => refImage.current)}
          >
          <Printer className="w-6 h-6" />
          <span className="sr-only">Print</span>
        </button>
      </div>
    </div>
    <div className={cn(
      "w-full max-w-full min-h-[260px] max-h-[300px] overflow-auto relative scroll-thin",
      completeScreen ? "relative top-0 left-0 pt-[40px] w-[100vw] max-w-[100vw] h-[100dvh] z-[200] max-h-[100dvh]" : ""
      )}>
      <div className="mx-auto">
        <img ref={refImage} onLoad={(event) => {
          if (event.currentTarget instanceof HTMLImageElement) {
            setWidth(event.currentTarget.naturalWidth);
          }
        }} src={src} className="mx-auto max-w-[unset] h-auto" alt="Image Result" />
      </div>

    </div>
  </div>
}