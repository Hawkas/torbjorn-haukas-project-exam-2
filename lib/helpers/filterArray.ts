import { NextRouter } from 'next/router';
import { AccommodationClean } from 'types/accommodationClean';
interface FilterArray {
  array: AccommodationClean[] | null;
  router: NextRouter;
}
export function filterArray({ array, router }: FilterArray): AccommodationClean[] | null {
  if (!array) return array;
  const results = array.filter((item) => {
    let { location, type } = router.query;
    if (type === 'bnb') type = 'bed & breakfast';
    if (type === 'hotels') type = 'hotel';
    if (type === 'guesthouses') type = 'guesthouse';
    // If no filters, pass everything.
    if (location === undefined && type === undefined) return true;
    // Gives truthy value if location/type matches, or its query is undefined
    const locationMatch = location === item.location.toLowerCase() || location === undefined;
    const typeMatch = type === item.type.toLowerCase() || type === undefined;

    if (locationMatch && typeMatch) return true;
  });
  return results;
}
