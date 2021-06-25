import React, { useState, useEffect, useRef, createRef } from "react";
import { Dropdown } from "semantic-ui-react";
import debounce from "lodash/debounce";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";
import PropTypes from "prop-types";

function DropdownHelper(props) {
  const {
    fetchData,
    record,
    isMultiple,
    isSearchEnabled,
    setSelectedOption,
    selectedOption,
    listSource,
    isRemote,
    addItem,
    enableMultipleSelect,
    allowAdditions,
    createOption,
    placeholder,
    handleBlur
  } = props;

  const [isLoading, setLoading] = useState(false);
  const pageNumber = useRef(1);
  const ref = createRef();
  const [searchText, setSearchText] = useState(null);

  const handleAddition = (e, data) => {
    const { value } = data;
    createOption(value);
  };

  useEffect(() => {
    if (record) {
      const { request } = record;
      if (request && Object.keys(request).length) {
        if (request.isLoading && !request.error) {
          setLoading(true);
        } else {
          setLoading(false);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);

  function makeRequest() {
    const pageSize = 25;
    const page = pageNumber.current;
    const query = omitBy({ page, pageSize, s: searchText }, isNil);
    fetchData(query);
    pageNumber.current = page + 1;
  }

  useEffect(() => {
    if (isRemote) {
      pageNumber.current = 1;
      makeRequest("searchText");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const debounceCall = debounce(setSearchText, 700);

  const handleSearchChange = (e, { searchQuery }) => {
    debounceCall(searchQuery ? searchQuery : null);
  };

  const onBlur = (e) => {
    if (handleBlur) {
      handleBlur(e);
    }
    handleSearchChange(e, { searchQuery: null });
  };

  const handleChange = (e, { value }) => {
    if (enableMultipleSelect) {
      addItem(value, e);
    } else {
      setSelectedOption(value, e);
    }
    handleSearchChange(e, { searchQuery: null });
  };

  return (
    <Dropdown
      ref={ref}
      clearable //added to enable the clearable action inside the dropdown.
      fluid
      selection
      multiple={isMultiple}
      search={isSearchEnabled}
      options={listSource}
      value={enableMultipleSelect ? null : selectedOption}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={handleChange}
      allowAdditions={allowAdditions}
      additionPosition={"bottom"}
      additionLabel={"(Add Custom) "}
      onAddItem={handleAddition}
      onSearchChange={handleSearchChange}
      disabled={isLoading}
      loading={isLoading}
      selectOnBlur={false}
    />
  );
}

export default DropdownHelper;

DropdownHelper.propTypes = {
  fetchData: PropTypes.func,
  record: PropTypes.object,
  isMultiple: PropTypes.bool,
  isSearchEnabled: PropTypes.bool,
  setSelectedOption: PropTypes.func,
  selectedOption: PropTypes.any,
  listSource: PropTypes.array,
  isRemote: PropTypes.bool,
  addItem: PropTypes.func,
  enableMultipleSelect: PropTypes.bool,
  allowAdditions: PropTypes.bool,
  createOption: PropTypes.func,
  placeholder: PropTypes.string,
  handleBlur: PropTypes.func
};
