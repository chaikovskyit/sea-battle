import { useCallback, useEffect, useState, useRef } from "react";
import "./App.scss";
import Cell from "./components/Cell";

const shipCount = [1, 2, 3, 4];
const shipSize = [4, 3, 2, 1];

const arena = new Array(10).fill(new Array(10).fill(""));

function App() {
  const [refresh, setRefresh] = useState(false);

  const [ships, setShips] = useState([]);
  const privateLocation = useRef([]);

  const generateShipOptions = useCallback((shipSize) => {
    const ship = {
      hit: new Array(shipSize).fill(""),
      location: [],
    };

    const direction = Math.random() < 0.5;

    let x, y;

    if (direction) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * (10 - shipSize));
    } else {
      x = Math.floor(Math.random() * (10 - shipSize));
      y = Math.floor(Math.random() * 10);
    }

    for (let i = 0; i < shipSize; i++) {
      if (direction) {
        ship.location.push(x + "" + (y + i));
      } else {
        ship.location.push(x + i + "" + y);
      }
    }

    if (checkPrivateLocation(ship.location, privateLocation)) {
      return generateShipOptions(shipSize, privateLocation);
    }
    addPrivateLocation(ship.location, privateLocation);
    return ship;
  }, []);

  const generateShips = useCallback(() => {
    const shipsArr = [];
    shipCount.forEach((count, index) => {
      const size = shipSize[index];
      for (let i = 0; i < count; i++) {
        const ship = generateShipOptions(size);
        shipsArr.push(ship);
      }
    });

    setShips(shipsArr);
  }, [generateShipOptions]);

  const checkPrivateLocation = (location, privateLocation) => {
    for (const coordinate of location) {
      if (privateLocation.current.includes(coordinate)) {
        return true;
      }
    }
  };

  const addPrivateLocation = (location, privateLocation) => {
    for (let i = 0; i < location.length; i++) {
      const startCoordinateX = location[i][0] - 1;
      const startCoordinateY = location[i][1] - 1;
      for (let j = startCoordinateX; j < startCoordinateX + 3; j++) {
        for (let r = startCoordinateY; r < startCoordinateY + 3; r++) {
          if (j >= 0 && j < 10 && r >= 0 && r < 10) {
            const coordinate = j + "" + r;
            if (!privateLocation.current.includes(coordinate)) {
              privateLocation.current.push(coordinate);
            }
          }
        }
      }
    }
  };

  const refreshHandler = useCallback(() => {
    // setRefresh((prev) => !prev);
    generateShips();
  }, [generateShips]);

  useEffect(() => {
    generateShips();
  }, [generateShips]);

  return (
    <div className="App">
      <button onClick={refreshHandler}>refresh</button>
      <table>
        <tbody>
          {arena.map((row, rowId) => (
            <tr key={rowId}>
              {row.map((cell, cellId) => (
                <Cell
                  key={cellId}
                  cellId={cellId}
                  rowId={rowId}
                  ships={ships}
                  // refresh={refreshHandler}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
