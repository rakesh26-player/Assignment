// FlatDetailsCard.jsx
import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Info, Sparkles } from "lucide-react";

export default function FlatDetailsCard({ property = {} }) {
  const {
    title = "3BHK Flat in HSR Layout",
    location = "BM Mystic Greens, Sector 2, HSR Layout, Bangalore",
    rent = "25K",
    deposit = "50K",
    extra = "2.5K",
    accommodationType = "3 BHK",
    roomType = "Private",
    availability = "1 May",
    images = [
      "/images/flat2.jpg",
      "/images/flat1.jpg",
      "/images/flat2.jpg",
      "/images/flat1.jpg",
      "/images/flat1.jpg",
    ],
  } = property;

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const roomAmenities = [
    { name: "AC", icon: "❄️" },
    { name: "Wardrobe", icon: "🧥" },
    { name: "Study Table", icon: "🪑" },
  ];

  const flatAmenities = [
    { name: "RO", icon: "🚰" },
    { name: "TV", icon: "📺" },
  ];

  const societyAmenities = [{ name: "Pool", icon: "🏊" }];

  const flatmates = [
    { id: 1, avatar: "/p1.jpg" },
    { id: 2, avatar: "/p2.jpg" },
    { id: 3, avatar: "/placeholder.png" },
  ];

  return (
    <div style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }} className="w-full max-w-[1240px] h-[528px] rounded-[40px] shadow-lg flex flex-col overflow-hidden">
      <div className="w-full h-1/2 flex">
        {/* Image Carousel */}
        <div className="relative w-full bg-gray-100 m-5">
          <img
            src={images[currentImage]}
            alt="Flat"
            className="w-full h-full object-cover rounded-xl"
          />

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <button className="absolute top-4 right-4 bg-black/80 text-white text-xs py-2 px-3 rounded-md flex items-center">
            <Sparkles className="w-3 h-3 mr-1" />
            Reimagine with AI
          </button>

          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs py-1 px-2 rounded">
            {currentImage + 1}/{images.length}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage(index);
                }}
                className={`w-2 h-2 rounded-full ${index === currentImage ? "bg-orange-500" : "bg-white"}`}
              />
            ))}
          </div>
        </div>

        <div className="relative w-full h-1/2 flex flex-col bg-white rounded-sm m-5">
          <div className="p-6">
            <div className="flex mb-6">
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                <MapPin className="text-red-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-gray-600">{location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-1/2 flex justify-between">
        <div className="p-2 m-3 w-1/3 bg-white rounded-lg">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Rent</p>
              <p className="font-semibold text-xl">{rent} per month</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Security Deposit</p>
              <p className="font-semibold text-xl">{deposit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 flex items-center">
                Extra
                <Info className="w-3 h-3 ml-1 text-gray-400" />
              </p>
              <p className="font-semibold text-xl">{extra} per month</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-2 m-3 w-1/3 bg-white rounded-sm flex flex-col justify-center">
          <div>
            <p className="text-sm text-gray-500 mb-2">Room Amenities</p>
            <div className="flex flex-wrap gap-2">
              {roomAmenities.map((amenity, index) => (
                <div key={index} style={{ backgroundColor: 'rgba(254, 244, 224, 1)' }} className="text-xs px-3 py-1 rounded-full flex items-center">
                  <span className="mr-1">{amenity.icon}</span>
                  {amenity.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Flat Amenities</p>
            <div className="flex flex-wrap gap-2">
              {flatAmenities.map((amenity, index) => (
                <div key={index} className="bg-orange-50 text-xs px-3 py-1 rounded-full flex items-center">
                  <span className="mr-1">{amenity.icon}</span>
                  {amenity.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Society Amenities</p>
            <div className="flex flex-wrap gap-2">
              {societyAmenities.map((amenity, index) => (
                <div key={index} className="bg-orange-50 text-xs px-3 py-1 rounded-full flex items-center">
                  <span className="mr-1">{amenity.icon}</span>
                  {amenity.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 p-2 m-3 w-1/3 bg-white rounded-lg">
          <div>
            <p className="text-sm text-gray-500 mb-2">Desired Flatmate Preference</p>
            <div className="flex flex-wrap gap-2">
              <button className="bg-gray-50 text-xs px-3 py-2 rounded-lg flex items-center">
                <span className="mr-1">👤</span>
                No preference
              </button>
              <button className="bg-gray-50 text-xs px-3 py-2 rounded-lg flex items-center">
                <span className="mr-1">🍽️</span>
                No preference
              </button>
              <button className="bg-gray-50 text-xs px-3 py-2 rounded-lg flex items-center">
                <span className="mr-1">🎵</span>
                No preference
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Flatmates</p>
            <div className="flex -space-x-2">
              {flatmates.map((flatmate) => (
                <div key={flatmate.id} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                  <img
                    src={flatmate.avatar || "/p2.jpg"}
                    alt="Flatmate"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
