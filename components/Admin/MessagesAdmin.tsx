import { TitleSection } from '@components/DefaultTemplates/TitleSection';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { faSort, faSortDown, faSortUp } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capsFirstLetter } from '@helpers/stringConversions';
import {
  Box,
  Center,
  createStyles,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import { useState } from 'react';
import { MessageClean } from 'types/messages';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
    minHeight: '46px',
    border: `1px solid ${theme.colors.gray[1]}`,
  },
  table: {
    borderSpacing: '0',
    '&, & tr, & td': {
      border: `1px solid ${theme.colors.gray[1]}`,
    },
  },
  header: {
    position: 'sticky',
    top: 56,
    minHeight: '46px',
    backgroundColor: theme.other.backgroundColor,
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      top: -1,
      height: '2px',
      backgroundColor: theme.colors.blue[0],
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `4px solid ${theme.colors.gray[1]}`,
    },
  },
  searchBar: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colors.blue[0],
    paddingBottom: theme.other.smallSpacing.xl,
  },
  searchInput: {
    borderColor: theme.colors.gray[1],
    borderRadius: theme.radius.xs,
  },
  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));

interface TableSortProps {
  data: MessageClean[] | [];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
  colSpan: number;
}

function Th({ children, reversed, sorted, onSort, colSpan }: ThProps) {
  const { classes } = useStyles();
  const icon = sorted ? (reversed ? faSortUp : faSortDown) : faSort;
  return (
    <th colSpan={colSpan} className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart" noWrap>
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center>
            <FontAwesomeIcon fontSize={14} color="gray" icon={icon} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: MessageClean[] | [], search: string) {
  const keys: (keyof MessageClean)[] = Object.keys(data[0]) as (keyof MessageClean)[];
  const query = search.toLowerCase().trim();
  return data.filter((item) => keys.some((key) => item[key]!.toLowerCase().includes(query)));
}

function sortData(
  data: MessageClean[] | [],
  payload: { sortBy: keyof MessageClean | null; reversed: boolean; search: string }
) {
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
interface TableHead {
  sortBy: keyof MessageClean | null;
  reverseSortDirection: boolean;
  setSorting: (field: keyof MessageClean) => void;
  header: keyof MessageClean;
}
function TableHead({ sortBy, reverseSortDirection, setSorting, header }: TableHead) {
  const title: string = capsFirstLetter(header)
    .split(/(?=[A-Z])/)
    .join(' ');
  let colSpan: number;
  switch (header) {
    case 'name':
      colSpan = 25;
      break;
    case 'email':
      colSpan = 30;
      break;
    case 'subject':
      colSpan = 35;
      break;
    case 'message':
      colSpan = 80;
      break;
    case 'createdAt':
      colSpan = 25;
      break;
    default:
      colSpan = 50;
  }
  return (
    <Th
      sorted={sortBy === header}
      reversed={reverseSortDirection}
      onSort={() => setSorting(header)}
      colSpan={colSpan}
    >
      {title}
    </Th>
  );
}

export function TableSort({ data }: TableSortProps) {
  const { classes } = useStyles();
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof MessageClean | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const headerOrder: (keyof MessageClean)[] = ['name', 'email', 'subject', 'createdAt', 'message'];
  const setSorting = (field: keyof MessageClean) => {
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
    const tableData = headerOrder.map((header, index) => {
      let colSpan: number;
      switch (header) {
        case 'name':
          colSpan = 25;
          break;
        case 'email':
          colSpan = 30;
          break;
        case 'subject':
          colSpan = 35;
          break;
        case 'message':
          colSpan = 80;
          break;
        case 'createdAt':
          colSpan = 25;
          break;
        default:
          colSpan = 50;
      }
      return (
        <td key={index} colSpan={colSpan}>
          {row[header]}
        </td>
      );
    });

    return <tr key={row.id}>{tableData}</tr>;
  });

  return (
    <ScrollArea sx={{ height: '100vh' }} type="hover" offsetScrollbars>
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
              <TableHead
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
              <td colSpan={195}>
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

interface MessagesAdmin {
  messages: MessageClean[] | [];
}

export function MessagesAdmin({ messages }: MessagesAdmin) {
  const messageData: MessageClean[] | [] = [...messages];
  const {
    classes: { container },
  } = useContainerStyles();

  return (
    <>
      <TitleSection title="Messages" order={2} />
      <Box mt={-102} pb={192} className={container}>
        <TableSort data={messageData} />
      </Box>
    </>
  );
}
