import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, X } from "lucide-react";
import FlatDetailsCard from "../Cards/Flatdetailscard"; 
import Navbar from "../Navbar/Navbar";

const generateProperties = (count = 100) => {
  const locations = [
    "HSR Layout, Bangalore",
    "Koramangala, Bangalore",
    "Indiranagar, Bangalore",
    "JP Nagar, Bangalore",
    "Whitefield, Bangalore",
    "Electronic City, Bangalore",
    "Marathahalli, Bangalore",
    "BTM Layout, Bangalore",
  ];

  const societies = [
    "BM Mystic Greens",
    "Green Valley",
    "Sunshine Apartments",
    "Royal Residency",
    "Palm Grove",
    "Urban Oasis",
    "Serene Heights",
    "Lakeside View",
  ];

  const properties = [];
  for (let i = 1; i <= count; i++) {
    const bhk = Math.floor(Math.random() * 3) + 1;
    const locationIndex = Math.floor(Math.random() * locations.length);
    const societyIndex = Math.floor(Math.random() * societies.length);
    const rent = `${Math.floor(Math.random() * 30) + 10}K`;
    const deposit = `${Math.floor(Math.random() * 60) + 20}K`;
    const extra = `${Math.floor(Math.random() * 5) + 1}K`;
    const day = Math.floor(Math.random() * 28) + 1;
    const months = ["May", "June", "July"];
    const month = months[Math.floor(Math.random() * months.length)];

    properties.push({
      id: i,
      title: `${bhk}BHK Flat in ${locations[locationIndex].split(",")[0]}`,
      location: `${societies[societyIndex]}, Sector ${Math.floor(Math.random() * 10) + 1}, ${locations[locationIndex]}`,
      rent,
      deposit,
      extra,
      accommodationType: `${bhk} BHK`,
      roomType: "Private",
      availability: `${day} ${month}`,
    });
  }
  return properties;
};

export default function SwipeableCardStack() {
  const [properties] = useState(generateProperties());
  const [cards, setCards] = useState(properties);
  const [likedProperties, setLikedProperties] = useState([]);
  const [dislikedProperties, setDislikedProperties] = useState([]);
  const [showLikeOverlay, setShowLikeOverlay] = useState(false);

  const removeCard = (id, direction) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    const property = properties.find((prop) => prop.id === id);

    if (direction === "right") {
      setLikedProperties((prev) => [...prev, property]);
      setShowLikeOverlay(true);
      setTimeout(() => setShowLikeOverlay(false), 1000);
    } else {
      setDislikedProperties((prev) => [...prev, property]);
    }
  };

  return (
    <div className="relative h-screen flex flex-col items-center bg-gray-100 overflow-hidden">
      <div className="w-full  p-2 mb-2 ">
        <Navbar />
      </div>
      <AnimatePresence>
        {showLikeOverlay && (
          <motion.div
            className="absolute inset-0 top-[72px] bg-orange-500 bg-opacity-20 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-[1240px] h-[528px] flex items-center justify-center z-0">
        <AnimatePresence>
          {cards.slice(0, 3).map((card, index) => (
            <SwipeableCard
              key={card.id}
              card={card}
              active={index === 0}
              removeCard={removeCard}
              zIndex={3 - index}
            />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {showLikeOverlay && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-orange-500 rounded-full w-32 h-32 flex items-center justify-center">
                <ThumbsUp className="w-16 h-16 text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-6 z-20">
        <button
          className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center"
          onClick={() => cards.length > 0 && removeCard(cards[0].id, "left")}
        >
          <ThumbsDown className="w-6 h-6 text-gray-500" />
        </button>
        <button
          className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center"
          onClick={() => cards.length > 0 && setCards((prev) => prev.slice(1))}
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
        <button
          className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center"
          onClick={() => cards.length > 0 && removeCard(cards[0].id, "right")}
        >
          <ThumbsUp className="w-6 h-6 text-orange-500" />
        </button>
      </div>
    </div>
  );
}

function SwipeableCard({ card, active, removeCard, zIndex }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [0, 100, 300], [0, 1, 1]);
  const dislikeOpacity = useTransform(x, [-300, -100, 0], [1, 1, 0]);
  const cardRef = useRef(null);

  const handleDragEnd = (_, info) => {
    if (active) {
      const threshold = 100;
      if (info.offset.x > threshold) {
        removeCard(card.id, "right");
      } else if (info.offset.x < -threshold) {
        removeCard(card.id, "left");
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute w-full max-w-[1240px] cursor-grab"
      style={{ x, rotate, opacity, zIndex, position: "absolute", top: 0 }}
      drag={active ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ scale: active ? 1 : 0.95, y: active ? 0 : 10, opacity: active ? 1 : 0.7 }}
      animate={{ scale: active ? 1 : 0.95, y: active ? 0 : 10, opacity: active ? 1 : 0.7 }}
      exit={{ x: x.get() < 0 ? -500 : 500, opacity: 0, transition: { duration: 0.2 } }}
      transition={{ type: "spring", damping: 50, stiffness: 500 }}
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        className="absolute top-1/2 right-12 -translate-y-1/2 bg-orange-500 rounded-full w-24 h-24 flex items-center justify-center z-10 pointer-events-none"
        style={{ opacity: likeOpacity }}
      >
        <ThumbsUp className="w-12 h-12 text-white" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-12 -translate-y-1/2 bg-gray-500 rounded-full w-24 h-24 flex items-center justify-center z-10 pointer-events-none"
        style={{ opacity: dislikeOpacity }}
      >
        <ThumbsDown className="w-12 h-12 text-white" />
      </motion.div>

      <FlatDetailsCard property={card} />
    </motion.div>
  );
}
