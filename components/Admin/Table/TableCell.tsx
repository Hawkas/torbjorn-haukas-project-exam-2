import { SpoilerButton } from '@Buttons/SpoilerButton';
import { Text } from '@mantine/core';
import type { ObjectWithStringValues, TableKeyArray } from 'types/TypeExperiments';

interface TableCellProps<T> {
  headerOrder: TableKeyArray<T>;
  row: ObjectWithStringValues<T>;
}

export function TableCell<T>({ headerOrder, row }: TableCellProps<T>) {
  return headerOrder.map((header, index) => {
    let colSpan: number;
    let contentWrap: JSX.Element = (
      <Text component="span" inherit>
        {row[header]}
      </Text>
    );
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
        contentWrap = <SpoilerButton>{contentWrap}</SpoilerButton>;
        break;
      case 'message':
        colSpan = 80;
        contentWrap = <SpoilerButton>{contentWrap}</SpoilerButton>;
        break;
      default:
        colSpan = 50;
    }
    return (
      <td key={index} colSpan={colSpan}>
        {contentWrap}
      </td>
    );
  });
}
