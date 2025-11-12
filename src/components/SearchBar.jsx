// src/components/SearchBar.jsx
import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Form onSubmit={handleSearch} className="mb-4">
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by field name or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;
