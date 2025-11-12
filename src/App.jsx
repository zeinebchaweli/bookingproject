// src/App.jsx
import { useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Nav from "./components/Nav.jsx"; // FIXED
import SearchBar from "./components/SearchBar.jsx";
import PlaceCard from "./components/PlaceCard.jsx";
import { sportsFields } from "./data/fields.js";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");

  const filteredFields = useMemo(() => {
    return sportsFields.filter((field) => {
      const matchesSearch =
        field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        field.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSport =
        selectedSport === "all" || field.sport === selectedSport;
      return matchesSearch && matchesSport;
    });
  }, [searchQuery, selectedSport]);

  const sports = ["all", "Football", "Basketball", "Tennis", "Padel"];

  return (
    <>
      <Nav />
      <Container>
        <h1 className="text-center mb-4">Book Your Sports Field</h1>

        <Row className="mb-4">
          <Col md={8}>
            <SearchBar onSearch={setSearchQuery} />
          </Col>
          <Col md={4}>
            <select
              className="form-select"
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              {sports.map((sport) => (
                <option key={sport} value={sport}>
                  {sport === "all" ? "All Sports" : sport}
                </option>
              ))}
            </select>
          </Col>
        </Row>

        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredFields.map((field) => (
            <Col key={field.id}>
              <PlaceCard field={field} />
            </Col>
          ))}
        </Row>

        {filteredFields.length === 0 && (
          <p className="text-center text-muted mt-5">
            No fields found. Try adjusting your search.
          </p>
        )}
      </Container>
    </>
  );
}

export default App;
