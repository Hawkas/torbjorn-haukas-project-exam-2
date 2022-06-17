import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ScrollArea, Table, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { ObjectWithStringValues, TableKeyArray } from 'types/TypeExperiments';
import { useTableStyles } from './AdminTable.styles';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';

// I feel like I finally understood how to make TypeScript cooperate.

interface TableSortProps<T> {
  data: (ObjectWithStringValues<T> & { id?: string })[] | [];
  headerOrder: TableKeyArray<T>;
}
/**
 * Filter data based on search query
 * @param `data`  array of objects to sort
 * @param `search`  search string.
 */
function filterData<T>(data: ObjectWithStringValues<T>[] | [], search: string) {
  const keys: TableKeyArray<typeof data[0]> = Object.keys(data[0]) as TableKeyArray<typeof data[0]>;
  const query = search.toLowerCase().trim();
  return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(query)));
}
/**
 * Sort data based on value of specified field
 * @param {Object[]} data  array of objects to sort
 * @param payload - object with sorting options.
 * @param {(string|null)} payload.sortBy - field to sort by, if any
 * @param {boolean} payload.reversed - controls sort direction
 * @param {string} payload.search - search query to filter results
 */
function sortData<T>(
  data: ObjectWithStringValues<T>[] | [],
  payload: { sortBy: keyof T | null; reversed: boolean; search: string }
): ObjectWithStringValues<T>[] {
  if (!payload.sortBy) {
    return filterData(data, payload.search);
  }
  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[payload.sortBy!]!.localeCompare(a[payload.sortBy!]!);
      }

      return a[payload.sortBy!]!.localeCompare(b[payload.sortBy!]!);
    }),
    payload.search
  );
}

/**
 * Sort data array into table
 * @param props - props payload
 * @param {Object[]} props.data - array of objects with string values
 * @param {string[]} props.headerOrder - array of keys to dictate order of appearance in table.
 */
export function TableSort<T>({ data, headerOrder }: TableSortProps<T>) {
  const { classes } = useTableStyles();
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof T) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => {
    const tableData = TableCell<T>({ headerOrder, row });
    return <tr key={row.id}>{tableData}</tr>;
  });

  return (
    <ScrollArea
      sx={{ height: '100%', maxHeight: 900 }}
      styles={{ scrollbar: { zIndex: 99 } }}
      type="hover"
    >
      <TextInput
        placeholder="Search by any field"
        className={classes.searchBar}
        classNames={{ input: classes.searchInput }}
        icon={<FontAwesomeIcon icon={faSearch} fontSize={14} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        striped
        horizontalSpacing="xs"
        verticalSpacing="lg"
        className={classes.table}
        sx={{ tableLayout: 'fixed', minWidth: 1320 }}
      >
        <thead className={classes.header}>
          <tr>
            {headerOrder.map((item, index) => (
              <TableHead<T>
                key={index}
                header={item}
                {...{ setSorting, reverseSortDirection, sortBy }}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={260}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
