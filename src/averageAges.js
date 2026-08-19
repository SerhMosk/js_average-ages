'use strict';

/**
 * Calculate people average ages function
 * @param people
 * @returns {number}
 */
function calculateAverageAge(people) {
  // eslint-disable-next-line max-len
  return +(people.reduce((total, h) => total + (h.died - h.born), 0) / people.length).toFixed(2);
}

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  const centuryStart = century ? (century - 1) * 100 : null;
  const centuryEnd = century ? century * 100 : null;
  const filterPeople = century
    ? (h) => h.sex === 'm' && h.died > centuryStart && h.died <= centuryEnd
    : (h) => h.sex === 'm';

  return calculateAverageAge(people.filter(filterPeople));
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const filterPeople = withChildren
    ? (h) => h.sex === 'f' && !!people.find(human => human.mother === h.name)
    : (h) => h.sex === 'f';

  return calculateAverageAge(people.filter(filterPeople));
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const filterPeople = onlyWithSon
    ? (h) => h.sex === 'm' && people.some(human => human.name === h.mother)
    : (h) => people.some(human => human.name === h.mother);
  const children = people.filter(filterPeople);
  // eslint-disable-next-line max-len
  const reduceAges = (total, h) => total + (h.born - people.find(human => human.name === h.mother).born);

  return +(children.reduce(reduceAges, 0) / children.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
