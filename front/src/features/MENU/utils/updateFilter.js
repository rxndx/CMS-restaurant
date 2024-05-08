export const updateFilter = (filterOptions) => {
    const { selectedTags, selectedCountries, selectedCatalogs, searchValue, tags, countries, catalogs } = filterOptions;

    const tagNames = selectedTags.map(tagId => {
        const tag = tags.find(tag => tag.tag_id === tagId);
        return tag ? tag.tag_name : '';
    }).filter(Boolean).join(',');

    const countryNames = selectedCountries.map(countryId => {
        const country = countries.find(country => country.country_id === countryId);
        return country ? country.country_name : '';
    }).filter(Boolean).join(',');

    const catalogNames = selectedCatalogs.map(catalogId => {
        const catalog = catalogs.find(catalog => catalog.catalog_id === catalogId);
        return catalog ? catalog.catalogs_name : '';
    }).filter(Boolean).join(',');

    const searchQuery = searchValue && searchValue.trim().length > 0 ? `&menu_name=${searchValue.trim()}` : '';

    const filterQuery = (tagNames || countryNames || catalogNames || searchQuery) ? 'filter' : '';
    const newSearchParams = `${filterQuery}${tagNames ? `&tags=${tagNames}` : ''}${countryNames ? `&countries=${countryNames}` : ''}${catalogNames ? `&catalogs=${catalogNames}` : ''}${searchQuery}`;

    const queryString = filterQuery ? `?${newSearchParams}` : '';

    const newUrl = `${window.location.pathname}${queryString}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
};

export const clearFilter = () => {
    const newUrl = `${window.location.pathname}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
};