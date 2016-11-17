// n rectangles
// r - x of the left edge and x of the right edge and the height

var buildings = [
  [1, 3, 4],
  [3, 4, 4],
  [2, 6, 2],
  [8, 11, 4],
  [7, 9, 3],
  [10, 11, 2],
];

var getSkyline = function (buildings) {
  var buildingPoints = [];

  var i = 0;
  for (building of buildings) {
    var buildingStart = building[0];
    var buildingEnd = building[1];
    var buildingHeight = building[2];
    buildingPoints[i] = [buildingStart, buildingHeight, true];
    buildingPoints[i + 1] = [buildingEnd, buildingHeight, false];
    i += 2;
  }

  buildingPoints = buildingPoints.sort(function (a, b) {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    } else {
      return (a[2] ? -a[1] : a[1]) - (b[2] ? -b[1] : b[1])
    }
  });

  var queue = {};
  queue[0] = 1;
  var prevMaxHeight = 0;
  var result = [];

  for (buildingPoint of buildingPoints) {
    if (buildingPoint[2]) {
      if (queue[buildingPoint[1]]) {
        queue[buildingPoint[1]] = queue[buildingPoint[1]] + 1;
      } else {
        queue[buildingPoint[1]] = 1;
      }
    } else {
      if (queue[buildingPoint[1]] == 1) {
        delete queue[buildingPoint[1]];
      } else {
        queue[buildingPoint[1]] = queue[buildingPoint[1]] - 1;
      }
    }

    var currentMaxHeight = Math.max.apply(null, Object.keys(queue));
    if (prevMaxHeight !== currentMaxHeight) {
      result.push([buildingPoint[0], currentMaxHeight]);
      prevMaxHeight = currentMaxHeight;
    }
  }
  
  return result;
}

getSkyline(buildings);
