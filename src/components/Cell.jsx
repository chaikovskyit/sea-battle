import React, { useMemo } from "react";

const Cell = ({ rowId, cellId, ships }) => {

  // console.log({rowId, cellId})
  const isShip = useMemo(() => {
    let boolean = false;
    ships.forEach((ship) => {
      if (!!ship.location.includes(`${rowId}${cellId}`)) {
        boolean = true
      }

    });
    return boolean;
    // const ship = ships.find( ship => ship.location.includes(`${rowId}${cellId}`))
    // if (ship) {

    //   const partOfShip = ship.location.indexOf(`${rowId}${cellId}`)
    //   console.log(ship.hit[partOfShip]);
    //   return !!ship.hit[partOfShip]
    // }
  }, [cellId, rowId, ships]);

  return (
    <td className={`square ${isShip ? "boat" : ""}`} id={`${rowId}${cellId}`}>
      {`${rowId}${cellId}`}
    </td>
  );
};

export default Cell;
