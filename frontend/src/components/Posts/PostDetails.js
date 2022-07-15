import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, Navigate } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { postFetchSingleAction, postDeleteAction } from "../../redux/slices/posts/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";
import AddComment from "../Comments/AddComment";
import CommentsList from "../Comments/CommentsList";
import Footer from "../../utils/Footer";
import ErrorDisplay from "../../utils/ErrorDisplay";



const PostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const post = useSelector(state => state?.post);
  const { postDetails, loading, appErr, serverErr, isDeleted } = post

  const comment = useSelector(state => state.comment);
  const { commentCreated, commentDeleted } = comment;

  useEffect(() => {
    dispatch(postFetchSingleAction(id));
  }, [dispatch, id, commentCreated, commentDeleted])


  //Get login user
  const user = useSelector(state => state.users);
  const { userAuth } = user;

  const isCreatedBy = postDetails?.user?._id === userAuth?._id;

  if (isDeleted) return <Navigate to='/posts' />

  return (
    <>
      {loading ? <div className="h-screen bg-custom-gray"><LoadingComponent /></div> :
        appErr || serverErr ? <ErrorDisplay first={appErr} second={serverErr} /> :
          <section className="py-20 2xl:py-40 bg-custom-gray overflow-hidden">
            <div className="container px-4 mx-auto"> 
              {/* Post Image */}
              <img
                className="mb-24 w-full h-96 object-cover"
                src={postDetails?.image}
                alt="Postimage"
              />
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
                  {postDetails?.title}
                </h2>

                {/* User */}
                <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                  <img
                    className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                    src={postDetails?.user?.profilePhoto}
                    alt="img"
                  />
                  <div className="text-left">
                    <Link to={`/profile/${postDetails?.user?._id}`} className="hover:underline text-custom-green">
                      <h4 className="mb-1 text-2xl font-bold text-gray-50">
                        <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-custom-yellow to-custom-red">
                          {postDetails?.user?.nickName}
                        </span>
                      </h4>
                    </Link>
                    <p className="text-gray-500">
                      {<DateFormatter date={postDetails?.createdAt} />}
                    </p>
                  </div>
                </div>
                {/* Post description */}
                <div className="max-w-xl mx-auto">
                  <p className="mb-6  text-xl text-gray-200 text-center">
                    {postDetails?.description}
                    {/* Show delete and update btn if created by current user */}
                    {isCreatedBy ?
                      <p className="flex justify-center">
                        <Link className="p-3" to={`/update-post/${postDetails?._id}`}>
                          <PencilAltIcon className="h-8 mt-3 text-custom-yellow" />
                        </Link>
                        <button onClick={() => dispatch(postDeleteAction(id))} className="ml-3">
                          <TrashIcon className="h-8 mt-3 text-custom-red" />
                        </button>
                      </p> : null}

                  </p>
                </div>
              </div>
              {/* Comment Form component*/}
              {userAuth ? <AddComment postId={id} />
                : null}
              <div className="flex justify-center  items-center">
                <CommentsList comments={postDetails?.comments} postId={postDetails?._id} />
              </div>
            </div>
          </section>}
      <Footer />
    </>
  );
};

export default PostDetails;
