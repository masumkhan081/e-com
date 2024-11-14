/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

const {
  default_view_Limit,
  map_searchables,
  map_filterables,
} = require("../config/constants");

function getSearchAndPagination({ query: query, entity }) {
  const { search, page, limit, search_by, sort_by, sort_order } = query;

  const sort_field = sort_by || "createdAt"; // Default to "createdAt" if no sort_by is provided
  const sort_direction = sort_order === "desc" ? -1 : 1;

  // page-number - pagination field
  const current_page =
    page === "" ? 1 : page === undefined ? 1 : page < 1 ? 1 : page;

  // limit - pagination field
  const view_limit =
    limit === ""
      ? default_view_Limit
      : limit === undefined
      ? default_view_Limit
      : limit < 1
      ? default_view_Limit
      : limit;

  // skip  - pagination field
  const view_skip = view_limit * (current_page - 1);

  // entity fild to be searched on
  const searchField =
    search_by === undefined ? "whole" : search_by === "" ? "whole" : search_by;

  // entity to be searched by
  const search_term =
    search === "" ? search : search === undefined ? "" : search;

  let search_conditions = [];
  let filter_conditions = {};
  let sort_conditions = { [sort_field]: sort_direction };
  let filterData;

  // Add filter conditions from map_filterables
  for (let i = 0; i < map_filterables[entity]?.length; i++) {
    filterData = query[map_filterables[entity][i]];

    if (filterData !== undefined && filterData !== "") {
      filter_conditions[map_filterables[entity][i]] = filterData;
    }
  }

  for (let i = 0; i < map_searchables[entity]?.length; i++) {
    const searchableField = map_searchables[entity][i];
    if (search_term) {
      if (searchField === "whole") {
        search_conditions.push({
          [searchableField]: { $regex: new RegExp(search_term, "i") },
        });
      } else {
        search_conditions.push({
          [searchField]: { $regex: new RegExp(search_term, "i") },
        });
      }
    }
  }

  // Combine search conditions with filter conditions
  if (search_conditions.length > 0) {
    filter_conditions["$or"] = search_conditions;
  }

  return {
    current_page,
    search_term,
    view_limit,
    view_skip,
    sort_by,
    sort_order,
    filter_conditions,
    sort_conditions,
  };
}

module.exports = { getSearchAndPagination };
