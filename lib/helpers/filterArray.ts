import { NextRouter } from 'next/router';
import { AccommodationClean } from 'types/accommodationClean';

interface FilterArray {
  array: AccommodationClean[] | null;
  router: NextRouter;
}
export function filterArray({ array, router }: FilterArray): AccommodationClean[] | null {
  if (!array) return array;
  const results = array.filter((item) => {
    const { location, type } = router.query;
    let typeStorage = type;
    if (typeStorage === 'bnb') typeStorage = 'bed & breakfast';
    if (typeStorage === 'hotels') typeStorage = 'hotel';
    if (typeStorage === 'guesthouses') typeStorage = 'guesthouse';
    // If no filters, pass everything.
    if (location === undefined && typeStorage === undefined) return true;
    // Gives truthy value if location/type matches, or its query is undefined
    const locationMatch = location === item.location.toLowerCase() || location === undefined;
    const typeMatch = typeStorage === item.type.toLowerCase() || typeStorage === undefined;
    if (locationMatch && typeMatch) return true;
    return false;
  });
  return results;
}
