import { faSort, faSortDown, faSortUp } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capsFirstLetter } from '@helpers/stringConversions';
import { Center, Group, Text, UnstyledButton } from '@mantine/core';
import { useTableStyles } from './AdminTable.styles';

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
  colSpan: number;
}

function Th({ children, reversed, sorted, onSort, colSpan }: ThProps) {
  const { classes } = useTableStyles();
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

interface TableHeadProps<T> {
  header: keyof T;
  setSorting: (field: keyof T) => void;
  sortBy: keyof T | null;
  reverseSortDirection: boolean;
}

export function TableHead<T>({
  sortBy,
  reverseSortDirection,
  setSorting,
  header,
}: TableHeadProps<T>) {
  const title: string = capsFirstLetter(header as string)
    .split(/(?=[A-Z])/)
    .join(' ');
  let colSpan: number;
  // TODO: not using hardcoded values lmao
  switch (header) {
    case 'checkIn':
    case 'checkOut':
    case 'createdAt':
      colSpan = 30;
      break;
    case 'name':
    case 'room':
    case 'subject':
      colSpan = 35;
      break;
    case 'email':
    case 'accommodation':
      colSpan = 40;
      break;
    case 'additionalDetails':
      colSpan = 50;
      break;
    case 'message':
      colSpan = 80;
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
