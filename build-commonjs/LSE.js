'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mathjs = require('mathjs');

var _mathjs2 = _interopRequireDefault(_mathjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Implementation of a Least Square Evaluation function as descripted in
 * https://www.geometrictools.com/Documentation/LeastSquaresFitting.pdf (par. 3)
 * This will return a plane in the form Ax + By + C = z
 */
exports.default = function (points) {

  // INPUT VALIDATION

  // Check if the input array is well-formed
  if (!(points instanceof Array)) {
    throw new TypeError('This function accepts only an Array of points as input');
  }

  if (points.length < 3) {
    throw new TypeError('You need at least three points to define a plane');
  }

  points.forEach(function (point) {
    if (!(point instanceof Object)) {
      throw new TypeError('The input should contains only points ' + 'with the following structure: {x:<number>, y:<number>, z:<number>}');
    } else {
      if (isNaN(point.x) || isNaN(point.y) || isNaN(point.z)) {
        throw new TypeError('The input should contains only points ' + 'with the following structure: {x:<number>, y:<number>, z:<number>}');
      }
    }
  });

  // TODO: Fix comment
  // I should follow what is stated here:
  // https://stackoverflow.com/a/44315221
  // https://it.wikipedia.org/wiki/Pseudo-inversa
  // I also need to investigate upon vertical planes...
  // Probably I need to catch a pram for it

  var M1_rows = [];
  var M2_rows = [];

  points.forEach(function (point) {
    M1_rows.push([point.x, point.y, 1]);
    M2_rows.push([point.z]);
  });

  var M1 = _mathjs2.default.matrix(M1_rows);
  var M2 = _mathjs2.default.matrix(M2_rows);

  var M1_T = _mathjs2.default.transpose(M1); // transpose of M1

  var resultMatrix = _mathjs2.default.multiply(_mathjs2.default.inv(_mathjs2.default.multiply(M1_T, M1)), M1_T, M2);

  // Get A, B and C constants
  var A = resultMatrix.get([0, 0]);
  var B = resultMatrix.get([1, 0]);
  var C = resultMatrix.get([2, 0]);

  return { A: A, B: B, C: C };
};