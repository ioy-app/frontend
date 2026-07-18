import { FormProvider, useForm } from "react-hook-form";
import Input from "../../base/input";
import Button from "../../base/button";
import { BiSearch } from "react-icons/bi";
import { useEffect } from "react";

/**
 * SearchBlock
 * @description Search input block with a text field and submit button
 *
 * @param onSubmit - Callback triggered with the search value on form submission
 * @param value - Initial/pre-filled search value
 * @param disabled - Disables the input and button
 * @returns A form with a search input and a primary submit button
 *
 * @example
 * <SearchBlock onSubmit={(data) => handleSearch(data)} value="query" />
 */
const SearchBlock: React.FC<{
  onSubmit: (props: {
    search?: string;
  }) => void;
  value?: string;
  disabled?: boolean;
}> = ({
  onSubmit,
  value,
  disabled
}) => {
  const methods = useForm();

  useEffect(() => {
    methods.setValue("search", value);
  }, [ value ]);
  
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => onSubmit && onSubmit(data))}
        className="flex items-center gap-4"
      >
        <Input
          {...methods.register("search")}
          type="search"
          disabled={disabled}
        />
        <Button
          variant="primary"
          htmlType="submit"
          disabled={disabled}
        >
          <BiSearch />
        </Button>
      </form>
    </FormProvider>
  );
}

export default SearchBlock;