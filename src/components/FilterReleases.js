const FilterReleases = (releases, { searchTerm, filterType }) => {
    return releases.filter(release => {
        const matchesSearchTerm = searchTerm === '' || release.songs.some(song => song.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFilterType = filterType === '' || release.releaseType === filterType;

        return matchesSearchTerm && matchesFilterType;
    });
};

export default FilterReleases;
