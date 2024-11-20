export const filterData = (
  data: { [key: string]: any }[],
  searchText: string,
  keys: string[]
) => {
  const lowerCaseSearch = searchText.toLowerCase();

  return data.filter((item) =>
    keys.some((key) =>
      item[key]?.toString().toLowerCase().includes(lowerCaseSearch)
    )
  );
};
