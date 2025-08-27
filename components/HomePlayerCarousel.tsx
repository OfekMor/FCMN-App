// // components/HomePlayerCarousel.tsx
// import React, { useRef, useEffect, useState } from "react";
// import PlayerCarousel from "./PlayerCarousel";
// import { Player } from "../types/Player";

// type Props = {
//   players: Player[];
//   onPlayerPress?: (player: Player) => void;
// };

// export default function HomePlayerCarousel({ players, onPlayerPress }: Props) {
//   const scrollRef = useRef<any>(null);
//   const REPEAT = 50;

//   const data = players.length
//     ? Array.from({ length: REPEAT }, (_, repeatIndex) =>
//         players.map((player, playerIndex) => ({
//           ...player,
//           uniqueId: `${player.id}-${repeatIndex}-${playerIndex}`,
//         }))
//       ).flat()
//     : [];

//   const [currentIndex, setCurrentIndex] = useState(
//     Math.floor((players.length * REPEAT) / 2)
//   );

//   useEffect(() => {
//     const interval = setInterval(() => {
//       let nextIndex = currentIndex + 1;
//       if (nextIndex >= data.length) nextIndex = Math.floor(data.length / 2);
//       scrollRef.current?.scrollToIndex({ index: nextIndex, animated: true });
//       setCurrentIndex(nextIndex);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [currentIndex, data.length]);

//   return (
//     <PlayerCarousel
//       ref={scrollRef}
//       players={players}
//       onPlayerPress={onPlayerPress}
//       autoScrollData={data}
//     />
//   );
// }
