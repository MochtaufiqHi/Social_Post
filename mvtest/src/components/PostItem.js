import React, { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom'
import { API } from "../config/API/api";
import { useMutation, useQuery } from "react-query";

function PostItem() {
  let navigate = useNavigate()
  const [posts, setPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [state] = useContext(UserContext);
  // console.log(state);
  
  if(state.isLogin === false){
    navigate('/login');
  }


  let { data: post } = useQuery("postCache", async () => {
    const response = await API.get("/post");
    setPost(response.data.data);
    return response.data.data;
  });


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
            ? { ...post, isLiked: !isLiked, likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1 }
            : post
        )
      );
    } catch (error) {
      console.error("Error handling like/unlike:", error);
    }
  };
  
  return (
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
                  </div>
                  <h5 style={{fontSize:"18px"}}>{data?.user?.username}</h5>
                  <h5 style={{fontSize:"14px"}}>{data?.caption}</h5>
                  <Card.Text style={{fontSize:"14px", opacity:"0.6"}}>{data?.tags}</Card.Text>
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
  );
}

export default PostItem;
