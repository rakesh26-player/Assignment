import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ThumbsUp, ThumbsDown, X } from "lucide-react";
import FlatDetailsCard from "../Cards/Flatdetailscard";
import Navbar from "../Navbar/Navbar";

export default function SwipeableCardStack() {
  const [cards, setCards] = useState(Array.from({ length: 100 }, (_, i) => i + 1));
  const [showLikeOverlay, setShowLikeOverlay] = useState(false);
  const [exitDirection, setExitDirection] = useState(null);

  const removeCard = (id, direction) => {
    setExitDirection(direction);
    setCards((prev) => prev.filter((cardId) => cardId !== id));

    if (direction === "right") {
      setShowLikeOverlay(true);
      setTimeout(() => setShowLikeOverlay(false), 1000);
    }
  };

  return (
    <div className="relative h-screen flex flex-col items-center bg-gray-100 overflow-hidden">
      <div className="w-full flex justify-between items-center mb-4">
        <Navbar />
      </div>

      <AnimatePresence>
        {showLikeOverlay && (
          <motion.div
            className="absolute inset-0 top-[72px] bg-orange-500 bg-opacity-20 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-[1240px] h-[528px] flex items-center justify-center z-0">
        <AnimatePresence mode="popLayout">
          {cards.slice(0, 3).map((id, index) => (
            <SwipeableCard
              key={id}
              id={id}
              active={index === 0}
              removeCard={removeCard}
              zIndex={3 - index}
              exitDirection={exitDirection}
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
          className="w-14 h-14 rounded-full bg-black shadow-md flex items-center justify-center"
          onClick={() => {
            if (cards.length > 0) {
              setExitDirection("left");
              removeCard(cards[0], "left");
            }
          }}
        >
          <ThumbsDown className="w-6 h-6 text-white" />
        </button>
        <button
          className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center"
          onClick={() => {
            if (cards.length > 0) {
              setExitDirection(null);
              setCards((prev) => prev.slice(1));
            }
          }}
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
        <button
          style={{ backgroundColor: "rgba(237, 101, 48, 1)" }}
          className="w-14 h-14 rounded-full shadow-md flex items-center justify-center"
          onClick={() => {
            if (cards.length > 0) {
              setExitDirection("right");
              removeCard(cards[0], "right");
            }
          }}
        >
          <ThumbsUp className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}

function SwipeableCard({ id, active, removeCard, zIndex, exitDirection }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [0, 100, 300], [0, 1, 1]);
  const dislikeOpacity = useTransform(x, [-300, -100, 0], [1, 1, 0]);

  const cardRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const handleDragEnd = (_, info) => {
    if (active && !isExiting) {
      const threshold = 100;
      if (info.offset.x > threshold) {
        setIsExiting(true);
        setSwipeDirection("right");
        removeCard(id, "right");
      } else if (info.offset.x < -threshold) {
        setIsExiting(true);
        setSwipeDirection("left");
        removeCard(id, "left");
      }
    }
  };

  const exitVariants = {
    left: {
      x: -1500,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.32, 0.72, 0.24, 0.99] },
    },
    right: {
      x: 1500,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.32, 0.72, 0.24, 0.99] },
    },
    default: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute w-full max-w-[1240px] cursor-grab"
      style={{
        x: isExiting ? undefined : x,
        rotate: isExiting ? 0 : rotate,
        opacity: isExiting ? undefined : opacity,
        zIndex,
        position: "absolute",
        top: 0,
      }}
      drag={active && !isExiting ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{
        scale: active ? 1 : 0.95,
        y: active ? 0 : 10,
        opacity: active ? 1 : 0.7,
      }}
      animate={{
        scale: active ? 1 : 0.95,
        y: active ? 0 : 10,
        opacity: active ? 1 : 0.7,
      }}
      exit={
        swipeDirection === "left"
          ? exitVariants.left
          : swipeDirection === "right"
          ? exitVariants.right
          : exitDirection === "left"
          ? exitVariants.left
          : exitDirection === "right"
          ? exitVariants.right
          : exitVariants.default
      }
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

      <FlatDetailsCard />
    </motion.div>
  );
}