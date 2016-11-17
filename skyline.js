const buildings = [
  [1, 3, 4],
  [3, 4, 4],
  [2, 6, 2],
  [8, 11, 4],
  [7, 9, 3],
  [10, 11, 2],
];


const getSkyline = (buildings) => {
  let buildingPoints = [];
  console.time('buildPoints');
  let j = 0;
  for (let i = 0; i < buildings.length; i++) {
    let building = buildings[i];
    let buildingStart = building[0];
    let buildingEnd = building[1];
    let buildingHeight = building[2];
    buildingPoints[j] = [buildingStart, buildingHeight, true];
    buildingPoints[j + 1] = [buildingEnd, buildingHeight, false];
    j += 2;
  }
  console.timeEnd('buildPoints');

  console.time('sort');
  buildingPoints = buildingPoints.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    } else {
      return (a[2] ? -a[1] : a[1]) - (b[2] ? -b[1] : b[1])
    }
  });
  console.timeEnd('sort');

  let queue = {};
  queue[0] = 1;
  let prevMaxHeight = 0;
  let result = [];
  let heights = [0];

  console.time('buildingPoints');

  for (let i = 0; i < buildingPoints.length; i++) {
    let buildingPoint = buildingPoints[i];
    if (buildingPoint[2]) { // if its a start edge true or false
      if (queue[buildingPoint[1]]) { // if the height is in the queue
        queue[buildingPoint[1]] = queue[buildingPoint[1]] + 1;
      } else {
        queue[buildingPoint[1]] = 1;
        heights.push(buildingPoint[1])
      }
    } else {
      if (queue[buildingPoint[1]] == 1) {
        let index = heights.indexOf(buildingPoint[1]);
        heights.splice(index, 1);
        delete queue[buildingPoint[1]];
      } else {
        queue[buildingPoint[1]] = queue[buildingPoint[1]] - 1;
      }
    }

    let currentMaxHeight = Math.max.apply(null, heights);
    if (prevMaxHeight !== currentMaxHeight) {
      result.push([buildingPoint[0], currentMaxHeight]);
      prevMaxHeight = currentMaxHeight;
    }
  }

  return result;
}

getSkyline(buildings);
