export const filterAndSortMenus = (menus, tags, menuTags, countries, catalogs, catalogMenuRelations, selectedTags, selectedCatalogs, selectedCountries, searchValue) => {
    return menus
        ?.map(menu => {
            const tagsInMenu = menuTags.filter((menuTag) => menuTag.id_menu === menu.menu_id).map((menuTag) => tags.find((tag) => tag.tag_id === menuTag.id_tags));
            const catalogRelation = catalogMenuRelations.find(
                (relation) => relation.menu_list && relation.menu_list.some((item) => item.menu_id === menu.menu_id)
            );
            const catalog = catalogRelation && catalogs.find((catalog) => catalog.catalog_id === catalogRelation.catalog_id);

            return {
                ...menu,
                tags: tagsInMenu,
                catalog,
            };
        })
        .filter((menu) => {
            const includesSearch = !searchValue || (typeof searchValue === 'string' && menu.menu_name.toLowerCase().includes(searchValue.toLowerCase()));
            const includesTags = selectedTags.length === 0 || menu.tags.some((tag) => selectedTags.includes(tag.tag_id));

            const includesCatalogs = selectedCatalogs.length === 0 || (
                menu.catalog && selectedCatalogs.includes(menu.catalog.catalog_id)
            );

            const includesCountries = selectedCountries.length === 0 || (
                menu.catalog &&
                countries.some((country) =>
                    country.country_name === menu.catalog.country_name &&
                    selectedCountries.includes(country.country_id)
                )
            );

            return includesSearch && includesTags && includesCatalogs && includesCountries;
        })
        .sort((a, b) => {
            const countA = a.tags.filter((tag) => selectedTags.includes(tag?.tag_id)).length;
            const countB = b.tags.filter((tag) => selectedTags.includes(tag?.tag_id)).length;

            if (countA !== countB) {
                return countB - countA;
            }

            const catalogA = a.catalog && selectedCatalogs.includes(a.catalog.catalog_id);
            const catalogB = b.catalog && selectedCatalogs.includes(b.catalog.catalog_id);

            if (catalogA !== catalogB) {
                return catalogB - catalogA;
            }

            const countryA = a.catalog && selectedCountries.includes(a.catalog.id_country);
            const countryB = b.catalog && selectedCountries.includes(b.catalog.id_country);

            return countryB - countryA;
        });
};