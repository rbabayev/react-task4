import { Button, Form, Modal, Spinner } from "react-bootstrap";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_URL = "https://pixabay.com/api/";
const API_KEY = "44834387-9400b67391a36d18dc536a2cd";
const IMAGES_PER_PAGE = 20;

function App() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_URL}?key=${API_KEY}&q=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}`
      );
      setImages(data.hits);
      setTotalPages(Math.ceil(data.totalHits / IMAGES_PER_PAGE));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const resetSearch = () => {
    searchInput.current.value = "";
    setPage(1);
    fetchImages();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    setPage(1);
    fetchImages();
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="container">
      <h1 className="title">Image search</h1>
      <div className="searchSection">
        <Form onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Type something to search..."
            className="search-input"
            ref={searchInput}
          />
        </Form>
      </div>
      <div className="filters">
        <div onClick={() => handleSelection("nature")}>Nature</div>
        <div onClick={() => handleSelection("dog")}>Dog</div>
        <div onClick={() => handleSelection("car")}>Car</div>
        <div onClick={() => handleSelection("sky")}>Sky</div>
      </div>
      {loading ? (
        <div className="loader">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="images">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.largeImageURL}
              alt={image.previewURL}
              className="image"
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      )}

      <div className="buttons">
        {page > 1 && (
          <button onClick={() => setPage(page - 1)}>Previous</button>
        )}
        {page < totalPages && (
          <button onClick={() => setPage(page + 1)}>Next</button>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <img
              src={selectedImage.largeImageURL}
              alt={selectedImage.previewURL}
              className="modal-image"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
