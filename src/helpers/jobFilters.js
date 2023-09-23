import { normalizeString } from './stringHelpers';

export function filterJobs(allJobs, checkboxValues) {
  if (!checkboxValues.length) return allJobs;

  const normalizedCheckboxValues = checkboxValues.map(normalizeString);

  return allJobs.filter(job =>
    normalizedCheckboxValues.includes(normalizeString(job.type)) ||
    normalizedCheckboxValues.includes(normalizeString(job.category)) ||
    normalizedCheckboxValues.includes(normalizeString(job.scholarLevel))
  );
}

export function toggleCheckbox(checkboxValues, option) {
  const index = checkboxValues.indexOf(option.value);
  if (index === -1) {
    checkboxValues.push(option.value);
  } else {
    checkboxValues.splice(index, 1);
  }
}