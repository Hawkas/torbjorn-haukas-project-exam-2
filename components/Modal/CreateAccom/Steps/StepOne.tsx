import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Checkbox,
  Input,
  InputWrapper,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DetailsFields } from 'types/createAccom';
import { useCreateAccomStyles } from '../CreateAccom.styles';
import { AmenitySchema } from '../CreateAccomValidation';

export function StepOne({ form, amenitiesForm, contactInfoForm }: DetailsFields) {
  const { classes } = useCreateAccomStyles();
  const type = ['Guesthouse', 'Bed & Breakfast', 'Hotel'];
  const location = ['Bergen', 'Voss', 'Hardanger'];
  const amenitiesData: {
    label: string;
    field: keyof AmenitySchema;
  }[] = [
    { label: 'WiFi', field: 'wifi' },
    { label: 'Air condition', field: 'airCondition' },
    { label: 'Elevator', field: 'elevator' },
    { label: 'Free parking', field: 'freeParking' },
    { label: 'Pets allowed', field: 'petsAllowed' },
    { label: 'Kitchen', field: 'kitchen' },
    { label: 'Food service', field: 'foodService' },
    { label: 'Television', field: 'television' },
    { label: 'Refrigerator', field: 'refrigerator' },
  ];

  return (
    <>
      <TextInput
        mt="xl"
        label="Name"
        classNames={classes}
        placeholder="Enter accommodation name"
        {...form.getInputProps('name')}
      />
      <SimpleGrid
        mt="xl"
        spacing={28}
        cols={2}
        breakpoints={[{ maxWidth: 'xs', cols: 1, spacing: 'xl' }]}
      >
        <Select
          label="Type"
          classNames={classes}
          placeholder="Select a type"
          data={type}
          rightSection={<FontAwesomeIcon fontSize="14" icon={faChevronDown} />}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          rightSectionWidth={40}
          {...form.getInputProps('type')}
        />
        <Select
          label="Location"
          placeholder="Select a location"
          classNames={classes}
          data={location}
          rightSection={<FontAwesomeIcon fontSize="14" icon={faChevronDown} />}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          rightSectionWidth={40}
          {...form.getInputProps('location')}
        />
      </SimpleGrid>
      <Textarea
        mt="xl"
        label="Description"
        classNames={classes}
        placeholder="Describe the place"
        minRows={5}
        {...form.getInputProps('description')}
      />
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
        <InputWrapper
          sx={{ alignSelf: 'stretch' }}
          label="Amenities"
          classNames={{ label: classes.amenitiesLabel }}
          mt="xl"
          error={form.errors.amenities}
          // Just to clear errors on change.
          onChange={() => form.setFieldValue('amenities', amenitiesForm.values)}
        >
          <Input
            classNames={{ input: classes.amenityContainer }}
            component="div"
            multiline
            invalid={form.errors.amenities as boolean}
          >
            {amenitiesData.map((item, index) => (
              <Checkbox
                label={item.label}
                key={index}
                {...amenitiesForm.getInputProps(item.field, { type: 'checkbox' })}
                onChange={(event) => {
                  amenitiesForm.setFieldValue(item.field, event.currentTarget.checked);
                }}
              />
            ))}
          </Input>
        </InputWrapper>
        <fieldset className={classes.contactInfoWrapper}>
          <legend>Contact info</legend>
          <Stack>
            <TextInput
              classNames={classes}
              label="Email"
              placeholder="Enter accommodation's email"
              {...contactInfoForm.getInputProps('email')}
            />
            <TextInput
              classNames={classes}
              label="Phone"
              placeholder="Enter accommodation's phone number"
              {...contactInfoForm.getInputProps('phone')}
            />
            <TextInput
              classNames={classes}
              label="Address"
              placeholder="Enter accommodation's address"
              {...contactInfoForm.getInputProps('address')}
            />
          </Stack>
        </fieldset>
      </SimpleGrid>
    </>
  );
}
