
/**
 * @fileoverview Unit tests for the js/model/cell_index.js file.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */


/** Objects under test. */
var m4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.MONDAY,
    rosegrid.model.Period.FOURTH_HOUR);
var m5 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.MONDAY,
    rosegrid.model.Period.FIFTH_HOUR);
var w9 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
    rosegrid.model.Period.NINTH_HOUR);


function testEnumValues() {
  assertEquals(4, rosegrid.model.Weekday.FRIDAY);
  assertEquals(2, rosegrid.model.Period.THIRD_HOUR);
}


function testConstructor() {
  assertEquals(0, m4.weekday);
  assertEquals(3, m4.period);
  assertEquals(2, w9.weekday);
  assertEquals(8, w9.period);
}


function testToString() {
  assertEquals('Monday, 4th hour', '' + m4);
  assertEquals('Monday, 5th hour', '' + m5);
  assertEquals('Wednesday, 9th hour', '' + w9);
}


function testEquals() {
  var m4_ = new rosegrid.model.CellIndex(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.FOURTH_HOUR);
  assertTrue(m4.equals(m4_));
  assertFalse(m4 == m4_);  // They are not the same object
  assertTrue(m4_.equals(m4));
  assertTrue(m4.equals({weekday: 0, period: 3})); // Will work with a POJSO
  assertFalse(m4.equals(m5));
}


function testClone() {
  var m4_ = m4.clone();
  assertTrue(m4.equals(m4_));
  assertFalse(m4 == m4_);  // They are not the same object
}


function testConvertCellIndexToNumericIndex() {
  assertEquals(3, rosegrid.model.CellIndex.convertCellIndexToNumericIndex(m4));
  assertEquals(4, rosegrid.model.CellIndex.convertCellIndexToNumericIndex(m5));
  assertEquals(28, rosegrid.model.CellIndex.convertCellIndexToNumericIndex(w9));
}


function testConvertNumericIndexToCellIndex() {
  assertTrue(m4.equals(
      rosegrid.model.CellIndex.convertNumericIndexToCellIndex(3)));
  assertTrue(m5.equals(
      rosegrid.model.CellIndex.convertNumericIndexToCellIndex(4)));
  assertTrue(w9.equals(
      rosegrid.model.CellIndex.convertNumericIndexToCellIndex(28)));
  assertFalse(m4.equals(
      rosegrid.model.CellIndex.convertNumericIndexToCellIndex(28)));
}
