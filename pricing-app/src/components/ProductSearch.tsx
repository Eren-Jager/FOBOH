import FormControl from "@mui/material/FormControl";
import "./styles.css";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  filterValues: any;
  searchText: string;
  setSearchText: (searchText: string) => void;
  selectedFilter: any;
  setSelectedFilter: (selectedFilter: any) => void;
  handleSearch: () => void;
}

export default function ProductSearch({
  filterValues,
  searchText,
  setSearchText,
  selectedFilter,
  setSelectedFilter,
  handleSearch,
}: Props) {
  const handleChange = (e: any, key: string) => {
    setSelectedFilter({ ...selectedFilter, [key]: e.target.value });
  };
  return (
    <>
      <Typography
        variant="caption"
        style={{ color: "grey", fontWeight: "lighter" }}
      >
        {" "}
        Search for Products{" "}
      </Typography>
      <div className="FilterSection">
        <FormControl
          sx={{ m: 1, width: "25ch" }}
          variant="outlined"
          size="small"
        >
          <InputLabel>Search</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedFilter.category}
            label="Category"
            onChange={(e) => handleChange(e, "category")}
          >
            <MenuItem value="">
              <em style={{ color: "grey" }}>Category</em>
            </MenuItem>
            {filterValues.category.map((category: any) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>Segment</InputLabel>
          <Select
            value={selectedFilter.segment}
            label="Segment"
            onChange={(e) => handleChange(e, "segment")}
          >
            <MenuItem value="">
              <em style={{ color: "grey" }}>Segment</em>
            </MenuItem>
            {filterValues.segment.map((segment: any) => (
              <MenuItem key={segment} value={segment}>
                {segment}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>Brand</InputLabel>
          <Select
            value={selectedFilter.brand}
            label="Brand"
            onChange={(e) => handleChange(e, "brand")}
          >
            <MenuItem value="">
              <em style={{ color: "grey" }}>Brand</em>
            </MenuItem>
            {filterValues.brand.map((brand: any) => (
              <MenuItem key={brand} value={brand}>
                {brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}
