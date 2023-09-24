import { normalizeString } from './stringHelpers';

export function filterJobs(allJobs, checkboxValues, locationValue) {
  if (!checkboxValues.length && locationValue === null) return allJobs;

  const normalizedCheckboxValues = checkboxValues.map(normalizeString);

  return allJobs.filter(job =>
    normalizedCheckboxValues.includes(normalizeString(job.type)) ||
    normalizedCheckboxValues.includes(normalizeString(job.category)) ||
    normalizedCheckboxValues.includes(normalizeString(job.scholarLevel)) ||
    locationValue === job.location
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