import Button from "react-bootstrap/Button";
import {Card, Modal, Form} from "react-bootstrap";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { UserContext } from "../context/UserContext";
import { API } from "../config/API/api";
import { useMutation, useQuery } from "react-query";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

function PostItemUser() {
  const [posts, setPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);;
  const [user] =useContext(UserContext)
  const [preview, setPreview] = useState(false)

  let { data: post } = useQuery("postByIdCache", async () => {
    const response = await API.get("/post");
    setPost(response.data.data);
    return response.data.data;
  });

  // console.log(user) 
  // console.log(posts) 

  const filteredPosts =
    posts &&
    posts.filter(
      (data) =>
        data.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.tags.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const itemsPerPage = 8;
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const getCurrentPageData = () => {
    const itemsPerPage = 8;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPosts.slice(startIndex, endIndex);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(posts.length / 8);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={currentPage === i ? "active" : ""}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            border: "none",
          }}
        >
          <p style={{ fontWeight: "bolder", margin: "0px 2px 0px 2px" }}>{i}</p>
        </button>
      );
    }

    return pageNumbers;
  };

  const likePostMutation = useMutation(async (postId) => {
    try {
      await API.put(`/post/like/${postId}`);
    } catch (error) {
      console.error("Error liking post:", error);
      throw new Error("Failed to like post.");
    }
  });

  const unlikePostMutation = useMutation(async (postId) => {
    try {
      await API.put(`/post/unlike/${postId}`);
    } catch (error) {
      console.error("Error unliking post:", error);
      throw new Error("Failed to unlike post.");
    }
  });

  const handleLikeClick = async (postId, isLiked) => {
    try {
      if (isLiked) {
        await unlikePostMutation.mutateAsync(postId);
      } else {
        await likePostMutation.mutateAsync(postId);
      }

      setPost((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: !isLiked,
                likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error handling like/unlike:", error);
    }
  };

  const showModal = () => {
    setShow(true)
  }

  const closeModal = () => {
    setShow(false)
  }

  const handleCloseUpdate = () => setShow(false);
  const handleShowUpdate = () => setShow(true);


  const deletePost = async () => {
    if(selectedPostId) {
      try {
        await API.delete(`/post/${selectedPostId}`);
        setPost((prevPosts) => prevPosts.filter((post) => post.id !== selectedPostId));
        setSelectedPostId(null); 
        setShow(false); 
        Swal.fire("Good job!", "Successfully Delete Post", "success")
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  }

  const handleDeleteClick = (postId) => {
    setSelectedPostId(postId);
    setShow(true);
  };

  return (
    <>
      <div className="post">
        <div>
          <input
            className="search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="data-post d-flex">
          {getCurrentPageData().map((data) => {
            const isCurrentUserPost = data?.user?.email === user?.user?.email;
            return (
              <div key={data.id} className="list-items-post p-3">
                <Card style={{ width: "14rem" }}>
                  <Card.Img
                    variant="top"
                    src={data?.image}
                    style={{ width: "221px", height: "210px" }}
                    alt={data?.image}
                  />
                  <Card.Body>
                    <div className="d-flex">
                      <div>
                        {data.isLiked ? (
                          <BsHeartFill
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleLikeClick(data.id, true)}
                          />
                        ) : (
                          <BsHeart
                            style={{ cursor: "pointer" }}
                            onClick={() => handleLikeClick(data.id, false)}
                          />
                        )}
                      </div>
                      <div style={{ marginTop: "2px", marginLeft: "4px" }}>
                        <p style={{ alignItems: "center" }}>{data?.likes}</p>
                      </div>
                      {isCurrentUserPost && (
                      <div className="p-relative bg-warning">
                        <div className="btn-update">
                          <button className="btn-item"> Update</button>
                        </div>
                        <div className="btn-delete">
                          <button
                            className="btn-item"
                            onClick={() => handleDeleteClick(data.id)}
                          >
                            {" "}
                           Delete
                          </button>
                        </div>
                      </div>
                    )}
                    </div>
                    <h5 style={{ fontSize: "18px" }}>{data?.user?.username}</h5>

                    <h5 style={{ fontSize: "14px" }}>{data?.caption}</h5>
                    <Card.Text style={{ fontSize: "14px", opacity: "0.6" }}>
                      {data?.tags}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-center mt-5">
          <div className="">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.0)",
                border: "none",
              }}
            >
              Previous
            </button>
            {renderPagination()}
            <button
              onClick={goToNextPage}
              disabled={currentPage === Math.ceil(posts.length / 8)}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.0)",
                border: "none",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        className="text-center"
        style={{ marginTop: "200px" }}
      >
        <Modal.Footer>
          <div className="w-100">
            <p>Are you sure want to delete this data?</p>
          </div>
          <div className="d-flex justify-content-center w-100">
            <Button
              variant="primary"
              className="mx-3"
              onClick={closeModal}
            >
              No
            </Button>
            <Button
              variant="primary"
              className="mx-3"
              onClick={deletePost}
            >
              Yes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleCloseUpdate} className="text-center">
        <Modal.Footer>
          <div className="w-100"></div>
          <div className="d-flex justify-content-center w-100">
            <Form>
              <h3 className="py-4" style={{ color: "blueviolet" }}>
                Create Post
              </h3>

              <Form.Group
                controlId="formFile"
                className="mb-4 form-post border border-dark rounded"
              >
                <Form.Control
                  type="file"
                  size="sm"
                  className="shadow"
                  name="picture"
                  // value={image}
                  // onChange={handleChange}
                />
              </Form.Group>

              <div className="preview-post-img mb-4">
                {preview && (
                  <img src={preview} alt="Preview" className="img-preview" />
                )}
              </div>

              <Form.Group className="mb-4 form-post border border-dark rounded">
                <Form.Control
                  name="caption"
                  type="text"
                  placeholder="caption"
                  size="sm"
                  className="shadow"
                  // onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4 form-post border border-dark rounded">
                <Form.Control
                  name="tags"
                  type="text"
                  placeholder="#tags"
                  size="sm"
                  // onChange={handleChange}
                  className="shadow"
                />
              </Form.Group>
              <Button variant="primary" onClick={handleCloseUpdate} className="m-4">
                Close
              </Button>
              <Button variant="primary" onClick={handleCloseUpdate} className="m-4" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default PostItemUser;
